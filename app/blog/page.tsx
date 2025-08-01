import { Metadata } from "next";
import { BiDetail } from "react-icons/bi";
import Posts from "../components/pages/Posts";
import Social from "../components/shared/Social";
import { Slide } from "../animation/Slide";
import PageHeading from "@/app/components/shared/PageHeading";
export const metadata: Metadata = {
  title: "Blog | Muzamil Hussain",
  metadataBase: new URL("https://mjey.dev"),
  description: "Read the latest articles and insights from Muzamil Hussain's Blog.",

  openGraph: {
    title: "Blog | Muzamil Hussain",
    url: "https://mjey.dev/blog",
    description:
      "Read the latest articles and insights from Muzamil Hussain's Blog.",
    images: [
      {
        url: "https://res.cloudinary.com/db2wzz9rg/image/upload/v1754042645/Muzamil_open_graph_yrhi2r.png",
        width: 1200,
        height: 630,
        alt: "Muzamil Hussain's Blog",
      },
    ],
  },
};

export default async function Blog() {
  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        title="Blog"
        description="Welcome to my blog domain where I share personal stories about things I've learned, projects I'm hacking on and just general findings. I also write for other publications."
      >
        <Social type="publication" />
      </PageHeading>

      <Slide delay={0.1}>
        <div className="flex items-center gap-x-3 mb-8">
          <BiDetail />
          <h2 className="text-xl font-semibold tracking-tight">Explore All</h2>
        </div>
        <Posts />
      </Slide>
    </main>
  );
}
