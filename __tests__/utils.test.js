import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from 'fs';
import genDiff from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => {
  const pathToFile = getFixturePath(filename);
  return fs.readFileSync(pathToFile, 'utf-8');
};

test.each([
  {
    formatter: 'stylish', expectedSame: readFile('stylishResultSame'),
  },
  {
    formatter: 'plain', expectedSame: '',
  },
  {
    formatter: 'json', expectedSame: '[{"added":{},"removed":{},"updated":{}}]',
  },
])('genDiff', ({
  formatter, expectedSame,
}) => {
  const firstPath = getFixturePath('recursive1.json');
  const secondPath = getFixturePath('recursive2.yaml');
  const expected = readFile(`${formatter}Result`);

  expect(genDiff(firstPath, secondPath, formatter)).toEqual(expected);
  expect(genDiff(firstPath, firstPath, formatter)).toEqual(expectedSame);
});
