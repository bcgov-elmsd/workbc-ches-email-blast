import React from "react"

const Form = () => (
    <div className="container">
        <h1 className="h1">Contact WorkBC Centre</h1>
        <p>
            <span className="text-danger font-weight-bold">*</span> Denotes a required field
        </p>
        <form className="form-group">
            <div className="tw-mt-6">
                <label htmlFor="firstname" className="font-weight-bold tw-block">
                    First Name <span className="text-danger">*</span>
                    <input id="firstname" className="form-control" required />
                </label>
            </div>

            <div className="tw-mt-6">
                <label htmlFor="phone" className="font-weight-bold tw-block">
                    <span>Phone</span>
                    <small className="text-secondary tw-ml-2">555-555-5555 or 5551235555</small>
                    <input id="phone" className="form-control" />
                </label>
            </div>

            <div className="tw-mt-6">
                <label htmlFor="email" className="font-weight-bold tw-block">
                    <span>
                        Email <span className="text-danger">*</span>
                    </span>
                    <small className="text-secondary tw-ml-2">someone@example.com</small>
                    <input id="email" className="form-control" required />
                </label>
            </div>

            <div className="tw-mt-6">
                <label htmlFor="location" className="font-weight-bold tw-block">
                    Nearest WorkBC Centre
                    <select id="location" className="custom-select" defaultValue="One">
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </label>
            </div>

            <div className="tw-mt-6">
                <label htmlFor="message" className="font-weight-bold tw-block">
                    Message
                    <textarea id="message" rows={6} className="form-control" defaultValue={"Hello,\nI would like to apply for WorkBC."} />
                </label>
            </div>

            <div className="tw-mt-6 h4">
                <label className="form-check-label tw-leading-6" htmlFor="electronicsignature">
                    <input className="form-check-input tw-ml-0" type="checkbox" value="" id="electronicsignature" required />
                    <span className="text-danger tw-inline-block" style={{ marginLeft: "1.5rem" }}>
                        *&nbsp;
                    </span>
                    I acknowledge and understand that by clicking the &quot;submit&quot; button, I am attaching my electronic signature to this form,
                    and that by doing so, I am providing the same consent as I would by manually signing a physical copy of this form to be contacted
                    by a WorkBC centre.
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

export default Form
