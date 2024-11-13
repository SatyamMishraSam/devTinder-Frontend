import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, gender, age, about, skills, photoURL } =
    user;
  const dispatch = useDispatch();

  const handleRequests = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (e) {}
  };
  //   console.log(user);
  return (
    user && (
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={photoURL} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button
              onClick={() => handleRequests("ignored", _id)}
              className="btn btn-primary"
            >
              Ignore
            </button>
            <button
              onClick={() => handleRequests("interested", _id)}
              className="btn btn-secondary"
            >
              Intereseted
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
