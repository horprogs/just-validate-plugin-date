# JustValidate plugin date

[![codecov](https://codecov.io/gh/horprogs/Just-validate-plugin-date/branch/master/graph/badge.svg?token=O6DXXL5TUU)](https://codecov.io/gh/horprogs/Just-validate)
<a href="https://bundlephobia.com/result?p=just-validate-plugin-date@latest" target="\_parent">
<img alt="" src="https://badgen.net/bundlephobia/minzip/just-validate-plugin-date@latest" />
</a>

[//]: # '[![Codacy Badge](https://app.codacy.com/project/badge/Grade/6c7a25cc9fdb4bf8869884339418352d)](https://www.codacy.com/gh/horprogs/Just-validate/dashboard?utm_source=github.com&utm_medium=referral&utm_content=horprogs/Just-validate&utm_campaign=Badge_Grade)'

[![Known Vulnerabilities](https://snyk.io/test/github/horprogs/Just-validate-plugin-date/badge.svg)](https://snyk.io/test/github/horprogs/Just-validate-plugin-date)
[![Release workflow](https://github.com/horprogs/Just-validate-plugin-date/workflows/Test%20and%20Release/badge.svg)](https://github.com/horprogs/Just-validate-plugin-date/actions)

Date validation plugin for JustValidate library

## Installation

### npm

```shell
npm install just-validate-plugin-date --save
```

### yarn

```shell
yarn add just-validate-plugin-date
```

And then use it as an imported module:

```js
import JustValidatePluginDate from 'just-validate-plugin-date';
```

Or if you don't use module bundlers, just include JustValidatePluginDate script on your page from CDN and call it as `window.JustValidatePluginDate`:

```html
<script src="https://unpkg.com/just-validate@latest/dist/just-validate-plugin-date.production.min.js"></script>
```

## Usage

This plugin is supposed to use together with JustValidate library. It takes 1 argument: function which returns the validation config.

Check more details and examples here: https://github.com/horprogs/Just-validate

```js
JustValidatePluginDate((fields) => ({
  format: 'dd/MM/yyyy',
  isAfter: fields['#date_after'].elem.value,
  isBefore: fields['#date_before'].elem.value,
}));
```

```js
import JustValidatePluginDate from 'just-validate-plugin-date';

validator.addField('#date', [
  {
    plugin: JustValidatePluginDate((fields) => ({
      format: 'dd/MM/yyyy',
      isAfter: '',
    })),
  },
]);
```
