import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import * as Sentry from "@sentry/node";

const ContactForm = ({ user, business_email }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [showError, setShowError] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emails`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: {
              from: "hello@soplugged.com",
              to: business_email,
              subject: `New Message on SoPlugged from ${
                data.userName || "a customer"
              }`,
              content: data.userMessage,
              reply_to: user.email,
            },
          }),
        }
      );
      if (!res.ok) {
        throw new Error("HTTP status " + res.status);
      } else {
        swal({
          title: "Message sent!",
          text: `Your message has been sent to the owner, and they will be in touch.\n\n Please keep an eye on ${user.email} `,
          icon: "success",
          button: "OK!",
        });
        reset();
      }
    } catch (error) {
      setShowError(true);
      Sentry.captureException(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {showError && (
        <Alert severity="error">
          An error occured while sending your message. Please try again later
        </Alert>
      )}
      <input placeholder="Full Name" disabled={!user?.email} />
      <input placeholder="email" disabled={!user?.email} />
      {user?.email ? (
        <>
          <button type="submit" disabled={user?.email == business_email}>
            Send Message
          </button>
          <p>{user?.email && `Sending message as ${user.email}`}</p>
        </>
      ) : (
        <Link href="/join">
          <a>
            <button>Sign In to send Message</button>
          </a>
        </Link>
      )}
    </form>
  );
};

export default ContactForm;
