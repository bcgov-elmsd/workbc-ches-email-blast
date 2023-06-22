/**
 * @description Fill in the test email template with tailored information
 * @param {string} matomoId ID for use with Matomo analytics
 * @param {string} uid Unique ID of email
 * @param {string} firstname Name of email recipient
 * @param {string} form Link to recipient's form
 * @returns {string} Filled in HTML content of email
 * */
const test = (
    matomoId: string,
    uid: string,
    firstname: string,
    form: string
): string => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
        <!-- Matomo Image Tracker-->
        <img src="https://elmsd-matomo.pathfinder.gov.bc.ca/matomo.php?idsite=${matomoId}&amp;rec=1&amp;action_name=Email&amp&amp;uid=${uid}" style="border:0" alt="" />
        <!-- End Matomo -->
      </head>
      <body>
        <table valign="top" class="bg-light body" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 15px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0px; border-collapse: collapse; margin: 0; padding: 0; border: 0;" bgcolor="#f8f9fa">
          <tbody>
            <tr>
              <td valign="top" style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; margin: 0;" align="left" bgcolor="#f8f9fa">
                
        <table class="container" border="0" cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; border-spacing: 0px; border-collapse: collapse; width: 100%;">
          <tbody>
            <tr>
              <td align="center" style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; margin: 0; padding: 0 16px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; border-spacing: 0px; border-collapse: collapse; width: 100%; max-width: 600px; margin: 0 auto;">
                  <tbody>
                    <tr>
                      <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; margin: 0;" align="left">
          <table class="card " border="0" cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; border-spacing: 0px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 5.5px solid #FCBA19;padding: 9.75pt 9.0pt 9.0pt 9.0pt" bgcolor="#ffffff">
          <tbody>
            <tr>
              <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; width: 100%; margin: 0;" align="left">
                <div>
            <table class="card-body" border="0" cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; border-spacing: 0px; border-collapse: collapse; width: 100%;">
          <tbody>
            <tr>
              <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; width: 100%; margin: 0; padding: 20px;" align="left">
                <div>
              <h5 class="card-title " style="margin-top: 0; margin-bottom: 0; font-weight: 500; color: inherit; vertical-align: baseline; font-size: 20px; line-height: 24px;color:#003366" align="left"><b>Test Template</b></h5>
        <p class="" style="line-height: 24px; font-size: 15px; margin: 0;" align="left">Hello ${firstname},</p>
        <table class="s-3 w-100" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tbody>
            <tr>
              <td height="16" style="border-spacing: 0px; border-collapse: collapse; line-height: 16px; font-size: 16px; width: 100%; height: 16px; margin: 0;" align="left">
              </td>
            </tr>
          </tbody>
        </table>   
              <p class="" style="line-height: 24px; font-size: 15px; margin: 0;" align="left">This is the <strong>test</strong> template.<br></p>
              <table class="card" border="0" cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; border-spacing: 0px; border-collapse: separate !important; border-radius: 4px; width: 100%; overflow: hidden; border: 1px solid #111111;" bgcolor="#ffffff">
          <tbody>
            <tr>
              <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; width: 100%; margin: 0;" align="left">
                <div>
                <table class="card-body" border="0" cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; border-spacing: 0px; border-collapse: collapse; width: 100%;">
          <tbody>
            <tr>
              <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; width: 100%; margin: 0; padding: 20px;" align="left">
                <div>
                  <p class="" style="line-height: 24px; font-size: 15px; margin: 0;" align="left"><b>Let's start the conversation</b></p>   
            <p class="" style="line-height: 24px; font-size: 15px; margin: 0;" align="left"><b>Step 1:</b> <a href="${form}">CLICK HERE</a> to contact your local WorkBC Centre.</p>
          </tbody>
        </table>
      </body>
    </html>`

export default {
    test
}
