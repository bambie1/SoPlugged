import { parseCookies } from "nookies";

import { IBusiness } from "@/types/Business";

export const updateBusiness = async (data: IBusiness, isNew: boolean) => {
  const fetchUrl = isNew
    ? `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/businesses`
    : `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/business?slug=${data.slug}`;
  const fetchMethod = isNew ? "POST" : "PATCH";

  try {
    const { token } = parseCookies();

    const res = await fetch(fetchUrl, {
      method: fetchMethod,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Firebase-Token": token,
      },
      body: JSON.stringify({
        business: data,
      }),
    });

    if (!res.ok) {
      throw new Error("HTTP status " + res.status);
    }
    return res;
  } catch (error) {
    return { error };
  }
};
