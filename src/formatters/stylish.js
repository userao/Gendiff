import _ from 'lodash';

const stringify = (value, depth) => {
  const iter = (currentValue, currentDepth) => {
    const blanks = '    ';
    const indent = blanks.repeat(currentDepth);
    if (!_.isObject(currentValue)) return currentValue;
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${indent}${key}: ${iter(val, currentDepth + 1)}`);

    return [
      '{',
      ...lines,
      `${indent.slice(4)}}`,
    ].join('\n');
  };

  return iter(value, depth);
};

const stylish = (differences) => {
  const iter = (node, depth) => {
    const blank = '    ';
    const indent = blank.repeat(depth);
    const result = node.map((leaf) => {
      const {
        key, state, children, from, to, value,
      } = leaf;
      if (state === 'removed') {
        return `${indent.slice(2)}- ${key}: ${stringify(value, depth + 1)}`;
      }
      if (state === 'added') {
        return `${indent.slice(2)}+ ${key}: ${stringify(value, depth + 1)}`;
      }
      if (state === 'nested') {
        return `${indent}${key}: {\n${iter(children, depth + 1)}\n${indent}}`;
      }
      if (state === 'changed') {
        return `${indent.slice(2)}- ${key}: ${stringify(from, depth + 1)}\n${indent.slice(2)}+ ${key}: ${stringify(to, depth + 1)}`;
      }
      return `${indent}${key}: ${stringify(value, depth)}`;
    }).join('\n');
    return result;
  };

  return `{\n${iter(differences, 1)}\n}`;
};

export default stylish;
