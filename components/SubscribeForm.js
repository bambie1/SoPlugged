import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Sentry from "@sentry/node";

const SubscribeForm = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = async (data, e) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/newsletter_subscriptions`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscription: data,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("HTTP status " + res.status);
      } else {
        setSubmitted(true);
        e.target.reset();
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return (
    <div>
      <div>
        <h6>Stay Plugged-in</h6>
        <p>
          Join our mailing list to receive news and updates on new service
          features, blog posts, and be in the know!
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <input placeholder="First Name" />
            </div>
            <div>
              <input placeholder="First Name" />
            </div>
            <div>
              <input placeholder="First Name" />
            </div>
            <button>SUBSCRIBE</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscribeForm;
