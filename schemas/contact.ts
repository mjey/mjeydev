import { defineField } from "sanity";
import { BiEnvelope } from "react-icons/bi";

const contact = {
  name: "contact",
  title: "Contact Page",
  type: "document",
  icon: BiEnvelope,
  fields: [
    // Breadcrumb Section
    defineField({
      name: "breadcrumbHeadline",
      title: "Breadcrumb Headline",
      type: "string",
      description: "Main headline for the breadcrumb section",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "breadcrumbDescription",
      title: "Breadcrumb Description",
      type: "text",
      rows: 3,
      description: "Short description for breadcrumb section",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "breadcrumbPoints",
      title: "Breadcrumb Bullet Points",
      type: "array",
      description: "Key points with icons",
      validation: (rule) => rule.required().max(4),
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Emoji or icon character (e.g., ✉️, 📱, 💼)",
              validation: (rule) => rule.required(),
            },
            {
              name: "text",
              title: "Text",
              type: "string",
              description: "Bullet point text",
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: "text",
              icon: "icon",
            },
            prepare({ title, icon }) {
              return {
                title: `${icon} ${title}`,
              };
            },
          },
        },
      ],
    }),

    // Form Section
    defineField({
      name: "formHeadline",
      title: "Form Headline",
      type: "string",
      description: "Main headline for the contact form",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "formDescription",
      title: "Form Description",
      type: "text",
      rows: 2,
      description: "Short description for the form section",
      validation: (rule) => rule.required(),
    }),

    // Contact Information Section
    defineField({
      name: "contactInfoHeadline",
      title: "Contact Info Headline",
      type: "string",
      description: "Headline for contact information section",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "string",
      description: "Your availability status (e.g., 'Available for freelance work')",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "timezone",
      title: "Timezone",
      type: "string",
      description: "Your timezone (e.g., 'EST (UTC-5)')",
      validation: (rule) => rule.required(),
    }),

    // FAQs Section
    defineField({
      name: "faqHeadline",
      title: "FAQ Section Headline",
      type: "string",
      description: "Headline for FAQs section",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      description: "Frequently Asked Questions",
      validation: (rule) => rule.required(),
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: "question",
              subtitle: "answer",
            },
          },
        },
      ],
    }),
  ],
};

export default contact;
