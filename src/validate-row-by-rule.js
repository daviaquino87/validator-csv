const Yup = require("yup");

function searchIndexOfColumValidate(headers, item) {
  const index = headers.findIndex((element) => element === item);

  if (index == -1) {
    throw new Error(`Column not found for the item ${item}`);
  }

  return index;
}

async function validateValueWithSchema(value, schema) {
  const errors = [];

  try {
    await schema.validate(value, { abortEarly: false });
  } catch (error) {
    error.inner.forEach((e) => {
      errors.push(e.message);
    });
  }

  return errors;
}

/**
 *
 * @param {any[]} row - The line with the data to be validated
 * @param {object} schema - The schema to be applied on the line
 * @param {string[]} headers - The CSV header
 */
async function validateRowsByRule({ row, schema, headers }) {
  const items = {};
  let errors = [];

  if (schema && schema.fields) {
    for (const rule of Object.keys(schema.fields)) {
      const headersExist = searchIndexOfColumValidate(headers, rule);
      items[rule] = row[headersExist];
    }

    errors = await validateValueWithSchema(items, schema);
  }

  return {
    errors,
  };
}

module.exports = validateRowsByRule;
