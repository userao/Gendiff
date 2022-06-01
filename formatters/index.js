import plain from './plain.js';
import stylish from './stylish.js';

export default (objectOfDifferences, formatter) => (formatter === 'stylish' ? stylish(objectOfDifferences) : plain(objectOfDifferences));
