"use client";

import {
  Bell as BellIcon,
  BookOpen as BookOpenIcon,
  ChevronDown as ChevronDownIcon,
  Download as DownloadIcon,
  FileText as FileTextIcon,
  FolderOpen as FolderOpenIcon,
  HeartHandshake as HeartHandshakeIcon,
  LayoutDashboard as LayoutDashboardIcon,
  LogOut as LogOutIcon,
  Mail as MailIcon,
  MessageSquare as MessageSquareIcon,
  PartyPopper as PartyPopperIcon,
  Users as UsersIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Check, UserRound } from "lucide-react";
import { useReducedMotion, motion } from "framer-motion";
import { stages, programmes } from "@/lib/content";
import { useAuth, store, today } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
let CC = BellIcon;
let h = BookOpenIcon;
let CX = ChevronDownIcon;
let CG = DownloadIcon;
let f = FileTextIcon;
let w = FolderOpenIcon;
let j = HeartHandshakeIcon;
let v = LayoutDashboardIcon;
let W = LogOutIcon;
let M = MailIcon;
let C = MessageSquareIcon;
let CZ = PartyPopperIcon;
let R = UsersIcon;
let H = [
    {
      title: "Know your numbers",
      idea: "Profit is what is left after every cost, including your own time and transport. Most small businesses underprice because they count only materials.",
      task: "Write down every cost of making or buying one unit of what you sell. Set a price that covers all of it and leaves something over.",
    },
    {
      title: "Find your customers",
      idea: "A business is a list of people who pay you more than once. Know who they are, where they are and what they buy now instead of you.",
      task: "Talk to five people who could buy from you. Ask what they pay now and what would make them switch.",
    },
    {
      title: "A plan on one page",
      idea: "A plan is not a document for the office. It is how you check that money in is larger than money out before you spend anything.",
      task: "Fill in the one-page business plan from Resources. Bring it to your first mentor session.",
    },
    {
      title: "Keep a cash book",
      idea: "If it is not written down, you cannot manage it. A cash book takes two minutes a day and tells you whether you are growing.",
      task: "Record every naira in and out for seven days using the cash book template.",
    },
    {
      title: "Separate the business from the house",
      idea: "The fastest way a small business dies is when its money pays for family needs with no record. Pay yourself a set amount instead.",
      task: "Open a separate account, wallet or locked box for business money. Decide what you pay yourself each week.",
    },
    {
      title: "Selling",
      idea: "People buy when they understand in one breath what they get. Practise saying it until it is short.",
      task: "Write your offer in three sentences. Say it to ten people this week and note what they ask.",
    },
    {
      title: "Look after the equipment",
      idea: "A grinding mill, generator or tricycle earns only while it runs. Small, regular maintenance is cheaper than one breakdown.",
      task: "Write a weekly maintenance checklist for your main tool and the name of a mechanic you trust.",
    },
    {
      title: "Register and stay legal",
      idea: "A registered business name lets you open a business account, take contracts and apply for the growth programme.",
      task: "Search your business name on the CAC portal and list the documents registration needs.",
    },
    {
      title: "Your phone is a shop",
      idea: "A WhatsApp Business profile with photographs and prices reaches customers who never pass your stall. Transfers and POS reduce the cash you carry.",
      task: "Set up a WhatsApp Business catalogue with at least five items and one way to accept transfers.",
    },
    {
      title: "Your first helper",
      idea: "You grow when someone else can do part of the work to your standard. Start with one task, taught properly.",
      task: "List the tasks you could hand over. Write the steps for one of them as if teaching an apprentice.",
    },
    {
      title: "Save and reinvest",
      idea: "Set aside a fixed share of sales before spending. A cooperative or esusu group adds discipline and access to larger sums.",
      task: "Choose a weekly savings amount and where it will be kept. Start this week.",
    },
    {
      title: "Six months from now",
      idea: "Growth is a number you choose and check. Decide what you will sell, who you will employ and what you will save by a date.",
      task: "Write three targets for six months from today and post your first milestone in Community.",
    },
  ],
  P = [
    "Farming and agro-processing",
    "Tailoring and fashion",
    "Food and catering",
    "Transport and logistics",
    "Trading and retail",
    "Repairs and technical trades",
    "Technology and digital work",
    "I am a student",
  ],
  I = [
    [
      {
        q: "What is profit?",
        options: [
          "What is left after every cost, including your own time and transport",
          "Everything customers pay you",
          "Sales minus the cost of materials only",
        ],
        a: 0,
      },
      {
        q: "Why do most small businesses underprice?",
        options: [
          "Customers refuse to pay more",
          "They count only the cost of materials",
          "They sell too many units",
        ],
        a: 1,
      },
    ],
    [
      {
        q: "Which describes a business best?",
        options: [
          "A shop in a busy place",
          "A list of people who pay you more than once",
          "A product nobody else sells",
        ],
        a: 1,
      },
      {
        q: "What do you ask the five people you speak to?",
        options: [
          "What they pay now and what would make them switch",
          "Whether they like your shop's name",
          "How much money they earn",
        ],
        a: 0,
      },
    ],
    [
      {
        q: "What is a plan for?",
        options: [
          "To impress the office",
          "To borrow money",
          "To check that money in is larger than money out",
        ],
        a: 2,
      },
      {
        q: "When do you check it?",
        options: [
          "Before you spend anything",
          "After the first year",
          "Only when sales drop",
        ],
        a: 0,
      },
    ],
    [
      {
        q: "What goes in the cash book?",
        options: [
          "Only large sales",
          "Every naira in and out",
          "Only what you spend",
        ],
        a: 1,
      },
      {
        q: "How long does it take each day?",
        options: ["About two minutes", "About an hour", "A full morning"],
        a: 0,
      },
    ],
    [
      {
        q: "What is the fastest way a small business dies?",
        options: [
          "Its money pays for family needs with no record",
          "It opens a second account",
          "It pays its owner a wage",
        ],
        a: 0,
      },
      {
        q: "What do you do instead of taking money as it is needed?",
        options: [
          "Stop taking any money",
          "Pay yourself a set amount",
          "Borrow from customers",
        ],
        a: 1,
      },
    ],
    [
      {
        q: "When do people buy?",
        options: [
          "When your price is the lowest in the market",
          "When you talk for a long time",
          "When they understand in one breath what they get",
        ],
        a: 2,
      },
      {
        q: "How long is your written offer?",
        options: ["Three sentences", "One page", "As long as it takes"],
        a: 0,
      },
    ],
    [
      {
        q: "When does a mill, generator or tricycle earn?",
        options: [
          "Only while it runs",
          "Whenever you own it",
          "Only while it is new",
        ],
        a: 0,
      },
      {
        q: "Which costs less?",
        options: [
          "Waiting for one breakdown",
          "Small, regular maintenance",
          "Replacing the tool each year",
        ],
        a: 1,
      },
    ],
    [
      {
        q: "What does a registered business name let you do?",
        options: [
          "Stop keeping records",
          "Open a business account, take contracts and apply for the growth programme",
          "Stop paying suppliers",
        ],
        a: 1,
      },
      {
        q: "Where do you search for your business name?",
        options: ["The CAC portal", "The JAMB portal", "Your bank's app"],
        a: 0,
      },
    ],
    [
      {
        q: "What does a WhatsApp Business profile with photographs and prices do?",
        options: [
          "Replaces your cash book",
          "Reaches customers who never pass your stall",
          "Registers your business",
        ],
        a: 1,
      },
      {
        q: "What do transfers and POS reduce?",
        options: [
          "The cash you carry",
          "The number of customers",
          "Your prices",
        ],
        a: 0,
      },
    ],
    [
      {
        q: "When do you grow?",
        options: [
          "When you do every task yourself",
          "When someone else can do part of the work to your standard",
          "When you hire five people at once",
        ],
        a: 1,
      },
      {
        q: "How do you start handing work over?",
        options: [
          "With one task, taught properly",
          "With every task at once",
          "With the hardest task",
        ],
        a: 0,
      },
    ],
    [
      {
        q: "When do you set savings aside?",
        options: [
          "After all spending, if anything is left",
          "Before spending, as a fixed share of sales",
          "Only in a good month",
        ],
        a: 1,
      },
      {
        q: "What does a cooperative or esusu group add?",
        options: [
          "Discipline and access to larger sums",
          "A guarantee of profit",
          "Free equipment",
        ],
        a: 0,
      },
    ],
    [
      {
        q: "What is growth, in this track?",
        options: [
          "A number you choose and check",
          "Something that comes by luck",
          "Selling everything on credit",
        ],
        a: 0,
      },
      {
        q: "How many targets do you write for six months from today?",
        options: ["One", "Three", "Ten"],
        a: 1,
      },
    ],
  ];
function B({ week: e, questions: s, onPass: a }) {
  let [i, l] = useState(s.map(() => null)),
    [r, o] = useState(false),
    c = s.map((e, t) => i[t] !== e.a),
    d = i.every((e) => null !== e);
  return (
    <div className="mt-5 max-w-[40rem] border-t border-ink/20 pt-5">
      <p className="ui text-xl text-slate">Two questions to finish the week</p>
      {s.map((s, a) => (
        <fieldset className="mt-4" key={s.q}>
          <legend className="font-semibold">
            {a + 1}
            {". "}
            {s.q}
          </legend>
          <div className="mt-2 grid gap-2">
            {s.options.map((s, n) => {
              let r = i[a] === n;
              return (
                <label
                  className={`flex min-h-12 cursor-pointer items-center gap-3 border px-4 py-2.5 transition-colors ${r ? "border-ink bg-ivory" : "border-ink/25 hover:border-ink"}`}
                  key={s}
                >
                  <input
                    type="radio"
                    name={`wk${e}-q${a}`}
                    className="h-5 w-5 shrink-0 accent-[#101413]"
                    checked={r}
                    onChange={() => {
                      (l(i.map((e, t) => (t === a ? n : e))), o(false));
                    }}
                  />
                  {s}
                </label>
              );
            })}
          </div>
          {r && c[a] && (
            <p role="alert" className="mt-2 text-[0.9375rem] text-brick">
              Not that one. Read the week again and choose another answer.
            </p>
          )}
        </fieldset>
      ))}
      <button
        type="button"
        className="btn btn-forest mt-5"
        disabled={!d}
        onClick={function () {
          (o(true), c.every((e) => !e) && a());
        }}
      >
        <Check size={18} strokeWidth={3} aria-hidden={true} />
        {" Check answers"}
      </button>
    </div>
  );
}
let Y = [0.16, 1, 0.3, 1],
  E = {
    ref: "MBK-2026-0417",
    programme: "startup",
    submitted: "2 October 2026",
    stage: 2,
    summary: "Grinding mill, Ifakala",
    sample: true,
  },
  L = [
    {
      href: "/resources/application-checklist.txt",
      title: "Application checklist",
      body: "Everything to gather before you start, by programme.",
    },
    {
      href: "/resources/attestation-letter-template.txt",
      title: "Attestation letter template",
      body: "The wording your Traditional Ruler signs.",
    },
    {
      href: "/resources/one-page-business-plan.txt",
      title: "One-page business plan",
      body: "Eight short sections. Used in week 3.",
    },
    {
      href: "/resources/cash-book.csv",
      title: "Cash book",
      body: "Opens in Excel or Google Sheets. Used in week 4.",
    },
  ],
  U = [
    {
      key: "overview",
      label: "Overview",
      icon: v,
    },
    {
      key: "applications",
      label: "Applications",
      icon: f,
    },
    {
      key: "learning",
      label: "Learning",
      icon: h,
    },
    {
      key: "mentorship",
      label: "Mentorship",
      icon: j,
    },
    {
      key: "resources",
      label: "Resources",
      icon: w,
    },
    {
      key: "messages",
      label: "Messages",
      icon: CC,
    },
    {
      key: "community",
      label: "Community",
      icon: R,
    },
    {
      key: "profile",
      label: "Profile",
      icon: UserRound,
    },
  ];
function V({ app: e }) {
  let s = useReducedMotion(),
    a = e.stage / (stages.length - 1),
    n = (t) =>
      t < e.stage
        ? "border-forest bg-forest text-white"
        : t === e.stage
          ? "border-ink bg-ink text-white"
          : "border-ink/25 bg-white text-slate";
  return (
    <div>
      <div className="relative hidden md:block">
        <div className="absolute left-[10%] right-[10%] top-5 h-1 bg-sand">
          <motion.div
            className="h-full origin-left bg-forest"
            initial={
              !s && {
                scaleX: 0,
              }
            }
            animate={{
              scaleX: a,
            }}
            transition={{
              duration: 1.2,
              ease: Y,
              delay: 0.2,
            }}
          />
        </div>
        <ol className="relative grid grid-cols-5">
          {stages.map((s, a) => (
            <li
              className="px-2 text-center"
              aria-current={a === e.stage ? "step" : undefined}
              key={s.key}
            >
              <span
                className={`ui mx-auto grid h-11 w-11 place-items-center border-2 text-xl ${n(a)}`}
              >
                {a < e.stage ? (
                  <Check size={20} aria-label="Done" strokeWidth={3} />
                ) : (
                  a + 1
                )}
              </span>
              <span
                className={`ui mt-3 block text-xl ${a > e.stage ? "text-slate" : ""}`}
              >
                {s.label}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <ol className="md:hidden">
        {stages.map((s, a) => (
          <li
            className="flex gap-3 pb-3.5 last:pb-0"
            aria-current={a === e.stage ? "step" : undefined}
            key={s.key}
          >
            <span
              className={`ui grid h-9 w-9 shrink-0 place-items-center border-2 text-lg ${n(a)}`}
            >
              {a < e.stage ? (
                <Check size={16} aria-label="Done" strokeWidth={3} />
              ) : (
                a + 1
              )}
            </span>
            <span
              className={`ui pt-1 text-xl ${a > e.stage ? "text-slate" : ""}`}
            >
              {s.label}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-6 border-l-4 border-forest bg-white p-4">
        <span className="font-semibold">
          {"Now: "}
          {stages[e.stage].label}.
        </span>{" "}
        {stages[e.stage].help}
      </p>
    </div>
  );
}
export default function Dashboard() {
  let { user: e, ready: r, signOut: o } = useAuth(),
    d = useRouter(),
    h = useReducedMotion(),
    p = useRef(false),
    [u, y] = useState("overview"),
    [f, b] = useState([]),
    [w, k] = useState(null),
    [j, N] = useState([]),
    [v, S] = useState(0),
    [A, q] = useState(null),
    [T, $] = useState({
      sector: "",
      goal: "",
      channel: "Phone call",
    }),
    [O, R] = useState([]),
    [K, G] = useState(""),
    [X, Q] = useState(null),
    [J, _] = useState(false),
    [Z, ee] = useState({
      SMS: true,
      Email: false,
      "In-app": true,
    }),
    [et, es] = useState([]),
    [ea, en] = useState("");
  if (
    (useEffect(() => {
      if (!r) return;
      if (!e) {
        p.current || d.replace("/portal/sign-in?next=/portal/dashboard");
        return;
      }
      (b(store.apps(e.id)), k(store.draft(e.id)));
      let t = store.learned(e.id);
      (N(t),
        S(
          Math.min(
            -1 === H.findIndex((e, s) => !t.includes(s))
              ? 0
              : H.findIndex((e, s) => !t.includes(s)),
            H.length - 1,
          ),
        ),
        q(store.mentor(e.id)),
        R(store.checkins(e.id)));
      let s = new URLSearchParams(window.location.search);
      Q(s.get("new"));
      let a = s.get("tab");
      a && U.some((e) => e.key === a) && y(a);
    }, [r, e, d]),
    !r || !e)
  )
    return <div className="wrap py-24" aria-busy="true" />;
  let ei = e.name.split(" ")[0],
    el = J ? [...f, E] : f,
    er = el[0],
    eo = (e) => programmes.find((t) => t.id === e.programme) ?? programmes[0],
    ec = w ? programmes.find((e) => e.id === w.programme) : null,
    ed = !!w && (w.step > 0 || !!w.a),
    eh = H.findIndex((e, t) => !j.includes(t)),
    em = [
      {
        done: true,
        label: "Phone number confirmed",
        go: null,
        cta: "",
      },
      {
        done: f.length > 0,
        label:
          ed && 0 === f.length
            ? "Finish your application"
            : "Apply for a programme",
        go: () => d.push(ed ? "/portal/apply" : "/portal/programmes"),
        cta: ed ? "Continue" : "Choose",
      },
      {
        done: j.length > 0,
        label: "Complete week 1 of the learning track",
        go: () => y("learning"),
        cta: "Begin",
      },
      {
        done: !!A,
        label: "Request a mentor",
        go: () => y("mentorship"),
        cta: "Request",
      },
    ],
    ep = Math.round((em.filter((e) => e.done).length / em.length) * 100);
  function ex(t) {
    let s = j.includes(t) ? j.filter((e) => e !== t) : [...j, t];
    (N(s),
      store.saveLearned(e.id, s),
      !j.includes(t) && t + 1 < H.length && S(t + 1));
  }
  let eu = ed && ec && (
      <div className="flex flex-wrap items-center justify-between gap-4 border border-ink bg-white p-5">
        <div>
          <p className="ui text-2xl">
            {"Unfinished: "}
            {ec.name}
          </p>
          <p className="text-[0.9375rem] text-slate">
            {"You stopped at step "}
            {Math.min(w.step, 3) + 1}
            {" of 5"}
            {w.saved ? `, last saved ${w.saved}` : ""}.
          </p>
        </div>
        <Link href="/portal/apply" className="btn btn-forest">
          Continue application
        </Link>
      </div>
    ),
    eg = f.reduce((e, t) => Math.max(e, t.stage), -1),
    ey = [
      {
        label: "Apply",
        done: f.length > 0,
      },
      {
        label: "Learn",
        done: j.length >= H.length,
      },
      {
        label: "Verify",
        done: eg >= 3,
      },
      {
        label: "Receive",
        done: eg >= 4,
      },
      {
        label: "Grow",
        done: eg >= 4 && (!!A || O.length > 0),
      },
    ];
  return (
    <div className="bg-ivory">
      <div className="wrap grid gap-6 py-6 md:py-12 lg:grid-cols-[15.5rem_1fr] lg:gap-8">
        <aside className="min-w-0 lg:sticky lg:top-36 lg:self-start">
          <div className="hidden bg-forest p-5 text-white lg:block">
            <span className="display grid h-14 w-14 place-items-center bg-white text-3xl text-ink">
              {ei[0]?.toUpperCase()}
            </span>
            <p className="ui mt-3 text-2xl">{e.name}</p>
            <p className="text-sm text-white/75">
              {e.ward}
              {" ward, "}
              {e.lga}
            </p>
          </div>
          <nav
            aria-label="My portal"
            className="-mx-5 flex gap-1 overflow-x-auto bg-white p-1.5 [scrollbar-width:none] md:mx-0 lg:flex-col lg:p-2 [&::-webkit-scrollbar]:hidden"
          >
            {U.map((e) => (
              <button
                type="button"
                aria-current={u === e.key ? "page" : undefined}
                onClick={() => y(e.key)}
                className={`ui flex min-h-11 shrink-0 items-center gap-2.5 px-3.5 text-xl transition-colors ${u === e.key ? "bg-forest text-white" : "hover:bg-mint"}`}
                key={e.key}
              >
                <e.icon size={19} aria-hidden={true} /> {e.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                ((p.current = true), d.push("/portal"), o());
              }}
              className="ui flex min-h-11 shrink-0 items-center gap-2.5 px-3.5 text-xl text-brick hover:bg-brick-soft lg:mt-2 lg:border-t lg:border-line"
            >
              <W size={19} aria-hidden={true} />
              {" Sign out"}
            </button>
          </nav>
        </aside>
        <motion.div
          initial={
            !h && {
              opacity: 0,
              y: 14,
            }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            ease: Y,
          }}
          className="min-w-0 space-y-6"
          key={u}
        >
          {"overview" === u && (
            <>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h1 className="text-[clamp(2.75rem,6vw,5rem)]">
                  {"Welcome, "}
                  {ei}
                </h1>
                {"admin" === e.role && (
                  <Link href="/portal/admin" className="btn btn-forest">
                    Open Master Admin
                  </Link>
                )}
              </div>
              {X && f.some((e) => e.ref === X) && (
                <div
                  role="status"
                  className="flex items-center gap-4 bg-forest p-5 text-white"
                >
                  <CZ
                    className="shrink-0 text-white"
                    size={30}
                    aria-hidden={true}
                  />
                  <p>
                    <span className="ui block text-2xl">
                      Application submitted
                    </span>
                    {"Your reference is "}
                    <span className="font-semibold tabular-nums">{X}</span>.
                    Keep it: you can check its status with it.
                  </p>
                </div>
              )}
              <ol
                aria-label="Your journey"
                className="grid grid-cols-5 bg-white"
              >
                {ey.map((e, s) => {
                  let a = s === ey.findIndex((e) => !e.done);
                  return (
                    <li
                      className={`flex flex-col items-center gap-2 px-1 py-4 text-center sm:flex-row sm:justify-center sm:gap-3 ${s > 0 ? "border-l border-ink/15" : ""}`}
                      aria-current={a ? "step" : undefined}
                      key={e.label}
                    >
                      <span
                        className={`ui grid h-8 w-8 shrink-0 place-items-center text-base ${e.done ? "bg-forest text-white" : a ? "bg-ink text-white" : "border border-ink/30 text-slate"}`}
                      >
                        {e.done ? (
                          <Check size={16} strokeWidth={3} aria-label="Done" />
                        ) : (
                          s + 1
                        )}
                      </span>
                      <span
                        className={`ui text-lg sm:text-xl ${e.done || a ? "" : "text-slate"}`}
                      >
                        {e.label}
                      </span>
                    </li>
                  );
                })}
              </ol>
              {eu}
              <section aria-labelledby="st" className="bg-white p-6 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <h2 id="st" className="text-4xl">
                    Start here
                  </h2>
                  <p className="ui text-2xl text-forest tabular-nums">
                    {ep}% done
                  </p>
                </div>
                <div className="mt-3 h-2 bg-sand">
                  <motion.div
                    className="h-full origin-left bg-forest"
                    initial={
                      !h && {
                        scaleX: 0,
                      }
                    }
                    animate={{
                      scaleX: ep / 100,
                    }}
                    transition={{
                      duration: 1,
                      ease: Y,
                    }}
                  />
                </div>
                <ol className="mt-5">
                  {em.map((e, s) => (
                    <li
                      className="flex items-center gap-4 border-t border-ink/15 py-3.5"
                      key={e.label}
                    >
                      <span
                        className={`ui grid h-9 w-9 shrink-0 place-items-center text-lg ${e.done ? "bg-forest text-white" : "border-2 border-ink/30"}`}
                      >
                        {e.done ? (
                          <Check size={18} strokeWidth={3} aria-label="Done" />
                        ) : (
                          s + 1
                        )}
                      </span>
                      <span
                        className={`flex-1 ${e.done ? "text-slate line-through decoration-ink/30" : "font-semibold"}`}
                      >
                        {e.label}
                      </span>
                      {!e.done && e.go && (
                        <button
                          type="button"
                          className="btn btn-forest !min-h-11 !px-4 !text-lg"
                          onClick={e.go}
                        >
                          {e.cta}
                        </button>
                      )}
                    </li>
                  ))}
                </ol>
                <p className="mt-3 text-sm text-slate">
                  You do not have to apply to use the learning track and
                  resources. They are open from the day you join.
                </p>
              </section>
              <section aria-labelledby="trk" className="bg-white p-6 md:p-8">
                {er ? (
                  <>
                    <p className="text-sm text-slate">
                      <span className="tabular-nums">{er.ref}</span>
                      {", submitted "}
                      {er.submitted}
                      {er.sample && " (sample)"}
                    </p>
                    <h2 id="trk" className="mb-7 mt-1 text-4xl">
                      {eo(er).name}
                    </h2>
                    <V app={er} />
                  </>
                ) : (
                  <>
                    <h2 id="trk" className="text-4xl">
                      No application yet
                    </h2>
                    <p className="mt-3 max-w-[32rem]">
                      Once you submit, every stage from review to handover
                      appears here and is texted to you.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href="/portal/programmes"
                        className="btn btn-forest"
                      >
                        Choose a programme
                      </Link>
                      <button
                        type="button"
                        className="btn btn-line"
                        onClick={() => _(true)}
                      >
                        Show a sample tracker
                      </button>
                    </div>
                  </>
                )}
              </section>
              <div className="grid gap-6 md:grid-cols-2">
                <section className="bg-forest p-6 text-white">
                  <p className="ui text-xl text-white/70">Learning track</p>
                  <h2 className="mt-1 text-4xl">
                    {-1 === eh
                      ? "All twelve weeks done"
                      : `Week ${eh + 1}: ${H[eh].title}`}
                  </h2>
                  <p className="mt-2 text-white/85">
                    {j.length}
                    {" of 12 weeks complete."}
                  </p>
                  <button
                    type="button"
                    className="btn btn-white mt-5"
                    onClick={() => y("learning")}
                  >
                    {j.length ? "Continue" : "Begin week 1"}
                  </button>
                </section>
                <section className="bg-white p-6">
                  <p className="ui text-xl text-slate">Mentorship</p>
                  <h2 className="mt-1 text-4xl">
                    {A ? "Mentor requested" : "Ask for a mentor"}
                  </h2>
                  <p className="mt-2">
                    {A
                      ? `${A.sector}. Matching happens once an application is approved.`
                      : "Someone who has built a business in your trade, for six months of monthly check-ins."}
                  </p>
                  <button
                    type="button"
                    className="btn btn-line mt-5"
                    onClick={() => y("mentorship")}
                  >
                    {A ? "View" : "Request a mentor"}
                  </button>
                </section>
              </div>
            </>
          )}
          {"applications" === u && (
            <>
              <h1 className="text-[clamp(2.75rem,6vw,4.5rem)]">Applications</h1>
              {eu}
              {0 === el.length && !ed && (
                <div className="bg-white p-6 md:p-8">
                  <p className="text-lg">You have not applied yet.</p>
                  <Link
                    href="/portal/programmes"
                    className="btn btn-forest mt-5"
                  >
                    Choose a programme
                  </Link>
                </div>
              )}
              <ul className="space-y-4">
                {el.map((e) => (
                  <li className="bg-white p-6 md:p-8" key={e.ref}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-3xl">{eo(e).name}</h2>
                        <p className="mt-1 text-[0.9375rem] text-slate">
                          <span className="tabular-nums">{e.ref}</span>
                          {", submitted "}
                          {e.submitted}
                          {". "}
                          {e.summary}.
                        </p>
                      </div>
                      <span
                        className={`badge ${e.stage >= 3 ? "badge-green" : "badge-plain"}`}
                      >
                        {stages[e.stage].label}
                      </span>
                    </div>
                    <div className="mt-6">
                      <V app={e} />
                    </div>
                  </li>
                ))}
              </ul>
              {!J && (
                <button type="button" className="link" onClick={() => _(true)}>
                  Show a sample application midway through
                </button>
              )}
            </>
          )}
          {"learning" === u && (
            <>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h1 className="text-[clamp(2.75rem,6vw,4.5rem)]">
                  Twelve weeks
                </h1>
                <p className="ui text-2xl text-forest tabular-nums">
                  {j.length}
                  {" of 12 done"}
                </p>
              </div>
              <div className="flex gap-1" aria-hidden={true}>
                {H.map((e, s) => (
                  <span
                    className={`h-2 flex-1 ${j.includes(s) ? "bg-forest" : s === v ? "bg-ink" : "bg-sand"}`}
                    key={s}
                  />
                ))}
              </div>
              <ol className="bg-white">
                {H.map((e, s) => {
                  let a = j.includes(s),
                    n = v === s;
                  return (
                    <li
                      className="border-b border-ink/15 last:border-0"
                      key={e.title}
                    >
                      <button
                        type="button"
                        aria-expanded={n}
                        aria-controls={`wk-${s}`}
                        onClick={() => S(n ? -1 : s)}
                        className="flex w-full items-center gap-4 p-4 text-left md:px-6"
                      >
                        <span
                          className={`ui grid h-10 w-10 shrink-0 place-items-center text-xl ${a ? "bg-forest text-white" : "border-2 border-ink/30"}`}
                        >
                          {a ? (
                            <Check
                              size={18}
                              strokeWidth={3}
                              aria-label="Done"
                            />
                          ) : (
                            s + 1
                          )}
                        </span>
                        <span className="ui flex-1 text-2xl">{e.title}</span>
                        <CX
                          size={20}
                          aria-hidden={true}
                          className={`shrink-0 transition-transform ${n ? "rotate-180" : ""}`}
                        />
                      </button>
                      {n && (
                        <div
                          id={`wk-${s}`}
                          className="px-4 pb-6 md:px-6 md:pl-20"
                        >
                          <p className="max-w-[40rem]">{e.idea}</p>
                          <p className="mt-3 max-w-[40rem] border-l-4 border-forest bg-ivory p-4">
                            <span className="font-semibold">
                              {"This week: "}
                            </span>
                            {e.task}
                          </p>
                          {a ? (
                            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                              <p className="ui flex items-center gap-2 text-xl text-forest">
                                <Check
                                  size={18}
                                  strokeWidth={3}
                                  aria-hidden={true}
                                />
                                {" Week complete"}
                              </p>
                              <button
                                type="button"
                                className="ui min-h-11 text-lg underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                                onClick={() => ex(s)}
                              >
                                Take it again
                              </button>
                            </div>
                          ) : (
                            <B week={s} questions={I[s]} onPass={() => ex(s)} />
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </>
          )}
          {"mentorship" === u && (
            <>
              <h1 className="text-[clamp(2.75rem,6vw,4.5rem)]">Mentorship</h1>
              <ol className="grid gap-px bg-ink/15 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  [
                    "Request",
                    "Tell us your trade and what you want help with.",
                  ],
                  [
                    "Match",
                    "Once an application is approved, you are paired with a mentor in your sector.",
                  ],
                  [
                    "Meet monthly",
                    "One check-in a month for six months, by call, WhatsApp or in person.",
                  ],
                  [
                    "Report",
                    "Log each check-in here. It feeds the office's impact report.",
                  ],
                ].map(([e, s], a) => (
                  <li className="bg-white p-5" key={e}>
                    <span className="display text-4xl text-forest">
                      {a + 1}
                    </span>
                    <h2 className="mt-2 text-3xl">{e}</h2>
                    <p className="mt-1.5 text-[0.9375rem]">{s}</p>
                  </li>
                ))}
              </ol>
              {A ? (
                <section className="bg-forest p-6 text-white md:p-8">
                  <span className="badge badge-plain">
                    {"Requested "}
                    {A.requested}
                  </span>
                  <h2 className="mt-3 text-4xl">{A.sector}</h2>
                  <p className="mt-2 max-w-[40rem] text-white/85">“{A.goal}”</p>
                  <p className="mt-4 text-white/85">
                    {"Preferred contact: "}
                    {A.channel}
                    {". "}
                    {f.length
                      ? "You will be matched when your application is approved."
                      : "Submit an application so the team can match you."}
                  </p>
                </section>
              ) : (
                <form
                  onSubmit={function (t) {
                    if (
                      (t.preventDefault(),
                      !T.sector || T.goal.trim().length < 10)
                    )
                      return;
                    let s = {
                      ...T,
                      goal: T.goal.trim(),
                      requested: today(),
                    };
                    (store.saveMentor(e.id, s),
                      q(s),
                      fetch("/api/sms", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          phone: e.phone,
                          session: e.sms,
                          template: "mentor",
                        }),
                      }).catch(() => {}));
                  }}
                  className="space-y-5 bg-white p-6 md:p-8"
                >
                  <h2 className="text-4xl">Request a mentor</h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="m-sector"
                        className="mb-1.5 block font-semibold"
                      >
                        Your trade or sector
                      </label>
                      <select
                        id="m-sector"
                        className="field"
                        value={T.sector}
                        onChange={(e) =>
                          $({
                            ...T,
                            sector: e.target.value,
                          })
                        }
                      >
                        <option value="">Choose one</option>
                        {P.map((e) => (
                          <option key={e}>{e}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="m-ch"
                        className="mb-1.5 block font-semibold"
                      >
                        How should a mentor reach you?
                      </label>
                      <select
                        id="m-ch"
                        className="field"
                        value={T.channel}
                        onChange={(e) =>
                          $({
                            ...T,
                            channel: e.target.value,
                          })
                        }
                      >
                        <option>Phone call</option>
                        <option>WhatsApp</option>
                        <option>In person</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="m-goal"
                      className="mb-1.5 block font-semibold"
                    >
                      What do you most want help with?
                    </label>
                    <textarea
                      id="m-goal"
                      rows={3}
                      className="field"
                      value={T.goal}
                      onChange={(e) =>
                        $({
                          ...T,
                          goal: e.target.value,
                        })
                      }
                    />
                    <p className="mt-1.5 text-sm text-slate">
                      One or two sentences. For example: pricing my garments so
                      I stop losing money on fabric.
                    </p>
                  </div>
                  <button
                    className="btn btn-forest"
                    disabled={!T.sector || T.goal.trim().length < 10}
                  >
                    Request a mentor
                  </button>
                </form>
              )}
              <section className="bg-white p-6 md:p-8">
                <h2 className="text-3xl">Check-in log</h2>
                <form
                  onSubmit={function (t) {
                    if ((t.preventDefault(), K.trim().length < 5)) return;
                    let s = [
                      {
                        when: today(),
                        note: K.trim(),
                      },
                      ...O,
                    ];
                    (R(s), store.saveCheckins(e.id, s), G(""));
                  }}
                  className="mt-4 flex flex-wrap gap-3"
                >
                  <label htmlFor="ci" className="sr-only">
                    What you discussed
                  </label>
                  <input
                    id="ci"
                    className="field min-w-0 flex-1 basis-56"
                    placeholder="What you discussed and agreed"
                    value={K}
                    onChange={(e) => G(e.target.value)}
                  />
                  <button
                    className="btn btn-line"
                    disabled={K.trim().length < 5}
                  >
                    Add check-in
                  </button>
                </form>
                {0 === O.length ? (
                  <p className="mt-4 text-slate">
                    No check-ins yet. After each session with your mentor, add a
                    line here.
                  </p>
                ) : (
                  <ul className="mt-4">
                    {O.map((e, s) => (
                      <li
                        className="flex gap-4 border-t border-ink/15 py-3"
                        key={s}
                      >
                        <span className="ui w-28 shrink-0 text-lg text-slate">
                          {e.when}
                        </span>
                        <p>{e.note}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </>
          )}
          {"resources" === u && (
            <>
              <h1 className="text-[clamp(2.75rem,6vw,4.5rem)]">Resources</h1>
              <ul className="grid gap-4 sm:grid-cols-2">
                {L.map((e) => (
                  <li className="flex flex-col bg-white p-6" key={e.href}>
                    <h2 className="text-3xl">{e.title}</h2>
                    <p className="mt-2 flex-1 text-[0.9375rem]">{e.body}</p>
                    <a
                      href={e.href}
                      download={true}
                      className="btn btn-line mt-5 self-start"
                    >
                      <CG size={18} aria-hidden={true} />
                      {" Download"}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-slate">
                Need something that is not here? Use the Ask a question button
                at the bottom of the screen.
              </p>
            </>
          )}
          {"messages" === u && (
            <>
              <h1 className="text-[clamp(2.75rem,6vw,4.5rem)]">Messages</h1>
              <section className="bg-white p-6 md:p-8">
                {0 === el.length ? (
                  <p>
                    {
                      "Nothing yet. Updates about your application appear here and are texted to "
                    }
                    {e.phone}.
                  </p>
                ) : (
                  <ul>
                    {el
                      .flatMap((e) =>
                        (e.sample
                          ? [
                              {
                                when: "Today",
                                text: "Verification visit booked for Thursday, 10:00, at Ifakala community hall. Bring your ID.",
                              },
                              {
                                when: "12 October",
                                text: "The admin team finished reviewing your application. It has moved to community verification.",
                              },
                              {
                                when: "2 October",
                                text: "We received your application and three documents.",
                              },
                            ]
                          : [
                              {
                                when: e.submitted,
                                text: e.sms
                                  ? `${e.sms.sent ? "Texted to you" : "SMS (preview, not sent in demo mode)"}: “${e.sms.text}”`
                                  : `We received your application for ${eo(e).name}. Your reference is ${e.ref}.`,
                              },
                            ]
                        ).map((t) => ({
                          ...t,
                          ref: e.ref,
                        })),
                      )
                      .map((e) => (
                        <li
                          className="flex gap-4 border-b border-ink/15 py-4 first:pt-0 last:border-0 last:pb-0"
                          key={e.ref + e.text}
                        >
                          <CC
                            size={20}
                            className="mt-1 shrink-0 text-emerald"
                            aria-hidden={true}
                          />
                          <p>
                            <span className="block text-sm text-slate">
                              {e.when}
                              {", "}
                              <span className="tabular-nums">{e.ref}</span>
                            </span>
                            {e.text}
                          </p>
                        </li>
                      ))}
                  </ul>
                )}
              </section>
              <fieldset className="bg-white p-6 md:p-8">
                <legend className="ui float-left mb-4 w-full text-3xl">
                  Send my updates by
                </legend>
                <div className="clear-both flex flex-wrap gap-2">
                  {Object.keys(Z).map((s) => {
                    let CA = "SMS" === s ? C : "Email" === s ? M : CC,
                      n = "Email" === s && !e.email;
                    return (
                      <label
                        className={`ui flex min-h-12 items-center gap-2 border-2 px-4 text-xl transition-colors ${n ? "opacity-50" : "cursor-pointer"} ${Z[s] && !n ? "border-forest bg-mint" : "border-ink/25"}`}
                        key={s}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          disabled={n}
                          checked={Z[s] && !n}
                          onChange={() =>
                            ee({
                              ...Z,
                              [s]: !Z[s],
                            })
                          }
                        />
                        <CA size={18} aria-hidden={true} /> {s}
                        {Z[s] && !n && (
                          <Check size={17} aria-hidden={true} strokeWidth={3} />
                        )}
                      </label>
                    );
                  })}
                </div>
                <p className="mt-4 text-sm text-slate">
                  {"SMS goes to "}
                  {e.phone}
                  {". "}
                  {e.email
                    ? `Email goes to ${e.email}.`
                    : "Add an email at registration to receive email."}
                </p>
              </fieldset>
            </>
          )}
          {"community" === u && (
            <>
              <h1 className="text-[clamp(2.75rem,6vw,4.5rem)]">Community</h1>
              <section className="grid gap-8 bg-forest p-6 text-white md:p-10 lg:grid-cols-2">
                <div>
                  <h2 className="text-5xl">Fellows and beneficiaries</h2>
                  <p className="mt-4 text-white/85">
                    Ninety-two scholars across four sessions, most at IMSU and
                    FUTO, and 301 people equipped in 33 communities this year.
                    Once you are approved, you can find people on your campus or
                    in your trade here.
                  </p>
                </div>
                <form
                  onSubmit={(e) => {
                    (e.preventDefault(),
                      ea.trim().length < 10 ||
                        (es([ea.trim(), ...et]), en("")));
                  }}
                >
                  <label htmlFor="ms" className="ui block text-2xl">
                    Share a milestone
                  </label>
                  <p className="mt-1 text-sm text-white/75">
                    A semester passed, a first hire, a new customer.
                  </p>
                  <textarea
                    id="ms"
                    rows={3}
                    className="field mt-3"
                    value={ea}
                    onChange={(e) => en(e.target.value)}
                  />
                  <button
                    className="btn btn-forest mt-3"
                    disabled={ea.trim().length < 10}
                  >
                    Post milestone
                  </button>
                  <ul className="mt-4 space-y-2" aria-live="polite">
                    {et.map((e, s) => (
                      <li className="bg-white/10 p-3 text-[0.9375rem]" key={s}>
                        <span className="font-semibold">{ei}:</span> {e}
                      </li>
                    ))}
                  </ul>
                </form>
              </section>
            </>
          )}
          {"profile" === u && (
            <>
              <h1 className="text-[clamp(2.75rem,6vw,4.5rem)]">Profile</h1>
              <dl className="bg-white p-6 md:p-8">
                {[
                  ["Full name", e.name],
                  ["Phone", `${e.phone} (confirmed by code)`],
                  ["Email", e.email || "Not given"],
                  ["Community", `${e.community}, ${e.ward} ward, ${e.lga}`],
                  ["Member since", e.joined],
                ].map(([e, s]) => (
                  <div
                    className="grid gap-1 border-b border-ink/15 py-4 first:pt-0 last:border-0 last:pb-0 sm:grid-cols-[12rem_1fr]"
                    key={e}
                  >
                    <dt className="text-slate">{e}</dt>
                    <dd className="break-words font-semibold">{s}</dd>
                  </div>
                ))}
              </dl>
              {"admin" === e.role && (
                <p className="font-semibold text-forest">
                  This account is the Master Admin.
                </p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
