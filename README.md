# validator-csv

[![npm version][npm-version-image]][npm-package-uri]
[![License][license-image]][license-uri]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]
[![GitHub Issues][github-issues-image]][github-issues-uri]

The "Validator CSV" package is a powerful and easy-to-use tool for checking the integrity and quality of CSV files. With it, you can ensure that your CSV files are well formatted, meet header specifications, and meet your application's specific requirements.

## Installation

You can install this package via npm. Make sure you have Node.js installed.

```bash
npm i validator-csv
```

## Usage
To use validator-csv follow the example

```js
const validator = require('validator-csv');
const Yup = require("yup");
const path = require("node:path");

const filePath = path.resolve(__dirname, "uploads", "clientes.csv");

const validationSchema = Yup.object().shape({
  age: Yup.number().min(18, "Invalid age, the customer must be over 18 years old.").required("The field age is required."),
});

validator.validateCSV({
  filePath: filePath,
  headers: ["name", "age", "gender"],
  schema: validationSchema,
}).then((data) => {
  console.log(data);
});

/*
data:{
  headers: ["name","age","gender","erros"],
  rows: [
    ["John Smith",18,"male",[]],
  ]
}
*/
```

### info:

By default, the separator parameter is set to a comma (","), but this setting can be modified by the user as needed.

Important Note About the Escape Character

When the text is encapsulated in double quotes ("), the separator will not impact the lines, thus ensuring the integrity of the data contained in the quotes.

ex: 
```js
validator.validateCSV({
  filePath: filePath,
  headers: ["name", "age", "gender"],
  separator: ";",
  schema: validationSchema,
}).then((data) => {
  console.log(data);
});
```


## Validation functions

Example of custom function with yup

```js
const validationSchema = Yup.object().shape({
  age: Yup.number().test("validate-age","Invalid age, the customer must be over 18 years old.",(element) => {
    element >= 18
  })
});
```

## Examples

To view the examples, clone the Express repo and install the dependencies:

```sh
$ git clone --branch examples https://github.com/daviaquino87/validator-csv 

$ cd validator-csv

$ npm install

$ npm run start
```

# People

The original author of validator-csv is [Davi Aquino](https://github.com/daviaquino87).

## Licença

[MIT](LICENSE.md).


[npm-downloads-image]: https://badgen.net/npm/dm/express
[npm-downloads-url]: https://npmcharts.com/compare/validator-csv?minimal=true
[npm-version-image]: https://img.shields.io/npm/v/validator-csv
[npm-package-uri]: https://www.npmjs.com/package/validator-csv
[license-image]: https://img.shields.io/npm/l/validator-csv
[license-uri]: https://github.com/daviaquino87/seu-pacote/blob/main/LICENSE
[github-issues-image]: https://img.shields.io/github/issues/daviaquino87/validator-csv
[github-issues-uri]: https://github.com/daviaquino87/validator-csv/issues