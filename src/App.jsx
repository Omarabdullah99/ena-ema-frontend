import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/UserSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // CSS ইমপোর্ট করুন

const App = () => {
  const dispatch = useDispatch();

  //!register/login korar por refresh korle oita chole jay. ai problem solve korar jonno
  const user = JSON.parse(localStorage.getItem("ecoomerce"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
