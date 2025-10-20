import Image from "next/image";
import Link from "next/link";
import { recentProjectsQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { Slide } from "../../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import EmptyState from "../shared/EmptyState";
import { BiPackage } from "react-icons/bi";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

export default async function RecentProjects() {
  const projects: ProjectType[] = await sanityFetch({
    query: recentProjectsQuery,
    tags: ["project"],
  });

  if (!projects || projects.length === 0) {
    return (
      <section className="mt-32">
        <EmptyState
          icon={<BiPackage />}
          title="No Projects Available"
          message="We could not find any projects at the moment. To add projects, visit the Sanity studio to start editing the content."
        />
      </section>
    );
  }

  return (
    <section className="mt-32">
      <Slide delay={0.16}>
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
              Recent Projects
            </h2>
            <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed max-w-2xl">
              Check out some of my latest work and side projects
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden md:flex items-center gap-2 text-sm dark:text-zinc-400 text-zinc-600 hover:dark:text-zinc-100 hover:text-zinc-900 transition-colors group"
          >
            View all projects
            <ArrowUpRightIcon className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </Slide>

      <Slide delay={0.18}>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 max-w-6xl mx-auto">
          {projects.map((project) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project._id}
              className="group flex flex-col rounded-xl border dark:border-zinc-800 border-zinc-200 dark:bg-primary-bg bg-secondary-bg hover:shadow-lg dark:hover:border-zinc-700 hover:border-zinc-300 transition-all duration-300 overflow-hidden"
            >
              {/* Project Cover Image */}
              {project.coverImage ? (
                <div className="relative w-full h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={project.coverImage.image}
                    alt={project.coverImage.alt || project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL={project.coverImage.lqip}
                  />
                </div>
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-green-400/10 to-blue-400/10 border-b dark:border-zinc-800 border-zinc-200">
                  <span className="text-6xl">🚀</span>
                </div>
              )}

              {/* Project Info */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  {project.logo ? (
                    <div className="flex items-center justify-center p-2 rounded-lg bg-green-400/10 border border-green-400/20 flex-shrink-0">
                      <Image
                        src={project.logo}
                        width={32}
                        height={32}
                        alt={project.name}
                        className="rounded"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-2 rounded-lg bg-green-400/10 border border-green-400/20 text-2xl">
                      📦
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1 dark:text-zinc-100 text-zinc-900 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  <ArrowUpRightIcon className="w-5 h-5 dark:text-zinc-500 text-zinc-400 group-hover:dark:text-green-400 group-hover:text-green-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                </div>
                <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  {project.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Slide>

      {/* View All Link for Mobile */}
      <Slide delay={0.2}>
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-primary-bg bg-secondary-bg hover:shadow-md dark:hover:border-zinc-700 hover:border-zinc-300 transition-all group"
          >
            View all projects
            <ArrowUpRightIcon className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </Slide>
    </section>
  );
}
