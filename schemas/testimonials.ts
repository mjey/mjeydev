import { defineField } from "sanity";
import { BiChat } from "react-icons/bi";

const testimonials = {
  name: "testimonials",
  title: "Testimonials",
  type: "document",
  icon: BiChat,
  fields: [
    // Section Header
    defineField({
      name: "headline",
      title: "Section Headline",
      type: "string",
      description: "Main headline for the testimonials section",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Section Description",
      type: "text",
      rows: 3,
      description: "Short description for the testimonials section",
      validation: (rule) => rule.required(),
    }),

    // Testimonials List
    defineField({
      name: "testimonialsList",
      title: "Testimonials",
      type: "array",
      description: "List of client testimonials",
      validation: (rule) => rule.required(),
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Client Name",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "username",
              title: "Username/Handle",
              type: "string",
              description: "e.g., @johndoe or johndoe",
              validation: (rule) => rule.required(),
            },
            {
              name: "link",
              title: "Profile Link (Optional)",
              type: "url",
              description: "Link to client's LinkedIn, website, or social media",
            },
            {
              name: "avatar",
              title: "Avatar Image (Optional)",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "rating",
              title: "Rating (out of 5)",
              type: "number",
              validation: (rule) => rule.required().min(1).max(5),
              description: "Rating from 1 to 5 stars",
            },
            {
              name: "location",
              title: "Location",
              type: "string",
              description: "City, Country or region",
            },
            {
              name: "company",
              title: "Company Name",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "techStack",
              title: "Technology Stack",
              type: "array",
              description: "Technologies used in the project",
              of: [{ type: "string" }],
            },
            {
              name: "testimonial",
              title: "Testimonial Text",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "company",
              media: "avatar",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title,
                subtitle: subtitle,
                media: media,
              };
            },
          },
        },
      ],
    }),

    // Stats Section
    defineField({
      name: "stats",
      title: "Statistics",
      type: "object",
      description: "Display statistics at the bottom of testimonials section",
      fields: [
        {
          name: "averageRating",
          title: "Average Rating",
          type: "number",
          description: "Average rating (e.g., 5.0)",
          validation: (rule) => rule.required().min(0).max(5),
        },
        {
          name: "averageRatingLabel",
          title: "Average Rating Label",
          type: "string",
          description: "Label for average rating (e.g., 'Average Rating')",
          validation: (rule) => rule.required(),
        },
        {
          name: "totalReviews",
          title: "Total Client Reviews",
          type: "number",
          description: "Total number of client reviews (e.g., 46)",
          validation: (rule) => rule.required(),
        },
        {
          name: "totalReviewsLabel",
          title: "Total Reviews Label",
          type: "string",
          description: "Label for total reviews (e.g., 'Client Reviews')",
          validation: (rule) => rule.required(),
        },
        {
          name: "projectsDone",
          title: "Projects Completed",
          type: "number",
          description: "Total projects completed (e.g., 45)",
          validation: (rule) => rule.required(),
        },
        {
          name: "projectsDoneLabel",
          title: "Projects Done Label",
          type: "string",
          description: "Label for projects done (e.g., 'Projects Done')",
          validation: (rule) => rule.required(),
        },
      ],
    }),
  ],
};

export default testimonials;
