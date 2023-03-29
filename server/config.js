import * as dotenv from "dotenv";
/*
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
*/

//dotenv.config({ path: new URL("./.env", import.meta.url) });

// .env file should be in the parent directory
// If it isn't check the current working directory
dotenv.config({ path: "../.env" || "./.env" });

export default {
  jwt: {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    secret: process.env.JWT_SECRET,
  },
  mongoURL: process.env.MONGO_URL || "mongodb://127.0.0.1/StaffEase",
  port: process.env.PORT || 4000,
  saltRounds: process.env.SALT_ROUNDS || 10,
};
