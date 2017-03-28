function isEmpty (flags) {
    return !flags.start ||
        !flags.start.length ||
        !flags.end ||
        !flags.end.length;
}

function loop(flags, rules) {
    let scopes = [];
    const flagVector = getFlagVector(flags.start, flags.end);

    flags.start.forEach(flagStart => {
        const flagEnd = matchFlagEnd(flagStart, flagVector);
        scopes = scopes.concat(detectOneFlag(flagStart, flagEnd, rules));
    })
    return scopes;
}

function getFlagVector(flagsStart, flagsEnd) {
    const flagVector = [];
    let startIndex = 0;
    let endIndex = 0;
    while (true) {
        if (typeof flagsStart[startIndex] === 'undefined') {
            if (typeof flagsEnd[endIndex] === 'undefined') {
                break;
            } else {
                flagVector.push({
                    type: 'end',
                    node: flagsEnd[endIndex++],
                });
            }
        } else if (flagsStart[startIndex].end < flagsEnd[endIndex].end) {
            flagVector.push({
                type: 'start',
                node: flagsStart[startIndex++],
            });
        } else {
            flagVector.push({
                type: 'end',
                node: flagsEnd[endIndex++],
            });
        }
    }
    return flagVector;
}

function matchFlagEnd(flagStart, flagVector) {
    let stack = 0;
    for (let i = 0, l = flagVector.length; i < l; i++) {
        if (flagVector[i].node.end <= flagStart.end) {
            continue;
        } else if (flagVector[i].type === 'start') {
            stack += 1;
        } else if (stack === 0) {
            return flagVector[i].node;
        } else {
            stack -= 1;
        }
    }
}

function getFlagExpression (string) {
    const match = string.match(/\((.+)\)/);
    return match ? match[1] : '';
}

function detectOneFlag(flagStart, flagEnd, rules) {
    const expression = getFlagExpression(flagStart.value);
    const resultFunc = compare(expression, rules) ? pass : reject;
    return resultFunc(flagStart, flagEnd);
}

function compare (expression, rules) {
    let value = true;
    let lastOperator = '&&';
    // split && trim
    const expArray = expression.split(' ').filter(val => !!val);
    expArray.forEach(literal => {
        if (['&&', '||'].indexOf(literal) > -1) {
            lastOperator = literal;
            return;
        }
        let literalValue;
        if (literal[0] === '!') {
            literalValue = !rules[literal.slice(1)];
        } else {
            literalValue = rules[literal];
        }

        if (lastOperator === '&&') {
            value &= literalValue;
        } else {
            value |= literalValue;
        }
    })
    return value;
}

function pass(flagStart, flagEnd) {
    return [
        [flagStart.start, flagStart.end],
        [flagEnd.start, flagEnd.end],
    ]
}

function reject(flagStart, flagEnd) {
    return [
        [flagStart.start, flagEnd.end],
    ]
}

module.exports = function (flags, rules) {
    if (isEmpty(flags)) {
        return null;
    }
    if (flags.start.length !== flags.end.length) {
        throw new Error('Flag start and end not equal')
    }
    return loop(flags, rules);
}
