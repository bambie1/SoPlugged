import { Email } from "@/types/Email";

export const sendEmail = async (email: Email) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emails`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  return res;
};
