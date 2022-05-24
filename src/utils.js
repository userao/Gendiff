import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import * as path from 'node:path';

const dataToText = (code) => {
  const dataArray = JSON.parse(code).data;
  return String.fromCharCode(...dataArray);
};

const genDiff = (path1, path2) => {
  const workingDir = cwd();
  const resolvedPath1 = path.resolve(workingDir, path1);
  const resolvedPath2 = path.resolve(workingDir, path2);
  const codedData1 = readFileSync(resolvedPath1);
  const codedData2 = readFileSync(resolvedPath2);
  const firstDataString = JSON.stringify(codedData1);
  const secondDataString = JSON.stringify(codedData2);
  const firstObjectFromData = JSON.parse(dataToText(firstDataString));
  const secondObjectFromData = JSON.parse(dataToText(secondDataString));
  const allKeys = _.union(Object.keys(firstObjectFromData), Object.keys(secondObjectFromData));
  const sortedKeys = _.sortBy(allKeys);

  const string = sortedKeys.reduce((acc, key) => {
    if (Object.hasOwn(firstObjectFromData, key) && !Object.hasOwn(secondObjectFromData, key)) {
      return `${acc} - ${key}: ${firstObjectFromData[key]}\n`;
    }
    if (Object.hasOwn(secondObjectFromData, key) && !Object.hasOwn(firstObjectFromData, key)) {
      return `${acc} + ${key}: ${secondObjectFromData[key]}\n`;
    }
    if (Object.hasOwn(secondObjectFromData, key) && Object.hasOwn(firstObjectFromData, key)) {
      if (firstObjectFromData[key] !== secondObjectFromData[key]) {
        return `${acc} - ${key}: ${firstObjectFromData[key]}\n + ${key}: ${secondObjectFromData[key]}\n`;
      }
    }
    return `${acc}   ${key}: ${firstObjectFromData[key]}\n`;
  }, '');

  return `{\n${string}}`;
};

export default genDiff;
