const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const parse = require('../lib/parse');
const detect = require('../lib/detect');
const transform = require('../lib/transformFile');

const noFlagPath = path.resolve(__dirname, './assets/noFlag.js');
const text = fs.readFileSync(noFlagPath).toString();

describe('no flag', () => {
    it ('norule', done => {
        const rules = {};

        const flags = parse(text)
        const flagScopes = detect(flags, rules);
        const transformText = transform(text, flagScopes);
        if (transformText.indexOf('noFlag()') > -1) {
            return
        }
        done()
    });
})
