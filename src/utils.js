import _ from 'lodash';
import fs from 'fs';
import { cwd } from 'node:process';
import * as path from 'node:path';

const genDiff = (path1, path2) => {
  const workingDir = cwd();
  const resolvedPath1 = path.resolve(workingDir, path1);
  const resolvedPath2 = path.resolve(workingDir, path2);
  const dataString1 = fs.readFileSync(resolvedPath1, 'utf-8');
  const dataString2 = fs.readFileSync(resolvedPath2, 'utf-8');
  if (dataString1 === dataString2 && dataString1 === '') {
    return '{}';
  }
  const object1 = dataString1 === '' ? {} : JSON.parse(dataString1);
  const object2 = dataString2 === '' ? {} : JSON.parse(dataString2);
  const allKeys = _.union(Object.keys(object1), Object.keys(object2));
  const sortedKeys = _.sortBy(allKeys);

  const string = sortedKeys.reduce((acc, key) => {
    if (Object.hasOwn(object1, key) && !Object.hasOwn(object2, key)) {
      return `${acc} - ${key}: ${object1[key]}\n`;
    }
    if (Object.hasOwn(object2, key) && !Object.hasOwn(object1, key)) {
      return `${acc} + ${key}: ${object2[key]}\n`;
    }
    if (Object.hasOwn(object2, key) && Object.hasOwn(object1, key)) {
      if (object1[key] !== object2[key]) {
        return `${acc} - ${key}: ${object1[key]}\n + ${key}: ${object2[key]}\n`;
      }
    }
    return `${acc}   ${key}: ${object1[key]}\n`;
  }, '');

  return `{\n${string}}`;
};

export default genDiff;
