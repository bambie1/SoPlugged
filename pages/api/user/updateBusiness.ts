import * as Sentry from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import slugify from "slugify";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (!session?.user?.email) {
      res.status(401).json({ statusCode: 401, message: "Not signed in" });
      return;
    }

    const { data, isNew } = JSON.parse(req.body);

    const newSlug = slugify(data.business_name.trim(), {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      strict: true,
    });

    const editedParams = {
      business_name: data.business_name.trim(),
      slug: newSlug,
      business_url: data.business_url?.trim(),
      fixed_to_one_location: false,
      business_description: data.business_description.trim(),
    };

    const businessObject = isNew
      ? {
          ...data,
          ...editedParams,
          referral_source: "Other",
          referral_business_slug: "",
        }
      : {
          ...data,
          ...editedParams,
        };

    const fetchUrl = isNew
      ? `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/businesses`
      : `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/business?slug=${
          data.slug || ""
        }`;

    const fetchPromise = await fetch(fetchUrl, {
      method: req.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Email": session.user.email,
        "Super-Secret-Key": process.env.NEXT_SERVER_SECRET!,
      },
      body: JSON.stringify({
        business: businessObject,
      }),
    });

    if (!fetchPromise.ok) throw new Error();

    res.status(200).json({
      slug: newSlug,
    });
  } catch (err: any) {
    Sentry.captureException(err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
