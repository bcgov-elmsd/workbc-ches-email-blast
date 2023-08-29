import cron from "node-cron"

let job: cron.ScheduledTask

/**
 * @description Schedule a cron job with the specified timing and task
 * @param time cron syntax stating when to run the job
 * @param task function to run during the job
 * @returns {void}
 */
const startJob = (time: string, task: string | ((now: Date | "manual" | "init") => void)): void => {
    job = cron.schedule(time, task, {
        scheduled: true,
        timezone: "America/Vancouver"
    })
}

/**
 * @description Cancel current cron job and don't schedule any more
 * @returns {void}
 */
const stopJob = (): void => {
    if (typeof job !== "undefined") {
        job.stop()
    }
}

export default {
    startJob,
    stopJob
}
