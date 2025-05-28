#!/usr/bin/env node

/**
 * This script runs Prettier on the specified files or directories.
 * If no arguments are provided, it defaults to the current directory.
 * Usage: node scripts/prettier.mjs [file1 file2 ...]
 *
 * It exists to replace simpler commands in package.json scripts
 * that may not work as expected both as standalone scripts
 * and with the monorepo's lint-staged config script.
 */

import { execSync } from "node:child_process";

const args = process.argv.slice(2);
const targets = args.length > 0 ? args.join(" ") : ".";

execSync(`npx prettier --write ${targets}`, { stdio: "inherit" });
