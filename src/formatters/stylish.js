/* eslint-disable max-len */
import _ from 'lodash';

const indent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const stringify = (lines) => {
  const newLines = lines.join('');

  return `{${newLines}\n}`;
};

const makeStylish = (ast) => {
  console.log('ast', ast);
  const iter = (node, depth = 0) => {
    switch (node.type) {
      case 'root': {
        const output = node.children.flatMap((child) => iter(child, depth + 1));
        return stringify(output);
      }
      case 'added': {
        return `\n  + ${node.key}: ${node.value}`;
      }

      case 'deleted': {
        return `\n  - ${node.key}: ${node.value}`;
      }

      case 'edited': {
        return `\n  - ${node.key}: ${node.value1}\n  + ${node.key}: ${node.value2}`;
      }

      case 'unchanged': {
        return `\n    ${node.key}: ${node.value}`;
      }

      case 'nested': {
        const output = node.children.flatMap((child) => iter(child, depth + 1));
        console.log(output);
        return stringify(output);
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
