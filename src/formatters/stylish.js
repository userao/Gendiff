import _ from 'lodash';

const stylish = (differences) => {
  if (_.isEqual(differences, {})) return '{}';
  const iter = (node) => {
    const formattedObject = node.reduce((acc, leaf) => {
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
    return formattedObject;
  };

  const result = iter(differences);
  return JSON.stringify(result, null, 4)
    .replace(/([",])/g, '')
    .split('\n')
    .map((string) => {
      if (string.includes('+') || string.includes('-')) {
        return string.slice(2);
      }
      return string;
    })
    .join('\n');
};

export default stylish;
