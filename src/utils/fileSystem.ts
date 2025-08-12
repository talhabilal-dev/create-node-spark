import { promises as fs } from 'fs';
import path from "path";

import { existsSync, lstatSync } from "fs";

const createDirectory = async (dirPath: string): Promise<void> => {
    if (existsSync(dirPath)) {
        throw new Error(`Directory already exists at ${dirPath}`);
    }

    try {
        await fs.mkdir(dirPath, { recursive: false });
    } catch (err: any) {
        throw new Error(`Error creating directory ${dirPath}: ${err.message}`);
    }
};


const createMultipleDirectories = async (dirPaths: string[]): Promise<void> => {
    await Promise.all(
        dirPaths.map(async (dir) => {
            try {
                await createDirectory(dir);
            } catch (err: any) {
                throw new Error(`Error creating directory ${dir}: ${err.message}`);
            }
        })
    );
};


const writeFile = async (filePath: string, data: string | object, encoding?: BufferEncoding): Promise<void> => {

    try {
        const dir = path.dirname(filePath);
        if (!existsSync(dir)) {
            await fs.mkdir(dir, { recursive: true });
        }
        const content = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;
        await fs.writeFile(filePath, content);
    } catch (err: any) {
        throw new Error(`Error writing file ${filePath}: ${err.message}`);
    }


}

/**
 * Reads a file's content
 * @param {string} filePath - Path to the file
 * @returns {Promise<string>} - File content
 */
const readFile = async (filePath: string, encoding: BufferEncoding = 'utf8'): Promise<string> => {
    if (!existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }
    try {
        return await fs.readFile(filePath, encoding);
    } catch (err: any) {
        throw new Error(`Error reading file ${filePath}: ${err.message}`);
    }
}

/**
 * Copies a file from source to destination
 * @param {string} sourcePath - Source file path
 * @param {string} destPath - Destination file path
 * @returns {Promise<void>}
 */
async function copyFile(sourcePath: string, destPath: string): Promise<void> {
    try {
        await fs.copyFile(sourcePath, destPath);
    } catch (err: any) {
        throw new Error(`Error copying file from ${sourcePath} to ${destPath}: ${err.message}`);
    }
}

/**
 * Copies a directory recursively
 * @param {string} sourceDir - Source directory path
 * @param {string} destDir - Destination directory path
 * @returns {Promise<void>}
 */
async function copyDirectory(sourceDir: string, destDir: string): Promise<void> {
    // Create destination directory
    await createDirectory(destDir);

    // Read source directory
    const entries = await fs.readdir(sourceDir, { withFileTypes: true });

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

export { createDirectory, writeFile, readFile, copyFile, copyDirectory, createMultipleDirectories };