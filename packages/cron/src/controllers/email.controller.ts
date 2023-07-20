import emailService from "../services/email.service"
import commonService from "../services/common.service"
import cronService from "../services/cron.service"

// Keep track of when the scheduled task is running
let inCron = false

/**
 * @description Get and send one email. Task meant to be scheduled by a cron job
 * @returns {Promise<void>}
 */
const getAndSendEmail = async (): Promise<void> => {
    // Ensure current task is complete before next one runs
    if (inCron) {
        return
    }
    inCron = true

    console.log("running every second", new Date().toLocaleString("en-us", { timeZone: "America/Vancouver" }))
    const token = await commonService.getToken()

    // get email and send it (if one exists)
    const recipient = await emailService.getEmailByStatus("pending")
    if (recipient != null) {
        // send email and save msgId
        const res = await emailService.sendEmail(token, recipient)
        const messageId = res.data.messages[0].msgId
        await emailService.setMsgId(recipient.id, messageId)

        // check and update email status to "completed", "failed", "cancelled" or "sent"
        const status = await emailService.getStatus(token, messageId)
        const updatedStatus = ["completed", "failed", "cancelled"].includes(status) ? status : "sent"
        const email = await emailService.updateEmail(recipient.id, updatedStatus)
        console.log(`initial status of email to ${email.email} is ${updatedStatus}`)
    }

    // Check and update status of sent emails
    const sentEmail = await emailService.getEmailByStatus("sent")
    if (sentEmail != null) {
        const { messageId } = sentEmail
        const status = await emailService.getStatus(token, messageId)

        console.log(`new status of "sent" email to ${sentEmail.email} is ${status}`)
        if (["completed", "failed", "cancelled"].includes(status)) {
            await emailService.updateEmail(sentEmail.id, status)
        }
    }

    // End current job and scheduling of future jobs when there are no pending or sent emails
    // all emails will have reached a resolution (completed, failed, or cancelled)
    if (recipient === null && sentEmail === null) {
        console.log("No pending or sent emails. Stopping scheduler")
        cronService.stopJob()
    }

    inCron = false
}

export default {
    getAndSendEmail
}
