import { execSync } from "child_process";

export function runCommand(command) {
  execSync(command, { stdio: "inherit" });
}
