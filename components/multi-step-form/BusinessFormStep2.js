import React, { useState } from "react";
import Image from "next/image";
import { categories } from "../../src/ListOfCategories";
import { useFormikContext } from "formik";
import { useBusinessFormContext } from "@contexts/businessFormContext";

const BusinessFormStep2 = () => {
  const { setFieldValue, values } = useFormikContext();
  const [selectedCategory, setSelectedCategory] = useState(
    values.businessCategory
  );
  const defaultCategory = categories.find(
    (item) => item.label === selectedCategory
  );
  const [tags, setTags] = useState(defaultCategory?.tags || "");
  const { setFormWasChanged } = useBusinessFormContext();

  const handleClick = (label, tags) => {
    setSelectedCategory(label);
    setTags(tags);
    setFieldValue("businessCategory", label);
    setFormWasChanged(true);
  };

  return (
    <>
      <p>Please select a category below:</p>
      <form>
        <div>
          {categories.map(({ tags, label, imageSrc }) => (
            <label key={label}>
              <input
                type="radio"
                name="business-category"
                value={label}
                checked={selectedCategory == label}
                onChange={() => handleClick(label, tags)}
                aria-label={label}
              />
              <div
                className="categoryDivImage"
                onClick={() => handleClick(label, tags)}
              >
                <Image src={imageSrc} width={40} height={40} />
                <p>{label}</p>
              </div>
            </label>
          ))}
        </div>
      </form>
      {selectedCategory && (
        <>
          <p>
            <strong>Category selected: </strong> {selectedCategory}
          </p>
          <p style={{ fontStyle: "italic", fontSize: "0.7rem" }}>{tags}</p>
        </>
      )}
    </>
  );
};

export default BusinessFormStep2;
