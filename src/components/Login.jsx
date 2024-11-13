import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      // console.log(res);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (e) {
      console.log(e);
      setError(e?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, password, email },
        { withCredentials: true }
      );
      console.log(res.data);

      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (e) {
      setError(e?.response?.data || "Something went wrong");
    }
  };

  return (
    <div class="bg-base-100 font-[sans-serif]">
      <div class="py-20 flex flex-col items-center justify-center ">
        <div class="max-w-md w-full">
          <div class="p-8 rounded-2xl bg-base-300 shadow">
            <h2 class="text-gray text-center text-2xl font-bold">
              {isLoggedIn ? "Sign in" : "Sign Up"}
            </h2>
            <form class="mt-8 space-y-4">
              {!isLoggedIn && (
                <>
                  <div>
                    <label class="text-graytext-sm mb-2 block">
                      First Name :{" "}
                    </label>

                    <div class="relative flex items-center">
                      <input
                        name="Email"
                        type="email"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        class="w-full text-gray text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="text-graytext-sm mb-2 block">
                      Last Name :{" "}
                    </label>

                    <div class="relative flex items-center">
                      <input
                        name="lastName"
                        type="email"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        class="w-full text-gray text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label class="text-graytext-sm mb-2 block">Email : </label>

                <div class="relative flex items-center">
                  <input
                    name="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    class="w-full text-gray text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  />
                </div>
              </div>

              <div>
                <label class="text-gray text-sm mb-2 block">Password : </label>
                <div class="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    class="w-full text-gray text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  />
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="text-sm">
                  <p
                    href="jajvascript:void(0);"
                    class="text-red-500 hover:underline font-semibold"
                  >
                    {error}
                  </p>
                </div>
              </div>

              <div class="!mt-8">
                <button
                  type="button"
                  class="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  onClick={isLoggedIn ? handleSignIn : handleSignup}
                >
                  {isLoggedIn ? "Sign in" : "Sign Up"}
                </button>
              </div>
              {isLoggedIn ? (
                <p class="text-gray text-sm !mt-8 text-center">
                  Don't have an account?{" "}
                  <a
                    href="javascript:void(0);"
                    class="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                    onClick={() => setIsLoggedIn((value) => !value)}
                  >
                    Register here
                  </a>
                </p>
              ) : (
                <p class="text-gray text-sm !mt-8 text-center">
                  Already have an account?{" "}
                  <a
                    href="javascript:void(0);"
                    class="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                    onClick={() => setIsLoggedIn((value) => !value)}
                  >
                    Login here
                  </a>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
