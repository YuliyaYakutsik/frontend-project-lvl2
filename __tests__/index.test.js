import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

describe('genDiff', () => {
  const fixturesPath = path.join('.', '__tests__', '__fixtures__');

  const table = [
    { type: 'json', format: 'stylish' },
    { type: 'json', format: 'plain' },
    { type: 'json', format: 'json' },
    { type: 'yml', format: 'stylish' },
    { type: 'yml', format: 'plain' },
    { type: 'yml', format: 'json' },
    { type: 'ini', format: 'stylish' },
    { type: 'ini', format: 'plain' },
  ];

  test.each(table)('Should return correct diff. Structure: flat. %o', (options) => {
    const { type, format } = options;
    const expected = fs.readFileSync(path.join(fixturesPath, `expected-${format}.txt`), 'utf-8');
    const config1 = path.join(fixturesPath, type, `before.${type}`);
    const config2 = path.join(fixturesPath, type, `after.${type}`);

    expect(genDiff(config1, config2, format)).toBe(expected);
  });

  test.each(table)('Should return correct diff. Structure: nested. %o', (options) => {
    const { type, format } = options;
    const expected = fs.readFileSync(path.join(fixturesPath, `expected-nested-${format}.txt`), 'utf-8');
    const config1 = path.join(fixturesPath, type, `before-nested.${type}`);
    const config2 = path.join(fixturesPath, type, `after-nested.${type}`);

    expect(genDiff(config1, config2, format)).toBe(expected);
  });
});
