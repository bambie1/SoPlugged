import { Typography } from "./mui-components";
import AlgoliaAutoComplete from "./algolia/AlgoliaAutoComplete";

const HeroBanner = () => {
  return (
    <header className="hero" style={{ backgroundColor: "#ff914d" }}>
      <div className="hero-side-image">
        <img
          src="/images/black_woman_hair.png"
          alt="Black woman with ponytail"
        />
      </div>
      <section className="hero-text-overlay">
        <Typography
          variant="h1"
          style={{ fontWeight: "700", fontSize: "2.5rem" }}
        >
          Find the perfect <em>black-owned</em> business for your needs.
        </Typography>
        <AlgoliaAutoComplete />
      </section>
      <div className="custom-shape-divider-bottom-1615430493">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </header>
  );
};

export default HeroBanner;
