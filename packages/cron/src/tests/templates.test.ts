import email1Template from "../templates/email1.template"
import email2Template from "../templates/email2.template"

describe("email1 template is filled in correctly", () => {
    const emailBody = email1Template.email1(
        "8",
        "1",
        encodeURIComponent("Standard short redirect"),
        "Trista Dhami",
        `${process.env.SHORT_FORM}?uid=1&title=${encodeURIComponent("Standard short redirect")}&name=${encodeURIComponent("Trista Dhami")}`
    )

    it("Matomo img tracker", () => {
        expect(emailBody).toEqual(
            expect.stringContaining(
                '<img referrerpolicy="no-referrer-when-downgrade" src="https://elmsd-matomo.apps.silver.devops.gov.bc.ca/matomo.php?idsite=8&amp;rec=1&amp;uid=1&amp;_rcn=Standard%20short%20redirect&amp;action_name=Email" style="border:0" alt="" />'
            )
        )
    })

    it("full name", () => {
        expect(emailBody).toEqual(expect.stringContaining("Dear Trista Dhami,"))
    })

    it("form link", () => {
        expect(emailBody).toEqual(
            expect.stringContaining(`href="${process.env.SHORT_FORM}?uid=1&title=Standard%20short%20redirect&name=Trista%20Dhami"`)
        )
    })
})

describe("email2 template is filled in correctly", () => {
    const emailBody = email2Template.email2(
        "9",
        "2",
        encodeURIComponent("AC short redirect"),
        "Brian Pham",
        `${process.env.SHORT_FORM}?uid=2&title=${encodeURIComponent("AC short redirect")}&name=${encodeURIComponent("Brian Pham")}`
    )

    it("Matomo img tracker", () => {
        expect(emailBody).toEqual(
            expect.stringContaining(
                '<img referrerpolicy="no-referrer-when-downgrade" src="https://elmsd-matomo.apps.silver.devops.gov.bc.ca/matomo.php?idsite=9&amp;rec=1&amp;uid=2&amp;_rcn=AC%20short%20redirect&amp;action_name=Email" style="border:0" alt="" />'
            )
        )
    })

    it("full name", () => {
        expect(emailBody).toEqual(expect.stringContaining("Dear Brian Pham,"))
    })

    it("form link", () => {
        expect(emailBody).toEqual(expect.stringContaining(`href="${process.env.SHORT_FORM}?uid=2&title=AC%20short%20redirect&name=Brian%20Pham"`))
    })
})
