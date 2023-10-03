const path = require("path");
const validator = require("validator-csv");

const express = require("express");
const ejs = require("ejs");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

const filePath = path.resolve(__dirname, "..", "uploads", "customers.csv");

function validateAge(age) {
  if (age < 18) {
    return "Invalid age, the customer must be over 18 years old.";
  }
}

async function bootstrap() {
  const data = await validator.validateCSV({
    filePath: filePath,
    headers: ["name", "age", "gender"],
    rules: [
      {
        field: "age",
        functionToTest: validateAge,
      },
    ],
  });

  const headers = data.headers;
  const rows = data.rows.map(([name, age, gender, mark, error]) => ({
    name,
    age,
    gender,
    mark,
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
