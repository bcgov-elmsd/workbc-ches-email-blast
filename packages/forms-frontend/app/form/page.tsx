"use client"

import React from "react"
import axios, { AxiosResponse } from "axios"
import { useMutation } from "react-query"
import { ToastContainer, toast } from "react-toastify"
import { useRouter, useSearchParams } from "next/navigation"
import "react-toastify/dist/ReactToastify.css"
// Bootstrap CSS
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css"
// Bootstrap Bundle JS
import "@bcgov/bootstrap-theme/dist/js/bootstrap-theme.min"
import "../globals.css"
import centres from "./centres.json"

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { uid, name, centre, email, catchment } = {
        uid: searchParams.get("uid"),
        name: searchParams.get("amp;name"),
        centre: Number(searchParams.get("amp;centre")) || 1,
        email: searchParams.get("amp;email"),
        catchment: searchParams.get("amp;catchment")
    }

    // redirect to home page if no query params are provided
    if (!catchment) {
        router.push("/")
    }

    const [form, setForm] = React.useState({
        uid,
        name: name || "",
        phone: "",
        email: email || "",
        catchment: catchment || "01-ES",
        centreemail:
            centres.data.filter((c: any) => c.AbbreviatedCode === catchment)[0].Storefronts.filter((c) => c.id === centre)[0]?.Email ||
            centres.data[0].Storefronts[0].Email,
        message: "Hello,\nI would like to apply for WorkBC.",
        electronicsignature: false
    })

    const [loading, setLoading] = React.useState(false)

    // react-query mutation logic for form submission flow
    const mutation = useMutation({
        mutationFn: (newSubmission: any) => axios.post("/api/form", newSubmission),
        onSuccess: () => {
            setLoading(false)
            // toast.success("Form submitted successfully")
            router.push("/form/success")
        },
        onError: (e: { response: AxiosResponse }) => {
            setLoading(false)
            let message = e.response.data
            if (e.response.status === 504) {
                message = "Too many concurrent submissions, please try again"
            }
            toast.error(`Error submitting form: ${message}`, { autoClose: 10000 })
        },
        onMutate: () => {
            toast.info(`Submitting responses to WorkBC...`)
            setLoading(true)
        }
    })

    /**
     * @description Submit the form
     * @param e the form event item
     * @returns {void}
     */
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!form.electronicsignature) {
            toast.error("Please sign the form")
            return
        }
        mutation.mutate({
            ...form,
            centrename: centres.data
                .filter((c: any) => c.AbbreviatedCode === form.catchment)[0]
                .Storefronts.filter((c) => c.Email === form.centreemail)[0].name
        })
    }

    return (
        <div className="container pt-4">
            <ToastContainer />
            <h1 className="h1">Contact WorkBC Centre</h1>
            <p>
                <span className="text-danger font-weight-bold">*</span> Denotes a required field
            </p>
            <form className="form-group" onSubmit={onSubmit}>
                <div className="tw-mt-6">
                    <label htmlFor="name" className="font-weight-bold tw-block">
                        Name <span className="text-danger">*</span>
                        <input
                            id="name"
                            className="form-control"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </label>
                </div>

                <div className="tw-mt-6">
                    <label htmlFor="phone" className="font-weight-bold tw-block">
                        <span>Phone</span>
                        <small className="text-secondary tw-ml-2">555-555-5555 or 5551235555</small>
                        <input
                            id="phone"
                            className="form-control"
                            type="tel"
                            pattern="^(\d{3})?-?(\d{3})-?(\d{4})$"
                            minLength={9}
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                    </label>
                </div>

                <div className="tw-mt-6">
                    <label htmlFor="email" className="font-weight-bold tw-block">
                        <span>
                            Email <span className="text-danger">*</span>
                        </span>
                        <small className="text-secondary tw-ml-2">someone@example.com</small>
                        <input id="email" className="form-control" type="text" required disabled value={form.email} />
                    </label>
                </div>

                {/* <div className="tw-mt-6">
                    <label htmlFor="location" className="font-weight-bold tw-block">
                        Nearest WorkBC Centre
                        <select
                            id="location"
                            className="custom-select"
                            onChange={(e) => setForm({ ...form, catchment: e.target.value })}
                            value={form.catchment}
                        >
                            {centres.data.map((ca) => (
                                <option key={ca.CatchmentNo} value={ca.AbbreviatedCode}>
                                    {ca.AbbreviatedCode} {ca.Title}
                                </option>
                            ))}
                        </select>
                        <select
                            id="location"
                            className="custom-select"
                            onChange={(e) => setForm({ ...form, centreemail: e.target.value })}
                            value={form.centreemail}
                        >
                            {centres.data
                                .filter((ce) => ce.AbbreviatedCode === form.catchment)[0]
                                .Storefronts.map((c) => (
                                    <option key={c.id} value={c.Email}>
                                        WorkBC Centre {c.name}
                                    </option>
                                ))}
                        </select>
                    </label>
                </div> */}

                <div className="tw-mt-6">
                    <label htmlFor="message" className="font-weight-bold tw-block">
                        Message
                        <textarea
                            id="message"
                            rows={6}
                            className="form-control"
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            value={form.message}
                        />
                    </label>
                </div>

                <div className="tw-mt-6 h4">
                    <label className="form-check-label tw-leading-6" htmlFor="electronicsignature">
                        <input
                            className="form-check-input tw-ml-0"
                            type="checkbox"
                            id="electronicsignature"
                            required
                            onChange={(e) => setForm({ ...form, electronicsignature: !form.electronicsignature })}
                        />
                        <span className="text-danger tw-inline-block" style={{ marginLeft: "1.5rem" }}>
                            *&nbsp;
                        </span>
                        I acknowledge and understand that by clicking the &quot;submit&quot; button, I am attaching my electronic signature to this
                        form, and that by doing so, I am providing the same consent as I would by manually signing a physical copy of this form to be
                        contacted by a WorkBC centre.
                    </label>
                </div>

                <div className="tw-mt-6 text-center">
                    <button type="submit" className="btn btn-primary" style={{ width: "200px", height: "50px" }} disabled={loading}>
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Submit"}
                    </button>
                </div>
                <div className="tw-mt-6 text-center tw-italic">
                    Once you click &ldquo;Submit,&rdquo; a WorkBC team member will be in touch soon. No further action is required.
                </div>
            </form>
        </div>
    )
}

export default Page
