import React from "react";
import { Highlight, Snippet } from "react-instantsearch-dom";
import Link from "next/link";
import FavoriteButton from "../FavoriteButton";
import BusinessHeader from "../BusinessHeader";
import { useAuth } from "@contexts/authContext";
import styles from "styles/Directory.module.scss";

const AlgoliaHit = ({ hit }) => {
  const { user } = useAuth();
  const [likes, setLikes] = React.useState(0);
  let slug = hit.slug || "biz-slug";
  let res = fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/business?slug=${hit.slug}`
  )
    .then((r) => r.json())
    .then((business) => setLikes(business.number_of_likes));
  const businessOwner = user?.email === hit.creator.email;

  return (
    <div className={styles.hit_root}>
      <Link href={`/business/${slug}`}>
        <a className={styles.hit_root_link}>
          <BusinessHeader>
            {/* <Avatar alt="Business Logo" src={hit.logo_url}>
              {hit.business_name.toUpperCase().charAt(0)}
            </Avatar> */}
            <h6 className={styles.hit_business_name} noWrap={true}>
              <Highlight attribute="business_name" hit={hit} />
            </h6>
          </BusinessHeader>

          <p className={styles.hit_business_category}>
            <Highlight attribute="category" hit={hit} />
          </p>
          <div className={styles.hide_on_mobile}>
            <p style={{ marginBottom: "8px" }}>
              <Snippet attribute="business_description" hit={hit} />
            </p>
            <hr style={{ width: "20px", margin: "2px auto" }} />
          </div>
          <p className={styles.hit_business_location}>
            {hit.business_location}
          </p>
        </a>
      </Link>
      <div className={styles.hit_footer}>
        {!hit.fixed_to_one_location && (
          <span className={styles.canada_wide}>
            {/* <CheckIcon fontSize="small" style={{ height: "0.9rem" }} /> */}
            CANADA-WIDE
          </span>
        )}
        <FavoriteButton
          business_id={hit.id}
          user={user}
          numberOfLikes={likes}
          disabled={businessOwner}
          mini={true}
        />
      </div>
    </div>
  );
};

export default AlgoliaHit;
