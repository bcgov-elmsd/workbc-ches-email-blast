/**
 * @jest-environment node
 */

import { NextResponse } from "next/server"
import prismaMock from "../utils/singleton"
import * as emailUtil from "../utils/email"
import { POST } from "../app/api/form/route"

jest.mock("../utils/email", () => ({
    __esModule: true,
    ...jest.requireActual("../utils/email")
}))

const validData = {
    uid: "abc123",
    name: "Trista Dhami",
    phone: "123-456-7890",
    email: "someone@example.com",
    catchment: "01-ES",
    centreemail: "someone@example.net",
    message: "Hello,\nI would like to apply for WorkBC.",
    electronicsignature: true
}

const invalidPhone = {
    uid: "abc123",
    name: "Trista Dhami",
    phone: "123456",
    email: "someone@example.com",
    catchment: "01-ES",
    centreemail: "someone@example.net",
    message: "Hello,\nI would like to apply for WorkBC.",
    electronicsignature: true
}

const noEmail = {
    uid: "abc123",
    name: "Trista Dhami",
    phone: "123-456-7890",
    email: "",
    catchment: "01-ES",
    centreemail: "someone@example.net",
    message: "Hello,\nI would like to apply for WorkBC.",
    electronicsignature: true
}

const invalidEmail = {
    uid: "abc123",
    name: "Trista Dhami",
    phone: "1234567890",
    email: "not-in-the-db@example.com",
    catchment: "01-ES",
    centreemail: "someone@example.net",
    message: "Hello,\nI would like to apply for WorkBC.",
    electronicsignature: true
}

const invalidTemplate = {
    id: 1,
    uid: "abc123",
    email: "someone@example.com",
    template: "AC long",
    status: "completed",
    createdAt: new Date(),
    messageId: "abc-123",
    name: "Trista Dhami",
    catchment: "01-ES"
}

const changedCatchment = {
    uid: "abc123",
    name: "Trista Dhami",
    phone: "123-456-7890",
    email: "someone@example.com",
    catchment: "05-ES",
    centreemail: "someone@example.net",
    message: "Hello,\nI would like to apply for WorkBC.",
    electronicsignature: true
}

const validResp: any = {
    id: 1,
    uid: "abc123",
    email: "someone@example.com",
    createdAt: new Date(),
    action: "Submitted a short form"
}

const email: any = {
    id: 1,
    uid: "abc123",
    email: "someone@example.com",
    template: "AC short",
    status: "completed",
    createdAt: new Date(),
    messageId: "abc-123",
    name: "Trista Dhami",
    catchment: "01-ES"
}

const changedEmail: any = {
    id: 1,
    uid: "abc123",
    email: "test@example.com",
    template: "AC short",
    status: "completed",
    createdAt: new Date(),
    messageId: "abc-123",
    name: "Trista Dhami",
    catchment: "01-ES"
}

const sentEmail: any = {
    status: 201,
    data: { messages: [{ msgId: "qwerty-123456" }] }
}

describe("Validation succeeds", () => {
    let resp: any
    beforeAll(async () => {
        const req: any = {
            json: jest.fn().mockReturnValueOnce(validData)
        }
        const res = new NextResponse()

        prismaMock.submission.findUnique.mockResolvedValueOnce(null)
        prismaMock.email.findFirst.mockResolvedValueOnce(email)

        jest.spyOn(emailUtil, "getToken").mockResolvedValue("token")
        jest.spyOn(emailUtil, "sendEmail").mockResolvedValue(sentEmail)

        prismaMock.submission.create.mockResolvedValueOnce(validResp)

        resp = await POST(req, res)
    })
    it("returns status code of 200", () => {
        expect(resp.status).toBe(200)
    })
})

describe("Validation fails with a 500 error", () => {
    it("throws error if form has been submitted before", async () => {
        const req: any = {
            json: jest.fn().mockReturnValueOnce(validData)
        }
        const res = new NextResponse()

        prismaMock.submission.findUnique.mockResolvedValueOnce(validResp)

        const resp = await POST(req, res)
        expect(resp.status).toBe(500)
    })

    it("throws error if phone number is incorrectly formatted", async () => {
        const req: any = {
            json: jest.fn().mockReturnValueOnce(invalidPhone)
        }
        const res = new NextResponse()

        prismaMock.submission.findUnique.mockResolvedValueOnce(null)

        const resp = await POST(req, res)
        expect(resp.status).toBe(500)
    })

    it("throws error if email isn't provided", async () => {
        const req: any = {
            json: jest.fn().mockReturnValueOnce(noEmail)
        }
        const res = new NextResponse()

        prismaMock.submission.findUnique.mockResolvedValueOnce(null)

        const resp = await POST(req, res)
        expect(resp.status).toBe(500)
    })

    it("throws error if client wasn't sent a short form", async () => {
        const req: any = {
            json: jest.fn().mockReturnValueOnce(validData)
        }
        const res = new NextResponse()

        prismaMock.submission.findUnique.mockResolvedValueOnce(null)
        prismaMock.email.findFirst.mockResolvedValueOnce(invalidTemplate)

        const resp = await POST(req, res)
        expect(resp.status).toBe(500)
    })

    it("throws error if client is not in trial", async () => {
        const req: any = {
            json: jest.fn().mockReturnValueOnce(invalidEmail)
        }
        const res = new NextResponse()

        prismaMock.submission.findUnique.mockResolvedValueOnce(null)
        prismaMock.email.findFirst.mockResolvedValueOnce(null)

        const resp = await POST(req, res)
        expect(resp.status).toBe(500)
    })

    it("throws error if email has changed", async () => {
        const req: any = {
            json: jest.fn().mockReturnValueOnce(validData)
        }
        const res = new NextResponse()

        prismaMock.submission.findUnique.mockResolvedValueOnce(null)
        prismaMock.email.findFirst.mockResolvedValueOnce(changedEmail)

        const resp = await POST(req, res)
        expect(resp.status).toBe(500)
    })

    it("throws error if catchment has changed", async () => {
        const req: any = {
            json: jest.fn().mockReturnValueOnce(changedCatchment)
        }
        const res = new NextResponse()

        prismaMock.submission.findUnique.mockResolvedValueOnce(null)
        prismaMock.email.findFirst.mockResolvedValueOnce(email)

        const resp = await POST(req, res)
        expect(resp.status).toBe(500)
    })
})
