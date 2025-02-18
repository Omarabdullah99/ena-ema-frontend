import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ProductList from "./components/ProductList.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/productlist",
        element: <ProductList />,
      },
      {
        path: "/productdetails/:id",
        element: <ProductDetails />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
