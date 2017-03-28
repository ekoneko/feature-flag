# Feature flag

根据配置项控制代码是否执行

## Usage

```
featureFlag = require('feature-flag');
const transformText = featureFlag(code, rules);
```

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
