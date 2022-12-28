import type { NextPage } from "next";

import ProPage from "@/src/scenes/ProPage";
import SEO from "@/src/components/SEO";

const Pro: NextPage = () => {
  return (
    <>
      <SEO
        description="Hire our team of experts to handle your digital needs, from custom
        websites to social media management"
        title="SoPlugged Pro | Grow your online presence with ease"
        variant="pro"
      />
      <ProPage />
    </>
  );
};

export default Pro;
