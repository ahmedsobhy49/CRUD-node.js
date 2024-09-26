import express, { json } from "express";
import cors from "cors";
import productsRouter from "./src/routes/products/index.js";

export const app = express();

app.use(json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "searchquery"],
  })
);

app.use("/products", productsRouter);

app.listen(8000, () => {
  console.log("server is running");
});
