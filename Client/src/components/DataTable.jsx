import React from "react";
//
import fetchProducts from "../services/fetchProducts";
import deleteProduct from "../services/deleteProduct";
//
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../App";
//
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
//
import { actionTypes } from "../App";

export default function DataTable({ state, dispatch }) {
  const { data, isLoading } = useQuery(["get-phones", state.search], () => {
    return fetchProducts(state.search);
  });

  const phones = data?.data?.data;

  const { mutate: mutateDelete } = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-phones");
    },
  });

  function handleDelete(id) {
    mutateDelete({ id: id });
    toast.success("Product Deleted");
  }

  function moveDataToInputsWhenUpdate(product) {
    dispatch({ type: actionTypes.CHANGE_FORM_STATE, payload: "update" });
    dispatch({ type: actionTypes.SET_NAME, payload: product.name });
    dispatch({ type: actionTypes.SET_PRICE, payload: product.price });
    dispatch({ type: actionTypes.SET_BRAND, payload: product.brand });
    dispatch({ type: actionTypes.SET_ID, payload: product.id });
  }

  return (
    <div className="w-10/12">
      <div className="w-full">
        <table className=" bg-white shadow-md rounded-xl w-full">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">Product Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Brand</th>
              <th className="py-3 px-4 text-left">Edit</th>
              <th className="py-3 px-4 text-left">Delete</th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan="5" className="py-6">
                  <div className="flex justify-center items-center">
                    <RotatingLines width="60" />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="text-blue-gray-900">
              {phones?.map((phone) => {
                return (
                  <tr className="border-b border-blue-gray-200" key={phone.id}>
                    <td className="py-3 px-4">{phone.name}</td>
                    <td className="py-3 px-4">${phone.price}</td>
                    <td className="py-3 px-4">{phone.brand.toUpperCase()}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => moveDataToInputsWhenUpdate(phone)}
                        className="font-medium text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(phone.id)}
                        className="font-medium text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
