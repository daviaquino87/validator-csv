const { isCPF, isCNPJ } = require("brazilian-values");

function validateCPF(cpf) {
  if (!isCPF(cpf)) {
    return "The CPF entered is invalid";
  }
}

function validateCNPJ(cnpj) {
  if (!isCNPJ(cnpj)) {
    return "The CNPJ entered is invalid";
  }
}

const functionValidate = {
  validateCNPJ,
  validateCPF,
};

module.exports = functionValidate;
