import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from 'fs';
import genDiff from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const pathToEmpty = getFixturePath('json/emptyObj.json');
const firstPath = getFixturePath('json/recursiveObj1.json');
const secondPath = getFixturePath('yaml/recursiveObj2.yaml');

const stylish = fs.readFileSync(getFixturePath('expectedStylish1'), 'utf-8');
const plain = fs.readFileSync(getFixturePath('expectedPlain1'), 'utf-8');
const json = fs.readFileSync(getFixturePath('expectedJson1'), 'utf-8');
const sameStylish = fs.readFileSync(getFixturePath('expectedStylish2'), 'utf-8');
const withEmptyStylish = fs.readFileSync(getFixturePath('expectedStylish3'), 'utf-8');
const withEmptyPlain = fs.readFileSync(getFixturePath('expectedPlain2'), 'utf-8');
const withEmptyJson = fs.readFileSync(getFixturePath('expectedJson2'), 'utf-8');

test.each([
  {
    formater: 'stylish', expected: stylish, expectedSame: sameStylish, expectedWithEmpty: withEmptyStylish,
  },
  {
    formater: 'plain', expected: plain, expectedSame: '', expectedWithEmpty: withEmptyPlain,
  },
  {
    formater: 'json', expected: json, expectedSame: '[{"added":{},"removed":{},"updated":{}}]', expectedWithEmpty: withEmptyJson,
  },
])('genDiff', ({
  formater, expected, expectedSame, expectedWithEmpty,
}) => {
  expect(genDiff(firstPath, secondPath, formater)).toEqual(expected);
  expect(genDiff(firstPath, firstPath, formater)).toEqual(expectedSame);
  expect(genDiff(firstPath, pathToEmpty, formater)).toEqual(expectedWithEmpty);
  expect(genDiff(pathToEmpty, pathToEmpty, formater)).toEqual('{}');
});
