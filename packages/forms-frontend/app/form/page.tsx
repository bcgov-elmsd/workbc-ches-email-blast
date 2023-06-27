"use client"

import React from "react"
// import { useSearchParams } from "next/navigation"

const centres = [
    { name: "Centre 1", id: "1", email: "trista.dhami@gov.bc.ca" },
    { name: "Centre 2", id: "2", email: "brian.d.pham@gov.bc.ca" },
    { name: "Centre 3", id: "3", email: "phamdinhnguyen338@gmail.com" },
    { name: "Centre 4", id: "4", email: "nguyenphamswork@gmail.com" },
    { name: "Centre 5", id: "5", email: "t.dhami.9@outlook.com" },
    { name: "Centre 6", id: "6", email: "triceratop43@gmail.com" },
    { name: "Centre 7", id: "7", email: "trista@dhami.com" }
]

const Page = ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const { name, centre, email } = searchParams

    const [form, setForm] = React.useState({
        name: name || "",
        phone: "",
        email: email || "",
        centreemail: centre ? centres.filter((c) => c.id === centre)[0].email : centres[0].email,
        message: "",
        electronicsignature: false
    })

    React.useEffect(() => {
        console.log("form", form)
    }, [form])

    return (
        <div className="container">
            <h1 className="h1">Contact WorkBC Centre</h1>
            <p>
                <span className="text-danger font-weight-bold">*</span> Denotes a required field
            </p>
            <form className="form-group">
                <div className="tw-mt-6">
                    <label htmlFor="name" className="font-weight-bold tw-block">
                        First Name <span className="text-danger">*</span>
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
                        <input id="phone" className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </label>
                </div>

                <div className="tw-mt-6">
                    <label htmlFor="email" className="font-weight-bold tw-block">
                        <span>
                            Email <span className="text-danger">*</span>
                        </span>
                        <small className="text-secondary tw-ml-2">someone@example.com</small>
                        <input
                            id="email"
                            className="form-control"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </label>
                </div>

                <div className="tw-mt-6">
                    <label htmlFor="location" className="font-weight-bold tw-block">
                        Nearest WorkBC Centre
                        <select
                            id="location"
                            className="custom-select"
                            onChange={(e) => setForm({ ...form, centreemail: e.target.value })}
                            value={form.centreemail}
                        >
                            {centres.map((c) => (
                                <option key={c.email} value={c.email}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

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
                    <button type="submit" className="btn btn-primary" style={{ width: "200px", height: "50px" }}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Page
