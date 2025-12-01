/**
 * Quick test of FaithGPT responses
 */

// Import the faithgpt module (for Node.js)
const faithgpt = {
  topics: {
    mentalHealth: {
      anxiety: {
        keywords: ["anx", "worry", "worried", "anxious", "stress", "stressed", "panic", "fear"],
        verses: [
          "Cast all your anxiety on him because he cares for you. — 1 Peter 5:7",
          "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. — Philippians 4:6"
        ],
        opener: "I hear your worries, and I want you to know you're not alone in this. God cares deeply about what you're going through."
      },
      loneliness: {
        keywords: ["alone", "lonely", "isolated", "nobody", "no one"],
        verses: [
          "I will never leave you nor forsake you. — Hebrews 13:5"
        ],
        opener: "I'm so glad you shared this with me. Loneliness can feel overwhelming, but you are valued and loved by God."
      },
      depression: {
        keywords: ["depress", "hopeless", "worthless", "can't go on"],
        verses: [
          "The LORD is my shepherd; I shall not want. — Psalm 23:1"
        ],
        opener: "I'm truly sorry you're feeling this way. What you're experiencing matters, and God's compassion is endless."
      }
    },
    faith: {
      doubts: {
        keywords: ["doubt", "doubtful", "uncertain", "question", "why", "believe"],
        verses: [
          "Lord, I believe; help my unbelief! — Mark 9:24",
          "If any of you lacks wisdom, let him ask God. — James 1:5"
        ],
        examples: {
          abraham: "Abraham doubted God's promise of a son, yet God fulfilled it.",
          thomas: "Thomas doubted Jesus' resurrection until he saw Him."
        }
      }
    }
  },

  detectIntent(userInput) {
    const lower = userInput.toLowerCase();
    
    // Crisis detection
    if (["suicide", "kill myself", "end my life", "hurt myself"].some(phrase => lower.includes(phrase))) {
      return { intent: "crisis", severity: "critical" };
    }
    
    // Mental health
    for (const [key, topic] of Object.entries(this.topics.mentalHealth)) {
      if (topic.keywords.some(kw => lower.includes(kw))) {
        return { intent: "mentalHealth", topic: key };
      }
    }
    
    // Faith questions
    for (const [key, topic] of Object.entries(this.topics.faith)) {
      if (topic.keywords.some(kw => lower.includes(kw))) {
        return { intent: "faith", topic: key };
      }
    }
    
    // Music or preaching
    if (lower.includes("music") || lower.includes("worship")) return { intent: "music" };
    if (lower.includes("sermon") || lower.includes("preach")) return { intent: "preaching" };
    
    // Greeting
    if (["hello", "hi", "hey"].some(g => lower.includes(g))) return { intent: "greeting" };
    
    return { intent: "general" };
  },

  getResponse(userInput) {
    const detected = this.detectIntent(userInput);
    console.log(`[Detected Intent: ${detected.intent}${detected.topic ? ' - ' + detected.topic : ''}]\n`);

    if (detected.intent === "greeting") {
      return "Hello! How are you doing today? Is there anything on your heart I can help with?";
    } else if (detected.intent === "crisis") {
      return "I'm truly concerned. If you're in immediate danger, please call 988 (Suicide Prevention Lifeline) or go to the nearest emergency room. Your life has value.";
    } else if (detected.intent === "mentalHealth") {
      const data = this.topics.mentalHealth[detected.topic];
      return `${data.opener}\n\nBible Verse:\n"${data.verses[0]}"\n\nI encourage you to reach out to a trusted friend, pastor, or counselor. You are not alone.`;
    } else if (detected.intent === "faith") {
      const data = this.topics.faith[detected.topic];
      return `Your question is beautiful and important.\n\nBible Verses:\n${data.verses.join('\n')}\n\nBiblical Examples:\n${Object.entries(data.examples).map(([p, e]) => `• ${p}: ${e}`).join('\n')}\n\nWould you like to explore this further?`;
    } else if (detected.intent === "music") {
      return "Christian worship music can deeply touch your heart. I recommend:\n• Hillsong Worship\n• Bethel Music\n• Jesus Culture\n\nListen with an open heart.";
    } else {
      return "Thank you for your question. God's Word offers wisdom for every situation. How can I support you further?";
    }
  }
};

// Test cases
const testInputs = [
  "Hello, how are you?",
  "I'm feeling really anxious about my future",
  "I feel so alone and lonely",
  "I have doubts about God's existence",
  "Can you recommend Christian worship music?",
  "I'm struggling with depression",
  "What should I pray about?",
  "I'm having thoughts of suicide"
];

console.log("=".repeat(60));
console.log("FaithGPT Response Testing");
console.log("=".repeat(60) + "\n");

testInputs.forEach((input, idx) => {
  console.log(`Test ${idx + 1}: "${input}"`);
  const response = faithgpt.getResponse(input);
  console.log(`Response:\n${response}\n`);
  console.log("-".repeat(60) + "\n");
});

console.log("✓ FaithGPT test complete!");
