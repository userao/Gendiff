import yaml from 'js-yaml';

const parseJson = (jsonString) => JSON.parse(jsonString);

const parseYaml = (yamlString) => yaml.load(yamlString);

const parser = (dataString, extension) => {
  if (dataString.length === 0) return {};
  switch (extension) {
    case '.yaml':
      return parseYaml(dataString);
    case '.yml':
      return parseYaml(dataString);
    case '.json':
      return parseJson(dataString);
    default:
      throw Error(`Unsupported extension: ${extension}`);
  }
};

export default parser;
