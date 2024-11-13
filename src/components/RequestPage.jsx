import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const RequestPage = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  //   console.log(requests);

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(_id));
    } catch (e) {
      console.log(e);
    }
  };

  const recievedRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res.data.connectionRequest));
    } catch (e) {}
  };

  useEffect(() => {
    recievedRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">No Requests Found</h1>
      </div>
    );

  return (
    requests && (
      <div className=" text-center my-10">
        <h1 className="text-bold text-white text-2xl">Requests: </h1>
        {requests.map((request) => {
          const {
            _id,
            firstName,
            lastName,
            about,
            age,
            gender,
            skills,
            photoURL,
          } = request.fromUserId;
          return (
            <div
              key={_id}
              className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
            >
              <div>
                <img
                  alt="photo"
                  src={photoURL}
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="text-left mx-4 ">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                Skills : {skills + " , "}
                <p> About: {about}</p>
              </div>
              <div>
                <button
                  onClick={() => reviewRequests("accepted", request._id)}
                  className="btn btn-success mx-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => reviewRequests("rejected", request._id)}
                  className="btn btn-primary mx-2"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default RequestPage;
