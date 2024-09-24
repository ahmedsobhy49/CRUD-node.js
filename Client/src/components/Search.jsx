import React from "react";
import { actionTypes } from "../App";

export default function Search({ state, dispatch }) {
  return (
    <div className="w-10/12">
      <input
        value={state.search}
        onChange={(e) =>
          dispatch({ type: actionTypes.SET_SEARCH, payload: e.target.value })
        }
        placeholder="Search by Product Name"
        type="text"
        id="search"
        name="search"
        autoComplete="off"
        className="border w-full border-gray-200 outline-none py-3 px-5 rounded-lg text-md text-gray-700 focus:border-gray-400 placeholder:text-gray-300 "
      />
    </div>
  );
}
