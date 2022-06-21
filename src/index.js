import fs from 'fs';
import { cwd } from 'process';
import * as path from 'path';
import parse from './parsers.js';
import createDifferencesTree from './createDifferencesTree.js';
import format from './formatters/chooseFormatter.js';

const makeAbsolutePath = (pathString) => {
  const workingDir = cwd();
  return path.resolve(workingDir, pathString);
};

const getData = (pathToFile, encoding = 'utf-8') => fs.readFileSync(pathToFile, encoding);

const getFileFormat = (pathToFile) => path.extname(pathToFile).slice(1);

const genDiff = (path1, path2, formatter = 'stylish') => {
  const absolutePath1 = makeAbsolutePath(path1);
  const absolutePath2 = makeAbsolutePath(path2);

  const data1 = getData(absolutePath1);
  const data2 = getData(absolutePath2);

  const format1 = getFileFormat(absolutePath1);
  const format2 = getFileFormat(absolutePath2);

  const object1 = parse(data1, format1);
  const object2 = parse(data2, format2);

  const differences = createDifferencesTree(object1, object2);
  return format(differences, formatter);
};

export default genDiff;
