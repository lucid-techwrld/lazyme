export type WorkoutState = 'idle' | 'work' | 'rest' | 'complete'

export interface Exercise {
  id: string
  minute: number
  name: string
  workDuration: number   // seconds of active work
  restDuration: number   // explicit rest seconds (0 = rep-based, fills the minute)
  repCount?: number
  cue: string            // snarky coaching cue shown during work
  emoji: string
  // ↓ Swap this URL for a real GIF / <video> src / Lottie JSON path later
  mediaUrl: string
}

export const EXERCISES: Exercise[] = [
  {
    id: 'fingertip-plank',
    minute: 1,
    name: 'Kneeling Fingertip Plank',
    workDuration: 15,
    restDuration: 45,
    cue: 'Fingertips only — let your forearms question every life choice',
    emoji: '🤌',
    mediaUrl: 'https://placehold.co/320x200/fce7f3/be185d?font=open-sans&text=Fingertip+Plank',
  },
  {
    id: 'push-ups',
    minute: 2,
    name: '5 Push-ups',
    workDuration: 60,
    restDuration: 0,
    repCount: 5,
    cue: 'Chest to floor. Gravity is non-negotiable, unfortunately.',
    emoji: '💪',
    mediaUrl: 'https://placehold.co/320x200/fce7f3/be185d?font=open-sans&text=Push-ups',
  },
  {
    id: 'squats',
    minute: 3,
    name: '10 Bodyweight Squats',
    workDuration: 60,
    restDuration: 0,
    repCount: 10,
    cue: 'Sit into it like your invisible chair just betrayed you',
    emoji: '🏋️',
    mediaUrl: 'https://placehold.co/320x200/fce7f3/be185d?font=open-sans&text=Squats',
  },
  {
    id: 'forearm-plank',
    minute: 4,
    name: 'Forearm Plank',
    workDuration: 20,
    restDuration: 40,
    cue: 'Flat back, tight core, thousand-yard stare — perfect.',
    emoji: '😤',
    mediaUrl: 'https://placehold.co/320x200/fce7f3/be185d?font=open-sans&text=Forearm+Plank',
  },
  {
    id: 'superman-pulses',
    minute: 5,
    name: '10 Superman Pulses',
    workDuration: 60,
    restDuration: 0,
    repCount: 10,
    cue: 'Arms and legs up — you ARE a superhero (results may vary)',
    emoji: '🦸',
    mediaUrl: 'https://placehold.co/320x200/fce7f3/be185d?font=open-sans&text=Superman+Pulses',
  },
]
