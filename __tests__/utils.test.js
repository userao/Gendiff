import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => {
  const pathToFile = getFixturePath(filename);
  return fs.readFileSync(pathToFile, 'utf-8');
};

test.each([
  {
    formatter: 'stylish', format1: 'json', format2: 'yaml',
  },
  {
    formatter: 'plain', format1: 'yaml', format2: 'yaml',
  },
  {
    formatter: 'json', format1: 'json', format2: 'json',
  },
])('genDiff', ({
  formatter, format1, format2,
}) => {
  const firstPath = getFixturePath(`file1.${format1}`);
  const secondPath = getFixturePath(`file2.${format2}`);
  const expected = readFile(`${formatter}Result`);

  expect(genDiff(firstPath, secondPath, formatter)).toEqual(expected);
});
