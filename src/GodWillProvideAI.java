import java.util.*;

public class GodWillProvideAI {
    private final Map<String, List<String>> topicVerses = new HashMap<>();
    private final Map<String, List<String>> topicKeywords = new HashMap<>();
    private final Random rnd = new Random();

    public GodWillProvideAI() {
        topicVerses.put("anxiety", Arrays.asList(
            "Do not be anxious about anything. — Philippians 4:6-7",
            "Cast all your anxiety on him because he cares for you. — 1 Peter 5:7"
        ));
        topicVerses.put("fear", Arrays.asList(
            "Fear not, for I am with you. — Isaiah 41:10"
        ));
        topicVerses.put("grief", Arrays.asList(
            "The LORD is close to the brokenhearted. — Psalm 34:18"
        ));
        topicVerses.put("forgiveness", Arrays.asList(
            "Be kind to one another, tenderhearted, forgiving one another. — Ephesians 4:32"
        ));
        topicVerses.put("temptation", Arrays.asList(
            "God will not let you be tempted beyond what you can bear. — 1 Corinthians 10:13"
        ));
        topicVerses.put("doubt", Arrays.asList(
            "Lord, I believe; help my unbelief! — Mark 9:24"
        ));
        topicVerses.put("purpose", Arrays.asList(
            "For I know the plans I have for you... to give you a future and a hope. — Jeremiah 29:11"
        ));
        topicVerses.put("strength", Arrays.asList(
            "I can do all things through him who strengthens me. — Philippians 4:13"
        ));
        topicVerses.put("love", Arrays.asList(
            "Love is patient and kind... — 1 Corinthians 13:4-7"
        ));
        topicVerses.put("general", Arrays.asList(
            "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. — John 3:16",
            "The LORD bless you and keep you. — Numbers 6:24"
        ));
        topicKeywords.put("anxiety", Arrays.asList("anx", "worry", "stressed", "panic"));
        topicKeywords.put("fear", Arrays.asList("scared", "afraid", "fear"));
        topicKeywords.put("grief", Arrays.asList("grief", "loss", "mourning"));
        topicKeywords.put("forgiveness", Arrays.asList("forgive", "guilt", "regret"));
        topicKeywords.put("temptation", Arrays.asList("tempt", "sin", "struggle"));
        topicKeywords.put("doubt", Arrays.asList("doubt", "uncertain", "question"));
        topicKeywords.put("purpose", Arrays.asList("purpose", "future", "meaning"));
        topicKeywords.put("strength", Arrays.asList("strength", "tired", "weak"));
        topicKeywords.put("love", Arrays.asList("love", "relationship", "marry"));
    }

    public String respond(String userInput) {
        String lower = userInput.toLowerCase(Locale.ROOT);
        if (containsAny(lower, Arrays.asList("suicide", "kill myself", "end my life", "hurt myself", "i can't go on", "i want to die"))) {
            return formatResponse(
                "I'm truly sorry you're feeling this way. You are deeply valued and loved. Please reach out to a trusted adult, pastor, or mental-health professional if you're in danger or struggling deeply. I'm here to support you, and God cares for you.",
                "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. — John 3:16"
            );
        }
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
        String supportMsg = getSupportMessage(topic);
        String verse = getVerse(topic);
        return formatResponse(supportMsg, verse);
    }

    private String getSupportMessage(String topic) {
        switch (topic) {
            case "anxiety":
                return "You are not alone in your worries. God invites you to bring your anxieties to Him. Take a deep breath, and remember that you are loved and cared for.";
            case "fear":
                return "Even in moments of fear, God is with you. You have courage within, and you are never abandoned.";
            case "grief":
                return "Grief is a journey, and it's okay to feel sadness. God is close to the brokenhearted and walks with you through pain.";
            case "forgiveness":
                return "Forgiveness is a gift, both to others and yourself. God's grace is bigger than any mistake. You are worthy of love and renewal.";
            case "temptation":
                return "Everyone faces struggles. God gives strength to overcome and welcomes you with open arms, no matter what.";
            case "doubt":
                return "Questions and doubts are part of faith. God listens to your heart and guides you gently.";
            case "purpose":
                return "Your life has meaning and purpose. Trust that God has a plan for you, even when the path seems unclear.";
            case "strength":
                return "When you feel weak, remember that God's strength is made perfect in our weakness. Rest and let Him renew you.";
            case "love":
                return "You are deeply loved. God's love is unconditional and always present, no matter what you're facing.";
            default:
                return "Whatever you're going through, you are not alone. God loves you and is always near. If you need extra support, please reach out to someone you trust.";
        }
    }

    private String getVerse(String topic) {
        List<String> verses = topicVerses.getOrDefault(topic, topicVerses.get("general"));
        return verses.get(rnd.nextInt(verses.size()));
    }

    private String formatResponse(String supportMsg, String verse) {
        return "Support Message:\n" + supportMsg + "\n\n" + "Bible Verse (optional):\n" + verse + "\n\n" + "I'm here to support you, but please reach out to a trusted adult, pastor, or mental-health professional if you're in danger or struggling deeply.";
    }

    private boolean containsAny(String text, List<String> subs) {
        for (String s : subs) if (text.contains(s)) return true;
        return false;
    }
}