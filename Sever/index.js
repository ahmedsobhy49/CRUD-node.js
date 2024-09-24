const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");

const query = mysql2.createConnection({
  port: "localhost",
  user: "root",
  password: "",
  database: "products",
});

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "searchquery"],
  })
);
app.listen(8000, () => {
  console.log("server is running");
});

app.get("/phones", (req, res) => {
  const searchQuery = req.headers["searchquery"];
  query.execute(
    `SELECT * FROM phones WHERE name LIKE ?`,
    [`%${searchQuery}%`],
    (error, data) => {
      if (error) {
        return res.status(500).json({ message: "Error getting data", error });
      }
      res.json(data);
    }
  );
});

/*
app.get("/phones", (req, res) => {
  const searchQuery = req.headers["searchquery"] || "";
  let sqlQuery = `SELECT * FROM phones`;
  let params = [];
  if (searchQuery) {
    sqlQuery += ` WHERE name LIKE ?`;
    params.push(`%${searchQuery}%`);
  }
  console.log("SQL Query:", sqlQuery, params); // Log the query and params
  query.execute(sqlQuery, params, (error, data) => {
    if (error) {
      return res.status(500).json({ message: "Error getting data", error });
    }
    res.json(data);
  });
});
*/
app.post("/addnewproduct", (req, res) => {
  const { name, price, brand } = req.body;
  query.execute(
    `insert into phones (name,price,brand) values (?,?,?)`,
    [name, price, brand],
    (error, data) => {
      if (error) {
        res.status(500).json({ message: "Error inserting data", error });
        return;
      }
      res.json({
        message: "success",
      });
    }
  );
});

app.delete("/deleteproduct", (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.json({
      message: "cannot find product with this id",
    });
  }
  query.execute("delete from phones where id = ?", [id], (error, data) => {
    if (error) {
      return res.status(500).json({ message: "Error deleting data", error });
    }
    res.json({
      message: "success",
    });
  });
});

app.put("/updateproduct", (req, res) => {
  const { id, name, price, brand } = req.body;
  query.execute(
    `UPDATE phones SET name=?, price=?, brand=? WHERE id=?`,
    [name, price, brand, id],
    (error, data) => {
      if (error) {
        res.status(500).json({ message: "Error updating data", error });
        return;
      }
      res.json({
        message: "update success",
        data,
      });
    }
  );
});
