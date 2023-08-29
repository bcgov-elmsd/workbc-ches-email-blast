"use client"

// Bootstrap CSS
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css"
// Bootstrap Bundle JS
import "@bcgov/bootstrap-theme/dist/js/bootstrap-theme.min"
import "../../globals.css"

const page = () => (
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="card tw-border-[#e3a82b] tw-border-2  col-md-6 offset-md-3 text-center mt-5">
                    <div className="card-body">
                        <h3 className="card-title tw-text-3xl">Thank you!</h3>
                        <p className="card-text">Someone from your local WorkBC team will be in touch soon.</p>
                        <p className="card-text">You may now close this tab.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default page
