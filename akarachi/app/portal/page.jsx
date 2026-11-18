import Image from "next/image";
import Link from "next/link";
import PortalHome from "@/components/portal-home";
import { Rise, Lift, Count, Wipe, Film, Video } from "@/components/motion";
import { ArrowRight as ArrowRightIcon, Plus as PlusIcon } from "lucide-react";

export const metadata = {
  title: "Empowerment Portal | Akarachi Amadi",
  description:
    "What has been delivered in Mbaitoli and Ikeduru, the programmes open now, and where to apply and track your application.",
};

export default function Page() {
  return (
    <>
      <div>
        <section className="relative bg-ink text-white">
          <div className="absolute inset-0">
            <Image
              src="/img/walk.webp"
              alt=""
              fill={true}
              priority={true}
              sizes="100vw"
              quality={90}
              className="object-cover object-[50%_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
          </div>
          <div className="wrap relative pb-40 pt-20 md:pb-48 md:pt-28">
            <Rise
              as="h1"
              className="max-w-[14ch] text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.9]"
              text="Empowering people. Creating opportunities. Changing lives."
            />
            <Lift delay={0.35}>
              <p className="mt-7 max-w-[34rem] text-lg text-white/90">
                Practical tools and funding for young people, women, farmers and
                traders across Mbaitoli and Ikeduru. See what has been handed
                over so far, then apply.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/portal/apply" className="btn btn-white">
                  Apply now
                </Link>
                <Link href="#check" className="btn btn-line-light">
                  Check if you qualify
                </Link>
              </div>
            </Lift>
          </div>
        </section>
        <section
          aria-label="Delivered so far"
          className="wrap relative z-10 -mt-24 md:-mt-28"
        >
          <dl className="grid grid-cols-2 bg-forest text-white lg:grid-cols-4">
            <div className="flex flex-col border-white/15 p-6 max-lg:odd:border-r max-lg:[&:nth-child(n+3)]:border-t md:p-8 lg:border-l lg:first:border-l-0">
              <dd className="order-1">
                <Count
                  value={67}
                  className="display text-[clamp(3rem,5.5vw,5rem)]"
                />
              </dd>
              <dt className="order-2 mt-1 text-[0.9375rem] text-white/85">
                transformers delivered to 63 communities
              </dt>
            </div>
            <div className="flex flex-col border-white/15 p-6 max-lg:odd:border-r max-lg:[&:nth-child(n+3)]:border-t md:p-8 lg:border-l lg:first:border-l-0">
              <dd className="order-1">
                <Count
                  value={200}
                  prefix="₦"
                  suffix="m"
                  className="display text-[clamp(3rem,5.5vw,5rem)]"
                />
              </dd>
              <dt className="order-2 mt-1 text-[0.9375rem] text-white/85">
                in support at the April 2026 handover
              </dt>
            </div>
            <div className="flex flex-col border-white/15 p-6 max-lg:odd:border-r max-lg:[&:nth-child(n+3)]:border-t md:p-8 lg:border-l lg:first:border-l-0">
              <dd className="order-1">
                <Count
                  value={841}
                  className="display text-[clamp(3rem,5.5vw,5rem)]"
                />
              </dd>
              <dt className="order-2 mt-1 text-[0.9375rem] text-white/85">
                free JAMB registrations in 2026
              </dt>
            </div>
            <div className="flex flex-col border-white/15 p-6 max-lg:odd:border-r max-lg:[&:nth-child(n+3)]:border-t md:p-8 lg:border-l lg:first:border-l-0">
              <dd className="order-1">
                <Count
                  value={92}
                  className="display text-[clamp(3rem,5.5vw,5rem)]"
                />
              </dd>
              <dt className="order-2 mt-1 text-[0.9375rem] text-white/85">
                scholars at public universities
              </dt>
            </div>
          </dl>
        </section>
        <section id="impact" className="wrap py-20 md:py-28">
          <div className="rule grid gap-x-16 gap-y-6 pt-8 lg:grid-cols-[1.2fr_1fr]">
            <Rise
              text="One afternoon in April"
              className="text-[clamp(3rem,6.5vw,6rem)]"
            />
            <p className="self-end text-lg">
              On 5 April 2026 the constituency office handed over 67
              transformers, minibuses, cargo tricycles, motorcycles, generators,
              grinding mills, sewing machines, freezers and farm inputs across
              Mbaike. These photographs show the field laid out before the
              handover.
            </p>
          </div>
          <ul className="mt-12 grid gap-3 md:grid-cols-12">
            <li className="group relative md:col-span-7 aspect-[3/2]">
              <Wipe
                src="/img/tricycles.webp"
                alt="Rows of red cargo tricycles on the stadium grass"
                className="h-full min-h-[14rem] w-full"
                sizes="(min-width: 768px) 55vw, 100vw"
              />
              <span className="ui absolute bottom-0 left-0 bg-white px-4 py-2 text-xl">
                Cargo tricycles
              </span>
            </li>
            <li className="group relative md:col-span-5 aspect-[3/2] md:aspect-auto">
              <Wipe
                src="/img/minibuses.webp"
                alt="A line of white and green minibuses"
                className="h-full min-h-[14rem] w-full"
                sizes="(min-width: 768px) 55vw, 100vw"
              />
              <span className="ui absolute bottom-0 left-0 bg-white px-4 py-2 text-xl">
                Minibuses
              </span>
            </li>
            <li className="group relative md:col-span-4 aspect-[3/2]">
              <Wipe
                src="/img/generators.webp"
                alt="Boxed generators laid out in rows"
                className="h-full min-h-[14rem] w-full"
                sizes="(min-width: 768px) 55vw, 100vw"
              />
              <span className="ui absolute bottom-0 left-0 bg-white px-4 py-2 text-xl">
                Generators
              </span>
            </li>
            <li className="group relative md:col-span-4 aspect-[3/2]">
              <Wipe
                src="/img/mills.webp"
                alt="Green grinding mills lined along a stadium terrace"
                className="h-full min-h-[14rem] w-full"
                sizes="(min-width: 768px) 55vw, 100vw"
              />
              <span className="ui absolute bottom-0 left-0 bg-white px-4 py-2 text-xl">
                Grinding mills
              </span>
            </li>
            <li className="group relative md:col-span-4 aspect-[3/2]">
              <Wipe
                src="/img/motorcycles.webp"
                alt="Motorcycles parked in rows in front of the stands"
                className="h-full min-h-[14rem] w-full"
                sizes="(min-width: 768px) 55vw, 100vw"
              />
              <span className="ui absolute bottom-0 left-0 bg-white px-4 py-2 text-xl">
                Motorcycles
              </span>
            </li>
          </ul>
          <div className="mt-20 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <Film
              src="/video/film.mp4"
              poster="/video/poster.jpg"
              title="What we promised, we delivered. From Vision to Result."
            />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              <Video
                id="FC3k8BYRGEA"
                title="Light Up Mbaike: phase one completed"
              />
              <Video
                id="p2DRo7_-bVU"
                title="Free JAMB registration and scholarships for the girl-child"
              />
            </div>
          </div>
        </section>
        <section className="bg-forest text-white">
          <div className="wrap grid items-center gap-x-16 gap-y-6 py-14 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="display text-[clamp(2.5rem,5vw,4.5rem)]">
                1,245 names on the registers. Is yours one?
              </p>
              <p className="mt-3 max-w-[36rem] text-lg text-white/85">
                852 free JAMB registrations, 301 people equipped in 33
                communities and 92 university scholars. Enter a first name and
                surname to confirm an award and the details on record.
              </p>
            </div>
            <Link
              href="/portal/beneficiaries"
              className="btn btn-white !min-h-16 justify-self-start !px-8 !text-2xl lg:justify-self-end"
            >
              Check the registers
            </Link>
          </div>
        </section>
        <section className="bg-ivory">
          <div className="wrap py-20 md:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Rise
                text="Open programmes"
                className="text-[clamp(3rem,6.5vw,6rem)]"
              />
              <Link href="/portal/programmes" className="go">
                <span className="go-under">Full eligibility for all three</span>{" "}
                <ArrowRightIcon size={20} aria-hidden={true} />
              </Link>
            </div>
            <ul className="mt-12 grid gap-6 lg:grid-cols-3">
              <Lift
                as="li"
                delay={0}
                className="group flex h-full flex-col bg-white"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="/img/walk.webp"
                    alt=""
                    fill={true}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <span className="badge badge-green absolute left-0 top-4">
                    Open
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-4xl">Education Empowerment</h3>
                  <p className="mt-3 flex-1">
                    Support for indigenes of Mbaitoli/Ikeduru who have won
                    admission to a Federal or State tertiary institution.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href="/portal/apply?programme=education"
                      className="btn btn-forest"
                    >
                      Apply
                    </Link>
                    <Link
                      href="/portal/programmes#education"
                      className="go !text-lg"
                    >
                      <span className="go-under">Who qualifies</span>{" "}
                      <ArrowRightIcon size={18} aria-hidden={true} />
                    </Link>
                  </div>
                </div>
              </Lift>
              <Lift
                as="li"
                delay={0.08}
                className="group flex h-full flex-col bg-white"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="/img/mills.webp"
                    alt=""
                    fill={true}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <span className="badge badge-green absolute left-0 top-4">
                    Open
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-4xl">New Business Start-Up Support</h3>
                  <p className="mt-3 flex-1">
                    For people with a workable business idea who need help to
                    set it up. Tools, equipment and support to turn the idea
                    into a living.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href="/portal/apply?programme=startup"
                      className="btn btn-forest"
                    >
                      Apply
                    </Link>
                    <Link
                      href="/portal/programmes#startup"
                      className="go !text-lg"
                    >
                      <span className="go-under">Who qualifies</span>{" "}
                      <ArrowRightIcon size={18} aria-hidden={true} />
                    </Link>
                  </div>
                </div>
              </Lift>
              <Lift
                as="li"
                delay={0.16}
                className="group flex h-full flex-col bg-white"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="/img/generators.webp"
                    alt=""
                    fill={true}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <span className="badge badge-green absolute left-0 top-4">
                    Open
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-4xl">Existing Business Growth Support</h3>
                  <p className="mt-3 flex-1">
                    For people already running a business who need grants,
                    equipment or support to expand, produce more or serve more
                    customers.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href="/portal/apply?programme=growth"
                      className="btn btn-forest"
                    >
                      Apply
                    </Link>
                    <Link
                      href="/portal/programmes#growth"
                      className="go !text-lg"
                    >
                      <span className="go-under">Who qualifies</span>{" "}
                      <ArrowRightIcon size={18} aria-hidden={true} />
                    </Link>
                  </div>
                </div>
              </Lift>
            </ul>
          </div>
        </section>
        <PortalHome />
        <section id="how" className="wrap py-20 md:py-28">
          <div className="rule pt-8">
            <Rise
              text="Apply, learn, verify, receive, grow"
              className="text-[clamp(3rem,6.5vw,6rem)]"
            />
            <ol className="mt-12 grid gap-y-10 md:grid-cols-5">
              <Lift as="li" delay={0} className="relative pr-6">
                <div className="flex items-center">
                  <span className="display grid h-14 w-14 shrink-0 place-items-center bg-forest text-3xl text-white">
                    1
                  </span>
                  <span
                    className="hidden h-[3px] flex-1 bg-ink/15 md:block"
                    aria-hidden={true}
                  />
                </div>
                <h3 className="mt-5 text-3xl">Apply</h3>
                <p className="mt-2 text-[0.9375rem]">
                  Create an account with your phone number, check that you
                  qualify, and send your application with your documents.
                </p>
              </Lift>
              <Lift as="li" delay={0.08} className="relative pr-6">
                <div className="flex items-center">
                  <span className="display grid h-14 w-14 shrink-0 place-items-center bg-forest text-3xl text-white">
                    2
                  </span>
                  <span
                    className="hidden h-[3px] flex-1 bg-ink/15 md:block"
                    aria-hidden={true}
                  />
                </div>
                <h3 className="mt-5 text-3xl">Learn</h3>
                <p className="mt-2 text-[0.9375rem]">
                  The twelve-week learning track opens the day you join. Work
                  through it while your application is read.
                </p>
              </Lift>
              <Lift as="li" delay={0.16} className="relative pr-6">
                <div className="flex items-center">
                  <span className="display grid h-14 w-14 shrink-0 place-items-center bg-forest text-3xl text-white">
                    3
                  </span>
                  <span
                    className="hidden h-[3px] flex-1 bg-ink/15 md:block"
                    aria-hidden={true}
                  />
                </div>
                <h3 className="mt-5 text-3xl">Verify</h3>
                <p className="mt-2 text-[0.9375rem]">
                  Your Traditional Ruler attests to your application, and the
                  team may visit you.
                </p>
              </Lift>
              <Lift as="li" delay={0.24} className="relative pr-6">
                <div className="flex items-center">
                  <span className="display grid h-14 w-14 shrink-0 place-items-center bg-forest text-3xl text-white">
                    4
                  </span>
                  <span
                    className="hidden h-[3px] flex-1 bg-ink/15 md:block"
                    aria-hidden={true}
                  />
                </div>
                <h3 className="mt-5 text-3xl">Receive</h3>
                <p className="mt-2 text-[0.9375rem]">
                  If you are selected, you are told the date and place of
                  handover.
                </p>
              </Lift>
              <Lift as="li" delay={0.32} className="relative pr-6">
                <div className="flex items-center">
                  <span className="display grid h-14 w-14 shrink-0 place-items-center bg-forest text-3xl text-white">
                    5
                  </span>
                </div>
                <h3 className="mt-5 text-3xl">Grow</h3>
                <p className="mt-2 text-[0.9375rem]">
                  Ask for a mentor in your trade and log check-ins, so the
                  office can see what the support built.
                </p>
              </Lift>
            </ol>
          </div>
        </section>
        <section className="bg-forest text-white">
          <div className="grid lg:grid-cols-[1.5fr_1fr]">
            <div className="py-20 pl-5 pr-5 md:py-28 md:pl-10 lg:pl-[max(2.5rem,calc((100vw-82rem)/2+2.5rem))] lg:pr-16">
              <Rise
                as="p"
                className="display text-[clamp(2.5rem,5vw,4.5rem)]"
                text="“Empowerment is not simply about what is distributed; it is about what people are able to build with the opportunities they receive.”"
              />
              <p className="ui mt-8 text-2xl text-white/70">Our approach</p>
            </div>
            <div className="relative overflow-hidden bg-ink">
              <div className="aspect-[1661/1800] w-full" aria-hidden={true} />
              <div className="absolute inset-x-0 bottom-0 top-8 md:top-12">
                <Image
                  src="/img/new/mono-arms.webp"
                  alt="Akarachi Amadi in a white shirt, leaning on a table with his arms crossed, looking straight at the camera, in black and white"
                  fill={true}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-bottom"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="wrap py-20 md:py-28">
          <div className="rule grid gap-x-16 gap-y-8 pt-8 lg:grid-cols-[1fr_1.5fr]">
            <Rise
              text="Questions people ask"
              className="text-[clamp(3rem,5.5vw,5rem)]"
            />
            <div className="border-b border-ink">
              <details className="group border-t border-ink">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="ui text-2xl md:text-3xl">
                    Who is Hon. Engr. Akarachi Amadi?
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-ink transition-transform duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-white">
                    <PlusIcon size={20} aria-hidden={true} />
                  </span>
                </summary>
                <p className="max-w-[38rem] pb-6 text-lg">
                  He is the Member representing Mbaitoli/Ikeduru Federal
                  Constituency in the House of Representatives, a chemical
                  engineer and a businessman from Eziama, Ikeduru.
                </p>
              </details>
              <details className="group border-t border-ink">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="ui text-2xl md:text-3xl">
                    How do I apply?
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-ink transition-transform duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-white">
                    <PlusIcon size={20} aria-hidden={true} />
                  </span>
                </summary>
                <p className="max-w-[38rem] pb-6 text-lg">
                  Create an account with your phone number, choose a programme
                  and complete the form. You can leave at any point and sign
                  back in to continue where you stopped.
                </p>
              </details>
              <details className="group border-t border-ink">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="ui text-2xl md:text-3xl">
                    Who is eligible?
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-ink transition-transform duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-white">
                    <PlusIcon size={20} aria-hidden={true} />
                  </span>
                </summary>
                <p className="max-w-[38rem] pb-6 text-lg">
                  Each programme lists its own conditions. All three are for
                  indigenes of Mbaitoli/Ikeduru; the growth programme also
                  accepts residents with a CAC-registered business.
                </p>
              </details>
              <details className="group border-t border-ink">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="ui text-2xl md:text-3xl">
                    How do I check my application?
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-ink transition-transform duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-white">
                    <PlusIcon size={20} aria-hidden={true} />
                  </span>
                </summary>
                <p className="max-w-[38rem] pb-6 text-lg">
                  Sign in and open your dashboard, or enter your reference
                  number on the Check status page. You will see the stage your
                  application has reached.
                </p>
              </details>
              <details className="group border-t border-ink">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="ui text-2xl md:text-3xl">
                    Does it cost anything, or depend on who I support?
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-ink transition-transform duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-white">
                    <PlusIcon size={20} aria-hidden={true} />
                  </span>
                </summary>
                <p className="max-w-[38rem] pb-6 text-lg">
                  No. Applying is free. Selection follows the published criteria
                  and is never tied to party membership or endorsement.
                </p>
              </details>
            </div>
          </div>
        </section>
        <section className="bg-ink text-white">
          <div className="wrap flex flex-wrap items-center justify-between gap-8 py-14">
            <p className="display text-[clamp(2.5rem,5vw,4.5rem)]">
              Your application takes minutes to start.
            </p>
            <Link
              href="/portal/apply"
              className="btn btn-white !min-h-16 !px-9 !text-2xl"
            >
              Apply now
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
