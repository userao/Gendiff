#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/utils.js';

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action(() => {
    const { args } = program;
    const options = program.opts();
    const [filepath1, filepath2] = args;
    const difference = genDiff(filepath1, filepath2, options.format);
    console.log(difference);
  })
  .parse();
