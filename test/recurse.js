const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const featureFlag = require('../index');

const recursePath = path.resolve(__dirname, './assets/recurse.js');
const text = fs.readFileSync(recursePath).toString();

describe('recurse', () => {
    it ('A && B && !C', done => {
        const rules = {
            A: true,
            B: true,
            C: false
        };
        const transformText = featureFlag(text, rules);
        if (transformText.indexOf('codeInFlagC') > -1) {
            done('transform error')
        } else {
            done();
        }
    });

    it ('A && !B && C', done => {
        const rules = {
            A: true,
            B: false,
            C: true
        };
        const transformText = featureFlag(text, rules);
        if (transformText.indexOf('codeInFlagB') > -1) {
            done('transform error')
        } else {
            done();
        }
    });

    it ('!A && B && C', done => {
        const rules = {
            A: false,
            B: true,
            C: true
        };
        const transformText = featureFlag(text, rules);
        if (transformText.indexOf('codeInFlagB') > -1 ||
            transformText.indexOf('codeInFlagA') > -1) {
            done('transform error')
        } else {
            done();
        }
    });
})
