/**
 *
 * @param {string[]} array1 - The array model
 * @param {string[]} array2 - The array to be compar
 */

function areEqualArrays(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}
/**
 *
 * @param {string} filePath - The path to the csv file
 * @param {string[]} headers - The CSV header
 * @param {object[]} rules - The set of rules to be applied on the line
 */

module.exports = areEqualArrays;
