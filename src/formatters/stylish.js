import _ from 'lodash';

const indent = (deep, spaceCount = 4) => ' '.repeat(deep * spaceCount - 2);

const stringify = (data, deep, mapping) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const output = Object.entries(data)
    .map(([key, value]) => mapping.unchanged({ key, value }, deep + 1));
  return `{\n${output.join('\n')}\n${indent(deep)}  }`;
};

const mapping = {
  root: ({ children }, deep, iter) => {
    const output = children.flatMap((node) => mapping[node.type](node, deep + 1, iter));
    return `{\n${output.join('\n')}\n}`;
  },
  nested: ({ key, children }, deep, iter) => {
    const output = children.flatMap((node) => mapping[node.type](node, deep + 1, iter));
    return `${indent(deep)}  ${key}: {\n${output.join('\n')}\n${indent(deep)}}`;
  },
  added: (node, deep) => `${indent(deep)}+ ${node.key}: ${stringify(node, deep, mapping)}`,
  deleted: (node, deep) => `${indent(deep)}- ${node.key}: ${stringify(node, deep, mapping)}`,
  unchanged: (node, deep) => `${indent(deep)}  ${node.key}: ${stringify(node, deep, mapping)}`,
  changed: (node, deep) => {
    const { key, value1, value2 } = node;

    const data1 = `${indent(deep)}- ${key}: ${stringify(value1, deep, mapping)}`;
    const data2 = `${indent(deep)}+ ${key}: ${stringify(value2, deep, mapping)}`;
    return [data1, data2];
  },
};

const render = (ast) => {
  const iter = (node, deep) => mapping[node.type](node, deep, iter);
  return iter(ast, 0);
};
export default render;
