/**
 * @description Fill in the "1 longform" or "1 shortform" email template with tailored information
 * @param {string} matomoId ID for use with Matomo analytics
 * @param {string} uid Unique ID of email
 * @param {string} campaign Name of Matomo campaign
 * @param {string} name Full name of email recipient
 * @param {string} form Link to recipient's form
 * @returns {string} Filled in HTML body of email
 * */
const email1 = (
    matomoId: string,
    uid: string,
    campaign: string,
    name: string,
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
    
  <table valign="top" style="color:#000; outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 15px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; border-spacing: 0px; border-collapse: collapse; margin: 0; padding: 0; border: 0;">
  <tbody>
    <tr>
      <td valign="top" style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; margin: 0;">
        
<table cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; border-spacing: 0px; border-collapse: collapse; width: 100%;">
  <tbody>
    <tr>
      <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; margin: 0; padding: 0 16px;">
        <table cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; border-spacing: 0px; border-collapse: collapse; width: 100%; max-width: 600px; margin: 0 auto;">
          <tbody>
            <tr>
              <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; margin: 0;">
                

  <table cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; border-spacing: 0px; border-collapse: separate !important; max-width: 600px; overflow: hidden; border: 6px solid #ffbc00;padding: 0 9.0pt 0 9.0pt">
  <tbody>
    <tr>
      <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; width: 100%; margin: 0;">
        <div>
    <table cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; border-spacing: 0px; border-collapse: collapse; width: 100%;">
  <tbody>
    <tr>
      <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; width: 100%; margin: 0; padding: 0px 20px 0px 20px;">
        <div>          
          <div style="text-align:center; height:120px"><img src="${process.env.IMAGES}/workbc-temp-files/WorkBCEmploymentServices_V_CMYK_pos.jpg" alt="WorkBC Employment Services" style="height:auto; width:250px"></div>

<p style="line-height: 24px; font-size: 15px; margin: 0;">Dear ${name},</p>
<table class="s-3 w-100" cellpadding="0" cellspacing="0" style="width: 100%;">
  <tbody>
    <tr>
      <td height="16" style="border-spacing: 0px; border-collapse: collapse; line-height: 16px; font-size: 16px; width: 100%; height: 16px; margin: 0;">
      </td>
    </tr>
  </tbody>
</table>


<p style="line-height: 24px; font-size: 15px; margin: 0;">We wanted to let you know about WorkBC, a free employment service to support you in your job search.</p>
<table class="s-3 w-100" cellpadding="0" cellspacing="0" style="width: 100%;">
  <tbody>
    <tr>
      <td height="16" style="border-spacing: 0px; border-collapse: collapse; line-height: 16px; font-size: 16px; width: 100%; height: 16px; margin: 0;">
      </td>
    </tr>
  </tbody>
</table>
<div>
  <p style="line-height: 24px; font-size: 15px; margin: 0; text-align:center;"><b>Why use WorkBC?</b></p>
  <ul style="list-style:none; padding:0;">
    <li>
      <b>Free Services: </b>We offer skills training, career planning, and personalized, one-on-one job counselling.
    </li>
    <li style=" margin: 10px 0;">
      <b>Benefits: </b>You may be eligible for financial support for things like transportation, tools, and other supplies.
    </li>
  </ul>
</div>

      <table class="card" cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif;  border-spacing: 0px; border-collapse: separate !important; border-radius: 4px; width: 100%; overflow: hidden;">
  <tbody>
    <tr>
      <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; width: 100%; margin: 0;">
        <div>
        <table class="card-body" cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; border-spacing: 0px; border-collapse: collapse; width: 100%;">
  <tbody>
    <tr>
      <td style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 15px; width: 100%; margin: 0;">
        <div>
          <p style="line-height: 24px; font-size: 15px; margin: 6px 0 0; text-align:center;"><b>Interested? Click below:</b></p>
<table class="s-2 w-100" cellpadding="0" cellspacing="0" style="width: 100%;">
  <tbody>
    <tr>
      <td height="8" style="border-spacing: 0px; border-collapse: collapse; line-height: 8px; font-size: 8px; width: 100%; height: 8px; margin: 0;">
      </td>
    </tr>
  </tbody>
</table>
    <div style="display: flex">
    <a href="${form}" style="text-decoration: none; color: white; flex: 45%; align-self: stretch; border-radius: 12px; background-color:#38598a">
    <p style="line-height: 24px; font-size: 15px; margin: 14px 12px 14px 12px;"><b>YES, I want to connect with WorkBC.</b></p>
    </a>
    <div style="flex: 55%; align-self: stretch;">
    </div>
    </div>
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
      <td height="16" style="border-spacing: 0px; border-collapse: collapse; line-height: 8px; font-size: 8px; width: 100%; height: 16px; margin: 0;">
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
<div style="text-align:center;">
  <img src="${process.env.IMAGES}/workbc-temp-files/Canada-BC-Tagline_LockupMark_CMYK_Pos.jpg" alt="Canada BC Funding Acknowledgement" style="height: auto; width: 250px;">
    </div>
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
