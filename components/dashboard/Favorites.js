import React, { useState } from "react";
import Image from "next/image";
import BusinessCard from "../BusinessCard";
import PaginationBar from "../Pagination";

const Favorites = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const matches = useMediaQuery("(min-width:960px)");
  let pageLimit = matches ? 6 : 4;
  const indexOfLastItem = currentPage * pageLimit;
  const indexOfFirstItem = indexOfLastItem - pageLimit;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <h1>Favorites</h1>
      <br></br>
      {data?.length > 0 ? (
        <div>
          <div>
            {currentItems.map((item, index) => (
              <React.Fragment key={index}>
                <div>
                  <BusinessCard dbObject={item.liked_business} mini={true} />
                </div>
              </React.Fragment>
            ))}
          </div>
          {pageLimit < data.length && (
            <div>
              <PaginationBar
                totalCount={data.length}
                pageLimit={pageLimit}
                handleClick={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <Image
            src="/images/Checklist_Monochromatic.svg"
            alt="empty clipboard"
            width={300}
            height={300}
          />
          <h6>No favorites found</h6>
          <p>When you 'Like' a business, it will get added here.</p>
        </div>
      )}
    </>
  );
};

export default Favorites;
