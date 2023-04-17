import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import { describe, test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

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
});
