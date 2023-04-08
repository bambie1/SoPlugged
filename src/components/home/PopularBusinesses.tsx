import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import { IBusiness } from "@/types/Business";
import { popularCategories } from "@/lib/popularCategories";
import { getCategorySlug } from "@/utils/algolia";

const listedCategories = [
  { title: "All categories", href: "/search/all" },
  ...popularCategories,
  { title: "...and more", href: "/search/all" },
];

const PopularBusinesses = ({ businesses }: { businesses: IBusiness[] }) => {
  if (!businesses?.length) return null;

  return (
    <section className="relative mt-0 -mb-10 bg-[#FCFAF8] pb-20 pt-10 lg:block">
      <div className="my-container">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold xl:text-4xl">
            Popular Businesses
          </h2>
        </div>

        <div className="overflow-x-auto">
          <ul className="mt-6 mb-8 flex items-center gap-1 lg:mb-12 lg:gap-2">
            {listedCategories.map((category, index) => (
              <li key={category.title} className="flex-shrink-0">
                <Link
                  href={
                    // @ts-ignore
                    category.href ||
                    `/search/${getCategorySlug(category.title)}`
                  }
                >
                  <a
                    className={classNames(
                      "rounded-full border py-2 px-3 text-sm transition duration-150 hover:border-primary lg:text-base",
                      {
                        "bg-secondary": index === 0,
                      }
                    )}
                  >
                    {category.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {businesses.map((business) => {
            const {
              id,
              slug,
              business_name,
              category,
              business_location,
              sample_images,
            } = business;

            const rawImages = sample_images?.split(",") || [];
            const images = rawImages.map((item: string) => {
              const arr = item.split("/upload/");
              const newImage = arr[1]
                ? `${arr[0]}/upload/w_1200/${arr[1]}`
                : item;

              return newImage;
            });

            const featuredImage = images.length ? images[0] : null;

            return (
              <div key={id} className="group">
                <Link href={`/business/${slug}`}>
                  <a className="relative flex flex-col overflow-hidden rounded-lg">
                    <div className="relative aspect-[3/4] w-full border brightness-[.85] transition duration-200 group-hover:scale-[1.05] group-focus:border-primary group-focus-visible:border-primary lg:aspect-square">
                      {featuredImage ? (
                        <Image
                          src={featuredImage}
                          alt={`Featured image for ${business_name}`}
                          objectFit="cover"
                          objectPosition="top"
                          layout="fill"
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8u21yPQAHBQKXKv8OfQAAAABJRU5ErkJggg==`}
                        />
                      ) : (
                        <div className="relative flex aspect-video w-full items-center justify-center bg-secondary/20">
                          <span className="whitespace-nowrap font-light uppercase tracking-wider text-primary/40">
                            {business_name}
                          </span>

                          <div className="absolute -left-10 -top-5 aspect-square w-36 rounded-full border border-primary/10"></div>
                          <div className="absolute -right-10 -bottom-5 aspect-square w-36 rounded-full border border-primary/10"></div>
                        </div>
                      )}
                    </div>
                  </a>
                </Link>

                <Link href={`/business/${slug}`}>
                  <a>
                    <div className="mt-1 grid items-center lg:mt-2 lg:grid-cols-2">
                      <p className="w-full truncate text-lg font-semibold">
                        {business_name}
                      </p>
                      <p className="hidden text-right text-sm text-gray-600 lg:block">
                        {business_location}
                      </p>
                    </div>
                    <p className="text-sm font-light uppercase">{category}</p>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-56 pb-8">
        <Link href="/search/all">
          <a className="button filled pointer-events-auto">
            Explore all businesses
          </a>
        </Link>
      </div>
    </section>
  );
};

export default PopularBusinesses;
