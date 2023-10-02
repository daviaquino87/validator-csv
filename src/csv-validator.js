const searchFileAndRemoveInformation = require("./search-file-and-remove-information");
const validateRowsByRule = require("./validate-row-by-rule");
const areEqualArrays = require("./utils/are-equal-arrays");

/**
 *
 * @param {Object.access} filePath - The path to the csv file
 * @param {string[]} headers - The CSV header
 * @param {string} separator - The CSV separator caracter
 * @param {object[]} rules - The set of rules to be applied on the line
 */

async function validateCSV({ filePath, headers, separator = ",", rules }) {
  const fileData = await searchFileAndRemoveInformation({
    filePath: filePath,
    separator: separator,
  });

  const rows = [];

  if (!areEqualArrays(headers, fileData.headers)) {
    throw new Error("invalid csv");
  }

  fileData.headers.push("mark", "error");

  await Promise.all(
    fileData.rows.map(async (row) => {
      const data = await validateRowsByRule(row, rules, fileData.headers);
      row.push(data.mark, data.errors);
      rows.push(row);
    })
  );

  return {
    headers: fileData.headers,
    rows: rows,
  };
}

module.exports = validateCSV;
