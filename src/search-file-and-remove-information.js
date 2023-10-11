const fs = require("fs");
const readline = require("readline");
const REGEX_WORD_WITH_SCAPE = /"([^"]+)"/g;

/**
 *
 * @param {String} filePath - The path to the csv file
 * @param {string} separator - The CSV separator caracter
 */

function searchFileAndRemoveInformation({ filePath, separator }) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath, { encoding: "utf8" });

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let isFirstLine = true;
    let headers = [];
    let rows = [];

    rl.on("line", (line) => {
      if (isFirstLine) {
        headers = line.split(separator);
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

        rows.push(rowWithReplaceBack);
      }
    });

    rl.on("close", () => {
      resolve({
        headers,
        rows,
      });
    });

    fileStream.on("error", (err) => {
      reject("Error reading file: " + err);
    });
  });
}

module.exports = searchFileAndRemoveInformation;
