import axios from "axios";

export default async function updateproduct(product) {
  return await axios.put("http://localhost:8000/updateproduct", product);
}
