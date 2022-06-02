import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

export default (objectOfDifferences, formatter) => {
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
