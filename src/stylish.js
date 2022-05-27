import _ from 'lodash';

const stylish = (objectOfDifferences, depth = 0) => {
  const currentDepth = depth === 0 ? 1 : depth;
  const keys = Object.keys(objectOfDifferences);
  const string = keys.reduce((acc, key) => {
    const [keyLocation, firstValue, secondValue] = objectOfDifferences[key];
    if (keyLocation === 'both') {
      // доделать случаи когда есть в обоих
    }
    if (keyLocation === 'first') {
      return `${acc} - ${key}: ${_.isObject(firstValue) ? JSON.stringify(firstValue, null, currentDepth).replace(/"([^"]+)":/g, '$1:') : firstValue}\n`;
    }
    return `${acc} + ${key}: ${_.isObject(firstValue) ? JSON.stringify(firstValue, null, currentDepth).replace(/"([^"]+)":/g, '$1:') : firstValue}\n`;
  }, '');
  return `${' '.repeat(currentDepth - 1)}{\n${' '.repeat(currentDepth)}${string}\n${' '.repeat(currentDepth - 1)}}`;
};

export default stylish;
