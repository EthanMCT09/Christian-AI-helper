/**
 * FaithGPT - Comprehensive Christian AI Assistant
 * Handles: mental health, faith questions, media recommendations, preaching, and general Christian Q&A
 */

export const faithgpt = {
  // Topic categories and detection
  topics: {
    mentalHealth: {
      anxiety: {
        keywords: ["anx", "worry", "worried", "anxious", "stress", "stressed", "panic", "fear"],
        verses: [
          "Cast all your anxiety on him because he cares for you. — 1 Peter 5:7",
          "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. — Philippians 4:6",
          "Therefore do not worry about tomorrow, for tomorrow will worry about itself. — Matthew 6:34"
        ],
        opener: "I hear your worries, and I want you to know you're not alone in this. God cares deeply about what you're going through."
      },
      loneliness: {
        keywords: ["alone", "lonely", "isolated", "nobody", "no one", "feel alone"],
        verses: [
          "I will never leave you nor forsake you. — Hebrews 13:5",
          "The LORD is near to the brokenhearted and saves the crushed in spirit. — Psalm 34:18",
          "Come to me, all you who are weary and burdened, and I will give you rest. — Matthew 11:28"
        ],
        opener: "I'm so glad you shared this with me. Loneliness can feel overwhelming, but you are valued and loved by God."
      },
      depression: {
        keywords: ["depress", "hopeless", "worthless", "can't go on", "no hope", "dark", "empty"],
        verses: [
          "The LORD is my shepherd; I shall not want. — Psalm 23:1",
          "Why are you downcast, O my soul? Put your hope in God, for I will yet praise him. — Psalm 42:11",
          "Weeping may stay for the night, but rejoicing comes in the morning. — Psalm 30:5"
        ],
        opener: "I'm truly sorry you're feeling this way. What you're experiencing matters, and God's compassion is endless."
      },
      grief: {
        keywords: ["grief", "grieve", "grieving", "loss", "lost", "bereave", "mour", "died", "death"],
        verses: [
          "The LORD is close to the brokenhearted and saves the crushed in spirit. — Psalm 34:18",
          "Blessed are those who mourn, for they will be comforted. — Matthew 5:4",
          "Jesus wept. — John 11:35"
        ],
        opener: "My heart truly aches for you. Loss is profound, and your grief is valid. God holds you in this pain."
      },
      guilt: {
        keywords: ["forgive", "forgiveness", "guilt", "regret", "sorry", "shame", "sin"],
        verses: [
          "If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness. — 1 John 1:9",
          "Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you. — Ephesians 4:32",
          "There is therefore now no condemnation for those who are in Christ Jesus. — Romans 8:1"
        ],
        opener: "I can feel the weight of what you're carrying. Know that God's grace is greater than any mistake."
      },
      anger: {
        keywords: ["angry", "anger", "mad", "hate", "furious", "rage"],
        verses: [
          "In your anger do not sin. Do not let the sun go down while you are still angry. — Ephesians 4:26",
          "A soft answer turns away wrath, but a harsh word stirs up anger. — Proverbs 15:1",
          "Get rid of all bitterness, rage and anger, brawling and slander, and every form of malice. — Ephesians 4:31"
        ],
        opener: "Your anger is understandable, and it's okay to feel it. Let's explore how to process it in a healthy way."
      },
      relationships: {
        keywords: ["relationship", "boyfriend", "girlfriend", "marriage", "dating", "husband", "wife", "partner", "divorce", "cheated"],
        verses: [
          "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. — 1 Corinthians 13:4",
          "Husbands, love your wives, just as Christ loved the church. — Ephesians 5:25",
          "Submit to one another out of reverence for Christ. — Ephesians 5:21"
        ],
        opener: "Relationships can be so complicated and painful. I'm here to listen and support you through this."
      },
      purpose: {
        keywords: ["purpose", "future", "calling", "meaning", "direction", "career", "job", "lost"],
        verses: [
          "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope. — Jeremiah 29:11",
          "Trust in the LORD with all your heart and lean not on your own understanding. — Proverbs 3:5-6",
          "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters. — Colossians 3:23"
        ],
        opener: "Searching for meaning and direction is a sacred journey. God has plans for you that are full of hope."
      },
      exhaustion: {
        keywords: ["tired", "exhausted", "burn out", "weak", "strength", "power"],
        verses: [
          "But they who wait for the LORD shall renew their strength; they shall mount up with wings like eagles. — Isaiah 40:31",
          "I can do all things through him who strengthens me. — Philippians 4:13",
          "Come to me, all you who are weary and burdened, and I will give you rest. — Matthew 11:28"
        ],
        opener: "Exhaustion is real, and it's okay to feel spent. God offers rest and renewal for your weary soul."
      }
    },
    faith: {
      doubts: {
        keywords: ["doubt", "doubtful", "uncertain", "question", "why", "believe", "faith", "don't believe"],
        verses: [
          "Lord, I believe; help my unbelief! — Mark 9:24",
          "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault. — James 1:5",
          "Now we see only a reflection as in a mirror; then we shall see face to face. — 1 Corinthians 13:12"
        ],
        examples: {
          abraham: "Abraham doubted God's promise of a son, yet God fulfilled it. Your doubts don't disqualify you from faith.",
          thomas: "Thomas doubted Jesus' resurrection until he saw Him. Jesus still honored his faith journey.",
          peter: "Peter doubted and sank into the sea, yet Jesus caught him. Doubt doesn't mean abandon.",
          job: "Job questioned God's goodness in suffering, yet God restored him abundantly."
        }
      },
      god: {
        keywords: ["who is god", "what is god", "god exist", "god real", "know god", "meet god"],
        verses: [
          "In the beginning God created the heavens and the earth. — Genesis 1:1",
          "Now we see only a reflection as in a mirror; then we shall see face to face. — 1 Corinthians 13:12",
          "God is love. Whoever lives in love lives in God, and God in them. — 1 John 4:16"
        ],
        explanation: "God is the Creator and source of all goodness. He desires a personal relationship with you through Jesus Christ."
      },
      salvation: {
        keywords: ["salvation", "save", "jesus", "christ", "born again", "repent"],
        verses: [
          "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. — John 3:16",
          "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved. — Romans 10:9"
        ],
        explanation: "Salvation comes through believing in Jesus Christ as your Lord and Savior. It's a gift of grace, not earned but freely given."
      },
      prayer: {
        keywords: ["how to pray", "pray", "prayer", "talk to god"],
        verses: [
          "And when you pray, do not be like the hypocrites... But when you pray, go into your room, close the door and pray to your Father in secret. — Matthew 6:6",
          "The prayer of a righteous person is powerful and effective. — James 5:16"
        ],
        explanation: "Prayer is simply talking to God. Be honest, vulnerable, and real. God listens to every word of your heart."
      }
    },
    media: {
      music: {
        keywords: ["music", "song", "sing", "worship", "praise", "hymn", "christian music"],
        videos: [
          { title: "Worship & Praise - Popular Christian Songs", url: "https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf" },
          { title: "Hillsong Worship - Best Songs", url: "https://www.youtube.com/playlist?list=PLN0HlLPT_vx8r-6dKJJWGLeWf_1RnIZAJ" },
          { title: "Bethel Music - Spontaneous Worship", url: "https://www.youtube.com/playlist?list=PLN0HlLPT_vx8FVqAzd1JJKvjWgQghxXYV" },
          { title: "Jesus Culture - All Songs", url: "https://www.youtube.com/playlist?list=PLjE--F6WnZvLPVXMnJzFj9q9xLtHDRwLT" },
          { title: "Elevation Worship - Every Song", url: "https://www.youtube.com/playlist?list=PL2R8l3cHJW7Kf5fHLNLkzaYbCrKfEFQHv" }
        ]
      },
      preaching: {
        keywords: ["preach", "sermon", "pastor", "teaching", "word", "message"],
        videos: {
          long: [
            { title: "TD Jakes - Full Sermons", url: "https://www.youtube.com/playlist?list=PLrAXtmErZgOczlfVq5qE9e3vKDFIHKf_b" },
            { title: "Joyce Meyer - Full Teachings", url: "https://www.youtube.com/playlist?list=PLN0HlLPT_vx9g1_0RxOHCcRQ2r5KGxBqH" },
            { title: "John MacArthur - Sermons & Teaching", url: "https://www.youtube.com/user/JohnMacArthurMP4/videos" },
            { title: "Priscilla Shirer - Full Sermons", url: "https://www.youtube.com/playlist?list=PL2JbxXYgfWuC_kYe7K_mNBJ7d-Fq2qX_F" }
          ],
          short: {
            purpose: "https://www.youtube.com/results?search_query=purpose+of+life+christian",
            faith: "https://www.youtube.com/results?search_query=growing+faith+christian+short+videos",
            hope: "https://www.youtube.com/results?search_query=hope+in+jesus+christian+videos",
            identity: "https://www.youtube.com/results?search_query=who+am+i+in+christ+christian",
            love: "https://www.youtube.com/results?search_query=god+loves+you+christian+videos"
          }
        }
      }
    }
  },

  // Detect user intent and emotion severity
  detectIntent(userInput) {
    const lower = userInput.toLowerCase();
    
    // Crisis detection (highest priority)
    if (this.isCrisis(lower)) return { intent: "crisis", severity: "critical" };
    
    // Casual greeting (check early to avoid false positives)
    if (["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "how are you", "what's up"].some(g => lower.includes(g))) {
      return { intent: "greeting", severity: "none" };
    }
    
    // Media recommendations (check before faith/mental health to avoid overlap)
    if (this.topics.media.music.keywords.some(kw => lower.includes(kw))) {
      return { intent: "music", severity: "low" };
    }
    if (this.topics.media.preaching.keywords.some(kw => lower.includes(kw))) {
      return { intent: "preaching", severity: "low" };
    }
    
    // Mental health (deeper struggle)
    for (const [key, topic] of Object.entries(this.topics.mentalHealth)) {
      if (topic.keywords.some(kw => lower.includes(kw))) {
        return { intent: "mentalHealth", topic: key, severity: "moderate" };
      }
    }
    
    // Faith questions
    for (const [key, topic] of Object.entries(this.topics.faith)) {
      if (topic.keywords.some(kw => lower.includes(kw))) {
        return { intent: "faith", topic: key, severity: "low" };
      }
    }
    
    // General Christian question
    return { intent: "general", severity: "none" };
  },

  // Check if user is in crisis
  isCrisis(lower) {
    return [
      "suicide", "kill myself", "end my life", "hurt myself", "i can't go on", "i want to die",
      "harm myself", "cut myself", "self harm", "not worth living", "better off dead"
    ].some(phrase => lower.includes(phrase));
  },

  // Main response generator
  getResponse(userInput) {
    const detected = this.detectIntent(userInput);

    switch (detected.intent) {
      case "crisis":
        return this.crisisResponse();
      case "mentalHealth":
        return this.mentalHealthResponse(detected.topic);
      case "faith":
        return this.faithResponse(detected.topic);
      case "music":
        return this.musicResponse();
      case "preaching":
        return this.preachingResponse(userInput);
      case "greeting":
        return this.greetingResponse();
      default:
        return this.generalChristianResponse(userInput);
    }
  },

  // Crisis response
  crisisResponse() {
    const prayers = [
      "Lord, I lift this precious person to You. Surround them with Your love and protection. Give them strength to reach out for help. In Jesus' name, Amen.",
      "Father, this person is hurting deeply. Please send help and hope into their life. Connect them with people who can support them. Amen.",
      "Jesus, be present in this moment of darkness. Guide them to safety and to people who care. Thank You for never abandoning us. Amen."
    ];

    return {
      type: "crisis",
      supportMessage: `
I'm truly concerned about what you're sharing, and I want you to know that your life has immense value and purpose. 
God loves you deeply, and this pain you're feeling is not permanent.

**PLEASE REACH OUT FOR HELP RIGHT NOW:**
• **National Suicide Prevention Lifeline**: 988 (call or text)
• **Crisis Text Line**: Text HOME to 741741
• **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/

If you're in immediate danger, please call 911 or go to your nearest emergency room.

You are not alone in this. Please talk to a trusted adult, parent, pastor, counselor, or mental health professional immediately. They care about you and want to help.
      `.trim(),
      prayer: prayers[Math.floor(Math.random() * prayers.length)],
      verses: [
        "I have come that they may have life, and have it to the full. — John 10:10",
        "You are not alone; I am with you always. — Matthew 28:20",
        "The Lord is close to the brokenhearted and saves those who are crushed in spirit. — Psalm 34:18"
      ],
      resources: [
        "https://www.youtube.com/results?search_query=hope+in+jesus+christian+encouragement",
        "https://www.youtube.com/results?search_query=god+loves+you+suicide+prevention"
      ]
    };
  },

  // Mental health response
  mentalHealthResponse(topic) {
    const data = this.topics.mentalHealth[topic];
    const verse = data.verses[Math.floor(Math.random() * data.verses.length)];
    
    return {
      type: "mentalHealth",
      supportMessage: `
${data.opener}

I want you to know that what you're experiencing is real, and your feelings matter. God doesn't ask you to simply "get over it"—He invites you to bring your pain to Him. 

Here's what I encourage you to do:
1. **Reach out** to a trusted friend, family member, pastor, or mental health professional
2. **Take time** to process your feelings—it's okay to not be okay
3. **Pray honestly**—tell God exactly how you feel
4. **Be patient** with yourself—healing takes time
5. **Remember** that God's love for you is unconditional and eternal

**Are you safe right now?** If not, please reach out to a crisis line (988 in the US) or a trusted adult immediately.
      `.trim(),
      verse: verse,
      musicRecommendation: "Christian music can be deeply healing. I recommend listening to worship or praise songs that speak to your heart.",
      musicLinks: this.topics.media.music.videos,
      finalCheck: "Are you safe and have someone you can talk to?"
    };
  },

  // Faith response
  faithResponse(topic) {
    const data = this.topics.faith[topic];
    const verse = data.verses[Math.floor(Math.random() * data.verses.length)];
    
    let response = {
      type: "faith",
      supportMessage: "",
      verse: verse,
      additionalVerse: data.verses[Math.floor(Math.random() * data.verses.length)],
      preachingLinks: this.topics.media.preaching.videos.short,
      finalQuestion: "Would you like to explore this topic more deeply?"
    };

    if (data.examples) {
      response.biblicalExamples = data.examples;
      response.supportMessage = `
Your question about ${topic} is beautiful and important. Many biblical figures wrestled with the same doubts and questions you're facing.

${Object.entries(data.examples).map(([person, explanation]) => `
**${person.charAt(0).toUpperCase() + person.slice(1)}**: ${explanation}`).join("\n")}

Remember, asking questions doesn't weaken your faith—it deepens it. God welcomes your honesty and invites you into a deeper relationship with Him.
      `.trim();
    } else {
      response.supportMessage = `
Your question is profound and worthy of exploration. The Bible speaks directly to what you're asking about.

God desires that you understand His nature, His promises, and His love for you. Take time to reflect on the verse above, and consider reading more passages on this topic.

I encourage you to discuss this with your pastor, a Christian mentor, or a faith community.
      `.trim();
    }

    return response;
  },

  // Music recommendation
  musicResponse() {
    return {
      type: "music",
      supportMessage: `
Christian music is a beautiful way to connect with God's presence and allow your heart to be uplifted. Whether you're seeking comfort, worship, or celebration, there are wonderful songs available.

Here are some highly recommended Christian music playlists:
      `.trim(),
      videos: this.topics.media.music.videos.map((v, i) => `${i + 1}. **${v.title}**: ${v.url}`).join("\n"),
      suggestion: "Start with whichever playlist resonates with how you're feeling. Worship music can be transformative when you listen with an open heart.",
      verse: "Sing to the LORD a new song; sing his praise in the assembly of the faithful. — Psalm 149:1"
    };
  },

  // Preaching/video response
  preachingResponse(userInput) {
    const lower = userInput.toLowerCase();
    let topic = "general";
    
    // Detect specific topic requests
    if (lower.includes("faith")) topic = "faith";
    if (lower.includes("hope")) topic = "hope";
    if (lower.includes("purpose")) topic = "purpose";
    if (lower.includes("identity")) topic = "identity";
    if (lower.includes("love")) topic = "love";

    return {
      type: "preaching",
      supportMessage: `
Listening to powerful preaching can deeply strengthen your faith and transform your perspective. Below are excellent resources:

**Long-Form Sermons** (deep, extended teachings):
      `.trim(),
      longSermons: this.topics.media.preaching.videos.long.map((v, i) => `${i + 1}. **${v.title}**: ${v.url}`).join("\n"),
      shortVideos: `\n**Short, Topic-Specific Videos** (focused content):
• **Purpose**: ${this.topics.media.preaching.videos.short.purpose}
• **Faith Growth**: ${this.topics.media.preaching.videos.short.faith}
• **Hope & Encouragement**: ${this.topics.media.preaching.videos.short.hope}
• **Identity in Christ**: ${this.topics.media.preaching.videos.short.identity}
• **God's Love**: ${this.topics.media.preaching.videos.short.love}`,
      verse: "So faith comes from hearing, and hearing through the word of Christ. — Romans 10:17"
    };
  },

  // Greeting response
  greetingResponse() {
    return {
      type: "greeting",
      message: "Hello, how are you doing today? Is there anything I can help you with? Whether you're facing challenges, have questions about God and faith, want to listen to worship music, watch inspiring sermons, or just want to talk—I'm here for you. What's on your heart?"
    };
  },

  // General Christian response
  generalChristianResponse(userInput) {
    const responses = {
      default: `
Thank you for sharing that with me. While I'm not a professional advisor, I can offer a Christian perspective.

**Key Principles**:
• God's Word offers wisdom for every situation
• Prayer and faith in Jesus Christ provide strength
• Community and mentorship are vital
• Seeking professional guidance (pastor, counselor) is wise

I encourage you to reflect on Scripture, pray about what you've shared, and discuss this with trusted people in your life who can offer ongoing support and guidance.

**Are you feeling safe and supported?** If you need professional help, I'm happy to encourage you to reach out to a pastor, counselor, or trusted adult.
      `.trim(),
      
      about_god: `
God is the Creator and foundation of all existence. He is:
• **Loving**: "For God so loved the world..." — John 3:16
• **Powerful**: "Nothing is impossible with God." — Luke 1:37
• **Just**: God cares about justice and righteousness
• **Merciful**: His grace extends to all who believe

God desires a personal relationship with you through Jesus Christ. He knows you, loves you, and has a purpose for your life.
      `.trim()
    };

    return {
      type: "general",
      supportMessage: responses.default,
      verse: "For the word of God is alive and active. Sharper than any double-edged sword... — Hebrews 4:12",
      suggestion: "Feel free to ask more specific questions about God, faith, the Bible, prayer, or Christian life. I'm here to help guide you toward deeper understanding and connection with God.",
      finalQuestion: "Is there a particular aspect of faith or your spiritual journey you'd like to explore more?"
    };
  }
};

// Export for use in React components
export default faithgpt;
