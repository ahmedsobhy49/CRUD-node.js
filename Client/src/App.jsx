import { useReducer } from "react";
import Form from "./components/Form";
import Search from "./components/Search";
import DataTable from "./components/DataTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider, QueryClient } from "react-query";

export const queryClient = new QueryClient();

// initial state
const initialState = {
  name: "",
  price: "",
  brand: "",
  error: "",
  search: "",
  id: null,
  formState: "add",
};

export const actionTypes = {
  SET_NAME: "SET_NAME",
  SET_PRICE: "SET_PRICE",
  SET_BRAND: "SET_BRAND",
  SET_ERROR: "SET_ERROR",
  SET_ID: "SET_ID",
  SET_SEARCH: "SET_SEARCH",
  CHANGE_FORM_STATE: "CHANGE_FORM_STATE",
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // reducer
  function reducer(state = initialState, action) {
    switch (action.type) {
      case actionTypes.SET_NAME:
        return { ...state, name: action.payload };
      case actionTypes.SET_PRICE:
        return { ...state, price: action.payload };
      case actionTypes.SET_BRAND:
        return { ...state, brand: action.payload };
      case actionTypes.SET_ERROR:
        return { ...state, error: action.payload };
      case actionTypes.CHANGE_FORM_STATE:
        return { ...state, formState: action.payload };
      case actionTypes.SET_ID:
        return { ...state, id: action.payload };
      case actionTypes.SET_SEARCH:
        return { ...state, search: action.payload };
      default:
        return { state };
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col gap-10 min-h-screen  items-center justify-center py-10">
        <Form state={state} dispatch={dispatch} />
        <Search state={state} dispatch={dispatch} />
        <DataTable state={state} dispatch={dispatch} />
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}
