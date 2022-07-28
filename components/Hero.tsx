/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */
import Link from "next/link";
import Image from "next/image";

import { popularCategories } from "@/lib/popularCategories";
import useAlgolia from "@/hooks/useAlgolia";
import Searchbar from "./algolia/Searchbar";

const HeroImage = ({ index }: any) => {
  const { handleCategoryClick } = useAlgolia();

  return (
    <li
      key={index}
      className={`w-[60%]  ${index === 1 || index === 4 ? "mr-20" : ""}`}
    >
      <button
        onClick={() => handleCategoryClick(popularCategories[index].title)}
        className="group relative aspect-square w-full overflow-hidden rounded-full border-2 border-transparent focus:border-primary"
      >
        <div className="absolute inset-0 z-[2] flex h-full w-full items-center justify-center bg-secondary/30 transition duration-500 hover:bg-gradient-to-r hover:from-secondary/70 hover:to-white/70">
          <p className="z-10 border-b border-black font-semibold uppercase opacity-0 transition duration-300 group-hover:opacity-100">
            {popularCategories[index].title}
          </p>
        </div>
        <Image
          src={popularCategories[index].url}
          objectFit="cover"
          alt=""
          layout="fill"
        />
      </button>
    </li>
  );
};

const Hero = () => {
  return (
    <div className="my-container flex flex-col py-10 pt-24 text-center md:py-20 lg:pt-36 lg:text-left">
      <section className="relative flex-1 items-center justify-center gap-3 py-5 lg:grid lg:grid-cols-7">
        <div className="relative col-span-4 col-start-1 flex w-full flex-col">
          <h1 className="text-5xl font-bold leading-[1.05] lg:text-6xl lg:leading-[1.2]">
            Discover{" "}
            <div className="relative inline-block text-primary">
              <span>black-owned</span>
              <img
                src="/underline_draw.svg"
                className="absolute -bottom-6"
                alt=""
              />
            </div>
            <br></br> businesses in Canada
          </h1>
          <p className="mt-6 text-lg lg:hidden">
            Connecting black businesses with the consumers that love them.
          </p>
          <p className="mt-6 hidden w-[90%] text-lg lg:block">
            Find everything from restaurants, hairstylists and salons to
            tutoring, tech and healthcare services.
          </p>
          <div className="mx-auto mt-4 flex w-full max-w-xl flex-col items-end lg:mx-0">
            {/* <Link href="/search">
              <a className="relative mt-4 w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-gray-900 placeholder-shown:text-ellipsis focus:border-primary focus:ring-primary  lg:text-lg"
                  placeholder="Search by category, location, or business name"
                />
              </a>
            </Link> */}
            <Searchbar />
            <Link href="/dashboard">
              <a className="mt-2 border-b border-primary text-base">
                I am an entrepreneur
              </a>
            </Link>
          </div>
        </div>
        <aside className="col-span-3 col-start-5 flex flex-col">
          <div className="ml-auto hidden w-full -space-x-24 lg:flex">
            <ul className="flex flex-1 flex-col items-end">
              {[0, 1, 2].map((index) => (
                <HeroImage index={index} key={index} />
              ))}
            </ul>
            <ul className="flex flex-1 flex-col items-end">
              {[3, 4, 5].map((index) => (
                <HeroImage index={index} key={index} />
              ))}
            </ul>
          </div>
        </aside>
        {/* <div className="border border-secondary/50 rounded-full absolute -left-16 bottom-[29rem] w-24 h-24 -z-10" />
          <div className="border border-secondary/50 rounded-full absolute -left-20 bottom-72 w-[60%] aspect-square -z-10" />
        <div className="border border-secondary/50 rounded-full absolute -left-20 -bottom-10 w-96 h-96 -z-10" /> */}
      </section>
    </div>
  );
};

export default Hero;
