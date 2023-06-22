import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export default async function POST(request: Request) {
    const req = await request.json()
    const res = await prisma.submission.create({
        data: {
            email: req.body.email
        }
    })

    return NextResponse.json(res, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type"
        }
    })
}
