import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "businessCategory",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
  ],
});
