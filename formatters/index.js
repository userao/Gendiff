import _ from 'lodash';
import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';
import genDiff from '../src/utils.js';

const format = (objectOfDifferences, formatter = 'stylish') => {
  if (_.isEqual(objectOfDifferences, {})) return '{}';
  switch (formatter) {
    case 'stylish':
      return stylish(objectOfDifferences);
    case 'plain':
      return plain(objectOfDifferences);
    case 'json':
      return json(objectOfDifferences);
    default:
      throw new Error(`Unexpected formatter type: ${formatter}`);
  }
};

export { genDiff, format };
