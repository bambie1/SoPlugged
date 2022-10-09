import { FormikInput } from "@/components/formik";

const Contact = () => {
  return (
    <>
      <FormikInput
        label="Website Url"
        prefix="https://"
        placeholder="www.soplugged.com"
        name="business_url"
        optional
      />
      <FormikInput
        label="Phone Number"
        placeholder="6131234567"
        name="phone_number"
        optional
        type="tel"
      />
      <FormikInput
        label="IG Handle"
        placeholder="sopluggd"
        name="ig_handle"
        optional
      />
    </>
  );
};

export default Contact;
