import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import BusinessCard from "./BusinessCard";
import BusinessCardModal from "./BusinessCardModal";
import ComingSoon from "./ComingSoon";

const BusinessGrid = ({ businessList, mini }) => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [ready, setReady] = useState(false);

  return ready ? (
    <>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3, 1200: 4 }}
      >
        <Masonry>
          {businessList.map((business, index) => (
            <div key={index} className="masonry-item">
              <BusinessCard
                dbObject={business}
                handleClick={() => setSelectedBusiness(business)}
                mini={mini}
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {selectedBusiness && (
        <BusinessCardModal
          business={selectedBusiness}
          closeModal={setSelectedBusiness}
        />
      )}
    </>
  ) : (
    <ComingSoon />
  );
};

export default BusinessGrid;
