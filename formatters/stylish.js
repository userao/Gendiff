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
  const iter = (currentObject) => {
    const entries = Object.entries(currentObject);
    const formattedObject = entries
      .reduce((acc, entry) => {
        if (!Array.isArray(entry[1])) return { ...acc, [entry[0]]: entry[1] };
        const [key, [location, firstValue, secondValue]] = entry;
        if (location === 'first') {
          return { ...acc, [`- ${key}`]: firstValue };
        }
        if (location === 'second') {
          return { ...acc, [`+ ${key}`]: firstValue };
        }
        if (location === 'both') {
          if (secondValue !== undefined) {
            return { ...acc, [`- ${key}`]: firstValue, [`+ ${key}`]: secondValue };
          }
          if (typeof firstValue === 'object') {
            return { ...acc, [key]: iter(firstValue) };
          }
        }
        return { ...acc, [key]: firstValue };
      }, {});
    return formattedObject;
  };

  const result = iter(differences);
  return stringify(result, ' ', 4);
};

export default stylish;
