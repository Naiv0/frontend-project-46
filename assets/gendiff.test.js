import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import { describe, test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import resultttt from '../__fixtures__/result.js';
import flatOutput from '../__fixtures__/expected_flat.js';

const fileNamee = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileNamee);
const getFixturePath = (filename) => path.join(dirName, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  test('difference from plain json', () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.json');
    const plainResult = readFile('expected_plain.json');
    const result = genDiff(filePath1, filePath2);
    expect(result).toEqual(plainResult);
  });
  test('difference from plain yaml', () => {
    const filePath1 = getFixturePath('file1.yaml');
    const filePath2 = getFixturePath('file2.yaml');
    const plainResult = readFile('expected_plain.yaml');
    const result = genDiff(filePath1, filePath2);
    expect(result).toEqual(plainResult);
  });
  test('difference between trees', () => {
    const filePath1 = getFixturePath('filepath1.json');
    const filePath2 = getFixturePath('filepath2.json');
    const treeResult = resultttt;
    const result = genDiff(filePath1, filePath2);
    expect(result).toEqual(treeResult);
  });
  test('difference between trees flat', () => {
    const filePath1 = getFixturePath('filepath1.json');
    const filePath2 = getFixturePath('filepath2.json');
    const treeResult = flatOutput;
    const result = genDiff(filePath1, filePath2, 'plain');
    expect(result).toEqual(treeResult);
  });
  test('difference between trees json', () => {
    const filePath1 = getFixturePath('filepath1.json');
    const filePath2 = getFixturePath('filepath2.json');
    const treeResult = readFile('expected_json.json');
    const result = genDiff(filePath1, filePath2, 'json');
    expect(result).toEqual(treeResult);
  });
});
