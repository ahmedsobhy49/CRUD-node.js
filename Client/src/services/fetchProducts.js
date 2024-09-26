import axios from "axios";

export default async function fetchProducts(searchQuery) {
  console.log("fetching");

  return await axios("http://localhost:8000/products", {
    headers: { searchquery: searchQuery },
  });
}
