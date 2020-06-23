import yaml from 'js-yaml';

const parserTypes = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const getParser = (extension) => parserTypes[extension];

export default getParser;
