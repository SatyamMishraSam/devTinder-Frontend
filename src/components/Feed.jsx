import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // console.log(feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      if (feed) return; //dont make the call again and again so if the data is there then dont make the api call
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-center my-32">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
