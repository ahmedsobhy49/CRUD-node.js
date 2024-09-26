import axios from "axios";

export default async function addProduct(product) {
  return await axios.post("http://localhost:8000/products", product, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
