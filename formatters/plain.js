import _ from 'lodash';

const createString = (location, path, key, values) => {
  const formattedValues = values.map((value) => {
    switch (typeof value) {
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
  });
  switch (location) {
    case 'first':
      return `Property '${path}${key}' was removed`;
    case 'second':
      return `Property '${path}${key}' was added with value: ${formattedValues[0]}`;
    case 'both':
      if (formattedValues.length === 2) {
        return `Property '${path}${key}' was updated. From ${formattedValues[0]} to ${formattedValues[1]}`;
      }
      return [];
    default:
      throw new Error(`Wrong location: ${location}`);
  }
};

const plain = (objectOfDifferences) => {
  const iter = (object, path) => {
    const entries = Object.entries(object);
    const result = entries
      .flatMap((entry) => {
        if (!Array.isArray(entry[1])) return [];
        const [key, [location, ...values]] = entry;
        if (location === 'both' && values.length !== 2 && _.isObject(values[0])) return iter(values[0], `${path}${key}.`);
        return createString(location, path, key, values);
      })
      .join('\n').trim();

    return result;
  };

  return iter(objectOfDifferences, '');
};

export default plain;
