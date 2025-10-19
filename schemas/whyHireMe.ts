import { defineField } from "sanity";
import { BiRocket } from "react-icons/bi";

const whyHireMe = {
  name: "whyHireMe",
  title: "Why Hire Me",
  type: "document",
  icon: BiRocket,
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Main headline for the 'Why Hire Me' section",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short description about why clients should hire you",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      description: "Benefits of working with you (recommended: 6 features)",
      validation: (rule) => rule.required().max(6),
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Emoji or icon character (e.g., 🚀, ⚡, 💡)",
              validation: (rule) => rule.required(),
            },
            {
              name: "headline",
              title: "Feature Headline",
              type: "string",
              description: "Title of this feature",
              validation: (rule) => rule.required(),
            },
            {
              name: "description",
              title: "Feature Description",
              type: "text",
              rows: 2,
              description: "Brief description of this feature",
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: "headline",
              subtitle: "description",
              icon: "icon",
            },
            prepare({ title, subtitle, icon }) {
              return {
                title: `${icon} ${title}`,
                subtitle: subtitle,
              };
            },
          },
        },
      ],
    }),
  ],
};

export default whyHireMe;
