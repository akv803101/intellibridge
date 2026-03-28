// IntelliBridge — Bootcamp Application · Google Apps Script
// Deploy: Extensions → Apps Script → paste → Deploy → Web app
// Execute as: Me · Who has access: Anyone
//
// Must match the JSON body from components/ApplyModal.tsx (firstName, lastName, …).

const SHEET_NAME = 'Applications' // Tab name in your Google Sheet
const NOTIFY_EMAIL = 'training@intellibridge.in' // Internal notification (same as BOOTCAMP_INBOX in ApplyModal.tsx)

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    appendToSheet(data)
    sendNotificationEmail(data)
    sendConfirmationEmail(data)
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(
      ContentService.MimeType.JSON,
    )
  } catch (err) {
    Logger.log('Error: ' + err)
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() })).setMimeType(
      ContentService.MimeType.JSON,
    )
  }
}

function doGet() {
  return ContentService.createTextOutput('IntelliBridge Applications API ✅').setMimeType(ContentService.MimeType.TEXT)
}

function appendToSheet(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    const headers = [
      'Timestamp',
      'First Name',
      'Last Name',
      'Full Name',
      'Email',
      'Phone',
      'Track',
      'Profile',
      'Experience',
      'Company / College',
      'Source',
      'Form Type',
    ]
    sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    const hr = sheet.getRange(1, 1, 1, headers.length)
    hr.setBackground('#06080f')
    hr.setFontColor('#00e5c0')
    hr.setFontWeight('bold')
    hr.setFontSize(11)
    sheet.setFrozenRows(1)
    sheet.setColumnWidth(1, 180)
    sheet.setColumnWidth(4, 160)
    sheet.setColumnWidth(5, 210)
  }

  const fullName = ((data.firstName || '') + ' ' + (data.lastName || '')).trim()
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.firstName || '',
    data.lastName || '',
    fullName,
    data.email || '',
    data.phone || '',
    data.track || '',
    data.profile || '',
    data.experience || '',
    data.company || '',
    data.source || '',
    data.formType || 'Application',
  ])
  Logger.log('✅ Application saved: ' + fullName + ' | ' + data.email + ' | ' + data.track)
}

function sendNotificationEmail(data) {
  const fullName = ((data.firstName || '') + ' ' + (data.lastName || '')).trim()
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: '🚀 New Application — ' + fullName + ' (' + (data.track || '—') + ')',
    body: `New bootcamp application received!

━━━━━━━━━━━━━━━━━━━━━━━━━━
Name        : ${fullName}
Email       : ${data.email || '—'}
Phone       : ${data.phone || '—'}
Track       : ${data.track || '—'}
Profile     : ${data.profile || '—'}
Experience  : ${data.experience || '—'}
Company     : ${data.company || '—'}
━━━━━━━━━━━━━━━━━━━━━━━━━━
Source      : ${data.source || 'direct'}
Submitted   : ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

Action: Call within 24 hours.`,
  })
}

function sendConfirmationEmail(data) {
  if (!data.email) return
  const firstName = data.firstName || 'there'
  MailApp.sendEmail({
    to: data.email,
    subject: '✅ Application received — IntelliBridge Data & AI Bootcamp',
    htmlBody: `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
  body{font-family:'Helvetica Neue',Arial,sans-serif;background:#f4f4f4;margin:0;padding:0}
  .wrap{max-width:560px;margin:30px auto;background:#fff;border-radius:10px;overflow:hidden}
  .hdr{background:#06080f;padding:26px 30px}
  .logo{font-size:17px;font-weight:800;color:#fff}
  .logo span{color:#00e5c0}
  .body{padding:30px}
  h2{color:#111;font-size:21px;margin:0 0 12px}
  p{color:#555;font-size:15px;line-height:1.7;margin:0 0 14px}
  .hl{color:#00b87a;font-weight:600}
  .box{background:#f9f9f9;border-radius:8px;padding:16px 20px;margin:18px 0}
  .row{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #eee;font-size:14px}
  .row:last-child{border-bottom:none}
  .lbl{color:#999}.val{color:#222;font-weight:500}
  .steps{background:#edfaf5;border:1px solid #b2e8d3;border-radius:8px;padding:14px 18px;font-size:14px;color:#1a6644;margin:18px 0}
  .ftr{background:#f4f4f4;padding:18px 30px;text-align:center;font-size:12px;color:#aaa}
  .ftr a{color:#00b87a;text-decoration:none}
</style></head><body>
<div class="wrap">
  <div class="hdr"><div class="logo">Intelli<span>Bridge</span></div></div>
  <div class="body">
    <h2>We've got your application, ${firstName}! 🎉</h2>
    <p>Thanks for applying to the <span class="hl">${data.track || 'IntelliBridge'}</span> bootcamp. Here's what you submitted:</p>
    <div class="box">
      <div class="row"><span class="lbl">Track</span><span class="val">${data.track || '—'}</span></div>
      <div class="row"><span class="lbl">Email</span><span class="val">${data.email}</span></div>
      <div class="row"><span class="lbl">Phone</span><span class="val">${data.phone || '—'}</span></div>
      <div class="row"><span class="lbl">Profile</span><span class="val">${data.profile || '—'}</span></div>
      <div class="row"><span class="lbl">Experience</span><span class="val">${data.experience || '—'}</span></div>
    </div>
    <div class="steps">
      <strong>What happens next:</strong><br><br>
      ✓ Our team will call you within <strong>24 hours</strong><br>
      ✓ We'll answer all your questions about the track<br>
      ✓ You'll get a free trial class before committing<br>
      ✓ EMI options available — no cost to apply
    </div>
    <p>In the meantime, feel free to reply to this email or call us at <strong>+91 63601 56124</strong>.</p>
    <p style="color:#999;font-size:13px">Questions? <a href="mailto:training@intellibridge.in" style="color:#00b87a">training@intellibridge.in</a></p>
  </div>
  <div class="ftr">© 2026 IntelliBridge · <a href="https://intellibridge.in">intellibridge.in</a></div>
</div></body></html>`,
  })
}
