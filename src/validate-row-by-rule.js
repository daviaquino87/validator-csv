function searchIndexOfColumValidate(headers, item) {
  const index = headers.findIndex((element) => element === item);

  if (index == -1) {
    throw new Error(`Não foi encontrada uma coluna referente a ${item} `);
  }

  return index;
}

/**
 *
 * @param {any[]} row - The line with the data to be validated
 * @param {object[]} rules - The set of rules to be applied on the line
 * @param {string[]} headers - The CSV header
 */

async function validateRowsByRule(row, rules, headers) {
  const errors = [];

  rules.forEach((rule) => {
    const headersExist = searchIndexOfColumValidate(headers, rule.field);

    const testRow = rule.functionToTest(row[headersExist]);

    if (testRow) {
      errors.push(testRow);
    }
  });

  return {
    errors,
    mark: errors.length > 0 ? true : false,
  };
}

module.exports = validateRowsByRule;
