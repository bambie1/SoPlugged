import React from "react";
import Profile from "@components/dashboard/Profile";
import DashboardLayout from "@components/dashboard/DashboardLayout";
import { editUser, addUser, getUser } from "src/handleDBUser";
import nookies from "nookies";
import { verifyIdToken } from "../../utils/firebaseAdmin";

const ProfilePage = ({ user, token, email }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = async (data) => {
    let res = null;
    data.email = email;
    if (user !== null) res = await editUser(data, token);
    else res = await addUser(data, token);
    if (res && !res.error) setOpen(true);
  };
  return (
    <>
      <DashboardLayout title="My Profile | SoPlugged" position={2}>
        <Profile user={user} email={email} submitHandler={handleSubmit} />
      </DashboardLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    if (token?.email) {
      const user = await getUser(cookies.token);
      return {
        props: { user, token: cookies.token, email: token.email },
      };
    } else throw new Error("no token found");
  } catch (error) {
    return {
      redirect: {
        destination: "/join",
        permanent: false,
      },
    };
  }
}

export default ProfilePage;
