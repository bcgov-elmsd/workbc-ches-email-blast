import { AxiosResponse } from "axios"
import { authApi } from "../config/common.config"

/**
 * @description get a token for the CHES API
 * @returns {Promise<string>} CHES API token
 */
const getToken = async (): Promise<string> => {
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

export default {
    getToken
}
