export function logError(message: string, stderr: NodeJS.WriteStream): void {
  stderr.write(`[ERROR] ${message}\n`);
}
