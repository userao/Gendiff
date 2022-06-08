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

const createString = (state, path, key, values) => {
  const currentPath = `${path}${key}`;
  const formattedValues = values.flatMap((value) => formatValue(value));

  switch (state) {
    case 'removed':
      return `Property '${currentPath}' was removed`;
    case 'added':
      return `Property '${currentPath}' was added with value: ${formattedValues[0]}`;
    case 'updated':
      return `Property '${currentPath}' was updated. From ${formattedValues[0]} to ${formattedValues[1]}`;
    case 'untouched':
      return [];
    default:
      throw new Error(`Wrong state: ${state}`);
  }
};

const plain = (differences) => {
  const iter = (object, path = '') => {
    const entries = Object.entries(object);
    const result = entries
      .flatMap((entry) => {
        const [key, meta] = entry;
        const { state, values } = meta;
        if (state === 'updated inside') return iter(values[0], `${path}${key}.`);
        return createString(state, path, key, [values[0], values[1]]);
      })
      .join('\n').trim();

    return result;
  };

  return iter(differences);
};

export default plain;
