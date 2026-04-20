#!/usr/bin/env node

'use strict';

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';

import { printHelp } from '../helpers/help';
import { ensureInstallerExecutable, getBash, getInstallerPath, supportedPlatforms } from '../helpers/installer';
import type { CliDeps } from '../types/cli';
import { logError } from '../utils/logger';

export function runCli(args: string[], deps: CliDeps): number {
  if (args.includes('--help') || args.includes('-h')) {
    printHelp(deps.stdout);
    return 0;
  }

  if (!supportedPlatforms.has(deps.platform)) {
    logError(`Unsupported platform: ${deps.platform}. sqlboot supports macOS and Linux.`, deps.stderr);
    return 1;
  }

  const installerPath = getInstallerPath(deps.installerDirname);
  if (!ensureInstallerExecutable(deps, installerPath)) {
    return 1;
  }

  const bash = getBash(deps.os.platform(), deps.stderr);
  if (!bash) {
    return 1;
  }

  const result = deps.spawnSync(bash, [installerPath, '--install', ...args], {
    stdio: 'inherit',
    env: deps.env
  });

  if (result.error) {
    logError(result.error.message, deps.stderr);
    return 1;
  }

  return result.status ?? 1;
}

const defaultDeps: CliDeps = {
  argv: process.argv,
  platform: process.platform,
  env: process.env,
  stdout: process.stdout,
  stderr: process.stderr,
  installerDirname: __dirname,
  fs,
  os,
  spawnSync
};

export function main(deps: CliDeps = defaultDeps): void {
  const status = runCli(deps.argv.slice(2), deps);
  if (status !== 0) {
    process.exit(status);
  }
}

if (require.main === module) {
  main();
}
