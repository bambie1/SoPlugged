import { Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Head from "next/head";
import Link from "next/link";
import SubscribeForm from "../components/SubscribeForm";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    margin: "32px 0px",
  },
  faqSection: {
    margin: "16px 0px",
    "& > *": {
      margin: "8px 0px",
      lineHeight: "2",
    },
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "underline",
  },
}));

const FAQs = () => {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title> FAQs | SoPlugged</title>
        <meta
          name="description"
          content="Online platform connecting you to black-owned businesses across Canada. If you're an entrepreneur, register your business to be featured on our platform or join our mailing list to stay plugged in."
        />
      </Head>
      <main className="page">
        <Container maxWidth="lg">
          <Typography variant="h1" className={classes.title}>
            Frequently Asked Questions
          </Typography>
          <section className={classes.faqSection}>
            <Typography
              variant="h6"
              component="h2"
              className={classes.faqSectionHeader}
            >
              What services can I find here?
            </Typography>
            <Typography className={classes.faqSectionContent}>
              We created this platform to connect you to black-owned businesses
              across Canada. While we are still a growing community, you can
              browse our directory to see the services currently featured on our
              platform. Make sure to subscribe to our newsletters to be notified
              when we have new services featured on our website!
            </Typography>
            <Link href="/search">
              <a>
                <Button color="secondary" variant="outlined">
                  Browse Businesses
                </Button>
              </a>
            </Link>
          </section>
          <section className={classes.faqSection}>
            <Typography
              variant="h6"
              component="h2"
              className={classes.faqSectionHeader}
            >
              How do I register?
            </Typography>
            <Typography className={classes.faqSectionContent}>
              Registering your business is free, quick and easy. Please click
              the button below to get started (you'll need to be signed in to
              add a business). If you encounter any issues or have any
              questions, feel free to reach out to a member of our team, we
              would love to have your services featured on our platform.
            </Typography>
            <Link href="/edit-business">
              <a>
                <Button color="secondary" variant="outlined">
                  Register
                </Button>
              </a>
            </Link>
          </section>
          <section className={classes.faqSection}>
            <Typography
              variant="h6"
              component="h2"
              className={classes.faqSectionHeader}
            >
              How can I update my business page?
            </Typography>
            <Typography className={classes.faqSectionContent}>
              Click the button below to update your business page, you will be
              sent an authentication link to the registered email address and
              you will be able to make changes. If you encounter any issues or
              have any questions, feel free to{" "}
              <a href="mailto:hello@soplugged.com" className={classes.link}>
                reach out to a member of our team
              </a>
              .
            </Typography>
            <Link href="/edit-business">
              <a>
                <Button color="secondary" variant="outlined">
                  Edit my business
                </Button>
              </a>
            </Link>
          </section>
          <section className={classes.faqSection}>
            <Typography
              variant="h6"
              component="h2"
              className={classes.faqSectionHeader}
            >
              How do I pay for services?
            </Typography>
            <Typography className={classes.faqSectionContent}>
              Businesses have their preferred methods of processing payments as
              well as different payment schedules. We recommend getting in touch
              with the business to find out their preference.
            </Typography>
          </section>
          <br></br>
          <br></br>
          <SubscribeForm />
        </Container>
      </main>
    </>
  );
};

export default FAQs;
