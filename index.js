const parse = require('./lib/parse');
const detect = require('./lib/detect');
const transform = require('./lib/transform');

module.exports = function (text, rules, options) {
    const flags = parse(text, options)
    const flagScopes = detect(flags, rules);
    return transform(text, flagScopes);
}
