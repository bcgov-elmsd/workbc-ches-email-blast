import cron from "node-cron"
import cronService from "../services/cron.service"

jest.mock("node-cron")

describe("startJob", () => {
    it("Schedules a job", () => {
        const task = () => "Task running"
        cron.schedule = jest.fn().mockResolvedValueOnce(task)
        cronService.startJob("* */6 * 8-18 * 1-5", task)

        expect(cron.schedule).toHaveBeenCalledWith("* */6 * 8-18 * 1-5", task, {
            scheduled: true,
            timezone: "America/Vancouver"
        })
    })
})
