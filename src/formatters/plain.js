const complexValue = '[complex value]';

const genPath = (path = '', key) => {
  if (!path) return key;

  return `${path}.${key}`;
};

const stringify = (value) => {
  if (!(value instanceof Object)) return value;

  return complexValue;
};

const nodeTypes = {
  nested: (node, path, fn) => fn(node.newValue, genPath(path, node.key)),

  added: (node, path) => `Property '${genPath(path, node.key)}' was added with value: ${stringify(node.newValue)}`,

  removed: (node, path) => `Property '${genPath(path, node.key)}' was removed`,

  changed: (node, path) => `Property '${genPath(path, node.key)}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`,
};

const plainFormatter = (ast, path = '') => {
  const output = ast
    .filter((node) => node.type !== 'unchanged')
    .map((node) => `${nodeTypes[node.type](node, path, plainFormatter)}`)
    .join('\n');

  return output;
};

export default plainFormatter;
