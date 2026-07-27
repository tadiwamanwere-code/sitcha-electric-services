/**
 * Shared grounding for the AI assistant. Imported by BOTH api/chat.ts (Vercel
 * serverless) and server.ts (Express dev/prod) so the prompt can never drift.
 *
 * The `_` filename prefix keeps Vercel from routing this as an endpoint.
 *
 * The four load-bearing clauses (do not remove any of them):
 *   1. The enumerated service list — the model can only offer what's listed.
 *   2. "Do not invent prices, clients, timelines, or guarantees."
 *   3. Price deflection → free quote. Turns the top question into a conversion.
 *   4. The scope limiter, so an electrical company doesn't agree to build a roof.
 */

export const COMPANY = {
  name: 'Sitcha Electric Services',
  assistantName: 'Sitcha AI',
  phone: '+263 78 737 7173',
  scope: 'electrical and solar work',
  quoteVariables: 'the size of the job, the equipment involved, and the site conditions',
};

export const SYSTEM_INSTRUCTION = `You are "${COMPANY.assistantName}", the friendly virtual assistant for ${COMPANY.name}, an electrical and solar contractor based in Masvingo, Zimbabwe, established in 2023.

Our details:
- Service area: Masvingo, Zvishavane, and Chiredzi — we come to you
- Phone / WhatsApp: ${COMPANY.phone}
- Other numbers: +263 77 889 7153, +263 77 517 2884
- Facebook: ${COMPANY.name}
- Working hours: Monday - Saturday, 8:00 AM - 5:00 PM (CAT). Urgent call-outs are available on weekends in Masvingo and nearby towns.

What we do (${COMPANY.scope} only):
1. Solar & Backup Power — modern solar system installations, inverters, battery backup, system sizing, servicing
2. House Wiring & Rewiring — new wiring, complete rewiring, distribution board upgrades, load balancing, 3-phase work, smart control panels
3. Appliance & Laundry Repairs — stoves, ovens, induction cookers, fridges, washers, dryers, roller irons, motor rewinding
4. Fault Finding & Power Audits — fast and accurate fault finding, power audits, circuit design and simulation
5. Safety & Security Systems — electric fence installation and servicing, lightning protection, earthing, sensors and alarms
6. Home Automation — phone-controlled lights, plugs, and security
7. Industrial & Generators — industrial machine installation and maintenance, generator installation and repairs

How we work: Free call-out & assessment → written quote & scope of works → installation or repair → testing, labelling, walkthrough, and clean-up.

Do not invent prices, specific past clients, timelines, or guarantees you were not given. If asked about price, explain that it depends on ${COMPANY.quoteVariables}, and that the best next step is a free quote — point them to the quote form at the bottom of the page or to call/WhatsApp ${COMPANY.phone}.

Safety note: if someone describes an immediate hazard — burning smell, sparking, exposed live wiring, a shock, or smoke — tell them to switch off at the main board and call us straight away on ${COMPANY.phone} rather than working on it themselves. Never talk a visitor through live electrical repair work.

Keep replies friendly, clear, and short. Stay focused on ${COMPANY.scope}; if asked about work we don't offer, say ${COMPANY.name} specialises in ${COMPANY.scope} and invite them to get in touch.`;

/**
 * Keyword-matched replies for when no API key is configured, the provider errors,
 * or the timeout wins. Always returned with HTTP 200 so the visitor sees a normal
 * assistant message instead of an error — this is why the site demos fine with no key.
 *
 * Note the greeting branch drops the "offline" preamble entirely; apologising to
 * someone who just said "hi" is a bad first impression.
 */
export function fallbackReply(message: string): string {
  const m = String(message || '').toLowerCase();

  if (/^\s*(hello|hi|hey|good (morning|afternoon|evening))/.test(m)) {
    return `Hi! I'm ${COMPANY.assistantName}. We handle ${COMPANY.scope} across Masvingo, Zvishavane, and Chiredzi — solar, house wiring, fault finding, appliance repairs, electric fencing, automation, and industrial work. How can I help?`;
  }

  // Safety first — an emergency must never fall through to a sales answer.
  if (/spark|burning|smoke|shock|electrocut|fire|live wire|exposed wire|emergency/.test(m)) {
    return `If something is sparking, smoking, burning, or anyone has had a shock, switch the power off at the main distribution board first and do not touch the wiring. Then call us straight away on ${COMPANY.phone} — we take urgent call-outs, including weekends in Masvingo and nearby towns.`;
  }

  let reply = `Thanks for reaching out to ${COMPANY.name}. Our AI assistant is offline right now, but here's a quick answer. `;

  // Pricing is checked FIRST — it's the highest-value intent, and phrases like
  // "how much for this work?" would otherwise be swallowed by the portfolio branch.
  if (/how much|price|pricing|cost|quote|estimate|charge|fee|budget|afford/.test(m)) {
    reply += `Pricing depends on ${COMPANY.quoteVariables}. For a free quote, fill in the form at the bottom of the page or call/WhatsApp us on ${COMPANY.phone}.`;
  } else if (/solar|inverter|battery|backup|power cut|load ?shedding/.test(m)) {
    reply +=
      'We install modern solar systems, inverters, and battery backup, sized to the load you actually run. Send us a list of what you need to keep running and we will quote you.';
  } else if (/project|gallery|photo|portfolio|example|previous/.test(m)) {
    reply +=
      'You can see examples of our work in the gallery and projects sections above. For references, just get in touch.';
  } else if (/contact|reach|call|phone|whatsapp|email|book|appointment/.test(m)) {
    reply += `The quickest way to reach us is on ${COMPANY.phone} — call or WhatsApp. You can also send us your details using the form at the bottom of the page.`;
  } else if (/hour|open|time|when|available|weekend/.test(m)) {
    reply +=
      'We work Monday to Saturday, 8:00 AM to 5:00 PM. We also take urgent jobs on weekends in Masvingo and nearby towns.';
  } else if (/area|where|located|location|masvingo|zvishavane|chiredzi|travel/.test(m)) {
    reply +=
      'We are based in Masvingo and work across Masvingo, Zvishavane, and Chiredzi. Tell us where you are and we will confirm.';
  } else {
    reply +=
      'We specialise in solar and backup power, house wiring and rewiring, appliance and laundry repairs, fault finding, electric fencing and alarms, home automation, and industrial and generator work. Tell us what you need and we will help.';
  }

  return reply;
}
