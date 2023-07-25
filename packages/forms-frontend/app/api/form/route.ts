/* eslint-disable import/prefer-default-export */
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { getToken, sendEmail } from "../../../utils/email"
import generateHTMLTemplate from "../../../utils/email_templates/shortform"

const prisma = new PrismaClient()
/*
    
*/
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        //  parse the JSON body
        const json = await req.json()
        console.log(json)

        //  check if phone number is valid
        if (json.phone && !/^(\d{3})?-?(\d{3})-?(\d{4})$/.test(json.phone)) throw new Error("Phone number is not in a valid format")

        //  check if email is valid
        if (!json.email) throw new Error("Email is required")
        const existing = await prisma.email.findFirst({
            where: {
                email: json.email
            }
        })
        if (!existing) throw new Error("Email is not part of the trial")

        //  send email to centre
        const token = await getToken()
        const html = generateHTMLTemplate("New WorkBC Client", json.centrename, json)
        await sendEmail(token, html, "New WorkBC Client", [json.centreemail])

        //  on success append a submission record
        const resp = await prisma.submission.create({
            data: {
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
