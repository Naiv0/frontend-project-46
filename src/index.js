import _ from 'lodash';
import { getDataFromPath, getPath } from './util.js';

const genDiff = (path1, path2) => {
  const data1 = getDataFromPath(getPath(path1));
  const data2 = getDataFromPath(getPath(path2));
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  const diff = sortedKeys.map((key) => {

  });
};

export default genDiff;
