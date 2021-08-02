import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useBusinessFormContext } from "@contexts/businessFormContext";

const referralSources = [
  { label: "A business referred me", value: "Business" },
  { label: "Instagram (@sopluggd)", value: "SoPlugged" },
  { label: "Google search", value: "Google" },
  { label: "LinkedIn", value: "LinkedIn" },
  { label: "Other", value: "Other" },
];

export default function BusinessTermsConditions({ handleAgree }) {
  const [open, setOpen] = useState(true);
  const [isBlackOwner, setIsBlackOwner] = useState(false);
  const [isCanadianBusiness, setIsCanadianBusiness] = useState(false);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [referralSource, setReferralSource] = useState(null);
  const [referringBusiness, setReferringBusiness] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [referringBusinessInput, setReferringBusinessInput] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const { setBackEndReferral, setBackEndReferralBusiness } =
    useBusinessFormContext();
  const router = useRouter();

  const handleClose = (prop) => {
    if (prop == "accepted") {
      setOpen(false);
      handleAgree();
    } else if (prop == "rejected") router.push("/search");
  };

  const fetchAllBusinesses = async () => {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/businesses`
    );
    let businesses = await res.json();
    setBusinesses(businesses);
  };

  useEffect(() => {
    if (referralSource?.value == "Business") {
      fetchAllBusinesses();
    }
  }, [referralSource]);

  return (
    <div>
      <h5>Welcome to SoPlugged</h5>
      <div>
        <p>
          The purpose of SoPlugged is to increase brand awareness of Black-owned
          businesses across Canada. We strive to provide a platform that
          connects end-users looking to #buyblack to the perfect business that
          meets their needs.{" "}
        </p>
        <p>
          In order to maintain a respectful, inclusive, and safe environment for
          everyone, we’ve created a set of community guidelines to serve as a
          moral compass for behavior on our platform, define what is acceptable
          in the SoPlugged community, and explain how violations are enforced.
          They aren’t tied to any law, rather they reflect our expectations and
          are rooted in our mission to support the Black community in Canada!
        </p>
        <p>
          We want to create the best experience for all community members, and
          ask that you respect and follow these guidelines:
        </p>
        <ul>
          <li>
            <p>
              Business registration on SoPlugged is solely reserved for Black
              entrepreneurs in Canada.
            </p>
          </li>
          <li>
            <p>
              As you respond to potential customers, communicate respectfully.
              There will be zero tolerance for bullying.
            </p>
          </li>
          <li>
            <p>
              Do not post any pictures or content that could be considered
              defamatory, indecent, hateful, racist, xenophobic, homophobic,
              sexist, disgraceful, vulgar, or inappropriate.
            </p>
          </li>
          <li>
            <p>
              Respect the privacy and personal information of other community
              members.
            </p>
          </li>
        </ul>

        <p
          style={{
            paddingTop: "16px",
            borderTop: "1px solid",
          }}
        >
          <strong>AGREEMENT:</strong> Please fill out the following
        </p>

        <p
          style={{
            paddingTop: "16px",
            borderTop: "1px solid",
          }}
        >
          <strong>CONSEQUENCES:</strong> We will take action when we see someone
          violating these guidelines or if your business is flagged as non-Black
          owned. Sometimes that just means giving someone a warning; other times
          it means revoking certain privileges or removing your business from
          our site. We ask that all community members reach out to a member of
          our team to report any actions that violate these guidelines.
        </p>
      </div>
      <div>
        <button onClick={() => handleClose("rejected")}>Cancel</button>
        <button
          onClick={() => handleClose("accepted")}
          disabled={
            !(
              isBlackOwner &&
              isCanadianBusiness &&
              hasAgreedToTerms &&
              referralSource &&
              (referralSource?.value == "Business" ? referringBusiness : true)
            )
          }
          autoFocus
        >
          Agree
        </button>
      </div>
    </div>
  );
}
