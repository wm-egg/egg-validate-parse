# egg-validate-parse

<!--
Description here.
-->

## 依赖说明

### 依赖的 egg 版本

egg-validate-parse 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌

### 依赖的插件
<!--

如果有依赖其它插件，请在这里特别说明。如

- security
- multipart

-->

## 开启插件

```js
// config/plugin.js
exports.validateParse = {
  enable: true,
  package: 'egg-validate-parse',
};
```

## 使用场景

see [egg-validate](https://github.com/eggjs/egg-validate) for base usage

### 验证规则

```
rules.test = {
  id: { type: 'string', required: true, scope: 'params', name: 'innerId' }
}
```

+ `scope` 指定参数出现的范围 (body | params | query | queries | state)
+ `name` 指定结果中参数的属性名称，可选

### controller中使用

```
ctx.validateParse(rules.test)
```

### 结果 

输出结果是所有解析后的参数值对象

参考 [test](test/) 。

## 详细配置

```js
// {app_root}/config/config.default.js
exports.validateParse = {
  defaultScope: 'body'
};
```

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 单元测试

<!-- 描述如何在单元测试中使用此插件，例如 schedule 如何触发。无则省略。-->

## 提问交流

请到 [egg issues](https://github.com/keepgoingwm/egg-validate-parse/issues) 异步交流。

## License

[MIT](LICENSE)
