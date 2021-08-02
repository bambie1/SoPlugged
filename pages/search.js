import React from "react";
import AlgoliaSearch from "@components/algolia/AlgoliaSearch";
import Link from "next/link";
import SEO from "@components/SEO";

const Search = () => {
  return (
    <>
      <SEO
        title="Business Directory | SoPlugged"
        description="Online platform connecting you to black-owned businesses across Canada. Find the perfect business for your needs on our rich directory"
      />
      <div>
        <h1>directory</h1>
        <AlgoliaSearch />
        <p>
          Know of a business that should be on this list?{" "}
          <a href="mailto:hello@soplugged.com">Let us know</a>
        </p>
        <hr style={{ width: "70%", maxWidth: "500px" }}></hr>
        <p>
          Are you a business owner?{" "}
          <Link href="/my-business">
            <a>Add your business to our platform</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Search;
