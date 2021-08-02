import Link from "next/link";
import SEO from "@components/SEO";

const OurStory = () => {
  return (
    <>
      <SEO
        title="Our Story | SoPlugged"
        description="SoPlugged is an online platform that makes #buyingblack easy! Our
              search-friendly platform helps end-users connect to Black-owned
              businesses across Canada"
      />
      <main>
        <div>
          <h1>our story</h1>
          <p>
            SoPlugged is an online platform that makes #buyingblack easy! Our
            search-friendly platform helps end-users connect to Black-owned
            businesses across Canada. When you{" "}
            <a href="/my-business">register</a> your business on our platform,
            you increase your brand visibility and get access to a thriving
            community of people looking to support Black-owned businesses.
            <br></br> At SoPlugged, our biggest inspiration is supporting one
            another and growing our community. It’s always a beautiful thing to
            see people join the movement to support Black-owned businesses.
            <br></br> That’s our story and we hope you become a part of it!
          </p>
          <div>
            <Link href="/search">
              <a>
                <button>Visit our directory</button>
              </a>
            </Link>
            <Link href="/sponsors">
              <a>
                <button>Become a Sponsor</button>
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default OurStory;
