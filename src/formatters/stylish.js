import _ from 'lodash';

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        const line = (key.includes('+') || key.includes('-'))
          ? `${currentIndent.slice(2)}${key}: ${iter(val, depth + 1)}`
          : `${currentIndent}${key}: ${iter(val, depth + 1)}`;
        return line;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

const stylish = (differences) => {
  const iter = (node) => node.reduce((acc, leaf) => {
    const { key, state } = leaf;
    if (state === 'nested') {
      const { children } = leaf;
      return { ...acc, [key]: iter(children) };
    }
    if (state === 'changed') {
      const { from, to } = leaf;
      return { ...acc, [`- ${key}`]: from, [`+ ${key}`]: to };
    }
    const { value } = leaf;
    if (state === 'added') {
      return { ...acc, [`+ ${key}`]: value };
    }
    if (state === 'removed') {
      return { ...acc, [`- ${key}`]: value };
    }
    return { ...acc, [key]: value };
  }, {});

  return stringify(iter(differences), ' ', 4);
};

export default stylish;
