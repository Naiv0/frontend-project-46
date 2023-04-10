import { fileURLToPath } from 'url';
import * as path from 'path';
import { readFileSync } from 'fs';
import { describe, test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const fileNamee = fileURLToPath(import.meta.url);
const dirName = path.dirName(fileNamee);
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
});
