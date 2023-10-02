const fs = require("fs");

/**
 *
 * @param {String} filePath - The path to the csv file
 */

function searchFileAndRemoveInformation({ filePath }) {
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

            const headers = newArray[0].split(",");
            const rows = newArray.slice(1).map((element) => element.split(","));

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
