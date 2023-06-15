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

// cron job
cron.schedule(
    "* * * * *",
    async () => {
        console.log("running every minute", new Date().toLocaleString())
        console.log(await emailService.getAllEmails())
        console.log(await commonService.getToken())
    },
    {
        scheduled: true,
        timezone: "America/Vancouver"
    }
)

const port = process.env.PORT || "8002"
app.listen(port, () => {
    console.info(`server started at :${port}`)
})
