import _ from 'lodash';

// const stringify = (data, replacer = ' ', spacesCount = 1) => {
//   if (typeof data === 'boolean' || typeof data === 'number') return `${data}`;
//   if (typeof data === 'string') return data;

//   const iter = (obj, str, depth = 1) => {
//     const entries = Object.entries(obj);
//     const string = entries.reduce((acc, [key, value]) => {
//       let currentValue = value;
//       if (value === null) currentValue = 'null';
//       return `${acc}${replacer.repeat(spacesCount)}${replacer.repeat(spacesCount * depth)}${key}: ${_.isObject(currentValue) ? iter(currentValue, '', depth + 1) : currentValue}\n`;
//     }, str);
//     return `{\n${string}${replacer.repeat(spacesCount * (depth - 1))}${replacer.repeat(spacesCount)}}`;
//   };

//   return iter(data, '');
// };

// const stylish = (objectOfDifferences, depth = 1) => {
  // const spacesCount = 4;
  // const blank = ' ';
  // const keys = Object.keys(objectOfDifferences);
  // const string = keys.reduce((acc, key) => {
  //   const [keyLocation, firstValue, secondValue] = objectOfDifferences[key];
  //   if (keyLocation === 'first') {
  //     return `${acc}${blank.repeat((spacesCount / 2) * depth)}- ${key}: ${_.isObject(firstValue) ? stringify(firstValue, blank, spacesCount * depth) : firstValue}\n`;
  //   }
  //   if (keyLocation === 'second') {
  //     return `${acc}${blank.repeat((spacesCount / 2) * depth)}+ ${key}: ${_.isObject(firstValue) ? stringify(firstValue, blank, spacesCount * depth) : firstValue}\n`;
  //   }
  //   if (keyLocation === 'both') {
  //     if (secondValue === undefined) {
  //       if (_.isObject(firstValue)) {
  //         return `${acc}${blank.repeat(spacesCount * depth)}${key}: ${stylish(firstValue, depth + 2)}\n`;
  //       }
  //       return `${acc}${blank.repeat(spacesCount * 2)}${key}: ${firstValue}\n`;
  //     }
  //   }
  //   return `${acc}${blank.repeat((spacesCount / 2) * depth)}- ${key}: ${_.isObject(firstValue) ? stringify(firstValue, blank, spacesCount * depth) : firstValue}
  //   ${blank.repeat(spacesCount / 2)}+ ${key}: ${_.isObject(secondValue) ? stringify(secondValue, blank, spacesCount * depth) : secondValue}\n`;
  // }, '');
  // return `{\n${string}}`;
// };
const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 2)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

const stylish = (objectOfDifferences) => {
  const iter = (currentObject, depth = 0) => {
    const entries = Object.entries(currentObject);
    const formattedObject = entries.reduce((differences, [key, [location, ...values]]) => {
      const indent = depth > 0 ? '  ' : '';
      console.log(indent, depth);
      if (location === 'first') {
        return { ...differences, [`- ${key}`]: values[0] };
      }
      if (location === 'second') {
        return { ...differences, [`+ ${key}`]: values[0] };
      }
      if (location === 'both') {
        if (values.length === 2) {
          if (!_.isEqual(values[0], values[1])) {
            return { ...differences, [`- ${key}`]: values[0], [`+ ${key}`]: values[1] };
          }
        }
        if (_.isObject(...values)) {
          return { ...differences, [`  ${key}`]: iter(...values, depth + 1) };
        }
      }
      return { ...differences, [`  ${key}`]: values[0] };
    }, {});
    return formattedObject;
  };

  const result = iter(objectOfDifferences);
  // return JSON.stringify(result, null, 4).replace(/([",])/g, () => '');
  return stringify(result, ' ', 2);
};
export default stylish;
