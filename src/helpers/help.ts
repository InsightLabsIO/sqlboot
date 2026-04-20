import { HELP_TEXT } from '../constants/cli';

export function printHelp(stdout: NodeJS.WriteStream): void {
  stdout.write(HELP_TEXT);
}
