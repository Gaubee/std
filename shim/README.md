# @gaubee/shim

该项目与 @gaubee/util 保持了一致的风格（尽可能提供函数式风格，从而避免副作用），提供了常见的垫片。
它按需引入，对于 native 支持的浏览器，基本不会有额外的开销。

1. decimal
    - 参考 https://github.com/tc39/proposal-decimal
    - 是 big.js 的平替，特点是它是纯函数，只携带着极少的副作用（stringify:toString/valueOf/toJSON）
1. pipeline
    - 参考 https://github.com/tc39/proposal-pipeline-operator
    - 可以帮助你将存函数串联起来，减少尾括号的问题
