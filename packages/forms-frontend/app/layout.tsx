import "./globals.css"
import React from "react"
import Providers from "@/utils/provider"

export const metadata = {
    title: "Contact WorkBC Centre",
    description: "Short form to contact a WorkBC Centre"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
