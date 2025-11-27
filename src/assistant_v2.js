// Improved client-side assistant with multi-turn awareness and deeper empathy.
// Use `getResponse(input, options, context)` to get structured responses.

const topicData = {
  anxiety: {
    keywords: ["anx", "worry", "worried", "anxious", "stress", "stressed", "panic"],
    verses: ["Cast all your anxiety on him because he cares for you. — 1 Peter 5:7", "Do not be anxious about anything. — Philippians 4:6-7"]
  },
  loneliness: {
    keywords: ["alone", "lonely", "isolated", "nobody", "no one"],
    verses: ["The LORD is near to the brokenhearted and saves the crushed in spirit. — Psalm 34:18", "I will never leave you nor forsake you. — Hebrews 13:5"]
  },
  grief: {
    keywords: ["grief", "grieve", "grieving", "loss", "lost", "bereave", "mour"],
    verses: ["The LORD is close to the brokenhearted. — Psalm 34:18", "Blessed are those who mourn, for they will be comforted. — Matthew 5:4"]
  },
  depression: {
    keywords: ["depress", "hopeless", "worthless", "can't go on", "no hope", "suicid"],
    verses: ["The LORD is my shepherd; I shall not want. — Psalm 23:1", "Come to me, all who labor and are heavy laden, and I will give you rest. — Matthew 11:28"]
  },
  forgiveness: {
    keywords: ["forgive", "forgiveness", "guilt", "regret", "sorry"],
    verses: ["Be kind to one another, tenderhearted, forgiving one another. — Ephesians 4:32", "If we confess our sins, he is faithful and just to forgive us... — 1 John 1:9"]
  },
  doubt: {
    keywords: ["doubt", "doubtful", "uncertain", "question", "why", "believe"],
    verses: ["Lord, I believe; help my unbelief! — Mark 9:24", "If any of you lacks wisdom, let him ask God. — James 1:5"]
  },
  anger: {
    keywords: ["angry", "anger", "mad", "hate", "furious"],
    verses: ["Be angry and do not sin; do not let the sun go down on your anger. — Ephesians 4:26", "A soft answer turns away wrath. — Proverbs 15:1"]
  },
  purpose: {
    keywords: ["purpose", "future", "calling", "meaning", "direction", "career"],
    verses: ["For I know the plans I have for you... to give you a future and a hope. — Jeremiah 29:11", "Trust in the Lord with all your heart. — Proverbs 3:5-6"]
  },
  finances: {
    keywords: ["money", "bills", "debt", "finance", "jobless", "unemployed"],
    verses: ["And my God will supply every need of yours according to his riches in glory in Christ Jesus. — Philippians 4:19", "Do not be anxious about your life... — Matthew 6:25"]
  },
  love: {
    keywords: ["love", "relationship", "marry", "dating", "partner", "husband", "wife"],
    verses: ["Love is patient and kind... — 1 Corinthians 13:4-7", "Greater love has no one than this... — John 15:13"]
  },
  temptation: {
    keywords: ["tempt", "temptation", "sin", "struggle", "fall"],
    verses: ["God will not let you be tempted beyond what you can bear. — 1 Corinthians 10:13", "Watch and pray that you may not enter into temptation. — Matthew 26:41"]
  },
  general: {
    keywords: [],
    verses: ["The LORD bless you and keep you. — Numbers 6:24", "Be strong and courageous. — Joshua 1:9", "I will never leave you nor forsake you. — Hebrews 13:5"]
  }
}

function containsAny(text, arr){
  if(!text) return false
  const lower = text.toLowerCase()
  for(const s of arr){
    if(s && lower.includes(s)) return true
  }
  return false
}

function detectTopic(input, context = []){
  const lower = (input || '').toLowerCase();
  // Check current input first
  for(const t in topicData){
    if(topicData[t].keywords.length && containsAny(lower, topicData[t].keywords)) return t
  }
  // Inspect recent user messages in context for a continuing topic
  if(Array.isArray(context) && context.length){
    for(let i = context.length - 1; i >= 0; i--){
      const m = context[i]
      if(m.role === 'user'){
        const txt = (m.content || '').toLowerCase()
        for(const t in topicData){
          if(topicData[t].keywords.length && containsAny(txt, topicData[t].keywords)) return t
        }
      }
    }
  }
  return 'general'
}

function crisisDetected(input){
  const lower = (input || '').toLowerCase()
  const crisis = ["suicide", "kill myself", "end my life", "hurt myself", "i can't go on", "i want to die", "self-harm"]
  return containsAny(lower, crisis)
}

export function getResponse(input, options = { showVerses: true, tone: 'gentle' }, context = []){
  // Safe defaults
  if(!input || !input.trim()){
    return {
      supportMessage: "I'm here whenever you want to share. You can tell me a bit about what's on your heart.",
      safeNotice: "I'm here to support you, but please reach out to a trusted adult, pastor, or mental-health professional if you're in danger or struggling deeply."
    }
  }

  if(crisisDetected(input)){
    return {
      supportMessage: "I'm really sorry — it sounds like you're in a crisis right now. I care deeply about your safety and want you to get help.",
      bibleVerse: undefined,
      safeNotice: "If you're thinking about harming yourself, please contact local emergency services or a crisis hotline right away (for example, in the U.S. call 988). Reach out to a trusted adult, pastor, or professional — you don't have to face this alone.",
      followUp: "Would you like me to help you find local crisis resources or draft a short message to send to someone you trust?"
    }
  }

  const topic = detectTopic(input, context)
  const data = topicData[topic] || topicData['general']

  // Tone and reflective listening
  const gentleOpeners = [
    "I’m so sorry you’re carrying that — thank you for sharing this with me.",
    "That sounds really heavy; I’m here with you and I care about what you’re going through.",
    "I hear how much this is weighing on you. You’re not alone in this."
  ]
  const encouragingOpeners = [
    "You’re not alone in this — God is with you and there is hope even in hard seasons.",
    "I believe there is grace and help for this season. Let’s look at one gentle next step together.",
    "Hold on — good things can grow from hard seasons, and I’m here to encourage you every step."
  ]
  const opener = options.tone === 'encouraging' ? encouragingOpeners[Math.floor(Math.random()*encouragingOpeners.length)] : gentleOpeners[Math.floor(Math.random()*gentleOpeners.length)]

  // Supportive lines and follow-ups
  const topicLines = {
    anxiety: {
      line: "When worries crowd your mind, try naming one thing you can control and one small step you can take. Bring the rest to God in prayer.",
      followUp: "Would you like to list a few small steps together?"
    },
    loneliness: {
      line: "Feeling alone can be so hard. You matter, and God sees you. If you can, reach out to one person or a local church group — small connections help.",
      followUp: "Would you like help composing a short message to someone you trust?"
    },
    grief: {
      line: "I’m deeply sorry for your loss. Grief takes time; allow yourself to feel and rest. God's comfort comes even in small moments.",
      followUp: "Would you like a short prayer I can offer with you?"
    },
    depression: {
      line: "When the weight feels too much, small steady steps—like reaching out to one trusted person—can matter. You don’t have to carry this alone.",
      followUp: "If you're open, tell me what helps you feel even a little lighter at times."
    },
    forgiveness: {
      line: "God's grace is bigger than our mistakes. Speak honestly to the Lord and consider asking a trusted believer for prayer and guidance.",
      followUp: "Would you like a short scripture-based affirmation to pray?"
    },
    doubt: {
      line: "Doubt is part of many people's faith journey. Bring your questions to God and to trusted guides—faith can grow through honest searching.",
      followUp: "Would you like passages that speak into doubt and faith?"
    },
    anger: {
      line: "Anger shows something matters to you. It's okay to feel it—try a moment of calm, then consider a constructive next step.",
      followUp: "Would you like a quick grounding exercise to help calm your body?"
    },
    purpose: {
      line: "You have a story and gifts. Pray for clarity, try one curious step, and trust God with the long view.",
      followUp: "Would you like scripture suggestions about calling and purpose?"
    },
    finances: {
      line: "Financial stress is heavy. Pray and reach out to practical supports—church, local services, or a trusted mentor can help with concrete steps.",
      followUp: "Would you like a simple budgeting checklist or ideas for local support?"
    },
    love: {
      line: "Relationships can be complicated. Pray for wisdom, set healthy boundaries, and seek counsel from mature believers when needed.",
      followUp: "Would you like a compassionate script to start a difficult conversation?"
    },
    temptation: {
      line: "You don't have to face temptation alone — build rhythms of prayer, accountability, and safe boundaries.",
      followUp: "Would you like practical accountability ideas or a short prayer?"
    },
    general: {
      line: "I'm here to encourage you — let's bring this to God and pick one small, practical next step together.",
      followUp: "Would you like a short prayer or scripture to reflect on?"
    }
  }

  const chosen = topicLines[topic] || topicLines['general']

  // Pick a verse when allowed
  let verse = undefined
  if(options.showVerses && data.verses && data.verses.length){
    verse = data.verses[Math.floor(Math.random()*data.verses.length)]
  }

  return {
    supportMessage: `${opener} ${chosen.line}`,
    bibleVerse: verse,
    safeNotice: "I'm here to support you, but please reach out to a trusted adult, pastor, or mental-health professional if you're in danger or struggling deeply.",
    followUp: chosen.followUp
  }
}

// export default to allow simple imports
export default { getResponse }
