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
  const iter = (currentObject, depth = 0) => {
    const entries = Object.entries(currentObject);
    const formattedObject = entries.reduce((differences, [key, [location, ...values]]) => {
      if (location === 'first') {
        return { ...differences, [`- ${key}`]: values[0] };
      }
      if (location === 'second') {
        return { ...differences, [`+ ${key}`]: values[0] };
      }
      if (location === 'both') {
        if (values.length === 2) {
          if (!_.isEqual(values[0], values[1])) {
            return { ...differences, [`- ${key}`]: values[0], [`+ ${key}`]: values[1] };
          }
        }
        if (_.isObject(values[0])) {
          return { ...differences, [key]: iter(values[0], depth + 1) };
        }
      }
      return { ...differences, [key]: values[0] };
    }, {});
    return formattedObject;
  };

  const result = iter(objectOfDifferences);
  return stringify(result, ' ', 4);
};
export default stylish;
