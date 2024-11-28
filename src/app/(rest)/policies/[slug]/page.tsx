import type { Metadata } from "next";

import { Nav } from "@/components/nav";
import { PortableText } from "@/components/shared/PortableText";
import { SubscribeBanner } from "@/components/shared/SubscribeBanner";
import { client } from "@/sanity/lib/client";
import { getDate } from "@/utils/getDate";

import { POLICIES_QUERY, POLICY_QUERY } from "./queries";

export async function generateStaticParams() {
  const posts = await client.fetch(POLICIES_QUERY);

  return posts.map((post: any) => ({
    slug: post.slug.current,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const content = await client.fetch(POLICY_QUERY, { slug });

  return {
    title: `${content.title} | SoPlugged`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const content = await client.fetch(POLICY_QUERY, { slug });

  if (!content) {
    return null;
  }

  return (
    <>
      <div className="relative z-10">
        <Nav isLight />

        <div className="absolute left-0 top-0 -z-10 h-80 w-full bg-gradient-to-b from-[#F2EDE3] to-white"></div>

        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-16 pt-36 text-center text-primary lg:pt-48">
          <h1 className="large mb-8">{content.title}</h1>
          <p>
            {content.lastUpdated && (
              <span>Last updated: {getDate(content.lastUpdated)}</span>
            )}
          </p>
        </div>

        <div className="padded mb-20">
          <div className="prose mx-auto">
            <PortableText value={content.body} />
          </div>
        </div>

        <SubscribeBanner />
      </div>
    </>
  );
}
