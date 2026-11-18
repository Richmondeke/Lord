export const metadata = {
  title: "Design system | Akarachi Amadi",
  description:
    "Hon. Engr. Akarachi Etinosa Amadi, Member of the House of Representatives for Mbaitoli/Ikeduru, Imo State. The man, the record and the work at home.",
};

export default function Page() {
  return (
    <>
      <div>
        <div className="wrap pb-24 pt-36">
          <h1 className="text-[clamp(4rem,10vw,9rem)]">Design system</h1>
          <p className="mt-6 max-w-[40rem] text-xl">
            The rules both sites are built from. The main site borrows its
            structure from obama.org: photographs at full width, condensed
            headlines, a heavy rule to open each section and flat blocks of
            colour with square corners.
          </p>
          <h2 className="rule mb-8 mt-24 pt-6 text-6xl">Type</h2>
          <p className="mb-8 max-w-[44rem]">
            obama.org sets headlines in Gotham Condensed and text in Chronicle
            Text. Both are commercial typefaces from Hoefler&Co and cannot be
            used without a licence, so this build uses the nearest open
            equivalents. If the office buys the licences, the swap is three
            lines in the root layout.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left">
              <tbody>
                <tr className="border-t border-ink/20">
                  <td className="ui py-4 pr-6 text-3xl">Hero</td>
                  <td className="py-4 pr-6 tabular-nums">
                    clamp(60px, 9.4vw, 144px) / 0.86
                  </td>
                  <td className="py-4">Sofia Sans Condensed 700</td>
                </tr>
                <tr className="border-t border-ink/20">
                  <td className="ui py-4 pr-6 text-3xl">Section headline</td>
                  <td className="py-4 pr-6 tabular-nums">
                    clamp(48px, 6vw, 88px) / 0.96
                  </td>
                  <td className="py-4">Sofia Sans Condensed 700</td>
                </tr>
                <tr className="border-t border-ink/20">
                  <td className="ui py-4 pr-6 text-3xl">Row and card title</td>
                  <td className="py-4 pr-6 tabular-nums">28 to 36px / 1.02</td>
                  <td className="py-4">Sofia Sans Condensed 700</td>
                </tr>
                <tr className="border-t border-ink/20">
                  <td className="ui py-4 pr-6 text-3xl">
                    Nav, buttons, labels
                  </td>
                  <td className="py-4 pr-6 tabular-nums">20 to 22px / 1.1</td>
                  <td className="py-4">Sofia Sans Condensed 600</td>
                </tr>
                <tr className="border-t border-ink/20">
                  <td className="ui py-4 pr-6 text-3xl">Main-site text</td>
                  <td className="py-4 pr-6 tabular-nums">17px / 1.6</td>
                  <td className="py-4">Source Serif 4</td>
                </tr>
                <tr className="border-t border-ink/20">
                  <td className="ui py-4 pr-6 text-3xl">
                    Portal text and forms
                  </td>
                  <td className="py-4 pr-6 tabular-nums">16 to 17px / 1.5</td>
                  <td className="py-4">Sofia Sans</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className="rule mb-8 mt-24 pt-6 text-6xl">Colour</h2>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <li>
              <div
                className="ui flex h-24 items-end border border-ink/15 p-3 text-xl text-white"
                style={{ background: "#06241B" }}
              >
                #06241B
              </div>
              <p className="ui mt-2 text-2xl">Pine</p>
              <p className="text-sm text-slate">
                Footer, proof band, portal top bar
              </p>
            </li>
            <li>
              <div
                className="ui flex h-24 items-end border border-ink/15 p-3 text-xl text-white"
                style={{ background: "#0B3B2E" }}
              >
                #0B3B2E
              </div>
              <p className="ui mt-2 text-2xl">Forest</p>
              <p className="text-sm text-slate">
                Colour blocks, primary button
              </p>
            </li>
            <li>
              <div
                className="ui flex h-24 items-end border border-ink/15 p-3 text-xl text-white"
                style={{ background: "#14573F" }}
              >
                #14573F
              </div>
              <p className="ui mt-2 text-2xl">Emerald</p>
              <p className="text-sm text-slate">Links, focus border</p>
            </li>
            <li>
              <div
                className="ui flex h-24 items-end border border-ink/15 p-3 text-xl text-white"
                style={{ background: "#1F7A55" }}
              >
                #1F7A55
              </div>
              <p className="ui mt-2 text-2xl">Leaf</p>
              <p className="text-sm text-slate">Hover on forest</p>
            </li>
            <li>
              <div
                className="ui flex h-24 items-end border border-ink/15 p-3 text-xl text-ink"
                style={{ background: "#D7EBDF" }}
              >
                #D7EBDF
              </div>
              <p className="ui mt-2 text-2xl">Mint</p>
              <p className="text-sm text-slate">News block, success fill</p>
            </li>
            <li>
              <div
                className="ui flex h-24 items-end border border-ink/15 p-3 text-xl text-ink"
                style={{ background: "#E9B949" }}
              >
                #E9B949
              </div>
              <p className="ui mt-2 text-2xl">Amber</p>
              <p className="text-sm text-slate">
                The one loud colour: calls to action, current step
              </p>
            </li>
            <li>
              <div
                className="ui flex h-24 items-end border border-ink/15 p-3 text-xl text-ink"
                style={{ background: "#F6F1E4" }}
              >
                #F6F1E4
              </div>
              <p className="ui mt-2 text-2xl">Ivory</p>
              <p className="text-sm text-slate">
                Quiet bands, dashboard ground
              </p>
            </li>
            <li>
              <div
                className="ui flex h-24 items-end border border-ink/15 p-3 text-xl text-ink"
                style={{ background: "#E9E2CF" }}
              >
                #E9E2CF
              </div>
              <p className="ui mt-2 text-2xl">Sand</p>
              <p className="text-sm text-slate">Empty tracks, neutral badge</p>
            </li>
            <li>
              <div
                className="ui flex h-24 items-end border border-ink/15 p-3 text-xl text-white"
                style={{ background: "#101413" }}
              >
                #101413
              </div>
              <p className="ui mt-2 text-2xl">Ink</p>
              <p className="text-sm text-slate">
                Text and the heavy section rule
              </p>
            </li>
            <li>
              <div
                className="ui flex h-24 items-end border border-ink/15 p-3 text-xl text-white"
                style={{ background: "#55606A" }}
              >
                #55606A
              </div>
              <p className="ui mt-2 text-2xl">Slate</p>
              <p className="text-sm text-slate">
                Secondary text (6:1 on white)
              </p>
            </li>
            <li>
              <div
                className="ui flex h-24 items-end border border-ink/15 p-3 text-xl text-white"
                style={{ background: "#7A560C" }}
              >
                #7A560C
              </div>
              <p className="ui mt-2 text-2xl">Gold ink</p>
              <p className="text-sm text-slate">Amber as text on light (6:1)</p>
            </li>
            <li>
              <div
                className="ui flex h-24 items-end border border-ink/15 p-3 text-xl text-white"
                style={{ background: "#A3311F" }}
              >
                #A3311F
              </div>
              <p className="ui mt-2 text-2xl">Brick</p>
              <p className="text-sm text-slate">Errors only</p>
            </li>
          </ul>
          <h2 className="rule mb-8 mt-24 pt-6 text-6xl">Components</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-3">
                <button className="btn btn-forest">Apply now</button>
                <button className="btn btn-forest">Save and continue</button>
                <button className="btn btn-line">Back</button>
                <button className="btn btn-forest" disabled={true}>
                  Disabled
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-green">First reading</span>
                <span className="badge badge-plain">Under review</span>
                <span className="badge badge-plain">In preparation</span>
                <span className="badge badge-brick">Not eligible</span>
              </div>
              <p className="text-[0.9375rem] text-slate">
                Square corners throughout. Amber is used once per screen for the
                main action. Every control shows a 3px two-tone focus ring and
                is at least 44px tall.
              </p>
            </div>
            <div className="portal space-y-3">
              <label className="block font-semibold" htmlFor="ds1">
                Field
              </label>
              <input id="ds1" className="field" defaultValue="Amaimo" />
              <label className="block font-semibold" htmlFor="ds2">
                Field with an error
              </label>
              <input
                id="ds2"
                className="field"
                aria-invalid="true"
                aria-describedby="ds2e"
                defaultValue="0803"
              />
              <p id="ds2e" className="text-sm font-semibold text-brick">
                Enter all 11 digits of your NIN.
              </p>
            </div>
          </div>
          <h2 className="rule mb-8 mt-24 pt-6 text-6xl">Motion</h2>
          <dl>
            <div className="grid gap-x-8 border-t border-ink/20 py-4 sm:grid-cols-[14rem_1fr]">
              <dt className="ui text-2xl">Page change</dt>
              <dd>
                The old page settles back and dims; the new one wipes up over
                it. 720ms. The header holds still.
              </dd>
            </div>
            <div className="grid gap-x-8 border-t border-ink/20 py-4 sm:grid-cols-[14rem_1fr]">
              <dt className="ui text-2xl">Hero</dt>
              <dd>
                Black and white only. The headline rises from a mask; the
                portrait settles onto the floor of the hero.
              </dd>
            </div>
            <div className="grid gap-x-8 border-t border-ink/20 py-4 sm:grid-cols-[14rem_1fr]">
              <dt className="ui text-2xl">Headlines</dt>
              <dd>
                Words rise out of a mask one after another, once, when first
                scrolled into view.
              </dd>
            </div>
            <div className="grid gap-x-8 border-t border-ink/20 py-4 sm:grid-cols-[14rem_1fr]">
              <dt className="ui text-2xl">Photographs</dt>
              <dd>
                Wipe open from the bottom edge while settling from a slight
                zoom.
              </dd>
            </div>
            <div className="grid gap-x-8 border-t border-ink/20 py-4 sm:grid-cols-[14rem_1fr]">
              <dt className="ui text-2xl">Numbers</dt>
              <dd>Count up once.</dd>
            </div>
            <div className="grid gap-x-8 border-t border-ink/20 py-4 sm:grid-cols-[14rem_1fr]">
              <dt className="ui text-2xl">Portraits</dt>
              <dd>Drift a few pixels against the scroll.</dd>
            </div>
            <div className="grid gap-x-8 border-t border-ink/20 py-4 sm:grid-cols-[14rem_1fr]">
              <dt className="ui text-2xl">Reduced motion</dt>
              <dd>All of the above switch off; content appears in place.</dd>
            </div>
          </dl>
          <h2 className="rule mb-8 mt-24 pt-6 text-6xl">Sitemap</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="display text-4xl">akarachi.org</p>
              <ol className="mt-4 border-l-4 border-ink pl-5">
                <li className="border-b border-ink/15 py-2.5">
                  Hero: one portrait, black and white
                </li>
                <li className="border-b border-ink/15 py-2.5">
                  Who he is and six sourced figures
                </li>
                <li className="border-b border-ink/15 py-2.5">
                  The man: portrait and timeline
                </li>
                <li className="border-b border-ink/15 py-2.5">
                  Businessman, investor, philanthropist
                </li>
                <li className="border-b border-ink/15 py-2.5">
                  Impact: seven areas of work
                </li>
                <li className="border-b border-ink/15 py-2.5">
                  Proof: film and photo rail
                </li>
                <li className="border-b border-ink/15 py-2.5">Bills tracker</li>
                <li className="border-b border-ink/15 py-2.5">Ward mosaic</li>
                <li className="border-b border-ink/15 py-2.5">
                  Commitment and portal door
                </li>
                <li className="border-b border-ink/15 py-2.5">News</li>
                <li className="border-b border-ink/15 py-2.5">Contact</li>
              </ol>
            </div>
            <div>
              <p className="display text-4xl">Empowerment Portal</p>
              <ol className="mt-4 border-l-4 border-ink pl-5">
                <li className="border-b border-ink/15 py-2.5">
                  Landing: what has been delivered
                </li>
                <li className="border-b border-ink/15 py-2.5">
                  Programmes and eligibility
                </li>
                <li className="border-b border-ink/15 py-2.5">
                  Sign in / create account
                </li>
                <li className="border-b border-ink/15 py-2.5">
                  Apply (five steps, autosaved)
                </li>
                <li className="border-b border-ink/15 py-2.5">
                  My portal: overview, applications, messages, learning,
                  community, profile
                </li>
                <li className="border-b border-ink/15 py-2.5">
                  Check status by reference
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
