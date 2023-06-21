import { AxiosResponse } from "axios"
import { Email } from ".prisma/client"
import prisma from "../db/config"
import { chesApi } from "../config/common.config"

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
 * @param {string} recipient Address to receive email
 * @returns {AxiosResponse} Response from request to the CHES API
 */
const sendEmail = async (chesToken: string, recipient: string): Promise<AxiosResponse> => {
    try {
        // email is currently hardcoded in, but in the future we can add a
        // function parameter to specify the correct template/form to use
        const req = {
            to: [recipient],
            encoding: "utf-8",
            priority: "normal",
            bodyType: "text", // "html" or "text"
            subject: "CHES test",
            from: "workbc-noreply@gov.bc.ca",
            body: "Hello, world!"
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
