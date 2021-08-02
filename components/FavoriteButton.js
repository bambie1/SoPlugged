import React, { useState, useEffect } from "react";
import Link from "next/link";
import { addFavorite, removeFavorite } from "src/addRemoveFavorite";
import { useRouter } from "next/router";
import * as Sentry from "@sentry/node";

const FavoriteButton = ({
  business_id,
  user,
  disabled,
  numberOfLikes,
  mini,
}) => {
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [likes, setLikes] = React.useState(numberOfLikes);
  const [messageInfo, setMessageInfo] = React.useState(undefined);
  const [favorites, setFavorites] = React.useState([]);
  const router = useRouter();

  let userLikedBusiness = false;
  useEffect(() => {
    let token = user?.za || null;
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/favorites`, {
        method: "GET",
        headers: {
          "Firebase-Token": token,
        },
      })
        .then((r) => r.json())
        .then((data) => setFavorites(data))
        .catch((err) => Sentry.captureException(err));
    }
  }, [user]);

  favorites.map((item) => {
    if (item.liked_business.id === business_id) userLikedBusiness = true;
  });

  const [liked, setLiked] = useState(userLikedBusiness);

  useEffect(() => {
    setLiked(userLikedBusiness);
  }, [userLikedBusiness]);

  useEffect(() => {
    setLikes(numberOfLikes);
  }, [numberOfLikes]);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleExited = () => {
    setMessageInfo(undefined);
  };
  const handleClick = async () => {
    if (!user?.email || disabled) {
      router.push("/join");
      return;
    }
    if (liked) {
      let res = await removeFavorite(business_id, user);
      if (!res.error) {
        handleFavorite("Removed from favorites");
        setLikes(likes - 1);
        setLiked(!liked);
      }
    } else {
      let res = await addFavorite(business_id, user);
      if (!res.error) {
        handleFavorite("Added to Favorites");
        setLikes(likes + 1);
        setLiked(!liked);
      }
    }
  };
  const handleFavorite = (message) => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };
  return (
    <>
      {/* <Tooltip title={liked ? "Remove from Favorites" : "Add to Favorites"}> */}
      <span style={{ marginLeft: mini ? "auto" : "initial" }}>
        {likes > 0 ? (
          <button
            onClick={handleClick}
            style={{
              marginTop: mini ? "auto" : "8px",
            }}
          >
            {mini ? likes : `Likes - ${likes} `}
          </button>
        ) : (
          <button
            onClick={handleClick}
            style={{ marginTop: mini ? "auto" : "8px" }}
          >
            -
          </button>
        )}
      </span>
      {/* </Tooltip> */}
    </>
  );
};

export default FavoriteButton;
