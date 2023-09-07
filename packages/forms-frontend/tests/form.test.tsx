/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"
import Page from "../app/form/page"
import Providers from "../utils/provider"

const push = jest.fn()
jest.mock("next/navigation", () => ({
    ...jest.requireActual("next/navigation"),
    useRouter: jest.fn(),
    useSearchParams: jest.fn()
}))

describe("Initial form values are correct", () => {
    let fields: any

    beforeEach(() => {
        ;(useSearchParams as jest.Mock).mockReturnValue(
            new URLSearchParams(
                "?uid=shortformtest&amp;title=AC%20short%20redirect&amp;name=Trista%20Dhami&amp;email=trista.dhami%40gov.bc.ca&amp;catchment=22-ES"
            )
        )
        render(
            <Providers>
                <Page />
            </Providers>
        )
        fields = screen.getAllByRole("textbox")
    })

    it("auto-fills name", () => {
        expect(fields[0]).toHaveValue("Trista Dhami")
    })

    it("leaves phone empty", () => {
        expect(fields[1]).toHaveValue("")
    })

    it("auto-fills and disables email", () => {
        expect(fields[2]).toHaveValue("trista.dhami@gov.bc.ca")
        expect(fields[2]).toBeDisabled()
    })

    it("auto-fills message", () => {
        expect(fields[3]).toHaveValue("Hello,\nI would like to apply for WorkBC.")
    })

    it("leaves electronic signaure unckecked", () => {
        expect(screen.getByRole("checkbox")).not.toBeChecked()
    })

    it("renders submit button", () => {
        expect(screen.getByRole("button")).toBeVisible()
    })
})

describe("Redirects to homepage when catchment URL parameter is missing", () => {
    beforeAll(() => {
        ;(useSearchParams as jest.Mock).mockReturnValue(
            new URLSearchParams("?uid=shortformtest&amp;title=AC%20short%20redirect&amp;name=Trista%20Dhami&amp;email=trista.dhami%40gov.bc.ca")
        )
        ;(useRouter as jest.Mock).mockImplementation(() => ({
            push
        }))
    })

    it("redirects to home page", () => {
        // since useRouter.push is mocked the component continues to render after
        // it's called which causes an error, so don't show error in console
        console.error = () => {
            console.log("Component error")
        }

        try {
            render(
                <Providers>
                    <Page />
                </Providers>
            )
        } catch (e) {
            console.error()
        }
        expect(push).toHaveBeenCalledWith("/")
    })
})
