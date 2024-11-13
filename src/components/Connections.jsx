import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { connect, useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      //   console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (e) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">No Connections Found</h1>
      </div>
    );

  return (
    <div className=" text-center my-10">
      <h1 className="text-bold text-white text-2xl">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, about, age, gender, skills, photoURL } =
          connection;
        return (
          <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
