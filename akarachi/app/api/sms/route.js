import {
  allow,
  json,
  localPhone,
  readToken,
  refOk,
  sameOrigin,
  sendSms,
  tooMany,
} from "@/lib/server";
import { programmes } from "@/lib/content";

const PROGRAMME_NAMES = new Set(programmes.map((p) => p.name));
const TEMPLATES = {
  welcome: () =>
    "Welcome to the AAK Legacy Empowerment Portal. Choose a programme and apply at aaklegacy.org/portal. Applying is free.",
  submitted: ({ ref, programme }) =>
    `We have your ${programme} application, reference ${ref}. Track it at aaklegacy.org/portal/status. Nobody should ask you to pay.`,
  mentor: () =>
    "Your mentor request is in. You will be matched when your application is approved.",
};

export async function POST(req) {
  if (!sameOrigin(req)) return json({ error: "Request refused." }, 403);
  const body = await req.json().catch(() => ({}));
  const make = TEMPLATES[body.template];
  if (!make) return json({ error: "Unknown template." }, 400);
  // Only fixed wording reaches a phone: the reference and programme must be real values.
  if (
    body.template === "submitted" &&
    (!refOk(body.ref) || !PROGRAMME_NAMES.has(body.programme))
  )
    return json({ error: "Unknown application." }, 400);
  const preview = make(body);
  // Only the number that was verified with a code can be texted.
  const verified = readToken(body.session, "session");
  const mine = Boolean(verified) && verified.phone === localPhone(body.phone);
  if (mine && !(await allow(`sms:${verified.phone}`, 6, 3600)))
    return tooMany();
  const sent = mine ? await sendSms(body.phone, preview) : false;
  return json({ sent, preview });
}
