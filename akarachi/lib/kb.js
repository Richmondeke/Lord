import {
  bills,
  figures,
  programmes,
  stages,
  workAreas,
  story,
  portalSteps,
  faq,
} from "@/lib/content";

// Answers the "Ask a question" assistant gives without an AI model, and the
// published facts an AI model is allowed to answer from.
const billList = bills
  .map((e) => `${e.id} ${e.title} (${e.year}, ${e.stage.toLowerCase()})`)
  .join("; ");
export const answers = [
  {
    keys: [
      "who",
      "akarachi",
      "amadi",
      "biography",
      "about",
      "background",
      "born",
      "age",
      "from",
      "engineer",
      "school",
      "study",
      "education",
      "covenant",
    ],
    answer:
      "Hon. Engr. Akarachi Etinosa Amadi is the Member representing Mbaitoli/Ikeduru Federal Constituency in the House of Representatives. He comes from Eziama in Ikeduru, studied Chemical Engineering at Covenant University, trained with the Nigerian Petroleum Development Company, worked on drilling, dredging and land reclamation in the Niger Delta, and founded several companies, mostly in upstream oil and gas, before he was elected in 2023 at 28. He is Chairman of the House Committee on Oceans and Fisheries.",
    link: {
      href: "/#story",
      label: "Read his story",
    },
  },
  {
    keys: [
      "bill",
      "bills",
      "law",
      "laws",
      "legislation",
      "sponsor",
      "sponsored",
      "house",
      "assembly",
      "reading",
      "legislative",
    ],
    answer: `Press reports credit him with 38 bills in the 10th Assembly. The ones matched to public records so far are: ${billList}.`,
    link: {
      href: "/#record",
      label: "See the bills in plain English",
    },
  },
  {
    keys: [
      "impact",
      "achievement",
      "achievements",
      "done",
      "projects",
      "work",
      "record",
      "deliver",
      "delivered",
      "numbers",
    ],
    answer: `In figures: ${figures.map((e) => `${e.value.toLocaleString("en-NG")}${e.suffix ?? ""} ${e.label}`).join("; ")}.`,
    link: {
      href: "/#work",
      label: "See the work at home",
    },
  },
  {
    keys: [
      "transformer",
      "transformers",
      "light",
      "streetlight",
      "streetlights",
      "solar",
      "electricity",
      "power",
      "mbaike",
    ],
    answer:
      "Sixty-seven 500KVA transformers were delivered to 63 autonomous communities in April 2026, and phase one of Operation Light Up Mbaike put up 2,500 solar streetlights across both local governments.",
    link: {
      href: "/#work",
      label: "Power and light",
    },
  },
  {
    keys: [
      "empowerment",
      "empower",
      "tricycle",
      "minibus",
      "bus",
      "generator",
      "grinding",
      "sewing",
      "motorcycle",
      "vision",
      "result",
      "handover",
      "april",
    ],
    answer:
      "On 5 April 2026, at the Mbaike Mega Empowerment called From Vision to Result, the office handed over 67 transformers, minibuses, cargo tricycles, motorcycles, generators, grinding mills, sewing machines, freezers and farm inputs, in a package valued at over ₦200 million.",
    link: {
      href: "/portal#impact",
      label: "See the photographs and film",
    },
  },
  {
    keys: [
      "jamb",
      "utme",
      "scholarship",
      "scholarships",
      "student",
      "students",
      "university",
      "fees",
      "school fees",
      "education support",
    ],
    answer:
      "Free JAMB registration has run every year since 2022; 841 students were registered for 2026. Students who score 200 or above can get a scholarship to a public university, and 92 scholars have been funded since 2022/23. To apply for education support you need a UTME score of 200 or more and an admission to a Federal or State tertiary institution.",
    link: {
      href: "/portal/programmes#education",
      label: "Education Empowerment",
    },
  },
  {
    keys: [
      "programme",
      "programmes",
      "program",
      "programs",
      "apply",
      "application",
      "start-up",
      "startup",
      "business",
      "grant",
      "growth",
      "support",
    ],
    answer: `Three programmes are open: ${programmes.map((e) => e.name).join(", ")}. Create an account with your phone number, choose a programme and complete five short steps. Your answers save as you go.`,
    link: {
      href: "/portal/programmes",
      label: "See who qualifies",
    },
  },
  {
    keys: [
      "eligible",
      "eligibility",
      "qualify",
      "qualifies",
      "requirements",
      "who can",
      "indigene",
      "resident",
      "ward",
      "documents",
      "attestation",
      "traditional ruler",
      "cac",
    ],
    answer:
      "All programmes are for indigenes of Mbaitoli/Ikeduru; the growth programme also accepts residents with a CAC-registered business. Business applicants must be 18 or older and need an attestation from their Traditional Ruler. Everyone needs a valid ID. Each programme page lists its documents.",
    link: {
      href: "/portal/programmes",
      label: "Full eligibility",
    },
  },
  {
    keys: [
      "status",
      "track",
      "tracking",
      "reference",
      "check",
      "progress",
      "stage",
      "how long",
      "review",
    ],
    answer: `After you submit, your application moves through five stages: ${stages.map((e) => e.label).join(", ")}. Follow it from your dashboard, or enter your reference number on the Check status page. The office has not published a fixed review time.`,
    link: {
      href: "/portal/status",
      label: "Check status",
    },
  },
  {
    keys: [
      "beneficiary",
      "beneficiaries",
      "awardee",
      "awardees",
      "list",
      "name",
      "won",
      "selected",
      "register",
      "confirm",
    ],
    answer:
      "You can check whether a name is on the 2026 JAMB register, the 2026 equipment register or the scholarship register. Enter the first name and surname; the result shows the ward, what was awarded and the last two digits of the phone on record. The full lists are not published, to protect people's details.",
    link: {
      href: "/portal/beneficiaries",
      label: "Check the registers",
    },
  },
  {
    keys: [
      "mentor",
      "mentorship",
      "mentors",
      "training",
      "learning",
      "course",
      "lessons",
      "resources",
      "guide",
      "template",
    ],
    answer:
      "Every account gets a twelve-week learning track on running a small business, templates for a business plan, cash book and attestation letter, and a place to request a mentor. Mentors are matched after an application is approved, with monthly check-ins for six months.",
    link: {
      href: "/portal/dashboard",
      label: "Open my portal",
    },
  },
  {
    keys: [
      "cost",
      "free",
      "pay",
      "payment",
      "fee",
      "money",
      "party",
      "apc",
      "politics",
      "vote",
    ],
    answer:
      "Applying is free. Nobody should ask you to pay at any stage. Selection follows the published criteria and does not depend on party membership or who you support.",
  },
  {
    keys: [
      "contact",
      "office",
      "address",
      "email",
      "phone",
      "reach",
      "visit",
      "talk",
    ],
    answer:
      "The constituency office is at KM 4, Owerri-Okigwe Road, Imo State. Write to info@akarachi.org.",
    link: {
      href: "/#contact",
      label: "Contact the office",
    },
  },
  {
    keys: [
      "road",
      "roads",
      "health",
      "hospital",
      "medical",
      "fmc",
      "homes",
      "houses",
      "women",
      "football",
      "youth",
    ],
    answer: workAreas
      .filter((e) =>
        [
          "Roads",
          "Health",
          "Homes",
          "Women and families",
          "Young people",
        ].includes(e.title),
      )
      .map((e) => `${e.title}: ${e.body}`)
      .join(" "),
    link: {
      href: "/#work",
      label: "See all seven areas",
    },
  },
];

export const CONTEXT = [
  "ABOUT",
  ...story.map((e) => `- ${e.title}: ${e.body}`),
  "",
  "FIGURES (with source)",
  ...figures.map(
    (e) => `- ${e.value}${e.suffix ?? ""} ${e.label} (${e.source})`,
  ),
  "",
  "AREAS OF WORK",
  ...workAreas.map((e) => `- ${e.title}: ${e.body}`),
  "",
  "BILLS MATCHED TO PUBLIC RECORDS (press reports say 38 in total)",
  ...bills.map(
    (e) =>
      `- ${e.id}, ${e.title}, ${e.year}, ${e.stage} (${e.stageNote}). In plain terms: ${e.plain}`,
  ),
  "",
  "EMPOWERMENT PROGRAMMES OPEN NOW",
  ...programmes.map(
    (e) =>
      `- ${e.name}: ${e.summary} Eligibility: ${e.eligibility.join("; ")}. Documents: ${e.documents.map((e) => e.name).join(", ")}.${e.priority ? ` ${e.priority}` : ""}`,
  ),
  "",
  "HOW APPLYING WORKS",
  ...portalSteps.map((e, a) => `${a + 1}. ${e.title}: ${e.body}`),
  `Stages after submitting: ${stages.map((e) => `${e.label} (${e.help})`).join(" ")}`,
  "",
  "OTHER ANSWERS",
  ...answers.map((e) => `- ${e.answer}`),
  ...faq.map((e) => `- ${e.q} ${e.a}`),
].join("\n");

const minor = new Set([
  "the",
  "and",
  "for",
  "what",
  "how",
  "does",
  "did",
  "has",
  "have",
  "his",
  "him",
  "are",
  "can",
  "you",
  "about",
  "tell",
  "with",
  "that",
  "this",
  "any",
  "was",
  "who",
]);

export const suggestions = [
  "Who is Akarachi Amadi?",
  "Which bills has he sponsored?",
  "How do I apply for support?",
  "Am I on the beneficiary list?",
];

export const NO_ANSWER =
  "I don't have that in what the office has published. I can answer questions about Akarachi Amadi, his bills, the work in Mbaitoli and Ikeduru, and how to apply for a programme. For anything else, write to info@akarachi.org.";

/** Keyword match against the published answers. */
export function matchAnswer(question) {
  const text = question.toLowerCase();
  const words = text.split(/[^a-z0-9-]+/).filter((w) => w.length > 2);
  let best = null;
  let top = 0;
  for (const entry of answers) {
    let score = 0;
    for (const key of entry.keys)
      if (key.includes(" ") ? text.includes(key) : words.includes(key))
        score += key === "who" || minor.has(key) ? 0.5 : 2;
    if (score > top) [top, best] = [score, entry];
  }
  return !best || top < 2
    ? { answer: NO_ANSWER }
    : { answer: best.answer, link: best.link };
}
