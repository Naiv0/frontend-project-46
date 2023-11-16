/* eslint-disable max-len */
import _ from 'lodash';

const indent = ' ';
const indentSize = 4;
const forwardIndent = (depth) => indent.repeat((indentSize * depth) - 2);
const backIndent = (depth) => indent.repeat((indentSize * depth) - indentSize);

const joinStrings = (lines, depth) => [
  '{',
  ...lines,
  `${backIndent(depth)}}`,
].join('\n');

function stringify(data, depth) {
  if ((!_.isObject(data) || (data === null))) {
    return String(data);
  }
  const keys = _.keys(data);
  const lines = keys.map((key) => `${forwardIndent(depth)}  ${key}: ${stringify(data[key], depth)}`);
  console.log(lines);
  return joinStrings(lines, depth);
}

const makeStylish = (ast) => {
  const iter = (node, depth) => {
    switch (node.type) {
      case 'root': {
        const output = node.children.flatMap((child) => iter(child, depth));
        return joinStrings(output, depth);
      }
      case 'added': {
        return `${forwardIndent(depth)}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
      }

      case 'deleted': {
        return `${forwardIndent(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}`;
      }

      case 'edited': {
        return `${forwardIndent(depth)}- ${node.key}: ${stringify(node.value1, depth + 1)}\n${forwardIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth + 1)}`;
      }

      case 'unchanged': {
        return `${forwardIndent(depth)}  ${node.key}: ${stringify(node.value, depth + 1)}`;
      }

      case 'nested': {
        const output = node.children.flatMap((child) => iter(child, depth + 1));
        return `${forwardIndent(depth)}  ${node.key}: ${joinStrings(output, depth + 1)}`;
      }
      default: {
        throw new Error('pipa');
      }
    }
  };

  return iter(ast, 1);
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
