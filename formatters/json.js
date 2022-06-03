import _ from 'lodash';

const json = (differences) => {
  const iter = (node, path = '', currentJson = [{ added: {}, removed: {}, updated: {} }]) => {
    const entries = Object.entries(node);
    return entries.reduce((acc, entry) => {
      if (!Array.isArray(entry[1])) return acc;
      const [key, [location, ...values]] = entry;
      const [jsonObject] = acc;
      const currentPath = `${path}${key}`;

      switch (location) {
        case 'first':
          _.set(jsonObject.removed, currentPath, values[0]);
          break;
        case 'second':
          _.set(jsonObject.added, currentPath, values[0]);
          break;
        case 'both':
          if (values.length === 2) {
            _.set(jsonObject.updated, `${currentPath}.from`, values[0]);
            _.set(jsonObject.updated, `${currentPath}.to`, values[1]);
            return [jsonObject];
          }
          return iter(values[0], `${currentPath}.`, [jsonObject]);
        default:
          throw new Error(`Unknown location: ${location}`);
      }

      return [jsonObject];
    }, currentJson);
  };

  return JSON.stringify(iter(differences));
};

export default json;
