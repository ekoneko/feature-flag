const babel = require('babel-core');
const walk = require('babylon-walk');

const defaultBabelOptions = {
    presets: ['react', 'es2015', 'stage-0'],
    plugins: ['transform-decorators-legacy'],
}

function transformText (text, babelOptions) {
    try {
        const {ast} = babel.transform(text, babelOptions)
        return ast
    } catch (e) {
        throw new Error('Parse error', e)
    }
}

function parseComment (node, flags) {
    const value = node.value.trim();
    if (isFlagStart(value)) {
        flags.start.push({
            value: node.value,
            start: node.start,
            end: node.end,
        })
    } else if (isFlagEnd(value)) {
        flags.end.push({
            value: node.value,
            start: node.start,
            end: node.end,
        })
    }
}

function isFlagStart (string) {
    return string.indexOf('@flag_start') === 0;
}

function isFlagEnd (string) {
    return string.indexOf('@flag_end') === 0;
}

module.exports = function (text, babelOptions) {
    const flags = {
        start: [],
        end: [],
    };
    const ast = transformText(text, babelOptions);
    const visitors = {
        StringLiteral: parseComment
    }
    walk.recursive(ast, visitors, flags);
    return flags;
}
