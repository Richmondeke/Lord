import { json, localPhone, readToken, sendSms } from "@/lib/server";

const TEMPLATES = {
  welcome: () =>
    "Welcome to the Akarachi Empowerment Portal. Choose a programme and apply at aaklegacy.org/portal. Applying is free.",
  submitted: ({ ref, programme }) =>
    `We have your ${programme || "programme"} application, reference ${ref}. Track it at aaklegacy.org/portal/status. Nobody should ask you to pay.`,
  mentor: () =>
    "Your mentor request is in. You will be matched when your application is approved.",
};

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const make = TEMPLATES[body.template];
  if (!make) return json({ error: "Unknown template." }, 400);
  const preview = make(body);
  // Only numbers verified with a code can be texted.
  const verified = readToken(body.session, "session");
  const sent =
    verified && verified.phone === localPhone(body.phone)
      ? await sendSms(body.phone, preview)
      : false;
  return json({ sent, preview });
}
