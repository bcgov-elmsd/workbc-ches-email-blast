import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import "dotenv/config"

import cronService from "./services/cron.service"
import emailController from "./controllers/email.controller"

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

// Cron job to schedule email delivery
// between 8AM to 6PM PST, every 5 minutes, send 60 emails
// Note: maximum recommended usage is 60 emails per minute
cronService.startJob("* */5 * * * 1-5", emailController.getAndSendEmail)

const port = process.env.PORT || "8002"
app.listen(port, () => {
    console.info(`server started at :${port}`)
})
