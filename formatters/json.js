import _ from 'lodash';

const json = (differences) => {
  const iter = (node, path = '', currentJson = [{ added: {}, removed: {}, updated: {} }]) => {
    const entries = Object.entries(node);
    return entries.reduce((acc, entry) => {
      if (!Array.isArray(entry[1])) return acc;
      const [key, [location, firstValue, secondValue]] = entry;
      const [jsonObject] = acc;
      const currentPath = `${path}${key}`;

      switch (location) {
        case 'first':
          _.set(jsonObject.removed, currentPath, firstValue);
          break;
        case 'second':
          _.set(jsonObject.added, currentPath, firstValue);
          break;
        case 'both':
          if (secondValue !== undefined) {
            _.set(jsonObject.updated, `${currentPath}.from`, firstValue);
            _.set(jsonObject.updated, `${currentPath}.to`, secondValue);
            return [jsonObject];
          }
          return iter(firstValue, `${currentPath}.`, [jsonObject]);
        default:
          throw new Error(`Unknown location: ${location}`);
      }

      return [jsonObject];
    }, currentJson);
  };

  return JSON.stringify(iter(differences));
};

export default json;
