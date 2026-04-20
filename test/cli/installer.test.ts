import { describe, expect, it, vi } from 'vitest';

import { runCli } from '../../src/cli';
import { createCliDeps } from '../helpers/create-cli-deps';

describe('runCli installer checks', () => {
  it('fails when bundled installer missing', () => {
    const deps = createCliDeps({
      fs: {
        existsSync: vi.fn(() => false),
        chmodSync: vi.fn()
      }
    });

    const status = runCli([], deps);

    expect(status).toBe(1);
    expect(deps.stderr.write).toHaveBeenCalledWith('[ERROR] Bundled installer not found: /pkg/sqlboot\n');
    expect(deps.fs.chmodSync).not.toHaveBeenCalled();
    expect(deps.spawnSync).not.toHaveBeenCalled();
  });

  it('fails when chmod throws', () => {
    const deps = createCliDeps({
      fs: {
        existsSync: vi.fn(() => true),
        chmodSync: vi.fn(() => {
          throw new Error('nope');
        })
      }
    });

    const status = runCli([], deps);

    expect(status).toBe(1);
    expect(deps.stderr.write).toHaveBeenCalledWith('[ERROR] Unable to mark installer executable: nope\n');
    expect(deps.spawnSync).not.toHaveBeenCalled();
  });
});
