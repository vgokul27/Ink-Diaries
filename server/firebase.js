import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceJson;

if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  try {
    // Parse as JSON directly (Render env variable contains JSON string)
    serviceJson = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  } catch {
    // Fallback: treat it as a file path (local dev)
    serviceJson = JSON.parse(readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf8"));
  }
} else {
  // Local dev fallback
  serviceJson = JSON.parse(readFileSync(path.join(__dirname, "serviceAccountKey.json"), "utf8"));
}

admin.initializeApp({
  credential: admin.credential.cert(serviceJson)
});

export default admin;
