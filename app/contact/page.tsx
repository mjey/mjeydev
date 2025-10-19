import { contactQuery, profileQuery } from "@/lib/sanity.query";
import type { ContactType, ProfileType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";
import { Slide } from "../animation/Slide";
import ContactBreadcrumb from "../components/pages/ContactBreadcrumb";
import ContactForm from "../components/pages/ContactForm";
import ContactInfo from "../components/pages/ContactInfo";
import ContactFAQ from "../components/pages/ContactFAQ";

export const metadata = {
  title: "Contact",
  description: "Get in touch with me for your next project or collaboration.",
};

export default async function ContactPage() {
  const contact: ContactType = await sanityFetch({
    query: contactQuery,
    tags: ["contact"],
  });

  const profile: ProfileType = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  if (!contact) {
    return (
      <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
        <div className="text-center py-20">
          <h1 className="font-incognito text-4xl font-bold mb-4">
            Contact Page Not Available
          </h1>
          <p className="dark:text-zinc-400 text-zinc-600">
            Please configure the contact page in Sanity Studio.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      {/* Breadcrumb Section */}
      <ContactBreadcrumb
        headline={contact.breadcrumbHeadline}
        description={contact.breadcrumbDescription}
        points={contact.breadcrumbPoints}
      />

      {/* Two Column Section: Form + Contact Info */}
      <section className="mt-16">
        <Slide delay={0.14}>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-12">
            {/* Left Column: Contact Form */}
            <ContactForm
              headline={contact.formHeadline}
              description={contact.formDescription}
            />

            {/* Right Column: Contact Information */}
            <ContactInfo
              headline={contact.contactInfoHeadline}
              availability={contact.availability}
              timezone={contact.timezone}
              profile={profile}
            />
          </div>
        </Slide>
      </section>

      {/* FAQs Section */}
      {contact.faqs && contact.faqs.length > 0 && (
        <Slide delay={0.16}>
          <ContactFAQ headline={contact.faqHeadline} faqs={contact.faqs} />
        </Slide>
      )}
    </main>
  );
}
