import _ from 'lodash';

const stringify = (value) => {
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
      return value.toString();
  }
};

const createString = (leaf, path) => {
  const { key, state } = leaf;
  const currentPath = `${path}${key}`;
  if (state === 'unchanged') return [];
  if (state === 'changed') {
    const { from, to } = leaf;
    return `Property '${currentPath}' was updated. From ${stringify(from)} to ${stringify(to)}`;
  }
  if (state === 'added') {
    const { value } = leaf;
    return `Property '${currentPath}' was added with value: ${stringify(value)}`;
  }
  return `Property '${currentPath}' was removed`;
};

const plain = (differences) => {
  if (_.isEqual(differences, {})) return '{}';
  const iter = (node, path = '') => node.flatMap((leaf) => {
    const { key, state } = leaf;
    if (state === 'nested') {
      const { children } = leaf;
      return iter(children, `${path}${key}.`);
    }
    return createString(leaf, path);
  })
    .join('\n')
    .trim();

  return iter(differences);
};

export default plain;
