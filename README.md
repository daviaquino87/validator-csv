# validator-csv

[![npm version](https://img.shields.io/npm/v/seu-pacote)](https://www.npmjs.com/package/seu-pacote)
[![License](https://img.shields.io/npm/l/seu-pacote)](https://github.com/seu-usuario/seu-pacote/blob/main/LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/seu-usuario/seu-pacote)](https://github.com/seu-usuario/seu-pacote/issues)

The "Validator CSV" package is a powerful and easy-to-use tool for checking the integrity and quality of CSV files. With it, you can ensure that your CSV files are well formatted, meet header specifications, and meet your application's specific requirements.

## Installation

You can install this package via npm. Make sure you have Node.js installed.

```bash
npm i validator-csv
```

## Usage
To use csv-validator follow the example

```js
const validator = require('csv-validator');
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

