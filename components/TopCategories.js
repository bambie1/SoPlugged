import React from "react";
import { categoryIcons } from "../src/categoryIcons";
import Image from "next/image";
import { useSearch } from "@contexts/searchContext";
import { useRouter } from "next/router";
import Link from "next/link";

const TopCategories = () => {
  const { setContextCategory } = useSearch();
  const router = useRouter();

  const handleClick = (label) => {
    setContextCategory(label);
    router.push("/search");
  };

  return (
    <>
      <h2>Top Categories</h2>
      <div>
        {categoryIcons.map((icon) => (
          <div
            key={icon.imageSrc}
            onClick={() => handleClick(icon.categoryText)}
          >
            <Image
              src={icon.imageSrc}
              width={35}
              height={35}
              alt={`${icon.shortText}-icon`}
            />
            <p>{icon.shortText}</p>
          </div>
        ))}
      </div>
      <Link href="/search">
        <a style={{ alignSelf: "center", marginBottom: "24px" }}>
          <button>Explore More</button>
        </a>
      </Link>
    </>
  );
};

export default TopCategories;
