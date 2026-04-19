#!/usr/bin/env node

'use strict';

const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const supportedPlatforms = new Set(['darwin', 'linux']);
const platform = process.platform;

function logError(message) {
  process.stderr.write(`[ERROR] ${message}\n`);
}

function printHelp() {
  process.stdout.write(`sqlboot

Installs Oracle SQL*Plus, Docker Oracle XE, rlwrap, and the universal sqlboot command.

Usage:
  npx sqlboot
  sqlboot
  sqlboot --help

After setup:
  sqlboot

Inside SQL*Plus:
  conn system/1234@XE

Environment overrides:
  SQLBOOT_ORACLE_PASSWORD
  SQLBOOT_ORACLE_IMAGE
  SQLBOOT_ORACLE_CONTAINER
  SQLBOOT_ORACLE_PORT
  SQLBOOT_ORACLE_SERVICE
  SQLBOOT_IC_BASIC_URL
  SQLBOOT_IC_SQLPLUS_URL
`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    return;
  }

  if (!supportedPlatforms.has(platform)) {
    logError(`Unsupported platform: ${platform}. sqlboot supports macOS and Linux.`);
    process.exit(1);
  }

  const installerPath = path.resolve(__dirname, '..', 'sqlboot');

  if (!fs.existsSync(installerPath)) {
    logError(`Bundled installer not found: ${installerPath}`);
    process.exit(1);
  }

  try {
    fs.chmodSync(installerPath, 0o755);
  } catch (error) {
    logError(`Unable to mark installer executable: ${error.message}`);
    process.exit(1);
  }

  const bash = os.platform() === 'win32' ? null : 'bash';
  if (!bash) {
    logError('bash is required.');
    process.exit(1);
  }

  const result = spawnSync(bash, [installerPath, '--install', ...args], {
    stdio: 'inherit',
    env: process.env
  });

  if (result.error) {
    logError(result.error.message);
    process.exit(1);
  }

  process.exit(result.status ?? 1);
}

main();
