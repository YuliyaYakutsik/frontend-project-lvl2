import stylishFormatter from './stylish.js';

const formattersMap = {
  stylish: stylishFormatter,
};

const getFormatter = (format) => formattersMap[format];

export default getFormatter;
