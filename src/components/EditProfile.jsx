import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [age, setAge] = useState(user.age || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoURL,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setInterval(() => {
        setShowToast(false);
      }, 3000);
    } catch (e) {
      console.log(e.response.data);
      setError(e.response.data);
    }
  };

  return (
    <>
      <div class="bg-base-100 font-[sans-serif] my-10">
        <div class="flex flex-col items-center justify-center mx-32">
          <div class="max-w-md w-full">
            <div class="p-8 rounded-2xl bg-base-300 shadow">
              <h2 class="text-gray text-center text-2xl font-bold">
                Update Your Profile
              </h2>
              <form class="mt-8 space-y-4">
                <div>
                  <label class="text-graytext-sm mb-2 block">
                    First Name :
                  </label>
                  <div class="relative flex items-center">
                    <input
                      name="firstName"
                      type="email"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      class="w-full text-gray text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label class="text-gray text-sm mb-2 block">
                    Last Name :
                  </label>
                  <div class="relative flex items-center">
                    <input
                      name="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      class="w-full text-gray text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    />
                  </div>
                </div>
                <div>
                  <label class="text-gray text-sm mb-2 block">
                    Photo URL :
                  </label>
                  <div class="relative flex items-center">
                    <input
                      name="photoURL"
                      type="text"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      required
                      class="w-full text-gray text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    />
                  </div>
                </div>
                <div>
                  <label class="text-gray text-sm mb-2 block">Age :</label>
                  <div class="relative flex items-center">
                    <input
                      name="age"
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                      class="w-full text-gray text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    />
                  </div>
                </div>
                <div>
                  <label class="text-gray text-sm mb-2 block">Gender :</label>
                  <div class="relative flex items-center">
                    <input
                      name="gender"
                      type="text"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                      class="w-full text-gray text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label class="text-gray text-sm mb-2 block">About :</label>
                  <div class="relative flex items-center">
                    <input
                      name="about"
                      type="text"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      required
                      class="w-full text-gray text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    />
                  </div>
                </div>

                <p>{error}</p>

                <div class="!mt-8">
                  <button
                    type="button"
                    class="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    onClick={saveProfile}
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
