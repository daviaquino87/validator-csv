# validator-csv

[![npm version](https://img.shields.io/npm/v/validator-csv)](https://www.npmjs.com/package/validator-csv)
[![License](https://img.shields.io/npm/l/validator-csv)](https://github.com/daviaquino87/seu-pacote/blob/main/LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/daviaquino87/validator-csv)](https://github.com/daviaquino87/validator-csv/issues)

The "Validator CSV" package is a powerful and easy-to-use tool for checking the integrity and quality of CSV files. With it, you can ensure that your CSV files are well formatted, meet header specifications, and meet your application's specific requirements.

## Installation

You can install this package via npm. Make sure you have Node.js installed.

```bash
npm i validator-csv
```

## Usage
To use csv-validator follow the example

```js
const validator = require('validator-csv');
const path = require("path");

const filePath = path.resolve(__dirname, "uploads", "clientes.csv");

validator.validateCSV({
  filePath: filePath,
  headers: ["Nome", "Idade", "CPF"],
  rules: [
    {
      field: "CPF",
//____________________validation functions must be informed here
      functionToTest: validator.functionsValidate.validateCPF,
    },
  ],
}).then((data) => {
  console.log(data);
});
```

### info:

By default the separator parameter comes as "," however it can be changed.

ex: 
```js
validator.validateCSV({
  filePath: filePath,
  headers: ["Nome", "Idade", "CPF"],
  separator: ";",
  rules: [
    {
      field: "CPF",
      functionToTest: validator.functionsValidate.validateCPF,
    },
  ],
}).then((data) => {
  console.log(data);
});
```


## Validation functions

Follow the example of the function below, where if it finds an error, it returns a text with the description, and if it doesn't find it, it doesn't return anything

```js
function validateCPF(cpf) {
  if (!isCPF(cpf)) {
    return "The CPF entered is invalid";
  }
}
```


## Licença

[MIT](LICENSE.md).

