import React from "react";
import { useRouter } from "next/router";

const DashboardNav = ({ position }) => {
  const router = useRouter();
  const handleClick = (href) => {
    router.push(href);
  };

  return (
    <>
      <div>
        <button onClick={() => handleClick("/dashboard")} />
        <button onClick={() => handleClick("/dashboard/favorites")} />
        <button onClick={() => handleClick("/dashboard/profile")} />
      </div>
    </>
  );
};

export default DashboardNav;
