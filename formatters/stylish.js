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
        let line = `${currentIndent}${key}: ${iter(val, depth + 1)}`;
        if (key.includes('+') || key.includes('-')) {
          line = line.slice(2);
        }
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

const stylish = (objectOfDifferences) => {
  const iter = (currentObject) => {
    const entries = Object.entries(currentObject);
    const formattedObject = entries
      .reduce((differences, entry) => {
        if (!Array.isArray(entry[1])) return { ...differences, [entry[0]]: entry[1] };
        const [key, [location, firstValue, secondValue]] = entry;
        if (location === 'first') {
          return { ...differences, [`- ${key}`]: firstValue };
        }
        if (location === 'second') {
          return { ...differences, [`+ ${key}`]: firstValue };
        }
        if (location === 'both') {
          if (secondValue !== undefined) {
            return { ...differences, [`- ${key}`]: firstValue, [`+ ${key}`]: secondValue };
          }
          if (typeof firstValue === 'object') {
            return { ...differences, [key]: iter(firstValue) };
          }
        }
        return { ...differences, [key]: firstValue };
      }, {});
    return formattedObject;
  };

  const result = iter(objectOfDifferences);
  return stringify(result, ' ', 4);
};
export default stylish;
