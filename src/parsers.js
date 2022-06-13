import yaml from 'js-yaml';

const parseJson = JSON.parse;

const parseYaml = yaml.load;

const parse = (dataString, extension) => {
  if (dataString === '') throw new Error('Empty string');
  const format = extension.slice(1);
  switch (format) {
    case 'yaml':
      return parseYaml(dataString);
    case 'yml':
      return parseYaml(dataString);
    case 'json':
      return parseJson(dataString);
    default:
      throw Error(`Unsupported extension: ${format}`);
  }
};

export default parse;
