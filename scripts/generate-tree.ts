#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ignorePatterns: string[] = [
  "node_modules",
  ".next",
  ".git",
  ".vercel",
  "coverage",
  "out",
  "dist",
  "logs",
  ".cache",
  "build",
  ".turbo",
];

function shouldIgnore(name: string): boolean {
  return ignorePatterns.some((pattern) => name.includes(pattern));
}

function generateTree(
  dir: string,
  prefix = "",
  maxDepth = 10,
  currentDepth = 0,
): string {
  if (currentDepth >= maxDepth) return "";

  let result = "";
  const items = fs.readdirSync(dir).filter((item) => !shouldIgnore(item));

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    const connector = isLast ? "└── " : "├── ";
    const nextPrefix = prefix + (isLast ? "    " : "│   ");

    result += prefix + connector + item;
    if (stats.isDirectory()) {
      result += "/\n";
      if (currentDepth < maxDepth - 1) {
        result += generateTree(
          itemPath,
          nextPrefix,
          maxDepth,
          currentDepth + 1,
        );
      }
    } else {
      result += "\n";
    }
  });

  return result;
}

function main(): void {
  const rootDir = process.cwd();
  const tree = generateTree(rootDir);
  const output = `${rootDir}\n${tree}`;

  fs.writeFileSync("filetree.txt", output);
  console.log("File tree generated in filetree.txt");
}

main();
