import _ from 'lodash';

const treeBuild = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  const diff = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }

    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }

    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: treeBuild(data1[key], data2[key]) };
    }

    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, type: 'edited', value1: data1[key], value2: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data2[key] };
  });
  return diff;
};

export default (data1, data2) => ({
  type: 'root',
  children: treeBuild(data1, data2),
});
