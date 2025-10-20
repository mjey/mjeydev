import Image from "next/image";
import { testimonialsQuery } from "@/lib/sanity.query";
import type { TestimonialsType } from "@/types";
import { Slide } from "../../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import EmptyState from "../shared/EmptyState";
import { BiChat } from "react-icons/bi";
import {
  StarIcon,
  CheckBadgeIcon,
  BriefcaseIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default async function Testimonials() {
  const testimonials: TestimonialsType = await sanityFetch({
    query: testimonialsQuery,
    tags: ["testimonials"],
  });

  if (!testimonials) {
    return (
      <section className="mt-32">
        <EmptyState
          icon={<BiChat />}
          title="Testimonials Not Available"
          message="We could not find testimonials at the moment. To add testimonials, visit the Sanity studio to start editing the content."
        />
      </section>
    );
  }

  // Helper function to render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-500"
                : "text-zinc-300 dark:text-zinc-700"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="mt-32">
      {/* Header */}
      <Slide delay={0.16}>
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
            {testimonials.headline}
          </h2>
          <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
            {testimonials.description}
          </p>
        </div>
      </Slide>

      {/* Testimonials Grid */}
      {testimonials.testimonialsList &&
        testimonials.testimonialsList.length > 0 && (
          <Slide delay={0.18}>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-16">
              {testimonials.testimonialsList.map((testimonial, index) => (
                <div
                  key={index}
                  className="group flex flex-col p-6 rounded-xl border dark:border-zinc-800 border-zinc-200 dark:bg-primary-bg bg-secondary-bg hover:shadow-lg dark:hover:border-zinc-700 hover:border-zinc-300 transition-all duration-300"
                >
                  {/* Header: Avatar + Name + Rating */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Avatar */}
                    {testimonial.avatar ? (
                      <Image
                        src={testimonial.avatar.image}
                        alt={testimonial.avatar.alt || testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400/20 to-blue-400/20 flex items-center justify-center text-xl font-semibold dark:text-zinc-100 text-zinc-900">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}

                    {/* Name & Username */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold dark:text-zinc-100 text-zinc-900">
                          {testimonial.name}
                        </h3>
                        {testimonial.link && (
                          <a
                            href={testimonial.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                          >
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm dark:text-zinc-400 text-zinc-600">
                        {testimonial.username}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-4">{renderStars(testimonial.rating)}</div>

                  {/* Testimonial Text */}
                  <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed mb-4 flex-1">
                    &ldquo;{testimonial.testimonial}&rdquo;
                  </p>

                  {/* Company & Location */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <BriefcaseIcon className="w-4 h-4 dark:text-zinc-500 text-zinc-400" />
                      <span className="dark:text-zinc-300 text-zinc-700">
                        {testimonial.company}
                      </span>
                    </div>
                    {testimonial.location && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPinIcon className="w-4 h-4 dark:text-zinc-500 text-zinc-400" />
                        <span className="dark:text-zinc-400 text-zinc-600">
                          {testimonial.location}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tech Stack */}
                  {testimonial.techStack && testimonial.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {testimonial.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs rounded-md dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-300 text-zinc-700 border dark:border-zinc-700 border-zinc-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Slide>
        )}

      {/* Stats Section */}
      {testimonials.stats && (
        <Slide delay={0.2}>
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-8 max-w-4xl mx-auto mt-16">
            {/* Average Rating */}
            <div className="flex flex-col items-center text-center p-6 rounded-xl border dark:border-zinc-800 border-zinc-200 dark:bg-primary-bg bg-secondary-bg">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-400/10 border border-yellow-400/20 mb-4">
                <StarIcon className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="text-3xl font-bold dark:text-zinc-100 text-zinc-900 mb-2">
                {testimonials.stats.averageRating.toFixed(1)}
              </div>
              <div className="text-sm dark:text-zinc-400 text-zinc-600">
                {testimonials.stats.averageRatingLabel}
              </div>
            </div>

            {/* Total Reviews */}
            <div className="flex flex-col items-center text-center p-6 rounded-xl border dark:border-zinc-800 border-zinc-200 dark:bg-primary-bg bg-secondary-bg">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-400/10 border border-green-400/20 mb-4">
                <CheckBadgeIcon className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold dark:text-zinc-100 text-zinc-900 mb-2">
                {testimonials.stats.totalReviews}+
              </div>
              <div className="text-sm dark:text-zinc-400 text-zinc-600">
                {testimonials.stats.totalReviewsLabel}
              </div>
            </div>

            {/* Projects Done */}
            <div className="flex flex-col items-center text-center p-6 rounded-xl border dark:border-zinc-800 border-zinc-200 dark:bg-primary-bg bg-secondary-bg">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-400/10 border border-blue-400/20 mb-4">
                <BriefcaseIcon className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold dark:text-zinc-100 text-zinc-900 mb-2">
                {testimonials.stats.projectsDone}+
              </div>
              <div className="text-sm dark:text-zinc-400 text-zinc-600">
                {testimonials.stats.projectsDoneLabel}
              </div>
            </div>
          </div>
        </Slide>
      )}
    </section>
  );
}
