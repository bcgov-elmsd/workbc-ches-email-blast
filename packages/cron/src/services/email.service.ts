import { AxiosResponse } from "axios"
import { Email } from ".prisma/client"
import prisma from "../db/config"
import { chesApi } from "../config/common.config"
import email1Template from "../templates/email1.template"
import email2Template from "../templates/email2.template"

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
            status
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
        let body = ""

        // form link
        const form = recipient.template.includes("short")
            ? `${process.env.SHORT_FORM}?uid=${uid}&title=${encodeURIComponent(`${recipient.template} redirect`)}&name=${encodeURIComponent(
                  recipient.name
              )}&email=${encodeURIComponent(recipient.email)}&catchment=${catchment}`
            : `${process.env.LONG_FORM}?uid=${uid}&title=${encodeURIComponent(recipient.template)}%20redirect`

        // email template
        if (recipient.template.includes("AC")) {
            body = email2Template.email2("9", uid, encodeURIComponent(recipient.template), recipient.name, form)
        } else {
            body = email1Template.email1("8", uid, encodeURIComponent(recipient.template), recipient.name, form)
        }

        // make emailing request
        const req = {
            to: [recipient.email],
            encoding: "utf-8",
            priority: "normal",
            bodyType: "html", // "html" or "text"
            subject: `Connect with WorkBC Employment Services (${recipient.template} template)`,
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
