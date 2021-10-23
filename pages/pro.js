import React, { useState } from "react";
import Image from "next/image";
import {
  Container,
  Typography,
  Grid,
  CustomTextField,
  Button,
} from "@material/mui-components";
import { Alert } from "@material/mui-lab";
import SEO from "@components/SEO";
import { useForm } from "react-hook-form";
import { handleSubscription } from "../utils/handleSubscription";

import styles from "styles/Pro.module.scss";

const ProPage = () => {
  const [showMore, setShowMore] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm();
  const [submitted, setSubmitted] = useState(true);

  const onSubmit = async (data, e) => {
    console.log({ data });
    const response = await handleSubscription(
      { ...data, first_name: "", last_name: "" },
      "soplugged_for_business"
    );

    if (response.error) console.log("an error occured");
    else setSubmitted(true);

    e.target.reset();
  };

  const handleShowMore = () => setShowMore(!showMore);

  return (
    <>
      <SEO title="Professional help for your business digital needs | SoPluggedPRO" />
      <Container className={styles.page}>
        <Grid container spacing={3} className={styles.hero}>
          <Grid item xs={12} md={6}>
            <Typography className={styles.comingSoon}>
              COMING SOON...
            </Typography>
            <Typography variant="h1" className={styles.heading}>
              SoPlugged<sup>PRO</sup>
            </Typography>
            <Typography className={styles.tagLine}>
              Professional help for your business digital needs
            </Typography>

            <section className={styles.info}>
              <Typography>
                Everything you need to launch and improve your digital presence
                as a small to medium-sized business.
              </Typography>
              {showMore && (
                <Typography className={styles.mobileOnly}>
                  We offer a range of products and services to support your
                  business goals by tapping into new online audiences, creating
                  lasting engagement, and driving results.
                </Typography>
              )}

              <Typography className={styles.laptopOnly}>
                We offer a range of products and services to support your
                business goals by tapping into new online audiences, creating
                lasting engagement, and driving results.
              </Typography>
              <Button
                size="small"
                color="secondary"
                className={styles.mobileOnly}
                onClick={handleShowMore}
              >
                {showMore ? "Show Less" : "Read more..."}
              </Button>

              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1} className={styles.formGrid}>
                  <Grid item xs={12} sm={8}>
                    <CustomTextField
                      color="secondary"
                      variant="outlined"
                      label="Email address"
                      name="email"
                      id="emailAddress"
                      inputRef={register({
                        required: "Please enter your e-mail address",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      error={!!errors.email}
                      helperText={!!errors.email && errors.email.message}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      style={{ maxHeight: "3.5rem" }}
                    >
                      Sign Me Up!
                    </Button>
                  </Grid>
                </Grid>
                {submitted && (
                  <Alert
                    severity="success"
                    variant="outlined"
                    style={{ border: "none" }}
                  >
                    You'll receive an e-mail from us shortly
                  </Alert>
                )}
              </form>
            </section>
          </Grid>
          <Grid item xs={12} md={6} className={styles.imageGrid}>
            <Image
              placeholder="blur"
              src="/images/soplugged_pro.png"
              alt="Business consult session"
              width={400}
              height={400}
              priority
            />
          </Grid>
        </Grid>
        <section className={styles.moreInfo}>
          <Typography variant="h2">What should I expect?</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Do-It-Yourself</Typography>
              <Typography>
                Free resources curated for common business needs. You should be
                able to get your business up-and-running by following our guides
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Stress-Free</Typography>
              <Typography>
                What's better than 'doing it yourself?'... getting our team of
                experts to do it for you! From strategic recommendations to
                professional services (personalized consultation, web design,
                and email marketing) our team is ready to work with you and
                provide all the support you need to grow your business
              </Typography>
            </Grid>
          </Grid>
        </section>
      </Container>
    </>
  );
};

export default ProPage;
