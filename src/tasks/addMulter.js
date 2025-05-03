import fs from 'fs';
import path from 'path';

export async function addMulter(projectName) {
  const multerSetup = `
// Multer config will go here if needed in future
// Placeholder file to show Multer integration point
`;
  fs.writeFileSync(
    path.join(process.cwd(), 'src', 'middlewares', 'multerSetup.js'),
    multerSetup.trim()
  );
}
