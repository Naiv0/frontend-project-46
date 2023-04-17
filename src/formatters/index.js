import render from './stylish.js';

const formtatters = {
  stylish: render,
  plain: '',
  json: JSON.stringify,
};

export default (ast, type) => {
  const format = formtatters[type];
  if (!format) {
    throw new Error(`Unknown format ${type}`);
  }
  return format(ast);
};
