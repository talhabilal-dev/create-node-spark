import { promises as fs } from 'fs';
import path from "path";

import { existsSync, lstatSync } from "fs";

const createDirectory = async (dirPath) => {
  if (existsSync(dirPath)) {
    throw new Error(`Directory already exists at ${dirPath}`);
  }

  try {
    await fs.mkdir(dirPath, { recursive: false });
  } catch (err) {
    throw new Error(`Error creating directory ${dirPath}: ${err.message}`);
  }
};


const createMultipleDirectories = async (dirPaths) => {
  await Promise.all(
    dirPaths.map(async (dir) => {
      try {
        await createDirectory(dir);
      } catch (err) {
        throw new Error(`Error creating directory ${dir}: ${err.message}`);
      }
    })
  );
};


const writeFile = async (filePath, data, encoding) => {

  try {
    const dir = path.dirname(filePath);
    if (!existsSync(dir)) {
      await fs.mkdir(dir, { recursive: true });
    }
    const content = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;
    await fs.writeFile(filePath, content);
  } catch (err) {
    throw new Error(`Error writing file ${filePath}: ${err.message}`);
  }


}

/**
 * Reads a file's content
 * @param {string} filePath - Path to the file
 * @returns {Promise<string>} - File content
 */
const readFile = async (filePath, encoding = 'utf8') => {
  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  try {
    return fs.readFile(filePath, encoding);
  } catch (err) {
    throw new Error(`Error reading file ${filePath}: ${err.message}`);
  }
}

/**
 * Copies a file from source to destination
 * @param {string} sourcePath - Source file path
 * @param {string} destPath - Destination file path
 * @returns {Promise<void>}
 */
function copyFile(sourcePath, destPath) {
  return new Promise((resolve, reject) => {
    fs.copyFile(sourcePath, destPath, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

/**
 * Copies a directory recursively
 * @param {string} sourceDir - Source directory path
 * @param {string} destDir - Destination directory path
 * @returns {Promise<void>}
 */
async function copyDirectory(sourceDir, destDir) {
  // Create destination directory
  await createDirectory(destDir);

  // Read source directory
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  // Process each entry
  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy directories
      await copyDirectory(sourcePath, destPath);
    } else {
      // Copy files
      await copyFile(sourcePath, destPath);
    }
  }
}

export { createDirectory, writeFile, readFile, copyFile, copyDirectory , createMultipleDirectories};
