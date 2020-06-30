import _ from 'lodash';

const indentationChar = ' ';
const indentSize = 4;
const diffCharLength = 2;

const getBrackets = (depth) => ({
  openingBracket: '{',
  closingBracket: (depth > 1) ? `${indentationChar.repeat(depth * indentSize - indentSize)}}` : '}',
});

const formatValue = (value, depth = 1) => {
  if (!(value instanceof Object)) return value;

  const { openingBracket, closingBracket } = getBrackets(depth);
  const indentString = indentationChar.repeat(indentSize * depth - diffCharLength);
  const output = _.keys(value).map((key) => `${indentString}  ${key}: ${value[key]}`).join('\n');

  return `${openingBracket}\n${output}\n${closingBracket}`;
};

const nodeTypes = {
  nested: (node, depth, fn) => `  ${node.key}: ${fn(node.newValue, depth + 1)}`,
  added: (node, depth) => `+ ${node.key}: ${formatValue(node.newValue, depth + 1)}`,
  removed: (node, depth) => `- ${node.key}: ${formatValue(node.oldValue, depth + 1)}`,
  unchanged: (node, depth) => `  ${node.key}: ${formatValue(node.newValue, depth + 1)}`,
  changed: (node, depth) => ([
    `+ ${node.key}: ${formatValue(node.newValue, depth + 1)}`,
    `- ${node.key}: ${formatValue(node.oldValue, depth + 1)}`,
  ]),
};

const stylishFormatter = (ast) => {
  const iter = (innerAst, depth) => {
    const { openingBracket, closingBracket } = getBrackets(depth);
    const indentString = indentationChar.repeat(indentSize * depth - diffCharLength);

    const values = innerAst.flatMap((node) => nodeTypes[node.type](node, depth, iter));
    const output = values
      .map(((value) => `${indentString}${value}`))
      .join('\n');

    return `${openingBracket}\n${output}\n${closingBracket}`;
  };

  return iter(ast, 1);
};

export default stylishFormatter;
