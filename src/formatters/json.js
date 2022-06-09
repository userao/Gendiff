import _ from 'lodash';

const json = (differences) => {
  const iter = (node, path = '', currentJson = [{ added: {}, removed: {}, updated: {} }]) => {
    const entries = Object.entries(node);
    return entries.reduce((acc, entry) => {
      const [key, meta] = entry;
      const { state, values } = meta;
      const [jsonObject] = acc;
      const currentPath = `${path}${key}`;

      switch (state) {
        case 'removed':
          _.set(jsonObject.removed, currentPath, values[0]);
          break;
        case 'added':
          _.set(jsonObject.added, currentPath, values[0]);
          break;
        case 'updated':
          _.set(jsonObject.updated, `${currentPath}.from`, values[0]);
          _.set(jsonObject.updated, `${currentPath}.to`, values[1]);
          break;
        case 'updated inside':
          return iter(values[0], `${currentPath}.`, [jsonObject]);
        case 'untouched':
          return acc;
        default:
          throw new Error(`Wrong state: ${state}`);
      }

      return [jsonObject];
    }, currentJson);
  };

  return JSON.stringify(iter(differences));
};

export default json;
