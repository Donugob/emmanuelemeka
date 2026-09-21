import type { APIRoute } from "astro";
import {
  identity,
  contact,
  profile,
  experience,
  education,
  research,
  leadership,
  skills,
  media,
  availability,
  sections,
} from "../data/cv";

/**
 * `/llms.txt` — the CV as plain markdown, for language models and answer
 * engines that would rather read text than parse markup.
 *
 * It is generated from `src/data/cv.ts` at build time rather than written by
 * hand, so it cannot drift from the page. The phone number is omitted for the
 * same reason it is absent from the structured data: this is the most scraped
 * surface the site has.
 */
function build(): string {
  const out: string[] = [];
  const h = (level: number, text: string) => out.push(`${"#".repeat(level)} ${text}`, "");
  // Heading text comes from the same list the page uses, so the plain-text CV
  // and the website never name their sections differently.
  const label = (id: string) => sections.find((section) => section.id === id)?.label ?? "";

  h(1, `${identity.fullName} — ${identity.moniker}`);
  out.push(`> ${identity.headline}. ${identity.standing}.`, "");
  out.push(profile, "");

  out.push(`- Website: https://${identity.domain}`);
  out.push(`- Email: ${contact.email}`);
  out.push(`- X: ${contact.x.href}`);
  out.push(`- Flagship product: ${contact.product.href}`);
  out.push("");

  h(2, label("experience"));
  for (const role of experience) {
    out.push(`### ${role.title} — ${role.org}`);
    out.push(`${role.period}. ${role.location}.`, "");
    out.push(role.summary, "");
    for (const bullet of role.bullets) out.push(`- ${bullet}`);
    if (role.metrics?.length) {
      out.push("");
      out.push(role.metrics.map((m) => `${m.value} ${m.label}`).join("; ") + ".");
    }
    if (role.orgUrl) out.push("", `Site: ${role.orgUrl}`);
    out.push("");
  }

  h(2, label("education"));
  out.push(`### ${education.degree}`);
  out.push(`${education.distinction}. ${education.institution}. ${education.period}.`, "");
  out.push("### Specialized research");
  out.push(`**${research.title}**`, "");
  out.push(research.body, "");
  out.push(`Core competencies: ${research.competencies.join(", ")}.`, "");
  out.push(`Related topics: ${research.related.join("; ")}.`, "");

  h(2, label("leadership"));
  for (const position of leadership) {
    out.push(`- **${position.title}**, ${position.org} (${position.period}) — ${position.note}`);
  }
  out.push("");

  h(2, label("skills"));
  for (const group of skills) {
    out.push(`- **${group.title}:** ${group.items.join(", ")}`);
  }
  out.push("");

  h(2, label("media"));
  for (const channel of media) {
    out.push(`- **${channel.name}** — ${channel.role}, ${channel.platform}. ${channel.blurb}`);
  }
  out.push("");

  h(2, label("contact"));
  out.push(`Email ${contact.email}. Located in Owerri, Imo State, Nigeria.`, "");
  out.push(`Available for: ${availability.join("; ")}.`, "");
  out.push("References available on request.", "");
  out.push("---", "");
  out.push(`Full CV: https://${identity.domain}  ·  PDF: https://${identity.domain}/cv/Emeka-Emmanuel-Ugonna-CV.pdf`);

  return out.join("\n") + "\n";
}

export const GET: APIRoute = () =>
  new Response(build(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
