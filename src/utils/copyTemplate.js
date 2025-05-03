import fs from "fs";

export function copyTemplate(src, dest) {
  fs.copyFileSync(src, dest);
}
