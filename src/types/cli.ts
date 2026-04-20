import type { SpawnSyncReturns } from 'node:child_process';
import type fs from 'node:fs';
import type os from 'node:os';

export type CliDeps = {
  argv: string[];
  platform: NodeJS.Platform;
  env: NodeJS.ProcessEnv;
  stdout: NodeJS.WriteStream;
  stderr: NodeJS.WriteStream;
  installerDirname: string;
  fs: Pick<typeof fs, 'existsSync' | 'chmodSync'>;
  os: Pick<typeof os, 'platform'>;
  spawnSync: (
    command: string,
    args: string[],
    options: {
      stdio: 'inherit';
      env: NodeJS.ProcessEnv;
    }
  ) => SpawnSyncReturns<Buffer>;
};
