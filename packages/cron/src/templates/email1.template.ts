/**
 * @description Fill in the control ("1 OES" or "1 shortform") email template with tailored information
 * @param {string} matomoId ID for use with Matomo analytics
 * @param {string} uid Unique ID of email
 * @param {string} campaign Name of Matomo campaign
 * @param {string} firstname Name of email recipient
 * @param {string} form Link to recipient's form
 * @returns {string} Filled in HTML content of email
 * */
const email1 = (
    matomoId: string,
    uid: string,
    campaign: string,
    firstname: string,
    form: string
): string => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
 <!-- Edit the code below this line -->
 <body style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 15px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; margin: 0; padding: 0; border: 0;">
    
 <!-- Matomo Image Tracker-->
 <img referrerpolicy="no-referrer-when-downgrade" src="https://elmsd-matomo.apps.silver.devops.gov.bc.ca/matomo.php?idsite=${matomoId}&amp;rec=1&amp;uid=${uid}&amp;_rcn=${campaign}&amp;action_name=Email" style="border:0" alt="" />
 <!-- End Matomo -->
    
  <table valign="top" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 15px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0px; border-collapse: collapse; margin: 0; padding: 0; border: 0;">
  <tbody>
    <tr>
      <td valign="top" style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; margin: 0;">
        
<table cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0px; border-collapse: collapse; width: 100%;">
  <tbody>
    <tr>
      <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; margin: 0; padding: 0 16px;">
        <table cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0px; border-collapse: collapse; width: 100%; max-width: 600px; margin: 0 auto;">
          <tbody>
            <tr>
              <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; margin: 0;">
  <table cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 5.5px solid #FCBA19;padding: 9.75pt 9.0pt 9.0pt 9.0pt" bgcolor="#ffffff">
  <tbody>
    <tr>
      <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; width: 100%; margin: 0;">
        <div>
    <table cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0px; border-collapse: collapse; width: 100%;">
  <tbody>
    <tr>
      <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; width: 100%; margin: 0; padding: 0px 20px 20px 20px;">
        <div>


<p style="line-height: 24px; font-size: 15px; margin: 0;">Hello ${firstname},</p>
<table class="s-3 w-100" cellpadding="0" cellspacing="0" style="width: 100%;">
  <tbody>
    <tr>
      <td height="16" style="border-spacing: 0px; border-collapse: collapse; line-height: 16px; font-size: 16px; width: 100%; height: 16px; margin: 0;">
      </td>
    </tr>
  </tbody>
</table>


<p style="line-height: 24px; font-size: 15px; margin: 0;">We wanted to let you know about Work BC, a provincial government service that connects job seekers and employers.</p>
<table class="s-3 w-100" cellpadding="0" cellspacing="0" style="width: 100%;">
  <tbody>
    <tr>
      <td height="16" style="border-spacing: 0px; border-collapse: collapse; line-height: 16px; font-size: 16px; width: 100%; height: 16px; margin: 0;" align="left">
      </td>
    </tr>
  </tbody>
</table>
<div>
  <p style="line-height: 24px; font-size: 15px; margin: 0; text-align:center;"><b>What services does Work BC offer? </b></p>
  <ul style="list-style: none; padding-left: 0;">
    <li style=" margin: 10px 0;">
      <b>Free Services: </b>We offer skills training, career planning, and personalized, one-on-one job counselling to assist you finding a job.
    </li>
    <li style=" margin: 10px 0;">
      <b>Unlock Benefits: </b>You might also be eligible for exclusive benefits.
    </li>
  </ul>
</div>

      <table class="card" cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0px; border-collapse: separate !important; border-radius: 4px; width: 100%; overflow: hidden;">
  <tbody>
    <tr>
      <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; width: 100%; margin: 0;">
        <div>
        <table class="card-body" cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0px; border-collapse: collapse; width: 100%;">
  <tbody>
    <tr>
      <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; width: 100%; margin: 0; padding: 16px 20px 20px 20px;">
        <div>
          <p style="line-height: 24px; font-size: 15px; margin: 0; text-align: center"><b>Start the conversation</b></p>
<table class="s-2 w-100" cellpadding="0" cellspacing="0" style="width: 100%;">
  <tbody>
    <tr>
      <td height="8" style="border-spacing: 0px; border-collapse: collapse; line-height: 8px; font-size: 8px; width: 100%; height: 8px; margin: 0;">
      </td>
    </tr>
  </tbody>
</table>
          <p style="line-height: 24px; font-size: 15px; margin: 0;"><b>Step 1: </b><a href="${form}">CLICK HERE</a> to contact your local WorkBC Centre. It'll only take 3 minutes.</p>
<table class="s-2 w-100" cellpadding="0" cellspacing="0" style="width: 100%;">
  <tbody>
    <tr>
      <td height="8" style="border-spacing: 0px; border-collapse: collapse; line-height: 8px; font-size: 8px; width: 100%; height: 8px; margin: 0;">
      </td>
    </tr>
  </tbody>
</table>
        <p style="line-height: 24px; font-size: 15px; margin: 0;"><b>Step 2:</b> A team member will be in touch soon. No further action is required.</p>
        </div>
      </td>
    </tr>
  </tbody>
</table>
      </div>
      </td>
    </tr>
  </tbody>
</table>

      <table class="s-2 w-100" cellpadding="0" cellspacing="0" style="width: 100%;">
  <tbody>
    <tr>
      <td height="16" style="border-spacing: 0px; border-collapse: collapse; line-height: 8px; font-size: 8px; width: 100%; height: 16px; margin: 0;" align="left">
      </td>
    </tr>
  </tbody>
</table>

      <p style="line-height: 24px; font-size: 15px; margin: 0;">Sincerely,<br><b>Your WorkBC team<br></b></p>
    </div>
      </td>
    </tr>
  </tbody>
</table>
    <img class="img-fluid" border="0" width="750" height="78" src="${process.env.IMAGES}public-static/workbc/bcgov-banner.png" alt="Canada BC Funding Acknowledgement" style="height: auto; line-height: 100%; outline: none; text-decoration: none; width: 100%; max-width: 100%; border: 0 none;">
  </div>
      </td>
    </tr>
  </tbody>
</table>

              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
      </td>
    </tr>
  </tbody>
</table>
</body>
</html>`

export default {
    email1
}