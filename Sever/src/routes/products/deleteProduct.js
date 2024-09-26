import { Router } from "express";
import { query } from "../../../db/db.js";

const deleteProductRouter = Router();

deleteProductRouter.delete("/", (req, res) => {
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

export default deleteProductRouter;
