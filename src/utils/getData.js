import fs from 'fs';

export default function getData(generatedPath) {
  return fs.readFileSync(generatedPath, 'utf-8');
}
