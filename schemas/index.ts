import job from "./job";
import profile from "./profile";
import project from "./project";
import post from "./post";
import author from "./author";
import heroe from "./heroe";
import whyHireMe from "./whyHireMe";
import contact from "./contact";
import testimonials from "./testimonials";
import { youtube } from "./youtube";
import { table } from "./table";
import blockContent from "./blockContent";
import quiz from "./quiz";

export const schemaTypes = [
  profile,
  job,
  project,
  post,
  author,
  heroe,
  whyHireMe,
  contact,
  testimonials,

  // Reference types
  blockContent,
  youtube,
  table,
  quiz,
];
