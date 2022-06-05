import { test, expect } from '@jest/globals';
import index from '../formatters/index.js';

test('index', () => {
  expect(() => index('', '.html')).toThrow(Error);
});
