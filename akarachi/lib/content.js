let SITE_URL = "https://akarachi.org",
  newsItems = [
    {
      tag: "Empowerment",
      date: "April 2026",
      title:
        "From Vision to Result: 67 transformers reach 63 communities in a day",
      dek: "The Mbaike Mega Empowerment put minibuses, tricycles, generators and ₦200 million in support into constituents' hands.",
      url: `${SITE_URL}/?p=3072`,
      outlet: "akarachi.org",
    },
    {
      tag: "Awards",
      date: "March 2026",
      title: "Champion Newspapers names him Legislator of the Year",
      dek: "The award, presented in Lagos, cited 38 bills in a first term.",
      url: "https://championnews.com.ng/2026/03/17/hon-engr-akarachi-amadi-bags-champion-newspapers-2025-legislator-of-the-year-award/",
      outlet: "Champion Newspapers",
    },
    {
      tag: "Legislation",
      date: "July 2026",
      title: "Fisheries education and research bills advance in the House",
      dek: "A push to make fish farming a trade young people can train for.",
      url: `${SITE_URL}/?p=3094`,
      outlet: "akarachi.org",
    },
    {
      tag: "Community",
      date: "September 2026",
      title: "An Orodo woman gets treatment after three years",
      dek: "He stepped in to secure care for a facial condition her family could not afford to treat.",
      url: `${SITE_URL}/?p=3192`,
      outlet: "akarachi.org",
    },
    {
      tag: "Empowerment",
      date: "September 2026",
      title: "From scholarship to impact: a charge to final-year fellows",
      dek: "Scholars about to graduate were asked to carry the work home with them.",
      url: `${SITE_URL}/?p=3182`,
      outlet: "akarachi.org",
    },
    {
      tag: "Empowerment",
      date: "March 2026",
      title: "Free JAMB registration closes with 841 students enrolled",
      dek: "The fifth edition of the scheme, run through community leaders and parishes.",
      url: `${SITE_URL}/?p=3058`,
      outlet: "akarachi.org",
    },
    {
      tag: "Community",
      date: "February 2026",
      title: "Operation Light Up Mbaike: 2,500 solar streetlights in phase one",
      dek: "Lights went up across both local governments, with more communities to follow.",
      url: `${SITE_URL}/?p=3041`,
      outlet: "akarachi.org",
    },
    {
      tag: "Community",
      date: "July 2026",
      title: "A 500KVA transformer for Obinoha",
      dek: "Delivered for the 33kV line, alongside a second unit for Obazu.",
      url: `${SITE_URL}/?p=3089`,
      outlet: "akarachi.org",
    },
    {
      tag: "Awards",
      date: "October 2026",
      title:
        "‘Ambassador of the Church’, and a call for Christians to engage in politics",
      dek: "He received the honour and urged congregations to take part in public life.",
      url: `${SITE_URL}/?p=3210`,
      outlet: "akarachi.org",
    },
  ],
  i =
    "Priority goes to active farmers and cooperatives, widows and vulnerable women in business, unemployed young people with a clear plan, persons with disabilities, and applicants who have not benefited before.";
const bills = [
  {
    id: "HB.542",
    title:
      "Federal College of Entrepreneurship and Skill Acquisition, Mbaitoli/Ikeduru (Establishment) Bill",
    year: 2023,
    theme: "Education",
    stage: "First reading",
    stageNote: "Order paper, October 2023",
    plain:
      "Creates a federal college at home that teaches trades and business skills, so school leavers can train for work without leaving the constituency.",
  },
  {
    id: "HB.543",
    title:
      "Nigerian Institute for Vocational Training and Certification (Establishment) Bill",
    year: 2023,
    theme: "Education",
    stage: "First reading",
    stageNote: "Order paper, October 2023",
    plain:
      "Sets up a national body to train artisans and issue certificates that employers anywhere in Nigeria will recognise.",
  },
  {
    id: "HB.729",
    title:
      "Nigerian Maritime Administration and Safety Agency Act (Amendment) Bill",
    year: 2023,
    theme: "Maritime",
    stage: "First reading",
    stageNote: "Read on 24 October 2023",
    plain:
      "Updates the law that governs NIMASA, the agency responsible for shipping safety and maritime labour in Nigerian waters.",
  },
  {
    id: "HB.730",
    title:
      "National Football Academy, Mbaitoli, Imo State (Establishment) Bill",
    year: 2023,
    theme: "Sport",
    stage: "First reading",
    stageNote: "Read on 24 October 2023",
    plain:
      "Sets up a national academy in Mbaitoli to find and train young footballers, with schooling alongside sport.",
  },
  {
    id: "Cap. B10",
    title: "Border Communities Development Agency Act (Amendment) Bill",
    year: 2023,
    theme: "Development",
    stage: "First reading",
    stageNote: "Order paper, October 2023",
    plain:
      "Strengthens the agency that funds roads, clinics and schools in communities along Nigeria's borders.",
  },
  {
    id: "HB.2580",
    title: "Inland Fisheries Act (Amendment) Bill",
    year: 2025,
    theme: "Agriculture",
    stage: "First reading",
    stageNote: "Read on 12 November 2025",
    plain:
      "Modernises the rules for fishing in rivers and lakes, which rural households rely on for food and income.",
  },
  {
    id: "2026",
    title: "Fisheries education and research bills",
    year: 2026,
    theme: "Agriculture",
    stage: "In progress",
    stageNote: "Advanced on the floor, July 2026",
    plain:
      "A set of bills to fund teaching and research in fisheries, so that fish farming can grow as a trade.",
  },
];
export { bills };
const faq = [
  {
    q: "Who is Hon. Engr. Akarachi Amadi?",
    a: "He is the Member representing Mbaitoli/Ikeduru Federal Constituency in the House of Representatives, a chemical engineer and a businessman from Eziama, Ikeduru.",
  },
  {
    q: "How do I apply?",
    a: "Create an account with your phone number, choose a programme and complete the form. You can leave at any point and sign back in to continue where you stopped.",
  },
  {
    q: "Who is eligible?",
    a: "Each programme lists its own conditions. All three are for indigenes of Mbaitoli/Ikeduru; the growth programme also accepts residents with a CAC-registered business.",
  },
  {
    q: "How do I check my application?",
    a: "Sign in and open your dashboard, or enter your reference number on the Check status page. You will see the stage your application has reached.",
  },
  {
    q: "Does it cost anything, or depend on who I support?",
    a: "No. Applying is free. Selection follows the published criteria and is never tied to party membership or endorsement.",
  },
];
export { faq };
const equipmentItems = [
  "Sewing machine",
  "Grinding mill",
  "Deep freezer",
  "Generator",
  "Fumigator and chemicals",
  "Motorcycle",
  "Cargo tricycle",
  "Minibus",
  "Fertiliser and farm inputs",
  "Cash grant",
];
export { equipmentItems };
const figures = [
  {
    value: 841,
    label: "students registered free for the 2026 JAMB",
    source: "akarachi.org, March 2026",
  },
  {
    value: 92,
    label: "university scholars funded since 2022/23",
    source: "Scholarship register",
  },
  {
    value: 20,
    suffix: "+",
    label: "classroom blocks built or renovated",
    source: "ThisDay, April 2026",
  },
  {
    value: 67,
    label: "transformers for 63 autonomous communities",
    source: "ThisDay, April 2026",
  },
  {
    value: 2500,
    label: "solar streetlights, Light Up Mbaike phase one",
    source: "akarachi.org, February 2026",
  },
  {
    value: 38,
    label: "bills sponsored in the 10th Assembly",
    source: "Champion Newspapers, March 2026",
  },
];
export { figures };
const stages = [
  {
    key: "submitted",
    label: "Submitted",
    help: "We have your application and documents.",
  },
  {
    key: "review",
    label: "Under review",
    help: "The admin team is checking your answers against the programme criteria.",
  },
  {
    key: "verify",
    label: "Community verification",
    help: "Your Traditional Ruler's attestation is confirmed and you may be visited in person.",
  },
  {
    key: "approved",
    label: "Approved",
    help: "You have been selected. Watch for the date and place of handover.",
  },
  {
    key: "done",
    label: "Delivered",
    help: "Support has been handed over.",
  },
];
export { stages };
const priorityGroups = [
  "None of these",
  "Active farmer or cooperative member",
  "Widow or vulnerable woman in business",
  "Unemployed young person with a business plan",
  "Person with a disability",
];
export { priorityGroups };
const programmes = [
  {
    id: "education",
    name: "Education Empowerment",
    short: "Education",
    summary:
      "Support for indigenes of Mbaitoli/Ikeduru who have won admission to a Federal or State tertiary institution.",
    eligibility: [
      "You are an indigene of Mbaitoli/Ikeduru Federal Constituency",
      "You scored 200 or above in the UTME (JAMB)",
      "You have admission to a Federal or State tertiary institution",
      "You have not received this education support before",
    ],
    documents: [
      {
        name: "JAMB result slip",
      },
      {
        name: "Admission letter",
      },
      {
        name: "School fee invoice or evidence of registration",
        optional: true,
      },
      {
        name: "Valid means of identification",
      },
      {
        name: "Recent passport photograph",
      },
      {
        name: "Certificate of origin",
      },
    ],
    img: "/img/walk.webp",
  },
  {
    id: "startup",
    name: "New Business Start-Up Support",
    short: "Start-up",
    summary:
      "For people with a workable business idea who need help to set it up. Tools, equipment and support to turn the idea into a living.",
    eligibility: [
      "You are an indigene of Mbaitoli/Ikeduru Federal Constituency",
      "You are 18 or older",
      "You work in, or are ready to start, a productive trade such as farming, petty trading, food processing, transport, artisanship or fishing",
      "Your Traditional Ruler will attest to your application",
      "You submit one application only, and can be visited for verification",
    ],
    priority: i,
    documents: [
      {
        name: "Valid means of identification",
      },
      {
        name: "Attestation from your Traditional Ruler",
      },
      {
        name: "Recent passport photograph",
      },
      {
        name: "Business plan or one-page summary",
        optional: true,
      },
    ],
    img: "/img/mills.webp",
  },
  {
    id: "growth",
    name: "Existing Business Growth Support",
    short: "Growth",
    summary:
      "For people already running a business who need grants, equipment or support to expand, produce more or serve more customers.",
    eligibility: [
      "You are an indigene or resident of Mbaitoli/Ikeduru Federal Constituency",
      "You are 18 or older",
      "Your business is registered with the Corporate Affairs Commission",
      "Your Traditional Ruler will attest to your application",
      "You submit one application only, and can be visited for verification",
    ],
    priority: i,
    documents: [
      {
        name: "Valid means of identification",
      },
      {
        name: "CAC registration certificate",
      },
      {
        name: "Attestation from your Traditional Ruler",
      },
      {
        name: "Photograph of your shop, farm or workshop",
        optional: true,
      },
    ],
    img: "/img/generators.webp",
  },
];
export { programmes };
const registerTotals = {
  jamb: {
    total: 852,
    mbaitoli: 460,
    ikeduru: 392,
  },
  equipment: {
    total: 301,
    communities: 33,
    items: [
      ["Sewing machines", 67],
      ["Motorcycles", 37],
      ["Generators", 32],
      ["Grinding mills", 31],
      ["Cargo tricycles", 31],
      ["Deep freezers", 31],
      ["Minibuses", 31],
      ["Fumigators", 17],
    ],
  },
  scholars: {
    total: 92,
    sessions: [
      ["2022/23", 17],
      ["2023/24", 26],
      ["2024/25", 15],
      ["2025/26", 34],
    ],
  },
};
export { registerTotals };
const scoreCriteria = [
  {
    key: "eligibility",
    label: "Eligibility and documents",
    help: "Meets every condition; documents complete and readable.",
  },
  {
    key: "need",
    label: "Need",
    help: "How much the support would change this person's situation.",
  },
  {
    key: "plan",
    label: "Plan",
    help: "A clear, workable use of the support, or academic standing for education.",
  },
  {
    key: "priority",
    label: "Priority",
    help: "In a priority group, or has not benefited before.",
  },
];
export { scoreCriteria };
const portalSteps = [
  {
    title: "Apply",
    body: "Create an account with your phone number, check that you qualify, and send your application with your documents.",
  },
  {
    title: "Learn",
    body: "The twelve-week learning track opens the day you join. Work through it while your application is read.",
  },
  {
    title: "Verify",
    body: "Your Traditional Ruler attests to your application, and the team may visit you.",
  },
  {
    title: "Receive",
    body: "If you are selected, you are told the date and place of handover.",
  },
  {
    title: "Grow",
    body: "Ask for a mentor in your trade and log check-ins, so the office can see what the support built.",
  },
];
export { portalSteps };
export { newsItems as news };
const story = [
  {
    when: "Eziama",
    title: "A son of Ikeduru",
    body: "He comes from Eziama in Ikeduru Local Government Area. School took him to Warri and then to Remo in Ogun State.",
  },
  {
    when: "Covenant",
    title: "Trained as a chemical engineer",
    body: "A Bachelor of Engineering in Chemical Engineering from Covenant University, Ota, specialising in kinetic molecular engineering. He trained with the Nigerian Petroleum Development Company and worked in oil and gas operations across the Niger Delta.",
  },
  {
    when: "Enterprise",
    title: "Built companies before he ran",
    body: "He founded and runs several companies, most of them in upstream oil and gas, and served as Vice President of the Network for African Student Entrepreneurs.",
  },
  {
    when: "2022",
    title: "Paid for the first JAMB forms",
    body: "The Akarachi Foundation began covering exam fees for students at home. The scheme has run every year since and is now in its fifth edition.",
  },
  {
    when: "2023",
    title: "Elected at 28",
    body: "He won the Mbaitoli/Ikeduru seat and entered the 10th National Assembly as one of its youngest members. By October his first five bills were on the order paper. He chairs the House Committee on Oceans and Fisheries.",
  },
  {
    when: "2026",
    title: "From vision to result",
    body: "Phase one of Operation Light Up Mbaike put up 2,500 solar streetlights. Champion Newspapers named him Legislator of the Year. In April, 67 transformers went out to 63 communities in a single day.",
  },
];
export { story };
const wards = [
  {
    lga: "Mbaitoli",
    name: "Ezinihitte",
    jamb: 98,
    communities: ["Obazu", "Awo-Ohii-Dim"],
  },
  {
    lga: "Mbaitoli",
    name: "Ogbaku",
    jamb: 55,
    communities: ["Okwu Ogbaku", "Ogbujioma", "Isi-Ogbaku", "Ogbaku"],
  },
  {
    lga: "Mbaitoli",
    name: "Afara / Eziama",
    jamb: 39,
    communities: ["Eziama Obiato", "Umuagha", "Afara", "Amaocha"],
  },
  {
    lga: "Mbaitoli",
    name: "Ubomiri",
    jamb: 39,
    communities: [],
  },
  {
    lga: "Mbaitoli",
    name: "Ogwa II",
    jamb: 31,
    communities: ["Alaenyi Ogwa", "Alaeze"],
  },
  {
    lga: "Mbaitoli",
    name: "Ogwa I",
    jamb: 30,
    communities: ["Umueze / Abazu", "Umunneato", "Idume"],
  },
  {
    lga: "Mbaitoli",
    name: "Orodo A",
    jamb: 28,
    communities: ["Amaukwu Orodo", "Isi-Orodo"],
  },
  {
    lga: "Mbaitoli",
    name: "Azara / Umunoha",
    jamb: 27,
    communities: ["Umunoha", "Obinoha"],
  },
  {
    lga: "Mbaitoli",
    name: "Umuagwu / Umunwoha",
    jamb: 26,
    communities: [],
  },
  {
    lga: "Mbaitoli",
    name: "Ifakala",
    jamb: 26,
    communities: ["Ifakala", "Nkanu"],
  },
  {
    lga: "Mbaitoli",
    name: "Orodo B",
    jamb: 25,
    communities: ["Ubaheze"],
  },
  {
    lga: "Mbaitoli",
    name: "Amaike",
    jamb: 21,
    communities: [],
  },
  {
    lga: "Ikeduru",
    name: "Uzoagba",
    jamb: 61,
    communities: [],
  },
  {
    lga: "Ikeduru",
    name: "Akabo",
    jamb: 44,
    communities: [],
  },
  {
    lga: "Ikeduru",
    name: "Avuvu",
    jamb: 40,
    communities: ["Amala Avuvu"],
  },
  {
    lga: "Ikeduru",
    name: "Okwu / Ugirike / Eziama",
    jamb: 37,
    communities: ["Ugirike", "Nneise", "Okwu"],
  },
  {
    lga: "Ikeduru",
    name: "Amaimo",
    jamb: 35,
    communities: ["Amaimo Ancient", "Umuri", "Umuofor", "Obodo"],
  },
  {
    lga: "Ikeduru",
    name: "Iho",
    jamb: 29,
    communities: [],
  },
  {
    lga: "Ikeduru",
    name: "Inyishi / Umudim",
    jamb: 29,
    communities: [],
  },
  {
    lga: "Ikeduru",
    name: "Amakohia",
    jamb: 27,
    communities: ["Amakohia", "Owubilubi"],
  },
  {
    lga: "Ikeduru",
    name: "Ngugo / Ikembara",
    jamb: 24,
    communities: [],
  },
  {
    lga: "Ikeduru",
    name: "Amatta",
    jamb: 21,
    communities: [],
  },
  {
    lga: "Ikeduru",
    name: "Atta II",
    jamb: 19,
    communities: [],
  },
  {
    lga: "Ikeduru",
    name: "Atta I",
    jamb: 18,
    communities: [],
  },
];
export { wards };
const workAreas = [
  {
    title: "Schooling",
    body: "Free JAMB and post-UTME registration every year since 2022, and full scholarships to public universities for students who score 200 or above. Ninety-two scholars so far, split evenly between Mbaitoli and Ikeduru.",
  },
  {
    title: "Power and light",
    body: "Sixty-seven 500KVA transformers for 63 autonomous communities, and 2,500 solar streetlights in the first phase of Operation Light Up Mbaike.",
  },
  {
    title: "Roads",
    body: "He personally paid for the road from Ochicha Ngugo to Eziama, and attracted others, including Nkwo Orji to Afor Obazu and Eke-Atta to Ikembara.",
  },
  {
    title: "Health",
    body: "A bill-offset partnership with the Federal Medical Centre, Owerri, for patients who cannot pay, and a five-day medical outreach across both local governments.",
  },
  {
    title: "Homes",
    body: "New houses built for families who had none.",
  },
  {
    title: "Women and families",
    body: "Afor-Di-Mkpa, a family welfare scheme shared across Mbaike without regard to church or party, and integration programmes for market women.",
  },
  {
    title: "Young people",
    body: "The yearly Mbaike Unity Football Cup, whose players have gone on to national and international clubs, alongside tools and start-up support for young traders and artisans.",
  },
];
export { workAreas };
