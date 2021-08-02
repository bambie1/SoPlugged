import Link from "next/link";
import SEO from "@components/SEO";

const Sponsors = () => {
  return (
    <>
      <SEO
        title="Become a Sponsor | SoPlugged"
        description="Our goal is to give black business a wider platform in Canada for free. Help us maintain this goal by donating."
      />
      <main>
        <h1>sponsors</h1>
        <div>
          <>
            <div>
              <div>
                <p>
                  At SoPlugged, our biggest inspiration is supporting one
                  another and growing our community. Our goal is to normalize
                  buying black and we rely on amazing people like you to keep
                  our platform free and accessible to Black-owned businesses
                  across Canada.
                </p>
                <hr style={{ width: "100%", maxWidth: "150px" }}></hr>
                <p>
                  <em>
                    All donations go towards maintaining our platform and
                    supporting Black-owned businesses across Canada.
                  </em>
                </p>
              </div>
              <div>
                <iframe
                  src="https://kweeve.page/soplugged/embed"
                  style={{ border: "none" }}
                  width="100%"
                  height="700px"
                  allow="payment"
                ></iframe>
              </div>
            </div>
            <Link href="/search">
              <a
                style={{
                  alignSelf: "center",
                  margin: "16px",
                }}
              >
                <button>Back to Directory</button>
              </a>
            </Link>
          </>
        </div>
      </main>
    </>
  );
};

export default Sponsors;
