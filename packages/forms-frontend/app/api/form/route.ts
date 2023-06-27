/* eslint-disable import/prefer-default-export */
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const json = await req.json()
        if (!json.email) throw new Error("Email is required")
        const existing = await prisma.email.findUnique({
            where: {
                email: json.email
            }
        })
        if (!existing) throw new Error("Email is not part of the trial")
        const resp = await prisma.submission.create({
            data: {
                email: json.email
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