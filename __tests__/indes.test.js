import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

describe('genDiff', () => {
  const fixturesPath = path.join('.', '__tests__', '__fixtures__');

  test('Should return correct diff. Type: json. Structure: flat.', () => {
    const expected = fs.readFileSync(path.join(fixturesPath, 'expected.txt'), 'utf-8');
    const config1 = path.join(fixturesPath, 'json', 'before.json');
    const config2 = path.join(fixturesPath, 'json', 'after.json');

    expect(genDiff(config1, config2)).toBe(expected);
  });

  test('Should return correct diff. Type: yml. Structure: flat.', () => {
    const expected = fs.readFileSync(path.join(fixturesPath, 'expected.txt'), 'utf-8');
    const config1 = path.join(fixturesPath, 'yml', 'before.yml');
    const config2 = path.join(fixturesPath, 'yml', 'after.yml');

    expect(genDiff(config1, config2)).toBe(expected);
  });
});
