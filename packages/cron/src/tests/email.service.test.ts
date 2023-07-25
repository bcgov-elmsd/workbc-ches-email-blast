import emailService from "../services/email.service"
import prismaMock from "../db/singleton"
import { chesApi } from "../config/common.config"

const email1 = {
    id: 1,
    email: "hello@example.net",
    template: "1 longform",
    status: "completed",
    name: "Trista Dhami",
    messageId: "qwe-234567",
    catchment: "01-ES",
    createdAt: new Date()
}

const email2 = {
    id: 2,
    email: "someone@example.com",
    template: "1 shortform",
    status: "pending",
    name: "Bob Jones",
    messageId: "",
    catchment: "31-ES",
    createdAt: new Date()
}

let email3 = {
    id: 3,
    email: "testing@example.org",
    template: "2 shortform",
    status: "pending",
    name: "Brian Pham",
    messageId: "",
    catchment: "02-ES",
    createdAt: new Date()
}

const updatedEmail3 = {
    id: 3,
    email: "testing@example.org",
    template: "2 shortform",
    status: "sent",
    name: "Brian Pham",
    messageId: "xyz-456789",
    catchment: "02-ES",
    createdAt: new Date()
}

describe("getEmailByStatus", () => {
    it('Return 1 "completed" email', async () => {
        prismaMock.email.findFirst.mockResolvedValue(email1)
        const emailResult = await emailService.getEmailByStatus("completed")
        expect(prismaMock.email.findFirst).toHaveBeenCalledWith({
            where: {
                status: "completed"
            }
        })
        expect(emailResult).toEqual(email1)
    })
})

describe("getAllEmails", () => {
    it('Return at most 50 "pending" emails', async () => {
        prismaMock.email.findMany.mockResolvedValue([email2, email3])
        const emailResult = await emailService.getAllEmails()
        expect(prismaMock.email.findMany).toHaveBeenCalledWith({
            where: {
                status: "pending"
            },
            take: 50
        })
        expect(emailResult).toEqual([email2, email3])
    })
})

describe("updateEmail", () => {
    it('Email status is initially "pending"', async () => {
        expect(email3.id).toEqual(3)
        expect(email3.status).toEqual("pending")
    })

    it('Email status is now "sent"', async () => {
        prismaMock.email.update.mockResolvedValue(updatedEmail3)
        email3 = await emailService.updateEmail(3, "sent")

        expect(prismaMock.email.update).toHaveBeenCalledWith({
            where: {
                id: 3
            },
            data: {
                status: "sent"
            }
        })
        expect(email3.id).toEqual(3)
        expect(email3.status).toEqual("sent")
    })

    // reset email3
    afterAll(() => {
        email3 = {
            id: 3,
            email: "testing@example.org",
            template: "2 shortform",
            status: "pending",
            name: "Brian Pham",
            messageId: "",
            catchment: "02-ES",
            createdAt: new Date()
        }
    })
})

describe("setMsgId", () => {
    it("Email messageId is initially empty", () => {
        expect(email3.id).toEqual(3)
        expect(email3.messageId).toEqual("")
    })

    it('Email messageId is now "xyz-456789"', async () => {
        prismaMock.email.update.mockResolvedValue(updatedEmail3)
        email3 = await emailService.setMsgId(3, "xyz-456789")

        expect(prismaMock.email.update).toHaveBeenCalledWith({
            where: {
                id: 3
            },
            data: {
                messageId: "xyz-456789"
            }
        })

        expect(email3.id).toEqual(3)
        expect(email3.messageId).toEqual("xyz-456789")
    })
})

jest.mock("../config/common.config")
describe("sendEmail", () => {
    it("Return email data when request has 201 response", async () => {
        chesApi.post = jest.fn().mockResolvedValue({ status: 201, data: { msgId: "abc-123456" } })
        const emailRes = await emailService.sendEmail("ches token", email2)

        expect(emailRes.status).toEqual(201)
        expect(emailRes.data.msgId).toEqual("abc-123456")
    })

    it("Throw an error when request is bad", async () => {
        chesApi.post = jest.fn().mockRejectedValue({ response: { data: "Bad Request", status: "400" } })
        await expect(emailService.sendEmail("", email2)).rejects.toThrow("400")
    })
})

describe("getStatus", () => {
    it('Return a status of "completed"', async () => {
        chesApi.get = jest.fn().mockResolvedValue({ status: 200, data: { status: "completed" } })
        const result = await emailService.getStatus("ches token", "qwe-234567")

        expect(chesApi.get).toHaveBeenCalledWith(`api/v1/status/qwe-234567`, {
            headers: {
                Authorization: `Bearer ches token`,
                "Content-Type": "application/json"
            }
        })
        expect(result).toEqual("completed")
    })

    it("Throw an error when request is bad", async () => {
        chesApi.get = jest.fn().mockRejectedValue({ response: { data: "Not found", status: "404" } })
        await expect(emailService.getStatus("ches token", "")).rejects.toThrow("404")
    })
})
