import React, { useState, useEffect } from "react";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Stats,
  ClearRefinements,
  PoweredBy,
  Configure,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import AlgoliaHit from "./AlgoliaHit";
import { CustomRefinementList } from "./CustomRefinementList";
import CustomRefinements from "./CustomRefinements";
import { useSearch } from "@contexts/searchContext";
import * as styles from "styles/Directory.module.scss";
import { CustomPagination } from "./CustomPagination";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API
);

const AlgoliaSearch = () => {
  const tabletAndUp = true;
  const { contextCategory } = useSearch();
  const [currentDropDown, setCurrentDropDown] = useState(0); //0, for no dropdowns

  useEffect(() => {
    if (tabletAndUp) setCurrentDropDown(1);
    else setCurrentDropDown(0);
  }, [tabletAndUp]);

  const filters = [
    { label: "CATEGORY", attribute: "category" },
    { label: "LOCATION", attribute: "business_location" },
  ];

  return (
    <>
      <div className="ais-InstantSearch">
        <InstantSearch indexName="Business" searchClient={searchClient}>
          <div className={styles.search_div}>
            <PoweredBy />
            <SearchBox defaultRefinement={contextCategory} autoFocus />
            <div className={styles.search_filters}>
              {filters.map((item, index) => (
                <button
                  key={item.label}
                  className="refinementMobile"
                  onClick={() =>
                    currentDropDown !== index + 1
                      ? setCurrentDropDown(index + 1)
                      : setCurrentDropDown(0)
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {filters.map((item, index) => (
            <CustomRefinementList
              key={item.attribute}
              attribute={item.attribute}
              label={item.label}
              hide={currentDropDown !== index + 1}
              defaultRefinement={item.default ? [item.default] : []}
            />
          ))}
          <Configure hitsPerPage={12} />

          <div>
            <ClearRefinements />
            {tabletAndUp && <CustomRefinements clearsQuery />}
          </div>

          <div className="cover"></div>
          <Stats />
          <Hits hitComponent={AlgoliaHit} />
          <CustomPagination />
        </InstantSearch>
      </div>
    </>
  );
};

export default AlgoliaSearch;
