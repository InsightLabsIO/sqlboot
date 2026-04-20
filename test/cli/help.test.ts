import { describe, expect, it } from 'vitest';

import { runCli } from '../../src/cli';
import { createCliDeps } from '../helpers/create-cli-deps';

describe('runCli help', () => {
  it('prints help without spawning installer', () => {
    const deps = createCliDeps();

    const status = runCli(['--help'], deps);

    expect(status).toBe(0);
    expect(deps.stdout.write).toHaveBeenCalledOnce();
    expect(deps.spawnSync).not.toHaveBeenCalled();
  });
});
