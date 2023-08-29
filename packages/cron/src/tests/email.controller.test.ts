import emailController from "../controllers/email.controller"
import commonService from "../services/common.service"
import emailService from "../services/email.service"
import cronService from "../services/cron.service"

commonService.getToken = jest.fn().mockResolvedValue("token")
jest.mock("../services/email.service", () => ({
    getEmailByStatus: jest
        .fn()
        .mockResolvedValueOnce({
            id: 2,
            uid: "ip31cwmn8c",
            email: "someone@example.com",
            template: "1 shortform",
            status: "pending",
            name: "Bob Jones",
            messageId: "",
            messageCreatedAt: null,
            catchment: "31-ES",
            createdAt: "2023-07-26T16:35:17.391Z"
        })
        .mockResolvedValueOnce({
            id: 2,
            uid: "ip31cwmn8c",
            email: "someone@example.com",
            template: "1 shortform",
            status: "sent",
            name: "Bob Jones",
            messageId: "abc-123456",
            messageCreatedAt: null,
            catchment: "31-ES",
            createdAt: "2023-07-26T16:35:17.391Z"
        })
        .mockResolvedValue(null),
    sendEmail: jest.fn().mockResolvedValue({
        status: 201,
        data: { messages: [{ msgId: "abc-123456" }] }
    }),
    setMsgId: jest.fn(),
    getStatus: jest.fn().mockResolvedValueOnce("sent").mockResolvedValueOnce("completed"),
    updateEmail: jest.fn().mockResolvedValue({
        id: 2,
        uid: "ip31cwmn8c",
        email: "someone@example.com",
        template: "1 shortform",
        status: "sent",
        name: "Bob Jones",
        messageId: "abc-123456",
        messageCreatedAt: null,
        catchment: "31-ES",
        createdAt: "2023-07-26T16:35:17.391Z"
    })
}))
cronService.stopJob = jest.fn()

// try one with no "pending" and "sent" emails

describe("getAndSendEmail", () => {
    it('sends "pending" email, then updates it to "completed"', async () => {
        await emailController.getAndSendEmail()

        // Get a CHES token
        expect(commonService.getToken).toHaveBeenCalledTimes(1)

        // Get a "pending" email
        expect(emailService.getEmailByStatus).toHaveBeenNthCalledWith(1, "pending")

        // Send email
        expect(emailService.sendEmail).toHaveBeenCalledWith("token", {
            id: 2,
            uid: "ip31cwmn8c",
            email: "someone@example.com",
            template: "1 shortform",
            status: "pending",
            name: "Bob Jones",
            messageId: "",
            messageCreatedAt: null,
            catchment: "31-ES",
            createdAt: "2023-07-26T16:35:17.391Z"
        })

        // Save messageId of sent email
        expect(emailService.setMsgId).toHaveBeenCalledWith(2, "abc-123456")

        // Get status of email
        expect(emailService.getStatus).toHaveBeenNthCalledWith(1, "token", "abc-123456")

        // Update Email status to "sent"
        expect(emailService.updateEmail).toHaveBeenNthCalledWith(1, 2, "sent")

        // Get a "sent" email
        expect(emailService.getEmailByStatus).toHaveBeenNthCalledWith(2, "sent")

        // Get status of "sent" email
        expect(emailService.getStatus).toHaveBeenNthCalledWith(2, "token", "abc-123456")

        // Update Email status to "completed"
        expect(emailService.updateEmail).toHaveBeenNthCalledWith(2, 2, "completed")
    })

    it("stops the cron job task because there are no emails", async () => {
        await emailController.getAndSendEmail()

        // End the cron job task
        expect(cronService.stopJob).toHaveBeenCalledTimes(1)
    })
})
