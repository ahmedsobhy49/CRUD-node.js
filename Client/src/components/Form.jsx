import addProduct from "../services/addProduct";
import updateproduct from "../services/updateProduct";

import { queryClient } from "../App";
import { useMutation } from "react-query";

import { actionTypes } from "../App";

import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function Form({ state, dispatch }) {
  const { isLoading, mutate: mutateAdd } = useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-phones");
      toast.success("Product Added");
    },
  });

  const { mutate: mutateUpdate } = useMutation(updateproduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-phones");
      toast.success("Product Updated");
    },
  });

  function emptyInputsValue() {
    dispatch({ type: actionTypes.SET_NAME, payload: "" });
    dispatch({ type: actionTypes.SET_PRICE, payload: "" });
    dispatch({ type: actionTypes.SET_BRAND, payload: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Check if all fields are filled
    if (!state.name || !state.price || !state.brand) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: "All fields are required",
      });
      return; // Exit if fields are missing
    }

    // Check if name is at least 8 characters long
    if (state.name.length < 8) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: "Product Name should be at least 8 characters",
      });
      return; // Exit if name is too short
    }

    // If formState is 'add', call the add mutation
    if (state.formState === "add") {
      mutateAdd({
        name: state.name,
        price: state.price,
        brand: state.brand,
      });
    }
    // Otherwise, handle update
    else {
      mutateUpdate({
        id: state.id,
        name: state.name,
        price: state.price,
        brand: state.brand,
      });
      dispatch({ type: actionTypes.CHANGE_FORM_STATE, payload: "add" });
    }

    // Clear the error if everything is successful
    dispatch({ type: actionTypes.SET_ERROR, payload: "" });
    emptyInputsValue();
  }

  return (
    <div className="w-10/12">
      <form className="flex flex-col gap-8">
        <div className="flex flex-col w-full gap-1 ">
          <label
            htmlFor="name"
            className="text-gray-600 text-lg font-bold tracking-wide"
          >
            Product Name
          </label>
          <input
            value={state.name}
            onChange={(e) =>
              dispatch({ type: actionTypes.SET_NAME, payload: e.target.value })
            }
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            className="border border-gray-200 outline-none py-2 px-3 rounded-lg text-md text-gray-700 focus:border-gray-400 "
          />
        </div>
        <div className="flex flex-col w-full gap-1 ">
          <label
            htmlFor="price"
            className="text-gray-600 text-lg font-bold tracking-wide"
          >
            Price
          </label>
          <input
            value={state.price}
            onChange={(e) =>
              dispatch({ type: actionTypes.SET_PRICE, payload: e.target.value })
            }
            type="number"
            id="price"
            name="price"
            autoComplete="off"
            className="border border-gray-200 outline-none py-2 px-3 rounded-lg text-md text-gray-700 focus:border-gray-400 "
          />
        </div>
        <div className="flex flex-col w-full gap-1 ">
          <label
            htmlFor="brand"
            className="text-gray-600 text-lg font-bold tracking-wide"
          >
            Brand
          </label>
          <input
            value={state.brand}
            onChange={(e) =>
              dispatch({ type: actionTypes.SET_BRAND, payload: e.target.value })
            }
            type="text"
            id="brand"
            name="brand"
            autoComplete="off"
            className="border border-gray-200 outline-none py-2 px-3 rounded-lg text-md text-gray-700 focus:border-gray-400"
          />
        </div>
        {state.error && <p className="text-red-500"> {state.error}!</p>}
        <button
          onClick={handleSubmit}
          type="submit"
          className="mt-5 bg-green-600 text-white py-2 px-4 rounded-lg w-full hover:bg-green-500"
        >
          {isLoading ? (
            <RotatingLines width="20" />
          ) : state.formState == "add" ? (
            "Add"
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
}
