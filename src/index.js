import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import formatter from './formatter.js';

const keyTypes = [
  {
    type: 'added',
    check: (data1, data2, key) => !_.has(data1, key) && _.has(data2, key),
    process: (value1, value2) => ({
      oldValue: value1,
      newValue: value2,
    }),
  },
  {
    type: 'removed',
    check: (data1, data2, key) => _.has(data1, key) && !_.has(data2, key),
    process: (value1, value2) => ({
      oldValue: value1,
      newValue: value2,
    }),
  },
  {
    type: 'unchanged',
    check: (data1, data2, key) => _.has(data1, key)
      && _.has(data2, key)
      && data1[key] === data2[key],
    process: (value1, value2) => ({
      oldValue: value1,
      newValue: value2,
    }),
  },
  {
    type: 'changed',
    check: (data1, data2, key) => _.has(data1, key)
      && _.has(data2, key)
      && data1[key] !== data2[key],
    process: (value1, value2) => ({
      oldValue: value1,
      newValue: value2,
    }),
  },
];

const getDiff = (data1, data2) => _.union(_.keys(data1), _.keys(data2)).map((key) => {
  const { type, process } = _.find(keyTypes, (item) => item.check(data1, data2, key));
  const { oldValue, newValue } = process(data1[key], data2[key]);

  return {
    type,
    key,
    oldValue,
    newValue,
  };
});

const genDiff = (filePath1, filePath2) => {
  const config1 = fs.readFileSync(path.resolve(filePath1), 'utf8');
  const config2 = fs.readFileSync(path.resolve(filePath2), 'utf8');

  const data1 = JSON.parse(config1);
  const data2 = JSON.parse(config2);

  const diff = getDiff(data1, data2);

  return formatter(diff);
};

export default genDiff;
