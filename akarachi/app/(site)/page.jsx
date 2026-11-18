import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/hero";
import { Rise, Lift, Count, Film, Wipe } from "@/components/motion";
import {
  ArrowRight as ArrowRightIcon,
  ArrowUpRight as ArrowUpRightIcon,
} from "lucide-react";
import {
  WorkList,
  Bills,
  Wards,
  News,
  Contact,
} from "@/components/home-sections";

export const metadata = {
  title: "Akarachi Amadi | A man of the people",
  description:
    "Hon. Engr. Akarachi Etinosa Amadi, Member of the House of Representatives for Mbaitoli/Ikeduru, Imo State. The man, the record and the work at home.",
};

export default function Page() {
  return (
    <>
      <div>
        <Hero />
        <section className="relative overflow-hidden bg-ivory">
          <div className="wrap grid lg:grid-cols-[1.45fr_1fr]">
            <div className="relative z-10 pb-10 pt-16 md:pt-24 lg:pb-24">
              <Rise
                as="p"
                className="display text-[clamp(2.25rem,4.4vw,4rem)]"
                text="Akarachi Etinosa Amadi is a chemical engineer who built companies in upstream oil and gas, and gives through the Akarachi Foundation. At 28 he was also elected to speak for Mbaitoli and Ikeduru."
              />
              <Lift className="mt-10" delay={0.2}>
                <Link href="#story" className="go text-2xl">
                  <span className="go-under">Read his story</span>{" "}
                  <ArrowRightIcon size={22} aria-hidden={true} />
                </Link>
              </Lift>
            </div>
            <div
              className="h-[24rem] sm:h-[32rem] lg:h-auto"
              aria-hidden={true}
            />
          </div>
          <div className="absolute bottom-0 right-0 h-[24rem] w-full sm:h-[32rem] lg:h-[94%] lg:w-[42%]">
            <Image
              src="/img/new/mono-profile.webp"
              alt="Akarachi Amadi in a black suit, turned three-quarters and looking into the camera, in black and white"
              fill={true}
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-contain object-right-bottom"
            />
          </div>
        </section>
        <section
          id="enterprise"
          aria-label="Engineer, businessman, philanthropist"
          className="grid scroll-mt-16 lg:grid-cols-3"
        >
          <div className="relative flex flex-col overflow-hidden bg-ivory text-ink">
            <div className="relative z-10 px-6 pt-10 md:px-10 md:pt-12">
              <h2 className="text-[clamp(2.5rem,4vw,3.75rem)]">Engineer</h2>
              <p className="mt-4 max-w-[24rem] text-lg">
                Chemical engineering at Covenant University, then training with
                the Nigerian Petroleum Development Company. He worked on
                drilling, dredging and land reclamation across the Niger Delta.
              </p>
            </div>
            <div className="relative mt-auto aspect-[1709/1800] w-full">
              <Image
                src="/img/new/suit-side.webp"
                alt="Akarachi Amadi in a navy suit, turned side-on and looking at the camera"
                fill={true}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-contain object-bottom grayscale"
              />
            </div>
          </div>
          <div className="relative flex flex-col overflow-hidden bg-white text-ink">
            <div className="relative z-10 px-6 pt-10 md:px-10 md:pt-12">
              <h2 className="text-[clamp(2.5rem,4vw,3.75rem)]">Businessman</h2>
              <p className="mt-4 max-w-[24rem] text-lg">
                He founded and runs several companies across different sectors,
                most of them in upstream oil and gas.
              </p>
            </div>
            <div className="relative mt-auto aspect-[1709/1800] w-full">
              <Image
                src="/img/new/suit-front.webp"
                alt="Akarachi Amadi standing in a navy double-breasted suit, adjusting his cuff"
                fill={true}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-contain object-bottom grayscale"
              />
            </div>
          </div>
          <div className="relative flex flex-col overflow-hidden bg-forest text-white">
            <div className="relative z-10 px-6 pt-10 md:px-10 md:pt-12">
              <h2 className="text-[clamp(2.5rem,4vw,3.75rem)]">
                Philanthropist
              </h2>
              <p className="mt-4 max-w-[24rem] text-lg">
                Through the Akarachi Foundation: homes for families without one,
                exam fees and scholarships, hospital bills settled, tools for
                traders.
              </p>
            </div>
            <div className="relative mt-auto aspect-[1709/1800] w-full">
              <Image
                src="/img/new/chair.webp"
                alt="Akarachi Amadi seated in a white shirt, leaning forward with his fist to his chest"
                fill={true}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-contain object-bottom grayscale"
              />
            </div>
          </div>
        </section>
        <section className="wrap py-24 md:py-36">
          <dl className="grid grid-cols-2 lg:grid-cols-3">
            <Lift
              delay={0}
              className="flex flex-col border-ink/20 py-6 max-lg:odd:border-r max-lg:odd:pr-4 max-lg:even:pl-4 max-lg:[&:nth-child(n+3)]:border-t lg:border-l lg:px-8 lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(n+4)]:border-t"
            >
              <dd className="order-1">
                <Count
                  value={841}
                  className="display text-[clamp(3rem,6vw,5rem)]"
                />
              </dd>
              <dt className="ui order-2 mt-1 max-w-[17rem] text-xl md:text-2xl">
                students registered free for the 2026 JAMB
              </dt>
              <dd className="order-3 mt-1.5 text-sm text-slate">
                akarachi.org, March 2026
              </dd>
            </Lift>
            <Lift
              delay={0.08}
              className="flex flex-col border-ink/20 py-6 max-lg:odd:border-r max-lg:odd:pr-4 max-lg:even:pl-4 max-lg:[&:nth-child(n+3)]:border-t lg:border-l lg:px-8 lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(n+4)]:border-t"
            >
              <dd className="order-1">
                <Count
                  value={92}
                  className="display text-[clamp(3rem,6vw,5rem)]"
                />
              </dd>
              <dt className="ui order-2 mt-1 max-w-[17rem] text-xl md:text-2xl">
                university scholars funded since 2022/23
              </dt>
              <dd className="order-3 mt-1.5 text-sm text-slate">
                Scholarship register
              </dd>
            </Lift>
            <Lift
              delay={0.16}
              className="flex flex-col border-ink/20 py-6 max-lg:odd:border-r max-lg:odd:pr-4 max-lg:even:pl-4 max-lg:[&:nth-child(n+3)]:border-t lg:border-l lg:px-8 lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(n+4)]:border-t"
            >
              <dd className="order-1">
                <Count
                  value={20}
                  suffix="+"
                  className="display text-[clamp(3rem,6vw,5rem)]"
                />
              </dd>
              <dt className="ui order-2 mt-1 max-w-[17rem] text-xl md:text-2xl">
                classroom blocks built or renovated
              </dt>
              <dd className="order-3 mt-1.5 text-sm text-slate">
                ThisDay, April 2026
              </dd>
            </Lift>
            <Lift
              delay={0}
              className="flex flex-col border-ink/20 py-6 max-lg:odd:border-r max-lg:odd:pr-4 max-lg:even:pl-4 max-lg:[&:nth-child(n+3)]:border-t lg:border-l lg:px-8 lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(n+4)]:border-t"
            >
              <dd className="order-1">
                <Count
                  value={67}
                  className="display text-[clamp(3rem,6vw,5rem)]"
                />
              </dd>
              <dt className="ui order-2 mt-1 max-w-[17rem] text-xl md:text-2xl">
                transformers for 63 autonomous communities
              </dt>
              <dd className="order-3 mt-1.5 text-sm text-slate">
                ThisDay, April 2026
              </dd>
            </Lift>
            <Lift
              delay={0.08}
              className="flex flex-col border-ink/20 py-6 max-lg:odd:border-r max-lg:odd:pr-4 max-lg:even:pl-4 max-lg:[&:nth-child(n+3)]:border-t lg:border-l lg:px-8 lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(n+4)]:border-t"
            >
              <dd className="order-1">
                <Count
                  value={2500}
                  className="display text-[clamp(3rem,6vw,5rem)]"
                />
              </dd>
              <dt className="ui order-2 mt-1 max-w-[17rem] text-xl md:text-2xl">
                solar streetlights, Light Up Mbaike phase one
              </dt>
              <dd className="order-3 mt-1.5 text-sm text-slate">
                akarachi.org, February 2026
              </dd>
            </Lift>
            <Lift
              delay={0.16}
              className="flex flex-col border-ink/20 py-6 max-lg:odd:border-r max-lg:odd:pr-4 max-lg:even:pl-4 max-lg:[&:nth-child(n+3)]:border-t lg:border-l lg:px-8 lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(n+4)]:border-t"
            >
              <dd className="order-1">
                <Count
                  value={38}
                  className="display text-[clamp(3rem,6vw,5rem)]"
                />
              </dd>
              <dt className="ui order-2 mt-1 max-w-[17rem] text-xl md:text-2xl">
                bills sponsored in the 10th Assembly
              </dt>
              <dd className="order-3 mt-1.5 text-sm text-slate">
                Champion Newspapers, March 2026
              </dd>
            </Lift>
          </dl>
        </section>
        <section id="story" className="bg-ivory">
          <div className="wrap grid gap-x-16 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative h-[27rem] sm:h-[34rem] lg:sticky lg:top-[4.75rem] lg:h-[calc(100svh-4.75rem)] lg:self-start">
              <Image
                src="/img/new/suit-turn.webp"
                alt="Akarachi Amadi in a navy suit, half turned, looking at the camera"
                fill={true}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain object-bottom grayscale"
              />
            </div>
            <div className="py-14 md:py-28">
              <Rise
                text="Engineer first. Then businessman. Then lawmaker."
                className="text-[clamp(2.75rem,5.5vw,5rem)]"
              />
              <ol className="mt-10 md:mt-12">
                <Lift
                  as="li"
                  className="grid gap-x-8 border-t border-ink/20 py-6 sm:grid-cols-[8rem_1fr] md:py-7"
                >
                  <p className="ui text-2xl text-slate">Eziama</p>
                  <div>
                    <h3 className="text-3xl md:text-4xl">A son of Ikeduru</h3>
                    <p className="mt-2.5 max-w-[34rem]">
                      He comes from Eziama in Ikeduru Local Government Area.
                      School took him to Warri and then to Remo in Ogun State.
                    </p>
                  </div>
                </Lift>
                <Lift
                  as="li"
                  className="grid gap-x-8 border-t border-ink/20 py-6 sm:grid-cols-[8rem_1fr] md:py-7"
                >
                  <p className="ui text-2xl text-slate">Covenant</p>
                  <div>
                    <h3 className="text-3xl md:text-4xl">
                      Trained as a chemical engineer
                    </h3>
                    <p className="mt-2.5 max-w-[34rem]">
                      A Bachelor of Engineering in Chemical Engineering from
                      Covenant University, Ota, specialising in kinetic
                      molecular engineering. He trained with the Nigerian
                      Petroleum Development Company and worked in oil and gas
                      operations across the Niger Delta.
                    </p>
                  </div>
                </Lift>
                <Lift
                  as="li"
                  className="grid gap-x-8 border-t border-ink/20 py-6 sm:grid-cols-[8rem_1fr] md:py-7"
                >
                  <p className="ui text-2xl text-slate">Enterprise</p>
                  <div>
                    <h3 className="text-3xl md:text-4xl">
                      Built companies before he ran
                    </h3>
                    <p className="mt-2.5 max-w-[34rem]">
                      He founded and runs several companies, most of them in
                      upstream oil and gas, and served as Vice President of the
                      Network for African Student Entrepreneurs.
                    </p>
                  </div>
                </Lift>
                <Lift
                  as="li"
                  className="grid gap-x-8 border-t border-ink/20 py-6 sm:grid-cols-[8rem_1fr] md:py-7"
                >
                  <p className="ui text-2xl text-slate">2022</p>
                  <div>
                    <h3 className="text-3xl md:text-4xl">
                      Paid for the first JAMB forms
                    </h3>
                    <p className="mt-2.5 max-w-[34rem]">
                      The Akarachi Foundation began covering exam fees for
                      students at home. The scheme has run every year since and
                      is now in its fifth edition.
                    </p>
                  </div>
                </Lift>
                <Lift
                  as="li"
                  className="grid gap-x-8 border-t border-ink/20 py-6 sm:grid-cols-[8rem_1fr] md:py-7"
                >
                  <p className="ui text-2xl text-slate">2023</p>
                  <div>
                    <h3 className="text-3xl md:text-4xl">Elected at 28</h3>
                    <p className="mt-2.5 max-w-[34rem]">
                      He won the Mbaitoli/Ikeduru seat and entered the 10th
                      National Assembly as one of its youngest members. By
                      October his first five bills were on the order paper. He
                      chairs the House Committee on Oceans and Fisheries.
                    </p>
                  </div>
                </Lift>
                <Lift
                  as="li"
                  className="grid gap-x-8 border-t border-ink/20 py-6 sm:grid-cols-[8rem_1fr] md:py-7"
                >
                  <p className="ui text-2xl text-slate">2026</p>
                  <div>
                    <h3 className="text-3xl md:text-4xl">
                      From vision to result
                    </h3>
                    <p className="mt-2.5 max-w-[34rem]">
                      Phase one of Operation Light Up Mbaike put up 2,500 solar
                      streetlights. Champion Newspapers named him Legislator of
                      the Year. In April, 67 transformers went out to 63
                      communities in a single day.
                    </p>
                  </div>
                </Lift>
              </ol>
            </div>
          </div>
        </section>
        <section id="work" className="wrap py-24 md:py-36">
          <div className="rule grid gap-x-16 gap-y-10 pt-8 lg:grid-cols-[1fr_1.4fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Rise
                text="What the giving looks like at home"
                className="text-[clamp(2.75rem,5.5vw,5rem)]"
              />
              <p className="mt-6 max-w-[26rem] text-lg">
                Some he paid for himself, through the Akarachi Foundation. Some
                is public work he brought home. All of it can be pointed to on a
                map.
              </p>
              <Link href="/portal" className="go mt-8">
                <span className="go-under">
                  See programmes you can apply for
                </span>{" "}
                <ArrowRightIcon size={20} aria-hidden={true} />
              </Link>
            </div>
            <WorkList />
          </div>
          <figure id="proof" className="mt-20 scroll-mt-24 md:mt-28">
            <Film
              src="/video/film.mp4"
              poster="/video/poster.jpg"
              title="Watch: From Vision to Result"
            />
            <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3">
              <p className="max-w-[40rem] text-slate">
                5 April 2026, Mbaike. Sixty-seven transformers, minibuses, cargo
                tricycles, motorcycles, generators, grinding mills, sewing
                machines and ₦200 million in support, handed over in one
                afternoon.
              </p>
              <Link href="/portal/beneficiaries" className="go">
                <span className="go-under">
                  Check a name against the registers
                </span>{" "}
                <ArrowRightIcon size={20} aria-hidden={true} />
              </Link>
            </figcaption>
          </figure>
        </section>
        <section className="bg-ivory">
          <div className="wrap py-24 md:py-36">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Rise
                text="Three programmes, open now"
                className="text-[clamp(2.75rem,5.5vw,5rem)]"
              />
              <Link href="/portal" className="go">
                <span className="go-under">How applying works</span>{" "}
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
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-4xl">Education Empowerment</h3>
                  <p className="mt-3 flex-1">
                    Support for indigenes of Mbaitoli/Ikeduru who have won
                    admission to a Federal or State tertiary institution.
                  </p>
                  <Link
                    href="/portal/apply?programme=education"
                    className="btn btn-forest mt-7 self-start"
                  >
                    Apply
                  </Link>
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
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-4xl">New Business Start-Up Support</h3>
                  <p className="mt-3 flex-1">
                    For people with a workable business idea who need help to
                    set it up. Tools, equipment and support to turn the idea
                    into a living.
                  </p>
                  <Link
                    href="/portal/apply?programme=startup"
                    className="btn btn-forest mt-7 self-start"
                  >
                    Apply
                  </Link>
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
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-4xl">Existing Business Growth Support</h3>
                  <p className="mt-3 flex-1">
                    For people already running a business who need grants,
                    equipment or support to expand, produce more or serve more
                    customers.
                  </p>
                  <Link
                    href="/portal/apply?programme=growth"
                    className="btn btn-forest mt-7 self-start"
                  >
                    Apply
                  </Link>
                </div>
              </Lift>
            </ul>
          </div>
        </section>
        <section id="record" className="wrap py-24 md:py-36">
          <div className="rule grid items-end gap-x-16 gap-y-10 pt-8 lg:grid-cols-2">
            <div>
              <p className="ui text-2xl text-slate">In the House</p>
              <Rise
                text="Thirty-eight bills from one seat"
                className="mt-3 text-[clamp(2.75rem,5.5vw,5rem)]"
              />
              <p className="mt-6 max-w-[32rem] text-lg">
                Since 2023 he has also been the Member for Mbaitoli/Ikeduru, and
                he chairs the House Committee on Oceans and Fisheries. Colleges,
                vocational certificates, a football academy for Mbaitoli,
                fisheries, maritime safety. Each bill is set out below in plain
                English, with the stage it has reached.
              </p>
              <div className="mt-8 grid max-w-[32rem] grid-cols-2 gap-3">
                <Wipe
                  src="/img/floor-talk.jpg"
                  alt="Akarachi Amadi leaning over to confer with a colleague on the House floor"
                  className="aspect-[3/2]"
                  sizes="(min-width: 1024px) 20vw, 50vw"
                />
                <Wipe
                  src="/img/floor-seat.jpg"
                  alt="Akarachi Amadi listening from his seat during a sitting"
                  className="aspect-[3/2]"
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  pos="40% 50%"
                />
              </div>
            </div>
            <figure>
              <Wipe
                src="/img/house.webp"
                alt="Akarachi Amadi seated at his desk in the green chamber of the House of Representatives, reading"
                className="aspect-[3/2]"
                pos="50% 40%"
              />
              <figcaption className="mt-3 text-sm text-slate">
                In the House of Representatives, Abuja.
              </figcaption>
            </figure>
          </div>
          <div className="mt-14">
            <Bills />
          </div>
        </section>
        <section
          id="constituency"
          className="bg-forest py-16 text-white md:py-24"
        >
          <div className="wrap">
            <Wards />
          </div>
        </section>
        <section className="relative overflow-hidden bg-ink text-white">
          <div className="wrap grid lg:grid-cols-[1.35fr_1fr]">
            <div className="relative z-10 pb-10 pt-20 md:pt-28 lg:pb-28">
              <Rise
                as="p"
                className="display text-[clamp(2.25rem,4.4vw,4rem)]"
                text="“My commitment remains unwavering: to empower our people, improve lives, and build a better future for every community I represent.”"
              />
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-12">
                <Link
                  href="/portal"
                  className="btn btn-white !min-h-16 !px-8 !text-2xl"
                >
                  {"Open the Empowerment Portal "}
                  <ArrowUpRightIcon size={22} aria-hidden={true} />
                </Link>
                <p className="max-w-[18rem] text-[0.9375rem]">
                  Support for school fees, a new business or a growing one.
                  Apply and track it there.
                </p>
              </div>
            </div>
            <div
              className="h-[23rem] sm:h-[30rem] lg:h-auto"
              aria-hidden={true}
            />
          </div>
          <div className="absolute bottom-0 right-0 h-[23rem] w-full sm:h-[30rem] lg:h-[94%] lg:w-[44%]">
            <Image
              src="/img/new/close.webp"
              alt="Akarachi Amadi in a white shirt, looking back over his shoulder with a slight smile"
              fill={true}
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-contain object-right-bottom grayscale"
            />
          </div>
        </section>
        <section id="press" className="wrap py-24 md:py-36">
          <div className="rule pt-8">
            <News />
          </div>
        </section>
        <section id="contact" className="bg-ivory">
          <div className="wrap grid gap-x-16 gap-y-10 py-24 md:py-36 lg:grid-cols-2">
            <div>
              <Rise
                text="Let’s talk"
                className="text-[clamp(2.75rem,5.5vw,5rem)]"
              />
              <p className="mt-6 max-w-[26rem] text-lg">
                Engr. Akarachi Amadi wants to hear from you. Write to the
                constituency office and someone will answer.
              </p>
              <p className="ui mt-6 text-2xl">
                KM 4, Owerri-Okigwe Road
                <br />
                Imo State
              </p>
            </div>
            <Contact />
          </div>
        </section>
      </div>
    </>
  );
}
