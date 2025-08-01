import { Metadata } from "next";
import NotFoundComponent from "./components/shared/NotFound";

export const metadata: Metadata = {
  title: "Error 404",
};

export default function NotFound() {
  return (
    <NotFoundComponent
      title="Error 404: Page Not Found"
      description="Oops! The page you're looking for doesn't seem to exist on my site. While you're here, feel free to explore my projects or read some of my blog posts."
    />
  );
}
