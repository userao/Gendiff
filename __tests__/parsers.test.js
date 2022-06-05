import { test, expect } from '@jest/globals';
import parser from '../src/parsers.js';

test('parser', () => {
  expect(() => parser({}, 'aboba')).toThrow(Error);
});
