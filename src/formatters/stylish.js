/* eslint-disable max-len */
import _ from 'lodash';

const indent = (depth) => ' '.repeat(depth * 2);

const joinStrings = (lines, depth) => [
  '{',
  ...lines,
  `${indent(depth)}}`,
].join('\n');

function stringify(data, depth) {
  if ((!_.isObject(data) || (data === null))) {
    return String(data);
  }
  const keys = _.keys(data);
  const lines = keys.map((key) => `${indent(depth)}${stringify(data[key], depth + 1)}`);
  console.log(lines);
  return joinStrings(lines, depth);
}

const makeStylish = (ast) => {
  const iter = (node, depth = 1) => {
    switch (node.type) {
      case 'root': {
        const output = node.children.flatMap((child) => iter(child, depth));
        return joinStrings(output, depth);
      }
      case 'added': {
        return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
      }

      case 'deleted': {
        return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
      }

      case 'edited': {
        return `${indent(depth)}- ${node.key}: ${stringify(node.value1, depth)}\n${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
      }

      case 'unchanged': {
        return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
      }

      case 'nested': {
        const output = node.children.flatMap((child) => iter(child, depth + 1));
        return `${indent(depth)}${node.key}: ${joinStrings(output, depth + 1)}`;
      }
      default: {
        return console.log(111, node);
      }
    }
  };

  return iter(ast);
};

export default makeStylish;

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
