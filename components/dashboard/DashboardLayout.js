import React from "react";
import DashboardNav from "@components/dashboard/DashboardNav";
import Link from "next/link";
import SEO from "../SEO";

const DashboardLayout = ({ title, children, position }) => {
  return (
    <>
      <SEO
        title={title}
        description={`View your dashboard as a user. ${title}`}
      />
      <main>
        <div>
          <div>
            <div>
              <Link href="/dashboard">
                <a>
                  <p>Home</p>
                </a>
              </Link>
              <Link href="/dashboard/favorites">
                <a>
                  <p>Favorites</p>
                </a>
              </Link>
              <Link href="/dashboard/profile">
                <a>
                  <p>Profile</p>
                </a>
              </Link>
            </div>
            <div>{children}</div>
          </div>

          <div>
            {children ? <>{children}</> : <p>Loading ...</p>}
            <DashboardNav position={position} fixed={true} />
          </div>
          <br></br>
          <div>
            <Link href="/search">
              <a>
                <button>Back to Directory</button>
              </a>
            </Link>
            <a href="https://soplugged.kampsite.co/" target="_blank">
              <button>Make a suggestion</button>
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
