import React from "react";
import Favorites from "@/components/Favorites";
import DashboardLayout from "@/components/DashboardLayout";
import nookies from "nookies";
import { verifyIdToken } from "../../utils/firebaseAdmin";

const FavoritesPage = ({ favorites }) => {
  return (
    <>
      <DashboardLayout title="My Dashboard | SoPlugged" position={1}>
        <Favorites data={favorites} />
      </DashboardLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/favorites`;

    if (token?.email) {
      const res = await fetch(fetchUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Firebase-Token": cookies.token,
        },
      });
      if (!res.ok)
        return {
          props: {
            favorites: [],
          },
        };
      const favorites = await res.json();
      return {
        props: {
          favorites,
        },
      };
    } else throw new Error("No token found");
  } catch (error) {
    context.res.writeHead(302, { location: "/join" });
    context.res.end();
    return { props: {} };
  }
}

export default FavoritesPage;
