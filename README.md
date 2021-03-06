# Feature flag

Launch code execute by rules

## Install

```
npm i -D feat-flag
```

## Usage

```
featureFlag = require('feat-flag');
const transformText = featureFlag(code, rules, options);
```

### options

custom `babel` presets & plugins

e.g:

```
{
    presets: ['react', 'es2015', 'stage-0'],
    plugins: ['transform-decorators-legacy'],
}
```
It will read project's `.babelrc` file if you don't set options.

The current version move all `babel-preset-\*` and `babel-plugin-\*` from `dependencies` to `devDependencies`

ENSURE you import them by your self.

### Code

Wrap code between `'@flag_start({condition})'` and `'@flag_end'`.

e.g:

```
common();
'@flag_start(A || B && !C)'
codeInFlagA();
'@flag_end'
commonElse();
```

### Condition

Support `&&`, `||`, `!`

### Rules

Rules is a json object, like:

```
{
    A: true,
    B: true,
    C: true
}
```
