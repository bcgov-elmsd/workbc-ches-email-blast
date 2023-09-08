import axios, { AxiosResponse, AxiosInstance } from "axios"

const chesBaseUrl = process.env.CHES_HOST || ""
const authBaseUrl = process.env.AUTH_KEYCLOAK_SERVER_URL || ""

export const chesApi: AxiosInstance = axios.create({
    baseURL: chesBaseUrl
})

export const authApi: AxiosInstance = axios.create({
    baseURL: authBaseUrl
})

/**
 * @description get a token for the CHES API
 * @returns {Promise<string>} CHES API token
 */
export const getToken = async () => {
    try {
        const authURL = `realms/${process.env.COMMON_SERVICES_AUTH_REALM}/protocol/openid-connect/token`
        const params = new URLSearchParams()
        params.append("grant_type", "client_credentials")
        const config = {
            auth: {
                username: process.env.COMMON_SERVICES_CLIENT || "",
                password: process.env.COMMON_SERVICES_CLIENT_SECRET || ""
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        const authResponse: AxiosResponse = await authApi.post(authURL, params, config)
        const token: string = authResponse.data.access_token
        return token
    } catch (error: any) {
        console.log(error)
        throw new Error(error.response?.status)
    }
}

/**
 * @description Send an email to one recipient
 * @param {string} token Authentication for the CHES API
 * @param {string} body HTML body of the email
 * @param {string} subject Subject of the email
 * @param {string[]} to Array of email addresses to send the email to
 * @returns {AxiosResponse} Response from request to the CHES API
 */
export const sendEmail = async (token: string, body: string, subject: string, to: string[]) => {
    try {
        console.log(body)
        const request = {
            // bcc: [],
            bodyType: "html",
            body,
            // cc: [],
            // delayTs: 0,
            encoding: "utf-8",
            from: "WorkBC No-Reply <workbc-noreply@gov.bc.ca>",
            priority: "normal",
            subject,
            to,
            // tag: tag,
            attachments: []
        }
        // console.log(request)
        const sendEmailResult: AxiosResponse = await chesApi.post("api/v1/email", request, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        // console.log(sendEmailResult.data)
        return sendEmailResult
    } catch (error: any) {
        console.log(JSON.stringify(error.response?.data))
        throw new Error(error.response?.status)
    }
}
