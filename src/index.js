const path = require("path");
const validator = require("validator-csv");
const ejs = require("ejs");
const Yup = require("yup");

const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

const filePath = path.resolve(__dirname, "..", "uploads", "customers.csv");

const validationSchema = Yup.object().shape({
  age: Yup.number().min(18, "Invalid age, the customer must be over 18 years old.").required("The field age is required."),
});

async function bootstrap() {
  const data = await validator.validateCSV({
    filePath: filePath,
    headers: ["name", "age", "gender"],
    schema: validationSchema,
  });

  const headers = data.headers;
  const rows = data.rows.map(([name, age, gender, error]) => ({
    name,
    age,
    gender,
    error,
  }));

  app.get("/", (req, res) => {
    res.render("index", { headers, rows });
  });

  app.listen(PORT, () => {
    console.log(`server running on PORT: ${PORT}`);
  });
}

bootstrap();
