import { AxiosResponse } from "axios"
import { Email } from ".prisma/client"
import prisma from "../db/config"
import { chesApi } from "../config/common.config"
import controlTemplate from "../templates/control.template"
import testTemplate from "../templates/test.template"

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
 * @param {string} status New status; One of "pending", "sent" or "completed"
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

// save messageId in db
const setMsgId = async (id: number, messageId: string) =>
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
 * @param {string} chesToken Authentication for CHES API
 * @param {Email} recipient Information relating to the email recipient and type of email they receive
 * @returns {AxiosResponse} Response from request to the CHES API
 */
const sendEmail = async (chesToken: string, recipient: Email): Promise<AxiosResponse> => {
    try {
        // get email body with recipient's information
        const firstname = recipient.name.split(" ")[0]
        const body =
            recipient.template === "test"
                ? testTemplate.test("9", recipient.id, firstname, "#")
                : controlTemplate.control("8", recipient.id, firstname, "#")

        const req = {
            to: [recipient.email],
            encoding: "utf-8",
            priority: "normal",
            bodyType: "html", // "html" or "text"
            subject: `Provincial government employment services (${recipient.template} template)`,
            from: "workbc-noreply@gov.bc.ca",
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

const getStatus = async (chesToken: string, messageId: string) => {
    try {
        const status: AxiosResponse = await chesApi.get(`api/v1/status/${messageId}`, {
            headers: {
                Authorization: `Bearer ${chesToken}`,
                "Content-Type": "application/json"
            }
        })
        return status
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
