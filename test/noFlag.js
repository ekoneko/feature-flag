const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const featureFlag = require('../index');

const noFlagPath = path.resolve(__dirname, './assets/noFlag.js');
const text = fs.readFileSync(noFlagPath).toString();

describe('no flag', () => {
    it ('norule', done => {
        const rules = {};

        const transformText = featureFlag(text, rules);
        if (transformText.indexOf('noFlag()') === -1) {
            done('transform error')
        }
        done()
    });
})
