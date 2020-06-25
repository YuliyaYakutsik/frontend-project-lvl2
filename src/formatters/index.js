import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

const formattersMap = {
  stylish: stylishFormatter,
  plain: plainFormatter,
  json: JSON.stringify,
};

const getFormatter = (format) => formattersMap[format];

export default getFormatter;
