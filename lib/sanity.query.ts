import { groq } from "next-sanity";

// Reusable post fields
const postField = groq`
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  description,
  coverImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
  featured,
  isPublished
`;

export const profileQuery = groq`*[_type == "profile"][0]{
  _id,
  fullName,
  headline,
  profileImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
  shortBio,
  location,
  fullBio,
  email,
  "resumeURL": resumeURL.asset->url,
  socialLinks,
  usage
}`;

export const jobQuery = groq`*[_type == "job"] | order(_createdAt desc){
  _id,
  name,
  jobTitle,
  "logo": logo.asset->url,
  url,
  description,
  startDate,
  endDate,
}`;

export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc){
  _id,
  name,
  "slug": slug.current,
  tagline,
  "logo": logo.asset->url,
}`;

export const recentProjectsQuery = groq`*[_type == "project"] | order(_createdAt desc)[0...3]{
  _id,
  name,
  "slug": slug.current,
  tagline,
  "logo": logo.asset->url,
  coverImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
}`;

export const singleProjectQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  name,
  projectUrl,
  repository,
  coverImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
  tagline,
  description
}`;

export const postsQuery = groq`*[_type == "Post"] | order(_createdAt desc){
  ${postField},
  date,
  "author": author-> {
    name, 
    photo, 
    twitterUrl
  },
  body,
}`;

export const featuredPostsQuery = groq`*[_type == "Post" && featured == true] | order(_createdAt desc) {
  ${postField}
}`;

export const singlePostQuery = groq`*[_type == "Post" && slug.current == $slug][0]{
  ${postField},
  _updatedAt,
  canonicalLink,
  date,
  tags,
  "author": author-> {
    name, 
    photo {
      "image": asset->url,
      alt
    }, 
    twitterUrl
  },
  body,
}`;

export const heroesQuery = groq`*[_type == "heroe"] | order(_createdAt asc) { _id, _createdAt, name, url, met }`;

export const whyHireMeQuery = groq`*[_type == "whyHireMe"][0]{
  _id,
  headline,
  description,
  features[]{
    icon,
    headline,
    description
  }
}`;

export const contactQuery = groq`*[_type == "contact"][0]{
  _id,
  breadcrumbHeadline,
  breadcrumbDescription,
  breadcrumbPoints[]{
    icon,
    text
  },
  formHeadline,
  formDescription,
  contactInfoHeadline,
  availability,
  timezone,
  faqHeadline,
  faqs[]{
    question,
    answer
  }
}`;

export const testimonialsQuery = groq`*[_type == "testimonials"][0]{
  _id,
  headline,
  description,
  testimonialsList[]{
    name,
    username,
    link,
    avatar {
      "image": asset->url,
      alt
    },
    rating,
    location,
    company,
    techStack,
    testimonial
  },
  stats {
    averageRating,
    averageRatingLabel,
    totalReviews,
    totalReviewsLabel,
    projectsDone,
    projectsDoneLabel
  }
}`;
