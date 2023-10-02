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
            const rows = newArray.slice(1).map((element) => element.split(separator));

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

module.exports = searchFileAndRemoveInformation;
