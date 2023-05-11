import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public execute(): void {
    console.log(`
         Программа для подготовки данных для REST API сервера.
         Пример:
             main.js --<${chalk.blue('command')}> [${chalk.greenBright('--arguments')}]
         Команды:
             ${chalk.greenBright('--version')}:                   ${chalk.magenta('# выводит номер версии')}
             ${chalk.greenBright('--help')}:                      ${chalk.magenta('# печатает этот текст')}
             ${chalk.greenBright('--import')} <path>:             ${chalk.magenta('# импортирует данные из TSV')}
             ${chalk.greenBright('--generate')} <n> <path> <url>  ${chalk.magenta('# генерирует произвольное количество тестовых данных')}
   `);
  }
}
