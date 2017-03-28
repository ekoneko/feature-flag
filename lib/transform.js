function combineScope(scopes) {
    const newScopes = [];
    scopes.forEach((scope, i) => {
        let isAlone = true;
        scopes.forEach((otherScope, j) => {
            if (i === j) {
                return
            }
            if (otherScope[0] < scope[0] && otherScope[1] > scope[1]) {
                isAlone = false;
            }
        });
        if (isAlone) {
            newScopes.push(scope);
        }
    })
    return newScopes
}

function sortScope(scopes) {
    return scopes.sort((a, b) => (a[0] - b[0]));
}

module.exports = function (text, scopes) {
    if (!scopes || !scopes.length) {
        return text;
    }
    let transformText = text;
    const combinedScopes = sortScope(combineScope(scopes));
    for (let i = combinedScopes.length - 1; i >= 0; i--) {
        let scope = combinedScopes[i];
        // remove transformText left space
        transformText = transformText.slice(0, scope[0]).replace(/[\r\n]\s*$/, '') +
            transformText.slice(scope[1], transformText.length);
    }
    return transformText;
}
