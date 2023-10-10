const fs = require("fs");

/**
 *
 * @param {String} filePath - The path to the csv file
 * @param {string} separator - The CSV separator caracter
 */

function searchFileAndRemoveInformation({ filePath, separator }) {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        reject("file not found.");
      } else {
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            reject("error to read file:" + err);
          } else {
            const newArray = data.split("\r\n");

            const headers = newArray[0].split(separator);
            const rows = [];

            newArray.splice(1).forEach((element) => {
              rows.push(parseCSVRow(element, separator));
            });

            resolve({
              headers,
              rows,
            });
          }
        });
      }
    });
  });
}

function parseCSVRow(row, separator) {
  const items = [];
  let inQuotes = false;
  let currentItem = "";

  for (let i = 0; i < row.length; i++) {
    const char = row[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === separator && !inQuotes) {
      items.push(currentItem.trim());
      currentItem = "";
    } else {
      currentItem += char;
    }
  }

  items.push(currentItem.trim());

  return items;
}

module.exports = searchFileAndRemoveInformation;
