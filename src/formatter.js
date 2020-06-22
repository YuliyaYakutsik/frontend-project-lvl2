import _ from 'lodash';

const indentationChar = ' ';
const indentSize = 4;
const serviceCharLength = 2;
const openingBracket = '{';
const closingBracket = '}';

const nodeTypes = {
  added: (node) => `+ ${node.key}: ${node.newValue}`,
  removed: (node) => `- ${node.key}: ${node.oldValue}`,
  unchanged: (node) => `  ${node.key}: ${node.newValue}`,
  changed: (node) => ([
    `+ ${node.key}: ${node.newValue}`,
    `- ${node.key}: ${node.oldValue}`,
  ]),
};

const formatter = (diff) => {
  const indentString = indentationChar.repeat(indentSize - serviceCharLength);

  const values = diff.map(node => nodeTypes[node.type](node));
  const flattenedValues = _.flatten(values); // need to flatten because in changed node we have an array inside
  const output = flattenedValues
    .map((value => `${indentString}${value}`))
    .join('\n');

  return `${openingBracket}\n${output}\n${closingBracket}`;
};

export default formatter;