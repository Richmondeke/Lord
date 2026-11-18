import { connected, db, json } from "@/lib/server";

const PROGRAMME = {
  jamb: "Free JAMB registration",
  equipment: "Empowerment equipment",
  scholar: "Scholarship",
};
const clean = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export async function POST(req) {
  const { name } = await req.json().catch(() => ({}));
  const words = clean(name).split(" ").filter(Boolean);
  if (words.length < 2 || words.some((w) => w.length < 3))
    return json(
      {
        error: "Enter a first name and a surname, three letters or more each.",
      },
      400,
    );
  if (!connected) return json({ matches: [] });

  // Every word must appear in the name, in any order. Only limited fields leave the server.
  let q = db()
    .from("register")
    .select("kind, programme, year, name, ward, community, detail, phone")
    .limit(10);
  for (const w of words.slice(0, 4)) q = q.ilike("name_key", `%${w}%`);
  const { data, error } = await q;
  if (error)
    return json(
      { error: "The register could not be searched. Try again." },
      500,
    );
  return json({
    matches: (data ?? []).map((r) => ({
      kind: r.kind,
      programme: r.programme || PROGRAMME[r.kind],
      year: r.year,
      name: r.name,
      ward: r.ward,
      place: [r.community, r.ward].filter(Boolean).join(", "),
      detail: r.detail,
      phoneEnding: r.phone ? String(r.phone).replace(/\D/g, "").slice(-2) : "",
    })),
  });
}
