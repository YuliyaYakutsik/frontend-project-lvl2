import yaml from 'js-yaml';
import ini from 'ini';

const parserTypes = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const getParser = (extension) => parserTypes[extension];

export default getParser;
