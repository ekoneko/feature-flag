const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const parse = require('../lib/parse');
const detect = require('../lib/detect');
const transform = require('../lib/transformFile');

const recursePath = path.resolve(__dirname, './assets/recurse.js');
const text = fs.readFileSync(recursePath).toString();

describe('recurse', () => {
    it ('A && B && !C', done => {
        const rules = {
            A: true,
            B: true,
            C: false
        };
        const flags = parse(text)
        const flagScopes = detect(flags, rules);
        const transformText = transform(text, flagScopes);
        done();
    });

    it ('A && B && C', done => {
        const rules = {
            A: true,
            B: true,
            C: true
        };
        const flags = parse(text)
        const flagScopes = detect(flags, rules);
        const transformText = transform(text, flagScopes);
        done();
    });
})
