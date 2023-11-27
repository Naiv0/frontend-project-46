import _ from 'lodash';

const getPath = (nodeNames) => {
  nodeNames.flat().join('.');
  return nodeNames;
};

const getValue = (value) => {
  switch (typeof value) {
    case 'object': {
      return !value ? 'null' : '[complex value]';
    }
    case 'string': {
      return `'${value}'`;
    }
    case 'number': {
      return value;
    }
    default: {
      return `${value}`;
    }
  }
};

function makePlainTree(tree) {
  const iter = (node, path = []) => node.map((child) => {
    // console.log('im in!');
    const currentPath = getPath([path, child.key]).flat();
    // console.log(currentPath);
    switch (child.type) {
      case 'nested': {
        // console.log('nested!');
        return iter(child.children, currentPath);
      }
      case 'added': {
        // console.log('added!');
        return `Property '${currentPath}' was added with value: ${getValue(child.value)}`;
      }
      case 'deleted': {
        // console.log('deleted!');
        return `Property '${currentPath}' was removed`;
      }
      case 'edited': {
        // console.log('edited!');
        return `Property '${currentPath}' was updated. From ${getValue(child.value1)} to ${getValue(child.value2)}`;
      }
      case 'unchanged': {
        // console.log('nothing!');
        return null;
      }
      default: {
        // console.log('wtf!');
        throw Error('Uncorrect data');
      }
    }
  });
  return iter(tree.children);
}

export default function makePlain(data) {
  const result = makePlainTree(data);
  return _.flattenDeep(result).filter((el) => el).join('\n').replaceAll(',', '.');
}
