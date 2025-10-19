import {
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { BsGithub } from "react-icons/bs";
import type { ProfileType } from "@/types";
import { socialLinks } from "../../data/social";

type ContactInfoProps = {
  headline: string;
  availability: string;
  timezone: string;
  profile: ProfileType;
};

export default function ContactInfo({
  headline,
  availability,
  timezone,
  profile,
}: ContactInfoProps) {
  const githubLink = socialLinks.find((link) => link.name === "GitHub");

  return (
    <div className="w-full sticky top-8">
      <div className="mb-8">
        <h2 className="font-incognito text-3xl font-bold tracking-tight mb-6">
          {headline}
        </h2>
      </div>

      <div className="space-y-4">
        {profile?.email && (
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-start gap-4 p-4 rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-primary-bg bg-secondary-bg hover:shadow-md dark:hover:border-zinc-700 hover:border-zinc-300 transition-all duration-300"
          >
            <div className="flex items-center justify-center p-3 rounded-lg bg-blue-400/10 border border-blue-400/20 group-hover:scale-110 transition-transform duration-300">
              <EnvelopeIcon className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm dark:text-zinc-300 text-zinc-600 mb-1">
                Email
              </h3>
              <p className="text-base dark:text-zinc-100 text-zinc-900 break-all">
                {profile.email}
              </p>
            </div>
          </a>
        )}

        {githubLink && (
          <a
            href={githubLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-4 rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-primary-bg bg-secondary-bg hover:shadow-md dark:hover:border-zinc-700 hover:border-zinc-300 transition-all duration-300"
          >
            <div className="flex items-center justify-center p-3 rounded-lg bg-purple-400/10 border border-purple-400/20 group-hover:scale-110 transition-transform duration-300">
              <BsGithub className="w-6 h-6 text-purple-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm dark:text-zinc-300 text-zinc-600 mb-1">
                GitHub
              </h3>
              <p className="text-base dark:text-zinc-100 text-zinc-900">
                {githubLink.url.replace("https://github.com/", "@")}
              </p>
            </div>
          </a>
        )}

        {profile?.location && (
          <div className="flex items-start gap-4 p-4 rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-primary-bg bg-secondary-bg">
            <div className="flex items-center justify-center p-3 rounded-lg bg-green-400/10 border border-green-400/20">
              <MapPinIcon className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm dark:text-zinc-300 text-zinc-600 mb-1">
                Location
              </h3>
              <p className="text-base dark:text-zinc-100 text-zinc-900">
                {profile.location}
              </p>
              <p className="text-sm dark:text-zinc-400 text-zinc-600 mt-1">
                {availability}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-4 p-4 rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-primary-bg bg-secondary-bg">
          <div className="flex items-center justify-center p-3 rounded-lg bg-orange-400/10 border border-orange-400/20">
            <ClockIcon className="w-6 h-6 text-orange-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm dark:text-zinc-300 text-zinc-600 mb-1">
              Timezone
            </h3>
            <p className="text-base dark:text-zinc-100 text-zinc-900">
              {timezone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
