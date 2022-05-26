import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'node:path';
import fs from 'fs';
import genDiff from '../src/utils.js';

describe('Comparing plain objects', () => {
  test('json', () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

    const firstPath = getFixturePath('plainObj1.json');
    const secondPath = getFixturePath('plainObj2.json');
    const pathToEmpty = getFixturePath('emptyObj.json');

    const actual1 = genDiff(firstPath, secondPath);
    const expectedPath1 = getFixturePath('expectedPlainJson1');
    const expected1 = fs.readFileSync(expectedPath1, 'utf-8');
    expect(actual1).toEqual(expected1);

    const actual2 = genDiff(firstPath, pathToEmpty);
    const expectedPath2 = getFixturePath('expectedPlainJson2');
    const expected2 = fs.readFileSync(expectedPath2, 'utf-8');
    expect(actual2).toEqual(expected2);

    const actual3 = genDiff(pathToEmpty, firstPath);
    const expectedPath3 = getFixturePath('expectedPlainJson3');
    const expected3 = fs.readFileSync(expectedPath3, 'utf-8');
    expect(actual3).toEqual(expected3);

    const actual4 = genDiff(firstPath, firstPath);
    const expectedPath4 = getFixturePath('expectedPlainJson4');
    const expected4 = fs.readFileSync(expectedPath4, 'utf-8');
    expect(actual4).toEqual(expected4);

    const actual5 = genDiff(pathToEmpty, pathToEmpty);
    expect(actual5).toEqual('{}');
  });

  test('yaml', () => {

  });
});
