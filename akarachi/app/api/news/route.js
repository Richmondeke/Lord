import { connected, db, json } from "@/lib/server";

export const revalidate = 300;

export async function GET() {
  if (!connected) return json({ stories: null });
  const { data } = await db()
    .from("news")
    .select("*")
    .eq("published", true)
    .order("published_on", { ascending: false })
    .limit(12);
  if (!data?.length) return json({ stories: null });
  return json({
    stories: data.map((n) => ({
      tag: n.tag,
      title: n.title,
      dek: n.dek,
      url: n.url || "",
      outlet: n.outlet,
      date: new Date(n.published_on).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      }),
    })),
  });
}
