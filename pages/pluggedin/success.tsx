import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { TwitterShareButton } from "react-share";

import { Footer } from "@/components/Footer";
import Header from "@/components/Header/Header";
import SEO from "@/components/SEO";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PluggedInSuccessPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [shareUrl, setShareUrl] = useState("");
  const { name } = props.customer;

  const firstName = name.split(" ")[0];

  useEffect(() => {
    if (typeof window !== undefined) {
      setShareUrl(`${window.location.origin}/pluggedin`);
    }
  }, []);

  return (
    <>
      <SEO
        title="Plugged In Conference | SoPlugged"
        description="Network with fellow business-owners, share ideas and learn how to manage your finances as a business owner"
        variant="pluggedin"
      />

      <Header />

      <div className="my-container pt-12 text-center lg:pt-20">
        <div className="light-gradient relative inline-flex  rounded-xl px-3 py-2">
          <img src="/tada.svg" alt="" className="absolute -left-4 top-1 h-7" />
          <p className="ml-1">We've saved you a seat, {firstName}!</p>
        </div>
        <div className="relative mt-2">
          {/* <div className="absolute inset-0 -z-10 bg-radial-pluggedin"></div> */}
          <h1 className="mb-4 text-5xl font-extrabold sm:text-6xl lg:text-8xl">
            <span className="outlinedText conference ml-1">
              Ticket confirmed!
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light text-gray-600 lg:text-xl">
            Please check your email for your e-ticket, and more info about what
            to expect at the event.
          </p>

          <TwitterShareButton
            url={shareUrl}
            // title="Just got my ticket for #PluggedIn by SoPlugged, claim yours!"
            className="mt-20"
          >
            <div className="neuButton">
              Share on Twitter
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-twitter"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </div>
          </TwitterShareButton>
        </div>
      </div>

      <div className="my-container mt-6 text-center">
        <img
          src="/og-pluggedin.png"
          alt="OG image preview for plugged-in page"
          className="mx-auto w-full max-w-xl rounded-2xl border border-primary/40"
        />
      </div>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const session = await stripe.checkout.sessions.retrieve(query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  return {
    props: {
      customer,
    },
  };
};

export default PluggedInSuccessPage;
