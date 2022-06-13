import _ from 'lodash';

const createDifferencesTree = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  const treeOfDifferences = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, state: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, state: 'removed', value: data1[key] };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, state: 'unchanged', value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, state: 'nested', children: createDifferencesTree(data1[key], data2[key]) };
    }
    return {
      key,
      state: 'changed',
      from: data1[key],
      to: data2[key],
    };
  });

  return treeOfDifferences;
};

export default createDifferencesTree;
