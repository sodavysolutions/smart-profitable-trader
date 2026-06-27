/**
 * Run: node scripts/extract-sheets-key.mjs /path/to/service-account.json
 * Then paste the GOOGLE_SHEETS_PRIVATE_KEY value into Vercel.
 */

import { readFileSync } from "fs";

const jsonPath = process.argv[2];
if (!jsonPath) {
  console.error("Usage: node scripts/extract-sheets-key.mjs /path/to/service-account.json");
  process.exit(1);
}

const json = JSON.parse(readFileSync(jsonPath, "utf8"));
const privateKey = json.private_key;

if (!privateKey) {
  console.error("No private_key found in the JSON file.");
  process.exit(1);
}

// Encode to base64 — eliminates all newline/escaping problems in Vercel
const b64 = Buffer.from(privateKey).toString("base64");

console.log("\n✅ Add this to Vercel as GOOGLE_SHEETS_PRIVATE_KEY:");
console.log("(copy the entire line below — no spaces before or after)\n");
console.log(b64);
console.log("\n✅ Other values:");
console.log("GOOGLE_SHEETS_CLIENT_EMAIL  =", json.client_email);
console.log("GOOGLE_SHEETS_PROJECT_ID    =", json.project_id);
console.log("GOOGLE_SHEETS_PRIVATE_KEY_ID=", json.private_key_id);
