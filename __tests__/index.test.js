import { test, expect } from '@jest/globals';
import { format } from '../formatters/index.js';

test('index', () => {
  expect(() => format('', '.html')).toThrow(Error);
});
