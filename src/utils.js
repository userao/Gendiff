import fs from 'fs';
import { cwd } from 'process';
import * as path from 'path';
import parser from './parsers.js';
import createDifferencesTree from './createDifferencesTree.js';
import format from './formatters/index.js';

const makePathAbsolute = (pathString) => {
  const workingDir = cwd();
  return path.resolve(workingDir, pathString);
};

const getDataString = (pathToFile, encoding = 'utf-8') => fs.readFileSync(pathToFile, encoding);

const getFileExtension = (pathToFile) => path.extname(pathToFile);

const genDiff = (path1, path2, formater = 'stylish') => {
  const firstAbsolutePath = makePathAbsolute(path1);
  const secondAbsolutePath = makePathAbsolute(path2);

  const firstDataString = getDataString(firstAbsolutePath);
  const secondDataString = getDataString(secondAbsolutePath);

  const firstFileExtension = getFileExtension(firstAbsolutePath);
  const secondFileExtension = getFileExtension(secondAbsolutePath);

  const firstObject = parser(firstDataString, firstFileExtension);
  const secondObject = parser(secondDataString, secondFileExtension);

  const differences = createDifferencesTree(firstObject, secondObject);
  return format(differences, formater);
};

export default genDiff;
