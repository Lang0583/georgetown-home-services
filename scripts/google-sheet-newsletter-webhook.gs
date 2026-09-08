/**
 * Georgetown Home Services — newsletter → Google Sheet (free durable storage)
 *
 * SETUP (about 5 minutes)
 * 1. Create a Google Sheet named "GHS Newsletter Signups".
 * 2. Row 1 headers (exact): createdAt | email | name | guideChoice | source
 * 3. Extensions → Apps Script. Delete any stub code. Paste THIS entire file.
 * 4. Deploy → New deployment → Type: Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 5. Copy the Web app URL.
 * 6. Vercel → Project → Settings → Environment Variables
 *      NEWSLETTER_WEBHOOK_URL = <that Web app URL>
 * 7. Redeploy. Submit a test email on the homepage. Confirm a new row in the Sheet.
 *
 * Security: the Web app URL is a secret. Do not commit it. Rotate by redeploying
 * Apps Script if it leaks. Optional: set WEBHOOK_SHARED_SECRET below and send
 * the same value as header X-GHS-Webhook-Secret from Vercel (advanced).
 */

var SHEET_NAME = "Sheet1"; // change if your tab is renamed
var WEBHOOK_SHARED_SECRET = ""; // optional; leave blank to skip

function doPost(e) {
  try {
    if (WEBHOOK_SHARED_SECRET) {
      var incoming = (e && e.parameter && e.parameter.secret) || "";
      if (e && e.postData && e.postData.type === "application/json") {
        // Header checks are limited in Apps Script web apps; prefer query ?secret=
      }
      var qSecret = e && e.parameter ? e.parameter.secret : "";
      if (qSecret !== WEBHOOK_SHARED_SECRET) {
        return jsonOut({ ok: false, error: "unauthorized" }, 401);
      }
    }

    var body = {};
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }

    var email = String(body.email || "").trim();
    if (!email || email.indexOf("@") === -1) {
      return jsonOut({ ok: false, error: "email required" }, 400);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    sheet.appendRow([
      String(body.createdAt || new Date().toISOString()),
      email,
      String(body.name || ""),
      String(body.guideChoice || ""),
      String(body.source || ""),
    ]);

    return jsonOut({ ok: true });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) }, 500);
  }
}

function jsonOut(obj, status) {
  // Apps Script web apps always return 200 unless you throw; body carries ok flag.
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/** Manual smoke test from the Apps Script editor: Run → testAppend */
function testAppend() {
  var fake = {
    postData: {
      contents: JSON.stringify({
        createdAt: new Date().toISOString(),
        email: "test@example.com",
        name: "Test",
        guideChoice: "seasonal_checklist",
        source: "apps-script-test",
      }),
    },
  };
  doPost(fake);
}
