# egg-validate-parse

<!--
Description here.
-->

## Install

```bash
$ npm i egg-validate-parse --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.validateParse = {
  enable: true,
  package: 'egg-validate-parse',
};
```

see [egg-validate](https://github.com/eggjs/egg-validate) for base usage

### validate rule

```
rules.test = {
  id: { type: 'string', required: true, scope: 'params', name: 'innerId' }
}
```

+ `scope` means where to fetch the params (body | params | query | queries | state)
+ `name` means prop name in output object

### use in controller

```
ctx.validateParse(rules.test)
```

### output 

output is a object get all parsed params together.

see [test](config/) for more detail.

## Configuration

```js
// {app_root}/config/config.default.js
exports.validateParse = {
  defaultScope: 'body'
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/keepgoingwm/egg-validate-parse/issues).

## License

[MIT](LICENSE)
