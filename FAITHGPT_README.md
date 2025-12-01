# FaithGPT — Christian AI Assistant

**FaithGPT** is a compassionate, spiritually grounded AI assistant designed to provide support, faith-based guidance, and Christian resources to anyone seeking help with mental health, faith questions, spiritual growth, and more.

## ✨ Features

### 🤝 Mental Health Support
FaithGPT responds with warmth and empathy to people struggling with:
- **Anxiety & Worry** — Offers calming affirmations and Bible verses like 1 Peter 5:7
- **Loneliness** — Reminds users of God's presence and community resources
- **Depression** — Provides compassionate support and hope-filled Scripture (Psalm 23:1)
- **Grief & Loss** — Offers comfort and validation (Matthew 5:4)
- **Guilt & Shame** — Points to forgiveness and God's grace (1 John 1:9)
- **Anger & Conflict** — Provides wisdom and cooling verses (Ephesians 4:26)
- **Relationship Issues** — Offers Christian perspective on love and partnership
- **Exhaustion & Burnout** — Encourages rest and renewal in God's presence (Isaiah 40:31)

### 📖 Faith & Spiritual Guidance
Answers deep questions about God, faith, and belief:
- **God's Existence & Nature** — Explains God with Scripture and theological clarity
- **Doubts & Questions** — Affirms that doubt can deepen faith; cites biblical examples (Abraham, Thomas, Job, Peter)
- **Salvation & Born Again** — Explains salvation through Christ with John 3:16
- **Prayer** — Teaches how to pray authentically and intimately
- **Scripture Study** — Recommends relevant passages for deeper understanding

### 🎵 Media Recommendations
Provides curated YouTube playlists and videos:
- **Worship & Praise Music** — Links to Hillsong, Bethel Music, Jesus Culture, Elevation Worship, and more
- **Preaching & Sermons** — Recommends long-form teachings from TD Jakes, Joyce Meyer, John MacArthur, and Priscilla Shirer
- **Topic-Specific Videos** — Short, focused content on purpose, faith, hope, identity in Christ, and God's love

### 🚨 Crisis Response
**FaithGPT takes mental health crises seriously:**
- Immediately detects crisis language (suicidal ideation, self-harm, etc.)
- Provides empathetic support combined with urgent resources
- Directs users to 988 (Suicide Prevention Lifeline), crisis text lines, and emergency services
- **Never acts as a replacement for professional mental health care**
- Always encourages reaching out to trusted adults, pastors, and counselors

### 🎯 General Christian Q&A
Responds to any Christian topic with:
- Longer, more comprehensive answers (not just brief replies)
- Relevant Bible verses and theological explanations
- Practical, wise guidance grounded in Scripture
- A final safety check to ensure the user is well-supported

## 🏗️ Architecture

### Frontend
- **React** + **Tailwind CSS** for responsive, modern UI
- Beautiful background design featuring:
  - John 3:16 text scattered throughout
  - "Everything is possible with God" affirmation
  - Christian crosses (✝️) as decorative elements
  - Soft, comforting gradient (blue, rose, and sky tones)
  - Safe-space aesthetic with no threatening imagery

### Backend Logic
- **`faithgpt.js`** — Rule-based assistant with:
  - Intent detection (mental health, faith, media, crisis, greeting, general)
  - Topic categorization with keyword matching
  - Curated Bible verses for each topic
  - Personalized, warm responses
  - Safe-response language and crisis detection
  - Media recommendation engine

### Chat Component
- **Persistent conversation history** (localStorage)
- Export/Clear options for users
- Responsive message layout
- Real-time message streaming

## 🚀 Quick Start

### Installation
```bash
git clone https://github.com/EthanMCT09/Christian-AI-helper.git
cd HelloWorld
npm install
```

### Development
```bash
npm run dev
```
Then open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
npm run deploy
```
The app will be built and optimized in the `dist/` folder.

## 📋 How to Use

1. **Open FaithGPT** in your browser
2. **Type your message** — Share what's on your heart, whether:
   - A struggle you're facing (anxiety, loneliness, grief, etc.)
   - A question about God, faith, or the Bible
   - A request for worship music or preaching
   - A casual greeting or general Christian question
3. **Receive a compassionate response** that includes:
   - A warm, empathetic message tailored to your concern
   - Relevant Bible verses for hope and guidance
   - Resources (music links, sermon recommendations, etc.)
   - Encouragement and safety checks
4. **Continue the conversation** — You can ask follow-up questions or explore new topics

## 🤲 Core Principles

FaithGPT operates on these core values:

### ✝️ Spiritually Grounded
Every response is rooted in Christian Scripture, theology, and values.

### 🫂 Deeply Empathetic
Responses prioritize warmth, genuine understanding, and human connection.

### 🛡️ Safe & Responsible
- Never pretends to be a therapist
- Always uses safe-response language
- Detects crises and directs to professional help immediately
- Respects all users regardless of belief

### 📚 Well-Informed
- Curated Bible verses chosen specifically for each topic
- Biblical examples (Abraham, Thomas, Job, Peter, etc.) to address doubts
- Links to popular, well-regarded Christian music and preaching resources

### 🙏 Prayerful
- Includes actual prayers for crisis situations
- Encourages personal prayer and Scripture reading
- Connects users to faith communities (pastors, churches, mentors)

## 🔗 Resources Included

### Bible Verses
- John 3:16 (God's love)
- 1 Peter 5:7 (Anxiety)
- Hebrews 13:5 (Never alone)
- Psalm 34:18 (Brokenhearted)
- Matthew 11:28 (Rest)
- Jeremiah 29:11 (Purpose)
- Isaiah 40:31 (Strength)
- And many more...

### Music Playlists
- Hillsong Worship
- Bethel Music
- Jesus Culture
- Elevation Worship
- And curated playlists

### Preaching Resources
- TD Jakes
- Joyce Meyer
- John MacArthur
- Priscilla Shirer
- Short-form topic-specific videos

## 🛠️ Configuration

### Vite Base Path
The app is configured to deploy at `/Christian-AI-helper/`. Update `vite.config.js` if deploying to a different path:
```js
export default {
  base: '/your-path/',
  // ...
}
```

### Styling
CSS is in `src/styles/index.css` with Tailwind configuration in `tailwind.config.cjs`.

## 📞 Support & Contribution

If you encounter issues or want to contribute:
1. Open an issue on GitHub
2. Submit a pull request with improvements
3. Share feedback on FaithGPT's responses

## ⚠️ Important Disclaimer

**FaithGPT is not a substitute for professional mental health care.** If you or someone you know is:
- In crisis or danger
- Experiencing severe depression or suicidal thoughts
- Dealing with trauma or abuse
- Struggling with addiction

**Please reach out to:**
- **988 Suicide & Crisis Lifeline** (US): Call or text 988
- **Crisis Text Line**: Text HOME to 741741
- **Emergency Services**: Call 911 (US) or your local emergency number
- **Your local pastor, counselor, or trusted adult**

FaithGPT provides spiritual comfort and Scripture, but professional care is essential for serious mental health concerns.

## 📄 License

This project is open source. See `LICENSE` for details.

---

**FaithGPT** — Made with faith, compassion, and the hope that everyone knows they are deeply loved and valued by God.

*"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." — John 3:16*
