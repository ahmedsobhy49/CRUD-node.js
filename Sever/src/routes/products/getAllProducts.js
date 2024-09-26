import { query } from "../../../db/db.js";
import { Router } from "express";

const getAllProductsRouter = Router();

getAllProductsRouter.get("/", (req, res) => {
  const searchQuery = req.headers["searchquery"];
  query.execute(
    `SELECT * FROM phones WHERE name LIKE ?`,
    [`%${searchQuery}%`],
    (error, data) => {
      if (error) {
        return res.status(500).json({ message: "Error getting data", error });
      }
      res.json({ message: "success", data });
    }
  );
});

export default getAllProductsRouter;
