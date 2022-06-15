import _ from 'lodash';

const json = (differences) => {
  if (_.isEqual(differences, {})) return '{}';
  const iter = (node, path = '', currentJson = [{ added: {}, removed: {}, updated: {} }]) => node.reduce((acc, leaf) => {
    const { key, state } = leaf;
    const currentPath = `${path}${key}`;
    const [jsonObject] = acc;

    if (state === 'added' || state === 'removed') {
      const { value } = leaf;
      _.set(jsonObject[state], currentPath, value);
    }
    if (state === 'changed') {
      const { from, to } = leaf;
      _.set(jsonObject.updated, `${currentPath}.from`, from);
      _.set(jsonObject.updated, `${currentPath}.to`, to);
    }
    if (state === 'nested') {
      const { children } = leaf;
      return iter(children, `${currentPath}.`, [jsonObject]);
    }
    return acc;
  }, currentJson);

  return JSON.stringify(iter(differences));
};

export default json;
