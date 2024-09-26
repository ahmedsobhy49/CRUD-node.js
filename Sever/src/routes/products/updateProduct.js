import { Router } from "express";
import { query } from "../../../db/db.js";

const updateProductRouter = Router();

updateProductRouter.put("/", (req, res) => {
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

export default updateProductRouter;
