import SiteHeader from "@/components/site-header";
import Image from "next/image";
import Link from "next/link";
import Assistant from "@/components/assistant";
import { ArrowUpRight as ArrowUpRightIcon } from "lucide-react";

export default function Layout({ children }) {
  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <footer className="bg-ink text-white/80">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/logo-primary-on-dark.svg"
              alt="AAK Legacy Foundation. Rooted in Community, United in Impact."
              width={280}
              height={201}
              className="h-auto w-[15rem]"
            />
            <p className="mt-6 max-w-sm text-[0.9375rem]">
              Member, House of Representatives, Mbaitoli/Ikeduru Federal
              Constituency. Constituency office: KM 4, Owerri-Okigwe Road, Imo
              State.
            </p>
            <a href="mailto:info@aaklegacy.org" className="go mt-4 text-white">
              <span className="go-under">info@aaklegacy.org</span>
            </a>
            <p className="mt-6 max-w-sm text-[0.9375rem]">
              Founded by Hon. Engr. Akarachi Amadi.{" "}
              <a
                href="https://akarachi.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-white underline underline-offset-4 hover:no-underline"
              >
                Visit his official site, akarachi.org
                <ArrowUpRightIcon size={14} aria-hidden={true} />
              </a>
            </p>
          </div>
          <div>
            <p className="ui text-2xl text-white">This site</p>
            <ul className="ui mt-4 space-y-2.5 text-xl font-medium">
              <li>
                <Link href="/#story" className="hover:underline">
                  The man
                </Link>
              </li>
              <li>
                <Link href="/#work" className="hover:underline">
                  Impact
                </Link>
              </li>
              <li>
                <Link href="/#record" className="hover:underline">
                  Bills
                </Link>
              </li>
              <li>
                <Link href="/#press" className="hover:underline">
                  News
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:underline">
                  Empowerment Portal
                </Link>
              </li>
              <li>
                <Link href="/system" className="hover:underline">
                  Design system
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="ui text-2xl text-white">Follow</p>
            <ul className="ui mt-4 space-y-2.5 text-xl font-medium">
              <li>
                <a
                  href="https://www.instagram.com/akarachiamadi_official/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  Instagram <ArrowUpRightIcon size={16} aria-hidden={true} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/akarachi.amadi.1"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  Facebook <ArrowUpRightIcon size={16} aria-hidden={true} />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/AkarachiAmadi"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  X <ArrowUpRightIcon size={16} aria-hidden={true} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/akarachi-amadi-97a87620a"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  LinkedIn <ArrowUpRightIcon size={16} aria-hidden={true} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@akarachietiosaamadi4358"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  YouTube <ArrowUpRightIcon size={16} aria-hidden={true} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/15">
          <p className="wrap py-5 text-sm text-white/60">
            Design prototype, not yet the official site. Figures cite
            akarachi.org, press reports and office registers.
          </p>
        </div>
      </footer>
      <Assistant />
    </>
  );
}
