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
    extension: 'json',
  },
  {
    extension: 'yaml',
  },
])('genDiff', ({
  extension,
}) => {
  const firstPath = getFixturePath(`file1.${extension}`);
  const secondPath = getFixturePath(`file2.${extension}`);

  const actualStylish = genDiff(firstPath, secondPath);
  const expectedStylish = readFile('stylishResult');
  expect(actualStylish).toEqual(expectedStylish);

  const actualPlain = genDiff(firstPath, secondPath, 'plain');
  const expectedPlain = readFile('plainResult');
  expect(actualPlain).toEqual(expectedPlain);

  const actualJson = genDiff(firstPath, secondPath, 'json');
  const expectedJson = readFile('jsonResult');
  expect(actualJson).toEqual(expectedJson);
});
