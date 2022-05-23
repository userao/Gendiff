#!/usr/bin/env node
import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { program } from 'commander';

const dataToText = (code) => {
  const dataArray = JSON.parse(code).data;
  return String.fromCharCode(...dataArray);
};

const genDiff = (path1, path2) => {
  const firstStringified = JSON.stringify(readFileSync(path1));
  const secondStringified = JSON.stringify(readFileSync(path2));
  const firstObjectFromData = JSON.parse(dataToText(firstStringified));
  const secondObjectFromData = JSON.parse(dataToText(secondStringified));
  const allKeys = _.union(Object.keys(firstObjectFromData), Object.keys(secondObjectFromData));
  const sortedKeys = _.sortBy(allKeys);

  const string = sortedKeys.reduce((acc, key) => {
    if (Object.hasOwn(firstObjectFromData, key) && !Object.hasOwn(secondObjectFromData, key)) {
      return `${acc} - ${key}: ${firstObjectFromData[key]}\n`;
    }
    if (Object.hasOwn(secondObjectFromData, key) && !Object.hasOwn(firstObjectFromData, key)) {
      return `${acc} + ${key}: ${secondObjectFromData[key]}\n`;
    }
    if (Object.hasOwn(secondObjectFromData, key) && Object.hasOwn(firstObjectFromData, key)) {
      if (firstObjectFromData[key] !== secondObjectFromData[key]) {
        return `${acc} - ${key}: ${firstObjectFromData[key]}\n + ${key}: ${secondObjectFromData[key]}\n`;
      }
    }
    return `${acc}   ${key}: ${firstObjectFromData[key]}\n`;
  }, '');

  return `{\n${string}}`;
};

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .parse();

const { args } = program;
const [filepath1, filepath2] = args;
console.log(genDiff(filepath1, filepath2));

export default genDiff;
