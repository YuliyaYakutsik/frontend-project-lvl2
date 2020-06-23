import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

describe('genDiff', () => {
  const fixturesPath = path.join('.', '__tests__', '__fixtures__');

  const table = ['json', 'yml', 'ini'];

  test.each(table)('Should return correct diff. Type: %s. Structure: flat.', (type) => {
    const expected = fs.readFileSync(path.join(fixturesPath, 'expected.txt'), 'utf-8');
    const config1 = path.join(fixturesPath, type, `before.${type}`);
    const config2 = path.join(fixturesPath, type, `after.${type}`);

    expect(genDiff(config1, config2)).toBe(expected);
  });
});
