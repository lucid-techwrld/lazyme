// ─── Rest-period quotes ────────────────────────────────────────────────────
// Add, edit, or remove freely. One is picked randomly each rest phase.

export const REST_QUOTES: string[] = [
  "Rest. You've earned it. (You did 15 seconds of work.)",
  "Breathe. Your ancestors survived worse. Probably.",
  "This is rest, not a nap. Although — no. Stay awake.",
  "Hydrate. You're basically a fancy, dehydrated houseplant.",
  "The next exercise is watching you from the shadows. It's patient.",
  "Fun fact: resting is still exercise if you believe hard enough. (It's not.)",
  "Scientists confirm 45 seconds of rest burns exactly zero calories. You're welcome.",
  "Your couch is rooting for you to come back. Ignore it.",
  "Rest period: the only medically valid reason to check your phone.",
  "You've done more exercise than 80% of people today. It's 6am.",
  "Your future self just sent a thank-you note. It looked annoyingly smug.",
  "Catch your breath. It ran away but it's not very fast.",
  "If this were easy, everyone would do it. Most people don't. You're not most people.",
  "The hardest part is starting. You already started. Congrats, overachiever.",
  "40 more seconds of rest. That's approximately 37 more than you need.",
]

export function getRandomQuote(): string {
  return REST_QUOTES[Math.floor(Math.random() * REST_QUOTES.length)]
}
