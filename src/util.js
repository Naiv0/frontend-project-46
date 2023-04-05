import fs from 'fs';
import path from 'path';

const getDataFromPath = (generatedPath) => {
  const data = JSON.parse(fs.readFileSync(generatedPath));
  return data;
};

const getPath = (transferredPath) => {
  const gPath = path.resolve((process.cwd(), transferredPath), 'utf-8');
  return gPath;
};

export {
  getDataFromPath,
  getPath,
};
