This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure

How the project is set up

```
.
├── app
│   ├── api
│   │   └── form - form api for sending emails
│   └── form - main form page
│       ├── refusal - refusal page
│       └── success - successful form submission page
├── prisma - prisma main folder
├── public
└── utils
    └── email_templates - email templates generator
```

## Pages

### /form

Main landing form, for accessing this page, you will need the following query params:

- amp;name
- amp;email
- amp;catchment

The form will then auto fill with the provided params.

### /form/success

On successfull submission users will be redirected to this page.

### /form/refusal

Landing page for people pressing on the refusal button on the email template.

### /api/form

POST route
On a post request to the API route the following actions happen: 

- A database check of the email exists in the main Emails database
- If it does then send an email to the specified WorkBC Centre with their entered information
- If not then a toast appears with the error code