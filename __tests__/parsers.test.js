import { test, expect } from '@jest/globals';
import parser from '../src/parsers.js';

test('parser', () => {
  expect(() => parser('{"prop":"value"}', 'aboba')).toThrow(Error);
  expect(() => parser('', '.json')).toThrow(Error);
  expect(() => parser('', '.yaml')).toThrow(Error);
});
