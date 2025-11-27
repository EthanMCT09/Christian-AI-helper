import java.util.*;

public class GospelAssistant {
    private final Map<String, List<String>> topicVerses = new HashMap<>();
    private final Map<String, List<String>> topicKeywords = new HashMap<>();
    private final Random rnd = new Random();

    public GospelAssistant() {
        // Verses: short quote + reference
        topicVerses.put("anxiety", Arrays.asList(
            "Do not be anxious about anything. — Philippians 4:6-7",
            "Therefore do not worry about tomorrow. — Matthew 6:34",
            "Cast all your anxiety on him because he cares for you. — 1 Peter 5:7"
        ));

        topicVerses.put("fear", Arrays.asList(
            "Fear not, for I am with you. — Isaiah 41:10",
            "The LORD is with me; I will not be afraid. — Psalm 118:6"
        ));

        topicVerses.put("grief", Arrays.asList(
            "The LORD is close to the brokenhearted. — Psalm 34:18",
            "Blessed are those who mourn, for they will be comforted. — Matthew 5:4"
        ));

        topicVerses.put("forgiveness", Arrays.asList(
            "Be kind to one another, tenderhearted, forgiving one another. — Ephesians 4:32",
            "Forgive, and you will be forgiven. — Luke 6:37"
        ));

        topicVerses.put("temptation", Arrays.asList(
            "God will not let you be tempted beyond what you can bear. — 1 Corinthians 10:13",
            "Watch and pray that you may not enter into temptation. — Matthew 26:41"
        ));

        topicVerses.put("doubt", Arrays.asList(
            "Lord, I believe; help my unbelief! — Mark 9:24",
            "If any of you lacks wisdom, let him ask God. — James 1:5"
        ));

        topicVerses.put("purpose", Arrays.asList(
            "For I know the plans I have for you... to give you a future and a hope. — Jeremiah 29:11",
            "Trust in the Lord with all your heart. — Proverbs 3:5-6"
        ));

        topicVerses.put("strength", Arrays.asList(
            "But they who wait for the LORD shall renew their strength. — Isaiah 40:31",
            "I can do all things through him who strengthens me. — Philippians 4:13"
        ));

        topicVerses.put("love", Arrays.asList(
            "Love is patient and kind... — 1 Corinthians 13:4-7",
            "Greater love has no one than this: to lay down one's life for one's friends. — John 15:13"
        ));

        topicVerses.put("general", Arrays.asList(
            "The LORD bless you and keep you. — Numbers 6:24",
            "Be strong and courageous. — Joshua 1:9",
            "I will never leave you nor forsake you. — Hebrews 13:5"
        ));

        // Keywords mapped to topics (simple matching)
        topicKeywords.put("anxiety", Arrays.asList("anx", "worry", "worried", "anxious", "stress", "stressed", "panic"));
        topicKeywords.put("fear", Arrays.asList("scared", "afraid", "fear"));
        topicKeywords.put("grief", Arrays.asList("grief", "grieve", "grieving", "loss", "lost", "bereave", "mour"));
        topicKeywords.put("forgiveness", Arrays.asList("forgive", "forgiveness", "guilt", "regret", "sorry"));
        topicKeywords.put("temptation", Arrays.asList("tempt", "temptation", "sin", "struggle", "fall"));
        topicKeywords.put("doubt", Arrays.asList("doubt", "doubtful", "uncertain", "question", "why", "believe"));
        topicKeywords.put("purpose", Arrays.asList("purpose", "future", "calling", "meaning", "direction", "career"));
        topicKeywords.put("strength", Arrays.asList("strength", "tired", "exhausted", "weak", "power"));
        topicKeywords.put("love", Arrays.asList("love", "relationship", "marry", "dating", "partner", "husband", "wife"));
    }

    public String respond(String userInput) {
        String lower = userInput.toLowerCase(Locale.ROOT);

        // Crisis detection
        if (containsAny(lower, Arrays.asList("suicide", "kill myself", "end my life", "hurt myself", "i can't go on", "i want to die"))) {
            return crisisResponse();
        }

        // Determine topic by keyword matching
        String topic = null;
        for (Map.Entry<String, List<String>> entry : topicKeywords.entrySet()) {
            for (String kw : entry.getValue()) {
                if (lower.contains(kw)) {
                    topic = entry.getKey();
                    break;
                }
            }
            if (topic != null) break;
        }

        if (topic == null) topic = "general";

        StringBuilder sb = new StringBuilder();
        // Empathetic openers
        String[] openers = new String[] {
            "I'm really glad you told me that.",
            "Thank you for sharing — that matters.",
            "I hear you, and I'm here with you in this.",
            "That sounds really tough. I'm with you through it."
        };
        sb.append(openers[rnd.nextInt(openers.length)]).append(" ");

        // Topic-specific encouragement
        switch (topic) {
            case "anxiety":
                sb.append("It's okay to feel uncertain about the future. Take things one step at a time and breathe. ");
                break;
            case "fear":
                sb.append("You don't have to face your fears alone — God is with you. ");
                break;
            case "grief":
                sb.append("I'm so sorry for your loss. Grief takes time, and it's okay to mourn. ");
                break;
            case "forgiveness":
                sb.append("Forgiveness is a process; God's grace meets us in our weakness. ");
                break;
            case "temptation":
                sb.append("Struggles with temptation are common — you can resist and find strength in prayer and community. ");
                break;
            case "doubt":
                sb.append("Doubt can lead to deeper faith when we bring it honestly to God. ");
                break;
            case "purpose":
                sb.append("You're not alone in searching for direction; God cares about your future. ");
                break;
            case "strength":
                sb.append("It's okay to feel weary — rest and renew yourself in God's presence. ");
                break;
            case "love":
                sb.append("Relationships can be messy; God's love can reshape how we relate to others. ");
                break;
            default:
                sb.append("I want to encourage you and point you toward Scripture and prayer. ");
        }

        // Add a Bible verse
        List<String> verses = topicVerses.getOrDefault(topic, topicVerses.get("general"));
        String verse = verses.get(rnd.nextInt(verses.size()));
        sb.append("Here's a verse that may help: \n\"" + verse + "\"\n");

        // Practical next steps and reassurance
        sb.append("Try praying or reading this verse slowly. Talk with a trusted friend or your pastor. ");
        sb.append("Remember — God's love is real, and with time and support, things often begin to feel better.");

        // Gentle offer to continue
        sb.append("\nIf you'd like, tell me more about what's on your mind or ask for a passage on a different topic.");

        return sb.toString();
    }

    private boolean containsAny(String text, List<String> subs) {
        for (String s : subs) if (text.contains(s)) return true;
        return false;
    }

    private String crisisResponse() {
        StringBuilder sb = new StringBuilder();
        sb.append("I'm really sorry — it sounds like you're in a crisis right now. ");
        sb.append("I care about your safety. If you're thinking about harming yourself, please contact local emergency services or a crisis hotline right away. ");
        sb.append("If you can, please reach out to someone you trust; if not, call your local emergency number or a suicide prevention hotline (for example, in the U.S. call 988). ");
        sb.append("It's important to get help now. I can stay with you and listen, but professional care is crucial in this situation.");
        return sb.toString();
    }
}
