const stringify = (value) => {
  switch (typeof value) {
    case 'object':
      if (value === null) return null;
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value.toString();
  }
};

const plain = (differences) => {
  const iter = (node, path = '') => node.flatMap((leaf) => {
    const { key, state, children } = leaf;
    const currentPath = `${path}${key}`;

    switch (state) {
      case 'nested':
        return iter(children, `${path}${key}.`);
      case 'changed':
        return `Property '${currentPath}' was updated. From ${stringify(leaf.from)} to ${stringify(leaf.to)}`;
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(leaf.value)}`;
      case 'removed':
        return `Property '${currentPath}' was removed`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown state: ${state}`);
    }
  })
    .join('\n');

  return iter(differences);
};

export default plain;
