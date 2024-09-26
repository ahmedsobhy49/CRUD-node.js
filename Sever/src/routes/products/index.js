import { Router } from "express";
import getAllProductsRouter from "./getAllProducts.js";
import getProductByIdRouter from "./getProductById.js";
import updateProductRouter from "./updateProduct.js";
import deleteProductRouter from "./deleteProduct.js";
import addNewProductRouter from "./addProduct.js";

const productsRouter = Router();

productsRouter.use("/", getAllProductsRouter);
productsRouter.use("/", getProductByIdRouter);
productsRouter.use("/", updateProductRouter);
productsRouter.use("/", deleteProductRouter);
productsRouter.use("/", addNewProductRouter);

export default productsRouter;
