import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import BlogPostCard from "../../components/BlogPostCard";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    marginTop: "16px",
  },
  postsDiv: {
    display: "flex",
  },
}));

const Blogs = ({ posts }) => {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Blog | SoPlugged</title>
      </Head>
      <div className="page">
        <Container className={classes.container}>
          <Typography variant="h1">Welcome to My Blog</Typography>
          <Typography style={{ margin: "32px auto", maxWidth: "700px" }}>
            Hi, I’m Nina - creator, and founder of SoPlugged! On the blog, I
            share my experiences buying black and some tips that might be
            helpful for entrepreneurs or shopaholics like me. Let’s chat in the
            comment section!
          </Typography>
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.link}>
                <BlogPostCard post={post} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const mediumURL =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@soplugged";
  let posts = [];
  try {
    const response = await fetch(mediumURL);
    const data = await response.json();
    const res = data.items; //This is an array with the content. No feed, no info about author etc..
    // console.log({ res });
    posts = res.filter((item) => item.categories.length > 0);
  } catch (error) {
    console.log({ error });
  }

  // title, pubDate, link, author, thumbnail (image), description - html, content
  return {
    props: { posts }, // will be passed to the page component as props
  };
}
export default Blogs;
