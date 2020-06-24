import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

const formattersMap = {
  stylish: stylishFormatter,
  plain: plainFormatter,
};

const getFormatter = (format) => formattersMap[format];

export default getFormatter;
