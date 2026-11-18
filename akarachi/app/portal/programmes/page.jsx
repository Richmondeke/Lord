import Link from "next/link";
import { Rise, Wipe } from "@/components/motion";
import { Check as CheckIcon, FileText as FileTextIcon } from "lucide-react";

export const metadata = {
  title: "Programmes | Empowerment Portal",
  description:
    "What has been delivered in Mbaitoli and Ikeduru, the programmes open now, and where to apply and track your application.",
};

export default function Page() {
  return (
    <>
      <div>
        <section className="bg-forest text-white">
          <div className="wrap py-16 md:py-24">
            <Rise
              as="h1"
              text="Choose a programme"
              className="text-[clamp(3.5rem,8vw,7.5rem)]"
            />
            <p className="mt-5 max-w-[36rem] text-lg text-white/85">
              Every active programme from the constituency office of Hon. Engr.
              Akarachi Amadi, with who qualifies and what to bring.
            </p>
            <ul className="ui mt-8 flex flex-wrap gap-2 text-xl">
              <li>
                <a
                  href="#education"
                  className="inline-block border-2 border-white/50 px-4 py-2 transition-colors hover:bg-white hover:text-ink"
                >
                  Education
                </a>
              </li>
              <li>
                <a
                  href="#startup"
                  className="inline-block border-2 border-white/50 px-4 py-2 transition-colors hover:bg-white hover:text-ink"
                >
                  Start-up
                </a>
              </li>
              <li>
                <a
                  href="#growth"
                  className="inline-block border-2 border-white/50 px-4 py-2 transition-colors hover:bg-white hover:text-ink"
                >
                  Growth
                </a>
              </li>
            </ul>
          </div>
        </section>
        <div className="wrap">
          <section
            id="education"
            className="grid scroll-mt-32 gap-x-14 gap-y-8 border-b border-ink/20 py-16 last:border-0 md:py-24 lg:grid-cols-[1fr_1.25fr]"
          >
            <div className="lg:sticky lg:top-36 lg:self-start">
              <p className="ui text-2xl text-slate">
                {"Programme "}1{" of "}3
              </p>
              <h2 className="mt-2 text-[clamp(2.75rem,5vw,4.5rem)]">
                Education Empowerment
              </h2>
              <p className="mt-4 max-w-[30rem] text-lg">
                Support for indigenes of Mbaitoli/Ikeduru who have won admission
                to a Federal or State tertiary institution.
              </p>
              <Wipe
                src="/img/walk.webp"
                alt=""
                className="mt-8 aspect-[16/10]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div>
              <h3 className="text-3xl">You qualify if</h3>
              <ul className="mt-5 border-b border-ink/20">
                <li className="flex gap-4 border-t border-ink/20 py-4 text-lg">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center bg-mint text-forest">
                    <CheckIcon size={18} aria-hidden={true} strokeWidth={3} />
                  </span>
                  You are an indigene of Mbaitoli/Ikeduru Federal Constituency
                </li>
                <li className="flex gap-4 border-t border-ink/20 py-4 text-lg">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center bg-mint text-forest">
                    <CheckIcon size={18} aria-hidden={true} strokeWidth={3} />
                  </span>
                  You scored 200 or above in the UTME (JAMB)
                </li>
                <li className="flex gap-4 border-t border-ink/20 py-4 text-lg">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center bg-mint text-forest">
                    <CheckIcon size={18} aria-hidden={true} strokeWidth={3} />
                  </span>
                  You have admission to a Federal or State tertiary institution
                </li>
                <li className="flex gap-4 border-t border-ink/20 py-4 text-lg">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center bg-mint text-forest">
                    <CheckIcon size={18} aria-hidden={true} strokeWidth={3} />
                  </span>
                  You have not received this education support before
                </li>
              </ul>
              <h3 className="mt-12 text-3xl">Have these ready</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                <li className="flex items-start gap-3 border border-ink/20 p-4">
                  <FileTextIcon
                    className="mt-0.5 shrink-0 text-emerald"
                    size={20}
                    aria-hidden={true}
                  />
                  <span>JAMB result slip</span>
                </li>
                <li className="flex items-start gap-3 border border-ink/20 p-4">
                  <FileTextIcon
                    className="mt-0.5 shrink-0 text-emerald"
                    size={20}
                    aria-hidden={true}
                  />
                  <span>Admission letter</span>
                </li>
                <li className="flex items-start gap-3 border border-ink/20 p-4">
                  <FileTextIcon
                    className="mt-0.5 shrink-0 text-emerald"
                    size={20}
                    aria-hidden={true}
                  />
                  <span>
                    School fee invoice or evidence of registration
                    <span className="block text-sm text-slate">
                      Where applicable
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3 border border-ink/20 p-4">
                  <FileTextIcon
                    className="mt-0.5 shrink-0 text-emerald"
                    size={20}
                    aria-hidden={true}
                  />
                  <span>Valid means of identification</span>
                </li>
                <li className="flex items-start gap-3 border border-ink/20 p-4">
                  <FileTextIcon
                    className="mt-0.5 shrink-0 text-emerald"
                    size={20}
                    aria-hidden={true}
                  />
                  <span>Recent passport photograph</span>
                </li>
                <li className="flex items-start gap-3 border border-ink/20 p-4">
                  <FileTextIcon
                    className="mt-0.5 shrink-0 text-emerald"
                    size={20}
                    aria-hidden={true}
                  />
                  <span>Certificate of origin</span>
                </li>
              </ul>
              <Link
                href="/portal/apply?programme=education"
                className="btn btn-forest mt-10 !min-h-14 !px-8"
              >
                {"Apply for "}education{" support"}
              </Link>
            </div>
          </section>
          <section
            id="startup"
            className="grid scroll-mt-32 gap-x-14 gap-y-8 border-b border-ink/20 py-16 last:border-0 md:py-24 lg:grid-cols-[1fr_1.25fr]"
          >
            <div className="lg:sticky lg:top-36 lg:self-start">
              <p className="ui text-2xl text-slate">
                {"Programme "}2{" of "}3
              </p>
              <h2 className="mt-2 text-[clamp(2.75rem,5vw,4.5rem)]">
                New Business Start-Up Support
              </h2>
              <p className="mt-4 max-w-[30rem] text-lg">
                For people with a workable business idea who need help to set it
                up. Tools, equipment and support to turn the idea into a living.
              </p>
              <Wipe
                src="/img/mills.webp"
                alt=""
                className="mt-8 aspect-[16/10]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div>
              <h3 className="text-3xl">You qualify if</h3>
              <ul className="mt-5 border-b border-ink/20">
                <li className="flex gap-4 border-t border-ink/20 py-4 text-lg">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center bg-mint text-forest">
                    <CheckIcon size={18} aria-hidden={true} strokeWidth={3} />
                  </span>
                  You are an indigene of Mbaitoli/Ikeduru Federal Constituency
                </li>
                <li className="flex gap-4 border-t border-ink/20 py-4 text-lg">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center bg-mint text-forest">
                    <CheckIcon size={18} aria-hidden={true} strokeWidth={3} />
                  </span>
                  You are 18 or older
                </li>
                <li className="flex gap-4 border-t border-ink/20 py-4 text-lg">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center bg-mint text-forest">
                    <CheckIcon size={18} aria-hidden={true} strokeWidth={3} />
                  </span>
                  You work in, or are ready to start, a productive trade such as
                  farming, petty trading, food processing, transport,
                  artisanship or fishing
                </li>
                <li className="flex gap-4 border-t border-ink/20 py-4 text-lg">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center bg-mint text-forest">
                    <CheckIcon size={18} aria-hidden={true} strokeWidth={3} />
                  </span>
                  Your Traditional Ruler will attest to your application
                </li>
                <li className="flex gap-4 border-t border-ink/20 py-4 text-lg">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center bg-mint text-forest">
                    <CheckIcon size={18} aria-hidden={true} strokeWidth={3} />
                  </span>
                  You submit one application only, and can be visited for
                  verification
                </li>
              </ul>
              <p className="mt-5 border-l-4 border-forest bg-ivory p-5 text-[0.9375rem]">
                Priority goes to active farmers and cooperatives, widows and
                vulnerable women in business, unemployed young people with a
                clear plan, persons with disabilities, and applicants who have
                not benefited before.
              </p>
              <h3 className="mt-12 text-3xl">Have these ready</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                <li className="flex items-start gap-3 border border-ink/20 p-4">
                  <FileTextIcon
                    className="mt-0.5 shrink-0 text-emerald"
                    size={20}
                    aria-hidden={true}
                  />
                  <span>Valid means of identification</span>
                </li>
                <li className="flex items-start gap-3 border border-ink/20 p-4">
                  <FileTextIcon
                    className="mt-0.5 shrink-0 text-emerald"
                    size={20}
                    aria-hidden={true}
                  />
                  <span>Attestation from your Traditional Ruler</span>
                </li>
                <li className="flex items-start gap-3 border border-ink/20 p-4">
                  <FileTextIcon
                    className="mt-0.5 shrink-0 text-emerald"
                    size={20}
                    aria-hidden={true}
                  />
                  <span>Recent passport photograph</span>
                </li>
                <li className="flex items-start gap-3 border border-ink/20 p-4">
                  <FileTextIcon
                    className="mt-0.5 shrink-0 text-emerald"
                    size={20}
                    aria-hidden={true}
                  />
                  <span>
                    Business plan or one-page summary
                    <span className="block text-sm text-slate">
                      Where applicable
                    </span>
                  </span>
                </li>
              </ul>
              <Link
                href="/portal/apply?programme=startup"
                className="btn btn-forest mt-10 !min-h-14 !px-8"
              >
                {"Apply for "}start-up{" support"}
              </Link>
            </div>
          </section>
          <section
            id="growth"
            className="grid scroll-mt-32 gap-x-14 gap-y-8 border-b border-ink/20 py-16 last:border-0 md:py-24 lg:grid-cols-[1fr_1.25fr]"
          >
            <div className="lg:sticky lg:top-36 lg:self-start">
              <p className="ui text-2xl text-slate">
                {"Programme "}3{" of "}3
              </p>
              <h2 className="mt-2 text-[clamp(2.75rem,5vw,4.5rem)]">
                Existing Business Growth Support
              </h2>
              <p className="mt-4 max-w-[30rem] text-lg">
                For people already running a business who need grants, equipment
                or support to expand, produce more or serve more customers.
              </p>
              <Wipe
                src="/img/generators.webp"
                alt=""
                className="mt-8 aspect-[16/10]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div>
              <h3 className="text-3xl">You qualify if</h3>
              <ul className="mt-5 border-b border-ink/20">
                <li className="flex gap-4 border-t border-ink/20 py-4 text-lg">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center bg-mint text-forest">
                    <CheckIcon size={18} aria-hidden={true} strokeWidth={3} />
                  </span>
                  You are an indigene or resident of Mbaitoli/Ikeduru Federal
                  Constituency
                </li>
                <li className="flex gap-4 border-t border-ink/20 py-4 text-lg">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center bg-mint text-forest">
                    <CheckIcon size={18} aria-hidden={true} strokeWidth={3} />
                  </span>
                  You are 18 or older
                </li>
                <li className="flex gap-4 border-t border-ink/20 py-4 text-lg">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center bg-mint text-forest">
                    <CheckIcon size={18} aria-hidden={true} strokeWidth={3} />
                  </span>
                  Your business is registered with the Corporate Affairs
                  Commission
                </li>
                <li className="flex gap-4 border-t border-ink/20 py-4 text-lg">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center bg-mint text-forest">
                    <CheckIcon size={18} aria-hidden={true} strokeWidth={3} />
                  </span>
                  Your Traditional Ruler will attest to your application
                </li>
                <li className="flex gap-4 border-t border-ink/20 py-4 text-lg">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center bg-mint text-forest">
                    <CheckIcon size={18} aria-hidden={true} strokeWidth={3} />
                  </span>
                  You submit one application only, and can be visited for
                  verification
                </li>
              </ul>
              <p className="mt-5 border-l-4 border-forest bg-ivory p-5 text-[0.9375rem]">
                Priority goes to active farmers and cooperatives, widows and
                vulnerable women in business, unemployed young people with a
                clear plan, persons with disabilities, and applicants who have
                not benefited before.
              </p>
              <h3 className="mt-12 text-3xl">Have these ready</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                <li className="flex items-start gap-3 border border-ink/20 p-4">
                  <FileTextIcon
                    className="mt-0.5 shrink-0 text-emerald"
                    size={20}
                    aria-hidden={true}
                  />
                  <span>Valid means of identification</span>
                </li>
                <li className="flex items-start gap-3 border border-ink/20 p-4">
                  <FileTextIcon
                    className="mt-0.5 shrink-0 text-emerald"
                    size={20}
                    aria-hidden={true}
                  />
                  <span>CAC registration certificate</span>
                </li>
                <li className="flex items-start gap-3 border border-ink/20 p-4">
                  <FileTextIcon
                    className="mt-0.5 shrink-0 text-emerald"
                    size={20}
                    aria-hidden={true}
                  />
                  <span>Attestation from your Traditional Ruler</span>
                </li>
                <li className="flex items-start gap-3 border border-ink/20 p-4">
                  <FileTextIcon
                    className="mt-0.5 shrink-0 text-emerald"
                    size={20}
                    aria-hidden={true}
                  />
                  <span>
                    Photograph of your shop, farm or workshop
                    <span className="block text-sm text-slate">
                      Where applicable
                    </span>
                  </span>
                </li>
              </ul>
              <Link
                href="/portal/apply?programme=growth"
                className="btn btn-forest mt-10 !min-h-14 !px-8"
              >
                {"Apply for "}growth{" support"}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
