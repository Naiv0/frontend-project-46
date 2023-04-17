import _ from 'lodash';
import getDataFromPath from './utils/parscer.js';
import getPath from './utils/getPath.js';
import render from './utils/render.js';

const genDiff = (path1, path2) => {
  const data1 = getDataFromPath(getPath(path1));
  const data2 = getDataFromPath(getPath(path2));
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  const diff = sortedKeys.map((key) => {
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { key, type: 'added', value: data2[key] };
    }

    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }

    if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
      return { key, type: 'edited', value: [data1[key], data2[key]] };
    }
    return { key, type: 'unchanged', value: data2[key] };
  });
  const rendered = render(diff);
  return rendered;
};

export default genDiff;
