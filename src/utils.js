import _ from 'lodash';
import fs from 'fs';
import { cwd } from 'node:process';
import * as path from 'node:path';
import parser from './parsers.js';
import stylish from './stylish.js';

const createObjectOfDifs = (firstObject, secondObject) => {
  const keysOfFirst = Object.keys(firstObject);
  const keysOfSecond = Object.keys(secondObject);
  const allKeysSorted = _.sortBy(_.union(keysOfFirst, keysOfSecond));
  const objOfDifs = allKeysSorted.reduce((acc, key) => {
    const firstValue = firstObject[key];
    const secondValue = secondObject[key];
    if (keysOfFirst.includes(key) && keysOfSecond.includes(key)) {
      if (_.isEqual(firstValue, secondValue)) {
        return { ...acc, [key]: ['both', firstValue] };
      }

      if (_.isObject(firstValue) && _.isObject(secondValue)) {
        return { ...acc, [key]: ['both', createObjectOfDifs(firstValue, secondValue)] };
      }

      return { ...acc, [key]: ['both', firstValue, secondValue] };
    }

    if (keysOfFirst.includes(key)) {
      return { ...acc, [key]: ['first', firstValue] };
    }

    return { ...acc, [key]: ['second', secondValue] };
  }, {});

  return objOfDifs;
};

const genDiff = (path1, path2, formatterType = 'stylish') => {
  const workingDir = cwd();
  const resolvedPath1 = path.resolve(workingDir, path1);
  const resolvedPath2 = path.resolve(workingDir, path2);
  const dataString1 = fs.readFileSync(resolvedPath1, 'utf-8');
  const dataString2 = fs.readFileSync(resolvedPath2, 'utf-8');
  const extension1 = path.extname(path1);
  const extension2 = path.extname(path2);

  if (dataString1 === dataString2 && dataString1 === '') {
    return '{}';
  }

  const object1 = dataString1 === '' ? {} : parser(dataString1, extension1);
  const object2 = dataString2 === '' ? {} : parser(dataString2, extension2);

  const differencesObject = createObjectOfDifs(object1, object2);
  return formatterType === 'stylish' ? stylish(differencesObject) : console.log('Only stylish for now');
};

export default genDiff;
