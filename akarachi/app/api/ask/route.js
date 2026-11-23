import Anthropic from "@anthropic-ai/sdk";
import { CONTEXT, NO_ANSWER, matchAnswer } from "@/lib/kb";
import { allow, clientIp, json } from "@/lib/server";

const SYSTEM = `You answer questions on the website of Hon. Engr. Akarachi Etinosa Amadi, Member of the House of Representatives for Mbaitoli/Ikeduru, Imo State, and his constituency Empowerment Portal.

Answer only from the published facts below. If the answer is not there, reply exactly: "${NO_ANSWER}"
Never invent figures, dates, names or promises. Applying for a programme is free; never suggest anyone pay.
Reply in plain English, in at most four short sentences, without markdown.

PUBLISHED FACTS
${CONTEXT}`;

export async function POST(req) {
  const { question, history } = await req.json().catch(() => ({}));
  const q = String(question || "")
    .trim()
    .slice(0, 500);
  if (!q) return json({ answer: NO_ANSWER, source: "kb" });
  const fallback = matchAnswer(q);

  if (!process.env.ANTHROPIC_API_KEY)
    if (!(await allow(`ask:${clientIp(req)}`, 20, 600)))
      // AI answers cost money; past the limit, fall back to the keyword answers.
      return json({ ...fallback, source: "kb" });
  return json({ ...fallback, source: "kb" });

  try {
    const client = new Anthropic();
    const past = (Array.isArray(history) ? history : [])
      .slice(-8)
      .filter((m) => (m.role === "user" || m.role === "assistant") && m.text)
      .map((m) => ({ role: m.role, content: String(m.text).slice(0, 2000) }));
    const response = await client.beta.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-opus-5-5",
      max_tokens: 1024,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      cache_control: { type: "ephemeral" },
      system: SYSTEM,
      messages: [...past, { role: "user", content: q }],
    });
    if (response.stop_reason === "refusal")
      return json({ ...fallback, source: "kb" });
    const answer = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();
    // Keep the keyword match's link so the reply can still point to the right page.
    return json({
      answer: answer || NO_ANSWER,
      link: fallback.link,
      source: "ai",
    });
  } catch (error) {
    if (error instanceof Anthropic.APIError)
      console.error("ask:", error.status, error.message);
    else console.error("ask:", error);
    return json({ ...fallback, source: "kb" });
  }
}
