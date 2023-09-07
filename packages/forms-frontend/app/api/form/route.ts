/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from "next/server"
import { getToken, sendEmail } from "../../../utils/email"
import generateHTMLTemplate from "../../../utils/email_templates/shortform"
import prisma from "../../../utils/client"

/**
 * @description Endpoint for sending the email to WorkBC centres through CHES
 * @param {NextRequest} req
 * @param {NextResponse} res
 */
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        //  parse the JSON body
        const json = await req.json()

        // check if user submitted a form before
        const submission = await prisma.submission.findUnique({
            where: {
                uid: json.uid
            }
        })
        if (submission) throw new Error("You have already submitted this form")

        //  check if phone number is valid
        if (json.phone && !/^(\d{3})?-?(\d{3})-?(\d{4})$/.test(json.phone)) throw new Error("Phone number is not in a valid format")

        //  check if email is valid
        if (!json.email) throw new Error("Email is required")

        // check if user is allowed to submit a form
        const existing = await prisma.email.findFirst({
            where: {
                uid: json.uid
            }
        })
        if (!existing || !existing.template.includes("short")) throw new Error("You are not eligible to submit a form")

        // ensure email and catchment are unchanged
        if (existing.email !== json.email) throw new Error("Email is not part of the trial")
        if (existing.catchment !== json.catchment) throw new Error(`${json.catchment} is not your catchment`)

        //  send email to centre
        const token = await getToken()
        const html = generateHTMLTemplate("New WorkBC Client", json.centrename, json)
        await sendEmail(token, html, "New WorkBC Client", [json.centreemail])

        //  on success append a submission record
        const resp = await prisma.submission.create({
            data: {
                uid: json.uid,
                email: json.email,
                action: "Submitted a Short Form"
            }
        })
        return NextResponse.json(resp, {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json(error.message, {
            status: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        })
    }
}
