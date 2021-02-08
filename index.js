require("dotenv").config();
const express = require("express");
const massive = require("massive");
const proucts_ctrl = require("./product_controller");

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((dbInstance) => {
    app.set("db", dbInstance);
    console.log("db connected");
  })
  .catch((err) => console.log(err));

app.use(express.json());

app.post("/api/products", proucts_ctrl.create);
app.get("/api/products", proucts_ctrl.getAll);
app.get("/api/products/:id", proucts_ctrl.getOne);
app.put("/api/products/:id", proucts_ctrl.update);
app.delete("/api/products/:id", proucts_ctrl.delete);

app.listen(SERVER_PORT, () => {
  console.log(`server listening on port ${SERVER_PORT}.`);
});
