import fs from 'fs';
import yaml from 'js-yaml';

const getDataFromPath = (generatedPath) => {
  if (generatedPath.endsWith('.json')) {
    const data = JSON.parse(fs.readFileSync(generatedPath), 'utf-8');
    return data;
  }
  if (generatedPath.endsWith('.yaml') || generatedPath.endsWith('.yml')) {
    const data = yaml.load(fs.readFileSync(generatedPath), 'utf-8');
    return data;
  }
  return console.log('Unexpected file extentions!');
};

export default getDataFromPath;
