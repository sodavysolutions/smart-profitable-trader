import { readFileSync, writeFileSync } from "fs";
const json = JSON.parse(readFileSync(process.argv[2], "utf8"));
const b64 = Buffer.from(json.private_key).toString("base64");
writeFileSync("/tmp/sheets-key.txt", b64);
console.log("Done! Key saved to /tmp/sheets-key.txt");
