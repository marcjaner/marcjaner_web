import React from "react";
import MetaTags from "@/components/MetaTags";

const MePage = () => {
  return (
    <>
      <MetaTags
        title="Marc Janer | Hi, I'm Marc"
        description="I'm from Mallorca, I live in Barcelona, and I build things. A short letter about how I work and where to find the rest."
        image="/images/home/marc_janer.jpg"
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <article className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-10">
              Hi, I'm Marc{" "}
              <span className="inline-block animate-wave origin-bottom-right">
                👋
              </span>
            </h1>

            <div className="text-lg leading-relaxed text-muted-foreground space-y-6">
              <p>
                I'm from Mallorca, I live in Barcelona, and I build things.
              </p>

              <p>That's the short version. Here's a slightly longer one.</p>

              <p>
                The first thing I ever built was a website for my parents' bus
                company. I was 16, it was 2020, and everything was closed. It
                wasn't pretty, but people booked through it — close to 900 trips
                went through that site.
              </p>

              <p>
                That's still more or less how I work. Build the small thing, put
                it in front of someone, find out.
              </p>

              <p>
                Since then: a year and a half at REVER, a startup where I ended
                up touching almost everything — React on the front, Go on the
                back, lambdas, automations, SQL. I helped take production down
                at least once. I'm half proud of that, because if you don't
                break anything in a year at a startup, something isn't working.
              </p>

              <p>
                I finished a Data Engineering degree in June 2025. Since
                September I've been a Product Engineer at Livo, where we
                automate shift scheduling for hospitals — nurses, doctors, the
                people who actually keep the place running.
              </p>

              <p>
                On the side I build small things, fast, mostly for myself. A
                personal finance app. A restaurant app with a friend. A Mermaid
                viewer. A pile of agent skills. Some get used by a hundred
                people, some only by me. Both are fine.
              </p>

              <p>
                I also write. Every week or two, in Catalan, Spanish and English
                — often in the same sentence. About what I'm building, trips,
                money, Mallorca, and whatever I can't stop thinking about. I've
                been at it since March 2024 and I'm late more often than not.
              </p>

              <p className="text-foreground font-semibold">
                If you want to know how I think, read that. It's the most honest
                thing I put online.
              </p>
            </div>

            <hr className="border-border my-10" />

            <div className="text-lg leading-relaxed text-muted-foreground">
              <p className="mb-6">Where to go next:</p>

              <ul className="space-y-3">
                <li>
                  <a
                    href="https://marcjaner.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    My newsletter
                  </a>{" "}
                  — how I think, in long form
                </li>
                <li>
                  <a
                    href="https://x.com/marcjaner_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    X
                  </a>{" "}
                  — the same, but shorter and worse
                </li>
                <li>
                  <a
                    href="https://github.com/marcjaner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    GitHub
                  </a>{" "}
                  — what I'm building
                </li>
              </ul>
            </div>

            <hr className="border-border my-10" />

            <div className="text-lg leading-relaxed text-muted-foreground space-y-6">
              <p>That's it. I don't want to make this longer than it needs to be.</p>

              <p>If any of it resonates, write to me.</p>

              <p className="text-foreground">
                Ciao,
                <br />
                Marc
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default MePage;
