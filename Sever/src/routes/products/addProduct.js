import { query } from "../../../db/db.js";
import { Router } from "express";

const addNewProductRouter = Router();
addNewProductRouter.post("/", (req, res) => {
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

export default addNewProductRouter;
