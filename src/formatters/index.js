import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatters = {
  stylish: makeStylish,
  plain: makePlain,
  json: JSON.stringify,
};

export default (ast, type) => {
  const format = formatters[type];
  if (!format) {
    throw new Error(`Unknown format: ${type}`);
  }
  return format(ast);
};
