import yaml from 'js-yaml';

const parseJson = (jsonString) => JSON.parse(jsonString);

const parseYaml = (yamlString) => yaml.load(yamlString);

const parseFile = (data, extension) => {
  if (extension.includes('json') || extension.includes('yml') || extension.includes('yaml')) {
    return extension.includes('json') ? parseJson(data) : parseYaml(data);
  }
  throw new Error(`Unsupported extension: ${extension}`);
};

const parser = (dataString, extension) => {
  if (dataString.length === 0) return {};
  return parseFile(dataString, extension);
};

export default parser;
