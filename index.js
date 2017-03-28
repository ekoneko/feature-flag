const parse = require('./lib/parse');
const detect = require('./lib/detect');
const transform = require('./lib/transformFile');

module.exports = function (text, rules) {
    const flags = parse(text)
    const flagScopes = detect(flags, rules);
    return transform(text, flagScopes);
}
