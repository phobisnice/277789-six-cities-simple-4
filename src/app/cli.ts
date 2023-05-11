import { CliCommandInterface } from '../core/cli-command/cli-command.interface';

type ParseCommand = {
  [key: string]: string[];
}
export default class CLIApplication {
  private commands: {[propertyName: string]: CliCommandInterface} = {};
  private defaultCommand = '--help';

  private parseCommand(cliArguments: string[]): ParseCommand {
    const parseCommand: ParseCommand = {};
    let command = '';

    return cliArguments.reduce((acc, item) => {
      if (item.startsWith('--')) {
        acc[item] = [];
        command = item;
      } else if (command && item) {
        acc[command].push(item);
      }
      return acc;
    }, parseCommand);
  }

  public getCommand(commandName: string): CliCommandInterface {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }

  public registerCommands(commandList: CliCommandInterface[]): void {
    commandList.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, this.commands);
  }
}
