import makeStylish from './stylish.js';

// const formtatters = {
//   stylish: render,
//   plain: '',
//   json: JSON.stringify,
// };

export default (ast, format) => {
  if (!format) {
    throw new Error(`Unknown format ${format}`);
  }
  return makeStylish(ast);
};
