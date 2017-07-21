# Feature flag

根据配置项控制代码是否执行

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

可以自定义 babel 解析的配置参数, 例如
```
{
    presets: ['react', 'es2015', 'stage-0'],
    plugins: ['transform-decorators-legacy'],
}
```

如果没有指定 options, 程序将默认读取项目根目录的 .babelrc 配置

当前版本移除了所有 babel preset 和 plugin 的依赖, 你需要手动的引入它们

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
