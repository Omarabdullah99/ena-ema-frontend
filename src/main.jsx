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
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/CheckoutPage.jsx";
import OrderSuccessPage from "./pages/OrderSuccess.jsx";
import MyOrders from "./pages/MyOrder.jsx";
import AdminHome from "./pages/Admin/AdminHome.jsx";
import { ProtectedAdmin } from "./protected/AdminProtected.jsx";
import AdminProductDetails from "./pages/Admin/AdminProductDetails.jsx";
import AdminProductForm from "./pages/Admin/AdminProductForm.jsx";
import AdminOrders from "./pages/Admin/AdminOrder.jsx";
import WishList from "./pages/WishList.jsx";



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
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      
      {
        path: "/order-success/:id",
        element: <OrderSuccessPage />,
      },

      {
        path:"/my-orders",
        element:<MyOrders />
      },
      {
        path:"/my-wishList",
        element:<WishList />
      },

       //admin path link start
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },

  {
    path: "/adminproductdetails/:id",
    element: <AdminProductDetails />,
  },

  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductForm></AdminProductForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductForm></AdminProductForm>
      </ProtectedAdmin>
    ),
  },

  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrders />
      </ProtectedAdmin>
    ),
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
