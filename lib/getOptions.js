/**
 * Get babel options from projectRoot/.babelrc
 */

const path = require('path');
const fs = require('fs');

function getProjectRoot() {
  const root = require.main.filename;
  return path.dirname(root);
}

module.exports = function getOptions() {
  const babelrcPath = path.join(getProjectRoot(), '.babelrc');
  if (!fs.existsSync(babelrcPath)) {
    return {};
  }
  try {
    const rawText = fs.readFileSync(babelrcPath).toString();
    return JSON.parse(rawText);
  } catch (e) {
    return {};
  }
}
