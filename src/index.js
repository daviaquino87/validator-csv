const validateCSV = require("./validate-csv");
const validateCSVFromBuffer = require("./validate-csv-from-buffer");

const validator = {
  validateCSV,
  validateCSVFromBuffer,
};

module.exports = validator;
