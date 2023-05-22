import chalk from 'chalk';
import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import { createOffer, getErrorMessage } from '../helpers/index.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private onLine(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
  }

  public async execute(filename: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      fileReader.read();
    } catch (err) {
      console.log(chalk.red(`Не удалось импортировать данные из файла по причине: «${getErrorMessage(err)}»`));
    }
  }
}
