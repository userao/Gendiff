import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'node:path';
import fs from 'fs';
import genDiff from '../src/utils.js';
import parser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Comparing recursive objects', () => {
  test('parser', () => {
    expect(() => parser('', '.html')).toThrow(Error);
  });

  test('json', () => {
    const firstPath = getFixturePath('json/recursiveObj1.json');
    const secondPath = getFixturePath('json/recursiveObj2.json');
    const pathToEmpty = getFixturePath('json/emptyObj.json');

    const actual1 = genDiff(firstPath, secondPath);
    const expectedPath1 = getFixturePath('expectedRecursive1');
    const expected1 = fs.readFileSync(expectedPath1, 'utf-8');
    expect(actual1).toEqual(expected1);

    const actual5 = genDiff(pathToEmpty, pathToEmpty);
    expect(actual5).toEqual('{}');
  });

  test('yaml', () => {
    const firstPath = getFixturePath('yaml/recursiveObj1.yml');
    const secondPath = getFixturePath('yaml/recursiveObj2.yaml');
    const pathToEmpty = getFixturePath('yaml/emptyObj.yaml');

    const actual1 = genDiff(firstPath, secondPath);
    const expectedPath1 = getFixturePath('expectedRecursive1');
    const expected1 = fs.readFileSync(expectedPath1, 'utf-8');
    expect(actual1).toEqual(expected1);

    // const actual2 = genDiff(firstPath, firstPath);
    // const expectedPath2 = getFixturePath('expectedRecursive1');
    // const expected2 = fs.readFileSync(expectedPath2, 'utf-8');
    // expect(actual2).toEqual(expected2);

    const actual5 = genDiff(pathToEmpty, pathToEmpty);
    expect(actual5).toEqual('{}');
  });
});
