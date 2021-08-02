import React from "react";
import Link from "next/link";
import Image from "next/image";
import { greetFunction } from "src/greeting";
import BusinessCard from "../BusinessCard";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useRouter } from "next/router";
import { useBusinessFormContext } from "@contexts/businessFormContext";

const Dashboard = ({ business }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const hasLogo = business?.logo_url !== "";
  const hasGoodDescription = business?.business_description.length > 150;
  const hasImages = !!business?.sample_images.split(",")[0];
  const hasContact =
    business?.business_url !== "" &&
    (business?.ig_handle !== "" || business?.phone_number !== "");
  const suggestionsCount = [
    hasLogo,
    hasGoodDescription,
    hasImages,
    hasContact,
  ].filter(Boolean).length;
  const percentage = (6 + suggestionsCount) * 10;

  return (
    <>
      <p>Home</p>
      {business ? (
        <>
          <p>{greetFunction(business.creator.full_name)}</p>
          <p>Here's some important stuff we've outlined for you</p>
          <div>
            <div>
              <div>
                <p style={{ fontWeight: "bold" }}>YOUR BUSINESS:</p>
                <div>
                  <BusinessCard dbObject={business} mini={true} />
                </div>
                <Link href="/my-business">
                  <a>
                    <button>Edit Business</button>
                  </a>
                </Link>
              </div>

              <div>
                <p style={{ fontWeight: "bold" }}>BUSINESS COMPLETION:</p>
                <div>
                  <div
                    style={{
                      width: 200,
                      fontFamily: "Montserrat",
                    }}
                  >
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        rotation: 0.25,
                        pathTransitionDuration: 0.5,
                        pathColor: "rgb(205 182 147)",
                        textColor: "rgb(205 182 147)",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>
                  <div>
                    {percentage === 100 ? (
                      <p>Looking great, Boss!</p>
                    ) : (
                      <button
                        aria-controls="business-suggestions"
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        See suggestions ({4 - suggestionsCount})
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div item xs={12}>
                <p style={{ fontWeight: "bold" }}>BUSINESS NUMBERS:</p>
                <div>
                  <div>
                    <p>Favorites</p>
                    <p component="span">{business.number_of_likes}</p>
                    <FavoriteIcon color="secondary" />
                  </div>
                  <div style={{ opacity: "0.5" }}>
                    <p>Messages</p>
                    <p variant="body2">COMING SOON</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <Image
            src="/images/Cocktail_Monochromatic.svg"
            alt="empty clipboard"
            width={300}
            height={300}
          />
          <p>No business found</p>
          <p>Just a nice beverage</p>
          <p>Are you an entrepreneur?</p>
          <Link href="/my-business">
            <a>
              <button>Add your business</button>
            </a>
          </Link>
        </div>
      )}
    </>
  );
};

export default Dashboard;
