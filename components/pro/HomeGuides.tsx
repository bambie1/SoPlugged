import { FC } from "react";

import BlogCard from "../BlogCard";

interface Props {
  posts?: any[];
}

const HomeGuides: FC<Props> = ({ posts }) => {
  return (
    <div className="my-container mt-20 grid items-center gap-4 lg:grid-cols-2 lg:gap-20">
      <div className="flex flex-col items-start">
        <h2 className="mb-4 text-3xl font-bold xl:text-4xl">
          Getting-started guides
        </h2>
        <p>
          We've had some thoughts Look: Here's where we share ideas, stories and
          opinions from the design, UX and development world we live in. We've
          had some thoughts Look: Here's where we share ideas, stories and
          opinions from the design, UX and development world we live in.
        </p>
      </div>

      <div className="overflow-x-auto">
        <ul className="mt-4 inline-flex gap-4 lg:grid lg:grid-cols-2 lg:gap-8">
          {posts?.map((post, index) => (
            <li
              key={index}
              className="min-w-[70vw] md:min-w-[20rem] lg:min-w-0"
            >
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeGuides;
