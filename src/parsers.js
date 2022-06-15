import yaml from 'js-yaml';

const parse = (dataString, format) => {
  switch (format) {
    case 'yaml':
      return yaml.load(dataString);
    case 'yml':
      return yaml.load(dataString);
    case 'json':
      return JSON.parse(dataString);
    default:
      throw Error(`Unsupported extension: ${format}`);
  }
};

export default parse;
