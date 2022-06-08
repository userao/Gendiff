import _ from 'lodash';

const createDifferencesTree = (data1, data2) => {
  if (_.isEqual(data1, {}) && _.isEqual(data2, {})) return {};

  const keysOfFirst = Object.keys(data1);
  const keysOfSecond = Object.keys(data2);
  const allKeysSorted = _.sortBy(_.union(keysOfFirst, keysOfSecond));

  const treeOfDifferences = allKeysSorted.reduce((acc, key) => {
    if (keysOfFirst.includes(key) && !keysOfSecond.includes(key)) {
      return { ...acc, [key]: { state: 'removed', values: [data1[key]] } };
    }
    if (!keysOfFirst.includes(key) && keysOfSecond.includes(key)) {
      return { ...acc, [key]: { state: 'added', values: [data2[key]] } };
    }
    if (keysOfFirst.includes(key) && keysOfSecond.includes(key)) {
      if (_.isEqual(data1[key], data2[key])) return { ...acc, [key]: { state: 'untouched', values: [data1[key]] } };
      if (_.isObject(data1[key]) && _.isObject(data2[key])) return { ...acc, [key]: { state: 'updated inside', values: [createDifferencesTree(data1[key], data2[key])] } };
    }
    return { ...acc, [key]: { state: 'updated', values: [data1[key], data2[key]] } };
  }, {});

  return treeOfDifferences;
};

export default createDifferencesTree;
