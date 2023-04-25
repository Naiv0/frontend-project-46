/* eslint-disable max-len */
import _ from 'lodash';

const indent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const makeStylish = (ast) => {
  console.log('ast', ast);

  const iter = (node, depth = 0) => {
    switch (node.type) {
      case 'root': {
        const output = node.children.flatMap((child) => iter(child, depth + 1));
      }
      case 'added': {
        console.log('added');
        console.log(node);
      }
      case 'deleted': {
        console.log('deleted');
        console.log(node);
      }
      case 'changed': {
        console.log('changed');
        console.log(node);
      }
      case 'unchanged': {
        console.log('unchanged');
        console.log(node);
      }
      case 'nested': {
        console.log('nested');
        console.log(node.children);
      }
      default: {
        console.log(111, node);
      }
    }
  };
  return iter(ast);
};

export default makeStylish;

const stringify = (data, depth) => {
  if (!_.isObject(data) || data === null) {
    return String(data);
  }
  const output = Object.entries(data)
    .map(([key, value]) => `${mapping.unchanged({ key, value }, depth + 1)}`);

  return `{\n${output.join('\n')}\n${indent(depth)}  }`;
};

// const mapping = {
//   root: ({ children }, depth, iter) => {
//     const output = children.flatMap((node) => mapping[node.type](node, depth + 1, iter));
//     return `{\n${output.join('\n')}\n}`;
//   },
//   nested: ({ key, children }, depth, iter) => {
//     const output = children.flatMap((node) => mapping[node.type](node, depth + 1, iter));
//     return `${indent(depth)}  ${key}: {\n${output.join('\n')}\n${indent(depth)}  }`;
//   },
//   added: (node, depth) => `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth, mapping)}`,
//   deleted: (node, depth) => `${indent(depth)}- ${node.key}: ${stringify(node.value, depth, mapping)}`,
//   unchanged: (node, depth) => `${indent(depth)}  ${node.key}: ${stringify(node.value, depth, mapping)}`,
//   changed: (node, depth) => {
//     const { key, value1, value2 } = node;

//     const data1 = `${indent(depth)}- ${key}: ${stringify(value1, depth, mapping)}`;
//     const data2 = `${indent(depth)}+ ${key}: ${stringify(value2, depth, mapping)}`;
//     return [data1, data2];
//   },
// };

// const render = (ast) => {
//   const iter = (node, deep) => mapping[node.type](node, deep, iter);
//   return iter(ast, 0);
// };
// export default render;
