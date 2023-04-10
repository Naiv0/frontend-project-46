import fs from 'fs';
import path from 'path';

const getDataFromPath = (generatedPath) => {
  const data = JSON.parse(fs.readFileSync(generatedPath), 'utf-8');
  return data;
};

const getPath = (transferredPath) => {
  const gPath = path.resolve((process.cwd(), transferredPath));
  return gPath;
};

const render = (differencies) => {
  const rend = differencies.reduce((acc, elem) => {
    const { key } = elem;
    const { value } = elem;
    let result;
    switch (elem.type) {
      case 'deleted':
        result = `  - ${key}: ${value}\n`;
        break;
      case 'added':
        result = `  + ${key}: ${value}\n`;
        break;
      case 'edited':
        result = `  - ${key}: ${value[0]}\n  + ${key}: ${value[1]}\n`;
        break;
      default:
        result = `    ${key}: ${value}\n`;
        break;
    }
    return acc + result;
  }, '');
  return `{\n${rend}}`;
};

export {
  getDataFromPath,
  getPath,
  render,
};
