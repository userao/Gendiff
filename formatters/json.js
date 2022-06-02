import _ from 'lodash';

const json = (objectOfDifferences) => {
  const iter = (object, path = '', currentJson = [{ added: {}, removed: {}, updated: {} }]) => {
    const entries = Object.entries(object);
    const result = entries.reduce((acc, entry) => {
      const [key, [location, ...values]] = entry;
      const [jsonObject] = acc;
      console.log(jsonObject);
      const currentPath = `${path}${key}`;

      if (location === 'first') {
        _.set(jsonObject.removed, currentPath, values[0]);
      }

      if (location === 'second') {
        _.set(jsonObject.added, currentPath, values[0]);
      }

      if (location === 'both') {
        if (values.length === 2) {
          _.set(jsonObject.updated, `${currentPath}.from`, values[0]);
          _.set(jsonObject.updated, `${currentPath}.to`, values[1]);
          return [jsonObject];
        }
        if (_.isObject(values[0])) {
          return iter(values[0], `${currentPath}.`, [jsonObject]);
        }
      }
      return [jsonObject];
    }, currentJson);
    return result;
  };

  return JSON.stringify(iter(objectOfDifferences));
};

export default json;
