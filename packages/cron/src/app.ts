import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cron from "node-cron"
import "dotenv/config"

import emailService from "./services/email.service"
import commonService from "./services/common.service"

const corsOptions = {
    origin: process.env.ORIGIN_URL || process.env.OPENSHIFT_NODEJS_ORIGIN_URL || "http://localhost:3001",
    credentials: true,
    optionsSuccessStatus: 200
}

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("[:date] :method :url :status :res[content-length] - :remote-addr - :response-time ms"))
app.set("trust proxy", "loopback, linklocal, uniquelocal")
app.use(cors(corsOptions))
app.use(helmet())

// health check
app.get("/", (req: Express.Request, res: any) => {
    res.send("Hello World!")
})

// Ensure current cron job is complete before starting next one
let inCron = false

/**
 * @description Get and send one email. Meant to be scheduled by a cron job
 * @returns {Promise<void>}
 */
const getAndSendEmail = async (): Promise<void> => {
    if (inCron) {
        return
    }
    inCron = true

    console.log("running every second", new Date().toLocaleString())
    const token = await commonService.getToken()

    // get and send one email
    const recipient = await emailService.getEmail()
    if (recipient != null) {
        const res = await emailService.sendEmail(token, recipient.email)
        const email = await emailService.updateEmail(recipient.id, "sent")
        console.log(`email to ${email.email} sent with a response of`, res.data)
    } else {
        // End current job and scheduling of future jobs when there are no more pending emails
        console.log("No pending emails. Stopping scheduler")
        emailJob.stop()
    }
    inCron = false
}

// Cron job to schedule email delivery
// between 8AM to 6PM PST, every 6 minutes send 60 emails
// Note: maximum recommended usage is 60 emails per minute
const emailJob = cron.schedule("* */6 * 8-18 * 1-5", getAndSendEmail, {
    scheduled: true,
    timezone: "America/Vancouver"
})

const port = process.env.PORT || "8002"
app.listen(port, () => {
    console.info(`server started at :${port}`)
})
