import got from 'got';
import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import OfferGenerator from '../../modules/offer-generator/offer-generator.js';
import TsvFileWriter from '../file-writer/tsv-file-writer.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;
  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number(count);

    if (!offerCount) {
      console.log(chalk.red('Need write correct count'));
      return;
    }

    if (!filepath) {
      console.log(chalk.red('Please add path for generated file'));
      return;
    }

    try {
      this.initialData = await got.get(url).json();
    } catch {
      console.log(`Can't fetch data from ${url}`);
      return;
    }

    const offerGenerator = new OfferGenerator(this.initialData);
    const tsvFileWriter = new TsvFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(offerGenerator.generate());
    }

    console.log(chalk.green(`File ${filepath} was created!`));
  }
}
