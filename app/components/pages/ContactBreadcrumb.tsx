import { Slide } from "../../animation/Slide";

type BreadcrumbProps = {
  headline: string;
  description: string;
  points: {
    icon: string;
    text: string;
  }[];
};

export default function ContactBreadcrumb({
  headline,
  description,
  points,
}: BreadcrumbProps) {
  return (
    <section className="mb-16">
      <Slide delay={0.1}>
        <div className="mb-8">
          <h1 className="font-incognito text-4xl font-bold tracking-tight mb-4">
            {headline}
          </h1>
          <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
            {description}
          </p>
        </div>
      </Slide>

      {points && points.length > 0 && (
        <Slide delay={0.12}>
          <div className="flex flex-wrap gap-6 mt-8">
            {points.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-primary-bg bg-secondary-bg"
              >
                <span className="text-2xl">{point.icon}</span>
                <span className="text-sm dark:text-zinc-300 text-zinc-700">
                  {point.text}
                </span>
              </div>
            ))}
          </div>
        </Slide>
      )}
    </section>
  );
}
