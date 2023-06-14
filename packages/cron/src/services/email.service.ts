import prisma from "../db/config"

const getAllEmails = async () =>
    prisma.email.findMany({
        where: {
            status: "pending"
        },
        take: 50
    })

const updateEmail = async (id: number, status: string) =>
    prisma.email.update({
        where: {
            id
        },
        data: {
            status
        }
    })

export default {
    getAllEmails,
    updateEmail
}
