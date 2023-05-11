import path from 'node:path';
import { readFileSync } from 'node:fs';
import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';

  private readVersion(): string {
    const packageJsonContent = readFileSync(path.resolve('./package.json'), 'utf-8');
    const parsedContent = JSON.parse(packageJsonContent);
    return parsedContent.version;
  }

  public execute(): void {
    const version = this.readVersion();
    console.log(chalk.italic.greenBright(version));
  }
}
