import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, gender, age, about, skills, photoURL } = user;
//   console.log(user);
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Intereseted</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
