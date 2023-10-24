const fs = require("node:fs");
const readline = require("readline");
const validateRowsByRule = require("./validate-row-by-rule");
const areEqualArrays = require("./utils/are-equal-arrays");

const REGEX_WORD_WITH_SCAPE = /"([^"]+)"/g;

/**
 * Validates a CSV file based on a provided schema.
 *
 * @param {String} filePath - The path to the CSV file.
 * @param {string} separator - The CSV separator character.
 * @param {string[]} headers - The CSV headers.
 * @param {object} schema - The scheme to be applied to the lines.
 * @returns {Promise} - A Promise that resolves with the validation results.
 */

async function validateCSV({ filePath, separator = ",", headers, schema }) {
  try {
    const fileStream = fs.createReadStream(filePath, { encoding: "utf8" });
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let isFirstLine = true;
    let headersFile = [];
    let rows = [];

    for await (const line of rl) {
      if (isFirstLine) {
        headersFile = line.split(separator);

        if (!areEqualArrays(headers, headersFile)) {
          throw new Error("CSV headers do not match the expected headers.");
        }

        headersFile.push("error");
        isFirstLine = false;
      } else {
        const rowSplitted = line
          .replace(REGEX_WORD_WITH_SCAPE, (_, group) => {
            return group.replace(/,/g, "scape@scape");
          })
          .split(separator);

        const rowWithReplaceBack = rowSplitted.map((item) => {
          return item.trim().replace(/scape@scape/g, separator);
        });

        const { errors } = await validateRowsByRule({ row: rowWithReplaceBack, schema, headers });
        rowWithReplaceBack.push(errors);
        rows.push(rowWithReplaceBack);
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

module.exports = validateCSV;
