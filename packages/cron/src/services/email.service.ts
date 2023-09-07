import { AxiosResponse } from "axios"
import { Email } from ".prisma/client"
import prisma from "../db/config"
import { chesApi } from "../config/common.config"
import email1Template from "../templates/email1.template"
import email2Template from "../templates/email2.template"
import previousTemplate from "../templates/previous.template"
// import reminderTemplate from "../templates/reminder.template"

/**
 * @description Get an email with specified status
 * @returns {Promise<Email | null>} Email from database or null (when no Email has status "pending")
 */
const getEmailByStatus = async (status: string): Promise<Email | null> =>
    prisma.email.findFirst({
        where: {
            status
        }
    })

/**
 * @description Get 50 emails with status "pending"
 * @returns {Promise<Email[]>} Array of emails from database
 */
const getAllEmails = async (): Promise<Email[]> =>
    prisma.email.findMany({
        where: {
            status: "pending"
        },
        take: 50
    })

/**
 * @description Update status of an email in the database
 * @param {number} id id of email in database to change
 * @param {string} status New status; One of "sent," "completed", "cancelled", or "failed"
 * @returns {Promise<Email>} Email with updated status
 */
const updateEmail = async (id: number, status: string): Promise<Email> =>
    prisma.email.update({
        where: {
            id
        },
        data: {
            status,
            messageCreatedAt: new Date()
        }
    })

/**
 * @description Save a sent email's msgId to the database
 * @param {number} id database id of Email to update
 * @param {string} messageId new messageId; the msgId field from a CHES API response
 * @returns {Promise<Email>} Email with updated messageId
 */
const setMsgId = async (id: number, messageId: string): Promise<Email> =>
    prisma.email.update({
        where: {
            id
        },
        data: {
            messageId
        }
    })

/**
 * @description Send an email to one recipient
 * @param {string} chesToken Authentication for the CHES API
 * @param {Email} recipient Information from database to personalize the email with
 * @returns {AxiosResponse} Response from request to the CHES API
 */
const sendEmail = async (chesToken: string, recipient: Email): Promise<AxiosResponse> => {
    try {
        // fill in the correct email template with recipient's information
        const { catchment } = recipient
        const uid = encodeURIComponent(recipient.uid)
        const matomoTitle = encodeURIComponent(recipient.template)
        let body = ""
        const reminder = !!recipient.template.includes("reminder")
        let subject = reminder ? "Reminder: Connect with WorkBC Employment Services" : "Connect with WorkBC Employment Services"

        // form link
        const form = recipient.template.includes("short")
            ? `${process.env.SHORT_FORM}?uid=${uid}&title=${matomoTitle}%20redirect&name=${encodeURIComponent(
                  recipient.name
              )}&email=${encodeURIComponent(recipient.email)}&catchment=${catchment}`
            : `${process.env.LONG_FORM}?uid=${uid}&title=${matomoTitle}%20redirect`

        // email template
        switch (recipient.template.split(" reminder")[0]) {
            case "AC short":
            case "AC long":
                body = email2Template.email2("9", uid, matomoTitle, recipient.name, form, reminder)
                break
            case "Standard short":
            case "Standard long":
            case "Control":
                body = email1Template.email1("8", uid, matomoTitle, recipient.name, form, reminder)
                break
            case "Past WorkBC Client Email":
                subject = "Reconnect with WorkBC Employment Services"
                body = previousTemplate.previousEmail("12", uid, matomoTitle, recipient.name, form)
                break

            default:
                throw new Error("Email type is not recognized")
        }

        // make emailing request
        const req = {
            to: [recipient.email],
            encoding: "utf-8",
            priority: "normal",
            bodyType: "html", // "html" or "text"
            subject: `${subject}`,
            from: "WorkBC No-Reply <workbc-noreply@gov.bc.ca>",
            body
        }
        const sendEmailResult: AxiosResponse = await chesApi.post("api/v1/email", req, {
            headers: {
                Authorization: `Bearer ${chesToken}`,
                "Content-Type": "application/json"
            }
        })
        return sendEmailResult
    } catch (error: any) {
        console.log(JSON.stringify(error.response?.data))
        throw new Error(error.response?.status)
    }
}

/**
 * @description Get the status of a sent email from the CHES API
 * @param {string} chesToken Authentication for the CHES API
 * @param {string} messageId messageId of the email to check
 * @returns {string} email status; One of "sent," "completed", "cancelled", or "failed"
 */
const getStatus = async (chesToken: string, messageId: string): Promise<string> => {
    try {
        const status: AxiosResponse = await chesApi.get(`api/v1/status/${messageId}`, {
            headers: {
                Authorization: `Bearer ${chesToken}`,
                "Content-Type": "application/json"
            }
        })
        return status.data.status
    } catch (error: any) {
        console.log(JSON.stringify(error.response?.data))
        throw new Error(error.response?.status)
    }
}

export default {
    getEmailByStatus,
    getAllEmails,
    updateEmail,
    sendEmail,
    getStatus,
    setMsgId
}
