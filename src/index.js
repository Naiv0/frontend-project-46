import getPath from './utils/getPath.js';
import treeBuild from './treeBuilder.js';
import getData from './utils/getData.js';
import parscer from './utils/parscer.js';
import format from './formatters/index.js';

const extractFormat = (filepath) => parscer.extname(filepath).slice(1);

const genDiff = (path1, path2, formatName = 'stylish') => {
  const data1 = getData(getPath(path1));
  const data2 = getData(getPath(path2));

  const tree = treeBuild(data1, data2);
  return format(tree, formatName);
};

export default genDiff;
