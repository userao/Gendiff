import _ from 'lodash';

const formatValue = (value) => {
  switch (typeof value) {
    case 'undefined':
      return [];
    case 'object':
      if (value === null) return null;
      return '[complex value]';
    case 'number':
      return value;
    case 'boolean':
      return value;
    case 'string':
      return `'${value}'`;
    default:
      throw new Error(`What are you?: ${typeof value}`);
  }
};

const createString = (location, path, key, values) => {
  const currentPath = `${path}${key}`;
  const formattedValues = values.flatMap((value) => formatValue(value));

  switch (location) {
    case 'first':
      return `Property '${currentPath}' was removed`;
    case 'second':
      return `Property '${currentPath}' was added with value: ${formattedValues[0]}`;
    case 'both':
      if (formattedValues.length === 2) {
        return `Property '${currentPath}' was updated. From ${formattedValues[0]} to ${formattedValues[1]}`;
      }
      return [];
    default:
      throw new Error(`Wrong location: ${location}`);
  }
};

const plain = (differences) => {
  const iter = (object, path = '') => {
    const entries = Object.entries(object);
    const result = entries
      .flatMap((entry) => {
        if (!Array.isArray(entry[1])) return [];
        const [key, [location, firstValue, secondValue]] = entry;
        if (location === 'both' && secondValue === undefined && _.isObject(firstValue)) return iter(firstValue, `${path}${key}.`);
        return createString(location, path, key, [firstValue, secondValue]);
      })
      .join('\n').trim();

    return result;
  };

  return iter(differences);
};

export default plain;
