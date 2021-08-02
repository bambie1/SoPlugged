import React from "react";
import { useForm } from "react-hook-form";

const Profile = ({ user, email, submitHandler }) => {
  const [infoChanged, setInfoChanged] = React.useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    setInfoChanged(false);
    await submitHandler(data);
  };

  return (
    <>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div item xs={12}>
            <input placeholder="Full name" />
          </div>
          <div item xs={12}>
            <input placeholder="E-mail" />
          </div>
          <div item xs={12}>
            <button type="submit">Update Profile</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Profile;
