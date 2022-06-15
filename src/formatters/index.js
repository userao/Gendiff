// import _ from 'lodash';
import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const format = (objectOfDifferences, formatter) => {
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

export default format;
