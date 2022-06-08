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
  const iter = (node) => {
    const entries = Object.entries(node);
    const formattedObject = entries.reduce((acc, entry) => {
      const [key, meta] = entry;
      const { state, values } = meta;

      if (state === 'removed') {
        return { ...acc, [`- ${key}`]: values[0] };
      }

      if (state === 'added') {
        return { ...acc, [`+ ${key}`]: values[0] };
      }

      if (state === 'untouched') {
        return { ...acc, [key]: values[0] };
      }

      if (state === 'updated') {
        return { ...acc, [`- ${key}`]: values[0], [`+ ${key}`]: values[1] };
      }

      if (state === 'updated inside') {
        return { ...acc, [key]: iter(values[0]) };
      }

      return { ...acc, [key]: values[0] };
    }, {});
    return formattedObject;
  };

  const result = iter(differences);
  return stringify(result, ' ', 4);
};

export default stylish;
