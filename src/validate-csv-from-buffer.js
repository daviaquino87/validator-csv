const readline = require("readline");
const validateRowsByRule = require("./validate-row-by-rule");
const areEqualArrays = require("./utils/are-equal-arrays");

/**
 * Validates a CSV buffer based on a provided schema.
 *
 * @param {Buffer} buffer - The CSV data as a Buffer.
 * @param {string} separator - The CSV separator character.
 * @param {string[]} headers - The CSV headers.
 * @param {object} schema - The schema to be applied to the lines.
 * @returns {Promise} - A Promise that resolves with the validation results.
 */
async function validateCSVFromBuffer({ buffer, separator = ",", headers, schema }) {
  try {
    const data = buffer.toString("utf8");
    const lines = data.split("\n");

    let headersFile = [];
    let rows = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line === "") continue;

      if (i === 0) {
        headersFile = line.split(separator);

        if (!areEqualArrays(headers, headersFile)) {
          throw new Error("CSV headers do not match the expected headers.");
        }

        headersFile.push("error");
      } else {
        const rowSplitted = line.split(separator);

        const { errors } = await validateRowsByRule({ row: rowSplitted, schema, headers });
        rowSplitted.push(errors);
        rows.push(rowSplitted);
      }
    }

    return {
      headers,
      rows,
    };
  } catch (error) {
    throw new Error("Error validating CSV: " + error.message);
  }
}

module.exports = validateCSVFromBuffer;
