const babylon = require('babylon');
const walk = require('babylon-walk');

function transformText (text, filePath) {
    try {
        return babylon.parse(text, {
            allowImportExportEverywhere: true,
            plugins: ['jsx', 'classProperties'],
        })
    } catch (e) {
        throw new Error(`Parse error: in ${filePath}`, e)
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

module.exports = function (text) {
    const flags = {
        start: [],
        end: [],
    };
    const ast = transformText(text);
    const visitors = {
        StringLiteral: parseComment
    }
    walk.recursive(ast, visitors, flags);
    return flags;
}
