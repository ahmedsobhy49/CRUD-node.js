import { Router } from "express";
import { query } from "../../../db/db.js";

const getProductByIdRouter = Router();

getProductByIdRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  query.execute(`SELECT * FROM phones WHERE id=? `, [id], (error, data) => {
    if (error) {
      return res.status(500).json({ message: "Error getting data", error });
    }
    res.json({ message: "success", data });
  });
});

export default getProductByIdRouter;
