import path from 'path';
import fs from 'fs';
import treeBuild from './treeBuilder.js';
import format from './formatters/index.js';
import parse from './utils/parscer.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const extractFormat = (filepath) => path.extname(filepath).slice(1);
const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf-8'), extractFormat(filepath));

const genDiff = (path1, path2, formatName = 'stylish') => {
  const data1 = getData(getPath(path1));
  const data2 = getData(getPath(path2));

  const tree = treeBuild(data1, data2);
  return format(tree, formatName);
};

export default genDiff;
