import fs from 'fs';

const getDataFromPath = (generatedPath) => {
  const data = JSON.parse(fs.readFileSync(generatedPath), 'utf-8');
  return data;
};

export default getDataFromPath;
