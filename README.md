# Feature flag

根据配置项控制代码是否执行

## Usage

```
featureFlag = require('feature-flag');
const transformText = featureFlag(code, rules, options);
```

### options

可以自定义 babel 解析的配置参数, 默认为
```
{
    presets: ['react', 'es2015', 'stage-0'],
    plugins: ['transform-decorators-legacy'],
}
```

The current version move all `babel-preset-\*` and `babel-plugin-\*` from `dependencies` to `devDependencies`

ENSURE you import them by your self.

### Code

需要 flag 开关的代码包裹在 `'@flag_start({条件})'` 和 `'@flag_end'`之间

例如:

```
common();
'@flag_start(A || B && !C)'
codeInFlagA();
'@flag_end'
commonElse();
```

### Condition

支持 `&&`, `||`, `!` 三种运算符

### Rules

规则为一个 json 对象, 例如

```
{
    A: true,
    B: true,
    C: true
}
```

## TODO

English readme

Read `.babelrc` first, if options don't configure
