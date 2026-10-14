# Google Sheets & Apps Script Synchronization Guide

This document details the configuration and Apps Script webhook contract for synchronizing Certificate records from Google Sheets to the IqraSec Academy Supabase database.

---

## Certificate Schema

The certificate database and public verification engine use `certificate_id` as the **sole unique lookup identifier**. Visitors to the public verification portal enter only their Certificate ID; `registered_email` is stored in the database for administration and Google Sheets recordkeeping, but is never required from public visitors and never returned in public verification responses.

### Supported Google Sheet Columns & Payload Mapping

| Google Sheet Header | Internal Field Name | Description | Required | Example |
| :--- | :--- | :--- | :--- | :--- |
| `Certificate ID` | `certificate_id` | Unique identifier (UPPERCASE) | **Yes** | `IQSA-26-X7K9M2PQ` |
| `Full Name` | `recipient_name` | Recipient full name (or `intern_name`) | **Yes** | `Abhishek Sharma` |
| `Email address` | `registered_email` | Associated admin email address | Optional | `abhi.graceful@gmail.com` |
| `Choose Domain` | `domain` | Internship domain/track | **Yes** | `Web Application Penetration Testing (WAPT)` |
| `Internship Start Date` | `internship_start_date` | Start date (YYYY-MM-DD or readable) | Optional | `2026-09-10` or `10 September 2026` |
| `Internship End Date` | `internship_end_date` | End date (YYYY-MM-DD or readable) | Optional | `2026-10-10` or `10 October 2026` |
| `Certificate Status` | `status` | Status (`valid` by default) | Optional | `valid` |

> ℹ️ **Date Range & Validation**: Date formats are automatically normalized to `YYYY-MM-DD`. Payloads with invalid date strings or impossible date ranges (start date after end date) are rejected with HTTP 400.
> ℹ️ **Canonical Verification URLs**: Verification URLs (`https://iqrasecacademy.in/verify/<certificate_id>`) are generated dynamically by the application. You do not need to store or pass a `verification_url` column in Google Sheets or the database.

---

## Required Server Environment Variables

Ensure these environment variables are set in your server environment (e.g. Vercel Project Settings):

| Environment Variable | Description |
| :--- | :--- |
| `IQRASEC_CERTIFICATE_WEBHOOK_SECRET` | Secret key used to authenticate webhook requests from Apps Script (Header: `x-iqrasec-webhook-secret`). |
| `NEXT_PUBLIC_SUPABASE_URL` | Base URL of your Supabase instance. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side service role key for database upserts bypassing client RLS. |

---

## Webhook Endpoint

- **URL**: `https://iqrasecacademy.in/api/certificates/sync`
- **Method**: `POST`
- **Header**: `x-iqrasec-webhook-secret: <YOUR_WEBHOOK_SECRET>`
- **Content-Type**: `application/json`

### Supported Payload Format
```json
{
  "certificate_id": "IQSA-26-X7K9M2PQ",
  "recipient_name": "Faijan Ansari",
  "registered_email": "faijan@iqrasecacademy.in",
  "domain": "Web Application Penetration Testing (WAPT)",
  "internship_start_date": "2026-10-15",
  "internship_end_date": "2026-11-15"
}
```

---

## Google Apps Script Template

Add this script to your Google Sheet (**Extensions > Apps Script**).

### Recommended Setup: Store Secret in Script Properties
Go to **Project Settings > Script Properties** in the Apps Script editor and add:
- Property: `IQRASEC_CERTIFICATE_WEBHOOK_SECRET`
- Value: `<Your Secret String>`

```javascript
const WEBHOOK_URL = "https://iqrasecacademy.in/api/certificates/sync";

function getWebhookSecret() {
  const props = PropertiesService.getScriptProperties();
  return props.getProperty("IQRASEC_CERTIFICATE_WEBHOOK_SECRET") || "FALLBACK_SECRET_HERE";
}

function syncSelectedRowToWebsite() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const row = sheet.getActiveRange().getRow();
  
  if (row < 2) {
    SpreadsheetApp.getUi().alert("Please select a data row (row 2 or below) to synchronize.");
    return;
  }
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const rowData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  const payload = {};
  for (let i = 0; i < headers.length; i++) {
    const key = headers[i].toString().trim().toLowerCase().replace(/\s+/g, '_');
    payload[key] = rowData[i];
  }
  
  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "x-iqrasec-webhook-secret": getWebhookSecret()
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  const response = UrlFetchApp.fetch(WEBHOOK_URL, options);
  const responseCode = response.getResponseCode();
  const responseText = response.getContentText();
  
  if (responseCode === 200) {
    SpreadsheetApp.getUi().alert("Sync Successful: Certificate created or updated.");
  } else if (responseCode === 422) {
    SpreadsheetApp.getUi().alert("Sync Blocked: " + responseText);
  } else {
    SpreadsheetApp.getUi().alert("Sync Failed (HTTP " + responseCode + "): " + responseText);
  }
}
```

---

## Security Protections
1. **Revoked Certificate Protection**: The webhook will never overwrite a revoked certificate or change its status to valid.
2. **Timing-Safe Authentication**: The webhook secret header is authenticated using constant-time cryptographic comparison.
3. **No PII in Error Responses**: Database errors and internals are never exposed in API responses.
