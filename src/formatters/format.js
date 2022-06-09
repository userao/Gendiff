import _ from 'lodash';
import chooseFormater from './index.js';
import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

export default (data, formater) => {
  if (_.isEqual(data, {})) return '{}';
  switch (formater) {
    case 'stylish':
      return chooseFormater(data, stylish());
    case 'plain':
      return chooseFormater(data, plain());
    case 'json':
      return chooseFormater(data, json());
    default:
      throw new Error(`Unexpected formatter type: ${formater}`);
  }
};
