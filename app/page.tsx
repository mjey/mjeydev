import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import HeroSvg from "./assets/icons/HeroSvg";
import Job from "./components/pages/Job";
import WhyHireMe from "./components/pages/WhyHireMe";
import Social from "./components/shared/Social";
import { Slide } from "./animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import ContributionGraph from "./components/pages/GithubCalendarComponent";
import { ArrowDownTrayIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default async function Home() {
  const profile: ProfileType = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 mb-16">
        <div key={profile?._id} className="lg:max-w-2xl max-w-2xl">
          <Slide>
            <h1 className="font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
              {profile?.headline ?? "Job Title"}
            </h1>
            <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
              {profile?.shortBio ?? "Short bio description"}
            </p>
          </Slide>
          <Slide delay={0.1}>
            <div className="flex flex-wrap gap-4 mt-6">
              {profile?.resumeURL && (
                <a
                  href={profile.resumeURL}
                  download
                  className="group px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-300 flex items-center gap-2 hover:gap-3 shadow-md hover:shadow-lg"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download CV
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="group px-6 py-3 bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-medium rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-300 flex items-center gap-2 hover:gap-3 shadow-md hover:shadow-lg"
                >
                  <EnvelopeIcon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                  Get in Touch
                </a>
              )}
            </div>
          </Slide>
          <Slide delay={0.14}>
            <Social type="social" />
          </Slide>
        </div>
        <Slide delay={0.14}>
          <HeroSvg />
        </Slide>
      </section>
      <WhyHireMe />
      <ContributionGraph />
      <Job />
    </main>
  );
}
