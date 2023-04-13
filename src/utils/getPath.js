import path from 'path';

const getPath = (transferredPath) => {
  const gPath = path.resolve((process.cwd(), transferredPath));
  return gPath;
};

export default getPath;
