import { whyHireMeQuery } from "@/lib/sanity.query";
import type { WhyHireMeType } from "@/types";
import { Slide } from "../../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import EmptyState from "../shared/EmptyState";
import { BiRocket } from "react-icons/bi";

export default async function WhyHireMe() {
  const whyHireMe: WhyHireMeType = await sanityFetch({
    query: whyHireMeQuery,
    tags: ["whyHireMe"],
  });

  if (!whyHireMe) {
    return (
      <section className="mt-32">
        <EmptyState
          icon={<BiRocket />}
          title="Why Hire Me Section Not Available"
          message="We could not find the 'Why Hire Me' section at the moment. To add one, visit the Sanity studio to start editing the content."
        />
      </section>
    );
  }

  return (
    <section className="mt-32">
      <Slide delay={0.16}>
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
            {whyHireMe.headline}
          </h2>
          <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
            {whyHireMe.description}
          </p>
        </div>
      </Slide>

      {whyHireMe.features && whyHireMe.features.length > 0 && (
        <Slide delay={0.18}>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 max-w-6xl mx-auto">
            {whyHireMe.features.map((feature, index) => (
              <div
                key={index}
                className="group flex flex-col items-start gap-4 p-6 rounded-xl border dark:border-zinc-800 border-zinc-200 dark:bg-primary-bg bg-secondary-bg hover:shadow-lg dark:hover:border-zinc-700 hover:border-zinc-300 transition-all duration-300"
              >
                <div className="flex items-center justify-center p-3 rounded-lg bg-green-400/10 border border-green-400/20 text-3xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-zinc-100 text-zinc-900">
                    {feature.headline}
                  </h3>
                  <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Slide>
      )}
    </section>
  );
}
