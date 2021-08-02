import dynamic from "next/dynamic";

const DynamicFooter = dynamic(() => import("./Footer"));

const Layout = ({ children }) => {
  return (
    <div className="layout-div">
      <div id="content">{children}</div>
      <div id="loading">
        <div style={{ maxWidth: "450px" }}>Loading</div>
      </div>
      <DynamicFooter />
    </div>
  );
};

export default Layout;
