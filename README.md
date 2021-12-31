# JustValidate plugin date

[![codecov](https://codecov.io/gh/horprogs/just-validate-plugin-date/branch/main/graph/badge.svg?token=B98J47L4YI)](https://codecov.io/gh/horprogs/just-validate-plugin-date)
<a href="https://bundlephobia.com/result?p=just-validate-plugin-date@latest" target="\_parent">
<img alt="" src="https://badgen.net/bundlephobia/minzip/just-validate-plugin-date@latest" />
</a>
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/f730fb9086964a74b2b01e56c3d8efe9)](https://www.codacy.com/gh/horprogs/just-validate-plugin-date/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=horprogs/just-validate-plugin-date&amp;utm_campaign=Badge_Grade)
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
  required: true,
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
