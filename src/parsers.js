import yaml from 'js-yaml';

const parse = (dataString, format) => {
  switch (format) {
    case 'yaml':
    case 'yml':
      return yaml.load(dataString);
    case 'json':
      return JSON.parse(dataString);
    default:
      throw Error(`Unsupported format: ${format}`);
  }
};

export default parse;
