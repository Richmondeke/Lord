import PortalHeader from "@/components/portal-header";
import Image from "next/image";
import Link from "next/link";
import Assistant from "@/components/assistant";
import KeepAlive from "@/components/keep-alive";
import { AuthProvider } from "@/lib/auth";
import { ArrowUpRight as ArrowUpRightIcon } from "lucide-react";

export default function Layout({ children }) {
  return (
    <>
      <AuthProvider>
        <PortalHeader />
        <main id="main" className="portal">
          {children}
        </main>
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
              <a
                href="mailto:info@aaklegacy.org"
                className="go mt-4 text-white"
              >
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
              <p className="ui text-2xl text-white">Portal</p>
              <ul className="ui mt-4 space-y-2.5 text-xl font-medium">
                <li>
                  <Link href="/portal/programmes" className="hover:underline">
                    Programmes
                  </Link>
                </li>
                <li>
                  <Link href="/portal/apply" className="hover:underline">
                    Apply
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portal/beneficiaries"
                    className="hover:underline"
                  >
                    Beneficiaries
                  </Link>
                </li>
                <li>
                  <Link href="/portal/status" className="hover:underline">
                    Check status
                  </Link>
                </li>
                <li>
                  <Link href="/portal/sign-in" className="hover:underline">
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
                    Back to aaklegacy.org
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
              © AAK Legacy Foundation. Figures cite akarachi.org, press reports
              and office registers.
            </p>
          </div>
        </footer>
        <Assistant />
        <KeepAlive />
      </AuthProvider>
    </>
  );
}
