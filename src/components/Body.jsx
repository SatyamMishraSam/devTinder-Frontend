import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  // Authentivation of user so if user logs in , it shd not be logged out on page referesh

  const fetchUser = async () => {
    // TO avoid api call again and again because once user logs in we will have the data in store
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (e) {
      if (e.status === 401) {
        navigate("/login");
      }
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      {/* Body children has to run in the outlet */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
