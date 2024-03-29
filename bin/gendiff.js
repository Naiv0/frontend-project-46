#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.opts().format));
  })
  .option('-f, --format <type>', 'output format')
  .parse();
