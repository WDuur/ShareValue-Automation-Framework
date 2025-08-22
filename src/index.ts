import { spawn } from "child_process";
import dotenv from "dotenv";

dotenv.config({ path: "./env/.env" });

const retryValue = process.env.RETRY || 0;
const parallelValue = process.env.PARALLEL || 1;

const commonArgs = [
  "./src/features/*.feature",
  "--require-module",
  "ts-node/register",
  "--require",
  "./src/step-definitions/**/**/*.ts",
  "--require",
  "./src/utils/cucumber-timeout.ts",
  "-f",
  "json:./reports/report.json",
  "--format",
  "html:./reports/report.html",
  "--parallel",
  parallelValue.toString(),
  "--retry",
  retryValue.toString(),
  "--tags",
  "not @ignore",
];

const profiles: { [key: string]: string[] } = {
  smoke: [...commonArgs, "--tags", "@smoke"],
  regression: [...commonArgs, "--tags", "@regression"],
  login: [...commonArgs, "--tags", "@login"],
  contactus: [...commonArgs, "--tags", "@contactus"],
  dev: [...commonArgs, "--tags", "@dev"],
  header: [...commonArgs, "--tags", "@header"],
};

const profile = process.argv[2] || "dev";
const args = profiles[profile] || profiles["dev"];

// spawn cucumber-js
const cucumber = spawn("npx", ["cucumber-js", ...args], { stdio: "inherit" });

cucumber.on("close", (code) => {
  console.log(`Cucumber exited with code ${code}`);
});
