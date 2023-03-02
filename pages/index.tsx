import dynamic from "next/dynamic";
import type { GetStaticProps, NextPage } from "next";

import Hero from "@/src/components/home/Hero";
import SEO from "@/src/components/SEO";
import { fetchAPI } from "@/utils/graphcms";
import { BlogPost } from "@/types/BlogPost";

const Header = dynamic(() => import("../src/components/Header/Header"));
const Footer = dynamic(() => import("../src/components/Footer"));
const HomePage = dynamic(() => import("../src/scenes/HomePage"));

const Home: NextPage<{ posts: BlogPost[] }> = (props) => {
  return (
    <>
      <SEO
        description="Find and support Black-owned businesses across Canada with SoPlugged. Our free online directory connects you with the best Black-owned businesses in your community. Discover local gems and help empower black entrepreneurs today!"
        title="SoPlugged | Discover Black-owned businesses in Canada"
      />

      <Header />

      <Hero />
      <HomePage {...props} />
      <div className="mt-10 lg:mt-20"></div>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await getAllPostsForHome()) || [];

  return {
    props: { posts },
  };
};

// GraphCMS queries
const gql = String.raw;
export async function getAllPostsForHome() {
  const data = await fetchAPI(
    gql`
      {
        posts(orderBy: createdAt_DESC, first: 2, stage: PUBLISHED) {
          title
          slug
          createdAt
          excerpt
          blogImage {
            url
          }
          author {
            name
          }
          categories(first: 10) {
            title
            color {
              hex
              rgba {
                r
                g
                b
              }
            }
          }
        }
      }
    `
  );
  return data?.posts;
}

export default Home;
