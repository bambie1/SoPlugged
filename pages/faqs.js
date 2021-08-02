import Link from "next/link";
import SEO from "@components/SEO";

const FAQs = () => {
  return (
    <>
      <SEO
        title="Frequently Asked Questions | SoPlugged"
        description="The SoPlugged team has answers ready for questions you might have. If we missed anything, please send us an email"
      />
      <main className="page" style={{ paddingTop: "16px" }}>
        <div>
          <h1>FAQs</h1>
          <section>
            <h2>What services can I find here?</h2>
            <p>
              We created this platform to connect you to black-owned businesses
              across Canada. While we are still a growing community, you can
              browse our directory to see the services currently featured on our
              platform. Make sure to subscribe to our newsletters to be notified
              when we have new services featured on our website!
            </p>
            <Link href="/search">
              <a>
                <button>Browse Businesses</button>
              </a>
            </Link>
          </section>
          <section>
            <h2>How do I register?</h2>
            <p>
              Registering your business is free, quick and easy. Please click
              the button below to get started (you'll need to be signed in to
              add a business). If you encounter any issues or have any
              questions, feel free to reach out to a member of our team, we
              would love to have your services featured on our platform.
            </p>
            <Link href="/my-business">
              <a>
                <button>Register</button>
              </a>
            </Link>
          </section>
          <section>
            <h2>How can I update my business page?</h2>
            <p>
              Click the button below to update your business page, you will be
              sent an authentication link to the registered email address and
              you will be able to make changes. If you encounter any issues or
              have any questions, feel free to{" "}
              <a href="mailto:hello@soplugged.com">
                reach out to a member of our team
              </a>
              .
            </p>
            <Link href="/my-business">
              <a>
                <button>Edit my business</button>
              </a>
            </Link>
          </section>
          <section style={{ marginBottom: "12vh" }}>
            <h2>How do I pay for services?</h2>
            <p>
              Businesses have their preferred methods of processing payments as
              well as different payment schedules. We recommend getting in touch
              with the business to find out their preference.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default FAQs;
