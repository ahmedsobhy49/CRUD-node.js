import { createConnection } from "mysql2";

export const query = createConnection({
  port: "localhost",
  user: "root",
  password: "",
  database: "products",
});
