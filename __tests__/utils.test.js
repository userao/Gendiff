import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'node:path';
import genDiff from '../src/utils.js';

test('comparing plain objects', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const firstPath = getFixturePath('plainObj1.json');
  const secondPath = getFixturePath('plainObj2.json');
  const actual = genDiff(firstPath, secondPath);
  const expected = '{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}';
  expect(actual).toEqual(expected);
});
