import axios from "axios";

export default async function deleteProduct({ id }) {
  return axios.delete("http://localhost:8000/deleteproduct", {
    params: { id },
  });
}
