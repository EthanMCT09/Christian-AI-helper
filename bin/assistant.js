// Client-side, rule-based assistant module.
// Exposes `getResponse(input, options)` that returns an object:
// { supportMessage: string, bibleVerse?: string, safeNotice: string }

const topicData = {
  anxiety: {
    keywords: ["anx", "worry", "worried", "anxious", "stress", "stressed", "panic"],
    verses: ["Cast all your anxiety on him because he cares for you. — 1 Peter 5:7", "Do not be anxious about anything. — Philippians 4:6-7"]
  },
  grief: {
    keywords: ["grief", "grieve", "grieving", "loss", "lost", "bereave", "mour"],
    verses: ["The LORD is close to the brokenhearted. — Psalm 34:18", "Blessed are those who mourn, for they will be comforted. — Matthew 5:4"]
  },
  forgiveness: {
    keywords: ["forgive", "forgiveness", "guilt", "regret", "sorry"],
    verses: ["Be kind to one another, tenderhearted, forgiving one another. — Ephesians 4:32"]
  },
  doubt: {
    keywords: ["doubt", "doubtful", "uncertain", "question", "why", "believe"],
    verses: ["Lord, I believe; help my unbelief! — Mark 9:24"]
  },
  purpose: {
    keywords: ["purpose", "future", "calling", "meaning", "direction", "career"],
    verses: ["For I know the plans I have for you... to give you a future and a hope. — Jeremiah 29:11"]
  },
  love: {
    keywords: ["love", "relationship", "marry", "dating", "partner", "husband", "wife"],
    verses: ["Love is patient and kind... — 1 Corinthians 13:4-7"]
  },
  temptation: {
    keywords: ["tempt", "temptation", "sin", "struggle", "fall"],
    verses: ["God will not let you be tempted beyond what you can bear. — 1 Corinthians 10:13"]
  },
  general: {
    keywords: [],
    verses: ["The LORD bless you and keep you. — Numbers 6:24", "I will never leave you nor forsake you. — Hebrews 13:5"]
  }
}

function containsAny(text, arr){
  for(const s of arr){
    if(text.includes(s)) return true
  }
  return false
}

function detectTopic(input){
  const lower = input.toLowerCase()
  for(const t in topicData){
    if(topicData[t].keywords.length && containsAny(lower, topicData[t].keywords)) return t
  }
  return 'general'
}

function crisisDetected(input){
  const lower = input.toLowerCase()
  const crisis = ["suicide", "kill myself", "end my life", "hurt myself", "i can't go on", "i want to die", "self-harm"]
  return containsAny(lower, crisis)
}

export function getResponse(input, options = { showVerses: true, tone: 'gentle' }){
  // Always provide safe-response language and do NOT provide clinical advice.
  if(!input || !input.trim()){
    return {
      supportMessage: "I'm here whenever you want to share. You can tell me a bit about what's on your heart.",
      safeNotice: "I'm here to support you, but please reach out to a trusted adult, pastor, or mental-health professional if you're in danger or struggling deeply."
    }
  }

  if(crisisDetected(input)){
    return {
      supportMessage: "I'm really sorry — it sounds like you're in a crisis right now. I care about your safety and want you to get help.",
      bibleVerse: undefined,
      safeNotice: "If you're thinking about harming yourself, please contact local emergency services or a crisis hotline right away (for example, in the U.S. call 988). Reach out to a trusted adult, pastor, or professional — you don't have to face this alone."
    }
  }

  const topic = detectTopic(input)
  const data = topicData[topic] || topicData['general']

  // Tone/personalization
  const gentleOpeners = [
    "I’m so sorry you’re carrying that — thank you for telling me.",
    "That sounds heavy; I’m here with you.",
    "I hear you, and I want to sit with you through this."
  ]
  const encouragingOpeners = [
    "You’re not alone in this — God is with you and there's hope.",
    "I believe there is grace and help for this season. Let's take one step at a time.",
    "Hold on — good things can grow from hard seasons, and I'm here to encourage you." 
  ]

  const opener = options.tone === 'encouraging' ? encouragingOpeners[Math.floor(Math.random()*encouragingOpeners.length)] : gentleOpeners[Math.floor(Math.random()*gentleOpeners.length)]

  // Topic-specific supportive lines
  const topicLines = {
    anxiety: "When worries crowd your mind, try to breathe and bring each concern to God in prayer. Small steps help — one day, one prayer at a time.",
    grief: "I'm so sorry for your loss. It's okay to mourn. Let yourself feel and remember that God's comfort meets the brokenhearted.",
    forgiveness: "Grace meets us where we are. If you're carrying guilt, talk to God honestly — His forgiveness is wide and healing.",
    doubt: "Doubt can be part of growing faith; ask questions, seek prayer, and know it's okay to seek help as you wrestle honestly.",
    purpose: "You have worth and purpose. Pray for guidance, and take small steps toward what you're learning to love.",
    love: "Relationships are delicate — communicate gently, love well, and seek wisdom from God and trusted mentors.",
    temptation: "You don't have to walk this alone. Build supportive rhythms — prayer, community, and practical boundaries help.",
    general: "I'm here to encourage you — let's bring this to God together in prayer and seek small, practical next steps."
  }

  const supportLine = topicLines[topic] || topicLines['general']

  // Choose a verse if allowed
  let verse
  if(options.showVerses && data.verses && data.verses.length){
    verse = data.verses[Math.floor(Math.random()*data.verses.length)]
  }

  // Assemble final messages, keeping format: Support Message + optional Bible Verse + safeNotice
  const supportMessage = `${opener} ${supportLine} \n\nI'm here to support you, but please reach out to a trusted adult, pastor, or mental-health professional if you're in danger or struggling deeply.`

  return {
    supportMessage,
    bibleVerse: verse,
    safeNotice: "I'm here to support you, but please reach out to a trusted adult, pastor, or mental-health professional if you're in danger or struggling deeply."
  }
}

// Example usage (for dev):
// import { getResponse } from './assistant'
// console.log(getResponse('I am anxious about my future', {showVerses: true, tone: 'gentle'}))
