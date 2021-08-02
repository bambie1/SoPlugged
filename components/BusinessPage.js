import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import ImageGallery from "react-image-gallery";
import { useSearch } from "@contexts/searchContext";
import { useRouter } from "next/router";
import Link from "next/link";
import BusinessHeader from "./BusinessHeader";
import dynamic from "next/dynamic";

const DynamicContact = dynamic(() => import("./ContactForm"));
const DynamicFavorite = dynamic(() => import("./FavoriteButton"));

const BusinessPage = ({ business, user }) => {
  const { setContextCategory } = useSearch();
  const router = useRouter();

  const {
    id,
    business_name,
    business_location,
    logo_url,
    sample_images,
    category,
    creator,
    business_description,
    business_url,
    fixed_to_one_location,
    street_address,
    ig_handle,
    number_of_likes,
    phone_number,
    verified,
  } = business;

  let images = sample_images?.split(",") || [];
  images = images.map((item) => ({ original: item, thumbnail: item }));
  let hasPreview = images.length !== 0 && images[0]?.original?.length !== 0;
  const pageOwner = user?.email === creator.email;

  const handleCategoryClick = () => {
    setContextCategory(category);
    router.push("/search");
  };

  return (
    <div>
      <BusinessHeader wrap={true}>
        <div>
          <h1>{business_name.toUpperCase()}</h1>
        </div>
      </BusinessHeader>
      {!verified && (
        <span>This business hasn't been claimed by it's owner</span>
      )}

      {category && (
        <h6>
          CATEGORY: <span onClick={handleCategoryClick}>{category}</span>
        </h6>
      )}

      <p>
        {street_address &&
          fixed_to_one_location &&
          `LOCATION: ${street_address}`}
        {street_address && fixed_to_one_location && <br></br>}
        {business_location}
        {!fixed_to_one_location && <span>CANADA-WIDE</span>}
      </p>
      <div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              maxWidth: "700px",
              margin: "auto",
            }}
          >
            {hasPreview && (
              <>
                <ImageGallery items={images} showPlayButton={false} />
                <br></br>
              </>
            )}
            {business_description && (
              <>
                <p>
                  <span>ABOUT BUSINESS:</span>
                </p>
                <div
                  dangerouslySetInnerHTML={{ __html: business_description }}
                ></div>
                <br></br>
              </>
            )}

            {!hasPreview && verified && (
              <div
                style={{
                  marginTop: "40px",
                  padding: "8px 40px 16px",
                  borderRadius: "5px",
                  background: "#fffaf2",
                }}
              >
                <p>Would you recommend this business? Give it a like!</p>
                <br></br>
                <DynamicFavorite
                  business_id={id}
                  user={user}
                  numberOfLikes={number_of_likes}
                  disabled={pageOwner}
                />
              </div>
            )}
          </div>
        </div>
        <div id="contact">
          <p>
            <span>CONTACT BUSINESS</span>
          </p>
          <div>
            {phone_number && <a href={`tel:${phone_number}`}>Call</a>}
            {business_url && (
              <a href={business_url} target="_blank" rel="noopener">
                website
              </a>
            )}
            {ig_handle && (
              <a
                href={`https://www.instagram.com/${ig_handle}`}
                target="_blank"
                rel="noopener"
              >
                IG
              </a>
            )}
          </div>
          {verified && (
            <DynamicContact user={user} business_email={creator.email} />
          )}
        </div>
      </div>
      {hasPreview && verified && (
        <div>
          <p>Would you recommend this business? Give it a like!</p>
          <DynamicFavorite
            business_id={id}
            user={user}
            numberOfLikes={number_of_likes}
            disabled={pageOwner}
          />
        </div>
      )}
      {!verified && (
        <div
          style={{
            padding: "16px 40px",
            borderRadius: "5px",
            border: "1px solid #4e3505",
            display: "inline-block",
          }}
        >
          <p>Are you the owner of this business?</p>
          <a href="mailto:hello@soplugged.com">
            <button>Let us know</button>
          </a>
        </div>
      )}
      {pageOwner ? (
        <Link href="/my-business">
          <a style={{ position: "fixed", top: "65px", right: "16px" }}>Edit</a>
        </Link>
      ) : (
        <a
          href="#contact"
          style={{ position: "fixed", bottom: "0px", right: "16px" }}
        >
          Contact
        </a>
      )}
    </div>
  );
};

export default BusinessPage;
