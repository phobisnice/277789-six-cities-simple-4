#!/usr/bin/env node
import 'reflect-metadata';
import CLIApplication from './app/cli.js';
import GenerateCommand from './core/cli-command/generate.command.js';
import HelpCommand from './core/cli-command/help.command.js';
import ImportCommand from './core/cli-command/import.command.js';
import VersionCommand from './core/cli-command/version.command.js';

const cliManager = new CLIApplication();
cliManager.registerCommands([
  new GenerateCommand, new HelpCommand, new ImportCommand, new VersionCommand,
]);
cliManager.processCommand(process.argv);
