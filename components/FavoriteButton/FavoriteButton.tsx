import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "@/context/authContext";
import { addFavorite } from "@/utils/addFavorite";
import { swrFetchWithToken } from "@/utils/swrFetchWithToken";

import styles from "./FavoriteButton.module.scss";
import { removeFavorite } from "@/utils/removeFavorite";

interface Props {
  businessId: any;
}
const FavoriteButton: FC<Props> = ({ businessId }) => {
  const { user } = useAuth();
  const [userLikesBusiness, setUserLikesBusiness] = useState(false);

  const { data: favorites, error } = useSWR(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/favorites`,
    swrFetchWithToken
  );

  useEffect(() => {
    let userLikedBusiness = false;

    if (favorites) {
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].liked_business.id === businessId) {
          userLikedBusiness = true;
          break;
        }
      }
      setUserLikesBusiness(userLikedBusiness);
    }
  }, [favorites, businessId]);

  const handleClick = async () => {
    setUserLikesBusiness(!userLikesBusiness);
    if (userLikesBusiness) {
      const res = await removeFavorite(businessId, user);
    } else {
      const res = await addFavorite(businessId, user);
    }
  };

  if (userLikesBusiness)
    return (
      <button onClick={handleClick} className="button outlined withIcon">
        <FontAwesomeIcon icon={faHeartFilled} />
        Added to Favorites
      </button>
    );

  return (
    <button onClick={handleClick} className="button outlined withIcon">
      <FontAwesomeIcon icon={faHeart} />
      Add to Favorites
    </button>
  );
};

export default FavoriteButton;
