const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const parse = require('../lib/parse');
const detect = require('../lib/detect');
const transform = require('../lib/transformFile');
const featureFlag = require('../index');

const simplePath = path.resolve(__dirname, './assets/simple.js');
const text = fs.readFileSync(simplePath).toString();

describe('simple', () => {
    it ('A && B && !C', done => {
        const rules = {
            A: true,
            B: true,
            C: false
        };

        const flags = parse(text);
        if (_.get(flags, 'start[0].value').indexOf('@flag_start') !== 0) {
            return done('@flag_start not match');
        }
        if (_.get(flags, 'end[0].value') !== '@flag_end') {
            return done('@flag_end not match');
        }
        const flagScopes = detect(flags, rules);
        const transformText = transform(text, flagScopes);
        if (flagScopes.length !== 2) {
            done('detect error')
        } else if (transformText.indexOf('codeInFlagA') === -1) {
            done('transform error')
        } else {
            done()
        }
    });

    it ('A && B && C', done => {
        const rules = {
            A: true,
            B: true,
            C: true
        };

        const flags = parse(text)
        if (_.get(flags, 'start[0].value').indexOf('@flag_start') !== 0) {
            return done('@flag_start not match');
        }
        if (_.get(flags, 'end[0].value') !== '@flag_end') {
            return done('@flag_end not match');
        }
        const flagScopes = detect(flags, rules);
        const transformText = transform(text, flagScopes);
        if (flagScopes.length !== 1) {
            done('detect error')
        } else if (transformText.indexOf('codeInFlagA') > -1) {
            done('transform error')
        } else {
            done()
        }
    });

    it ('use index', done => {
        const rules = {
            A: true,
            B: true,
            C: true
        };
        const transformText = featureFlag(text, rules)
        if (transformText.indexOf('codeInFlagA') > -1) {
            done('transform error')
        } else {
            done()
        }
    })
})
