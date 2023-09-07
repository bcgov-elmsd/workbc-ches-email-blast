/**
 * @description Fill in the "Reminder" email template with tailored information
 * @param {string} matomoId ID for use with Matomo analytics
 * @param {string} uid Unique ID of email
 * @param {string} campaign Name of Matomo campaign
 * @param {string} name Full name of email recipient
 * @param {string} form Link to recipient's form
 * @returns {string} Filled in HTML body of email
 * */
const reminderEmail = (matomoId: string, uid: string, campaign: string, name: string, form: string): string => `<!DOCTYPE html>
<html>
<head>
</head>
<body>
<!-- Matomo Image Tracker-->
<img referrerpolicy="no-referrer-when-downgrade" src="https://elmsd-matomo.apps.silver.devops.gov.bc.ca/matomo.php?idsite=${matomoId}&amp;rec=1&amp;uid=${uid}&amp;_rcn=${campaign}&amp;action_name=Email" style="border:0" alt="" />
<!-- End Matomo -->
<div>
  <h1>Reminder Email</h1>
  <p>to be finalized</p>
</div>
</body>
</html>`

export default {
    reminderEmail
}
