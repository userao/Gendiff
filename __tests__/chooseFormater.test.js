import { test, expect } from '@jest/globals';
import format from '../src/formatters/chooseFormatter.js';

test('index', () => {
  expect(() => format({ prop: 'value' }, 'pretty')).toThrow(Error);
});
