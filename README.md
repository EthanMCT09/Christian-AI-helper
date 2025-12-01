# ✝️ FaithGPT — Christian AI Assistant

**FaithGPT** is a compassionate, faith-based AI assistant designed to support people through mental health challenges, faith questions, and spiritual growth. Built on Christian values with a modern ChatGPT-style interface, it responds with warmth, empathy, and biblical wisdom.

![FaithGPT Banner](https://img.shields.io/badge/FaithGPT-Christian%20AI%20Assistant-blue)
![John 3:16](https://img.shields.io/badge/John%203%3A16-For%20God%20so%20loved%20the%20world-lightblue)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Firebase](https://img.shields.io/badge/Firebase-Authentication-orange?logo=firebase)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)

---

## Features

### 🛡️ Mental Health Support
- **Anxiety & Worry**: Compassionate guidance with biblical reassurance
- **Grief & Loss**: Empathetic responses honoring mourning and pain
- **Depression & Hopelessness**: Encouragement rooted in God's promises
- **Guilt & Shame**: Verses on forgiveness and God's grace
- **Loneliness**: Reminders that you are never truly alone
- **Relationship Issues**: Wisdom from Scripture on love and connection
- **Exhaustion & Burnout**: Rest and renewal in God's presence

### 🙏 Faith & Spiritual Questions
- **Doubt & Uncertainty**: Biblical examples of faith journeys
- **Who is God?**: Understanding God's nature and love
- **Salvation**: Explanation of Christ's redemptive love
- **Prayer**: Guidance on authentic communication with God
- **Biblical Examples**: Stories of Abraham, Thomas, Peter, Job, and more

### 🎵 Media Recommendations
- **Worship Music**: Curated playlists from Hillsong, Bethel, Elevation, Jesus Culture
- **Sermon Videos**: Full-length teachings from trusted pastors (TD Jakes, Joyce Meyer, John MacArthur)
- **Topic-Specific Videos**: Short encouraging clips on faith, hope, identity in Christ

### 🆘 Crisis Support
- **Immediate Help**: Connection to 988 Suicide & Crisis Lifeline
- **Prayer Response**: Spiritual encouragement in moments of darkness
- **Professional Resources**: Guidance to mental health professionals and pastors

### 🎨 User Experience
- **ChatGPT-Style Interface**: Modern, clean chat UI with message bubbles and avatars
- **Firebase Authentication**: Secure user accounts with Email/Password, Google, Apple, and Microsoft sign-in
- **Safe Space Theme**: Background featuring John 3:16, crosses, and "Everything is possible with God"
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Encrypted Storage**: Messages encrypted and saved for continuity and privacy
- **Auto-Resize Textarea**: Input grows as you type (like ChatGPT)
- **Typing Indicator**: Animated dots when FaithGPT is responding
- **Export & Clear**: Download conversations or start fresh

---

## Getting Started

### Prerequisites
- Node.js v16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/EthanMCT09/Christian-AI-helper.git
cd Christian-AI-helper

# Install dependencies
npm install

# Set up Firebase (see Firebase Setup below)
cp .env.example .env
# Edit .env and add your Firebase credentials

# Start development server
npm run dev

# Build for production
npm run build

# Deploy
npm run deploy
```

### Firebase Setup

FaithGPT uses Firebase for authentication and data storage. Follow these steps:

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Add Project"
   - Follow the setup wizard

2. **Enable Authentication**
   - In Firebase Console, go to Authentication → Sign-in method
   - Enable **Email/Password**
   - (Optional) Enable **Google**, **Apple**, and **Microsoft** sign-in

3. **Create Firestore Database**
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in test mode" (for development)

4. **Get Firebase Config**
   - Go to Project Settings (gear icon) → General
   - Scroll to "Your apps" → Web app
   - Copy the Firebase configuration

5. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

6. **Deploy Security Rules** (Optional)
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init firestore
   firebase deploy --only firestore:rules
   ```

7. **Restart Development Server**
   ```bash
   npm run dev
   ```

### Development

```bash
# Run dev server (http://localhost:5173)
npm run dev

# Build production assets
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
/
├── src/
│   ├── faithgpt.js           # Core AI logic & intent detection
│   ├── firebase.js           # Firebase configuration
│   ├── encryption.js         # Message encryption utilities
│   ├── App.jsx               # Main React component with auth routing
│   ├── main.jsx              # Entry point
│   ├── components/
│   │   ├── Chat.jsx          # ChatGPT-style UI & message handling
│   │   ├── Settings.jsx      # User preferences
│   │   ├── Login.jsx         # Login page
│   │   ├── SignUp.jsx        # Sign-up page
│   │   ├── Privacy.jsx       # Privacy policy
│   │   └── Auth.css          # Authentication styling
│   ├── utils/
│   │   └── logger.js         # Logging utilities
│   ├── contextModule.js      # Conversation context tracking
│   ├── analyticsModule.js    # User analytics
│   ├── securityModule.js     # Security & input validation
│   └── styles/
│       └── index.css         # Custom CSS + ChatGPT-style theme
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── .env.example              # Environment variables template
├── firestore.rules           # Firestore security rules
└── package.json              # Dependencies
```

---

## How FaithGPT Works

### Intent Detection
FaithGPT analyzes user input and identifies their needs:

1. **Crisis Detection** — Checks for suicidal ideation, immediately responds with hotlines
2. **Greetings** — Casual "hello" or "how are you?" triggers friendly welcome
3. **Mental Health** — Keywords like "anxious," "grief," "angry" trigger supportive responses
4. **Faith Questions** — Keywords like "doubt," "God," "prayer" trigger spiritual guidance
5. **Media Requests** — "Music," "sermon," "preaching" trigger video recommendations
6. **General Questions** — Responds with Christian wisdom and biblical perspectives

### Response Format
Each response includes:
- **Support Message**: Warm, empathetic acknowledgment
- **Bible Verse**: Relevant Scripture for their situation
- **Additional Resources**: YouTube links, prayers, or practical suggestions
- **Final Check**: Ensures safety and well-being

### Example: User with Anxiety
```
User: "I'm so anxious about the future"

FaithGPT:
Support Message: "I hear your worries, and I want you to know you're not alone..."
Verse: "Do not be anxious about anything... — Philippians 4:6"
Music: [Hillsong Worship playlist]
Final Check: "Are you safe and have someone you can talk to?"
```

---

## Deployment

### GitHub Pages Deployment
The app is configured to deploy to `https://github.com/EthanMCT09/Christian-AI-helper`

```bash
npm run deploy  # Builds and deploys to gh-pages
```

### Asset Base Path
The `vite.config.js` is configured with:
```javascript
base: '/Christian-AI-helper/'
```

This ensures all assets load correctly from the `/Christian-AI-helper/` subdirectory.

---

## Customization

### Add More Topics
Edit `src/faithgpt.js` and add entries to the `topics` object:

```javascript
topics: {
  mentalHealth: {
    myTopic: {
      keywords: ["word1", "word2"],
      verses: ["Verse 1 — Reference", "Verse 2 — Reference"],
      opener: "Personalized opener text"
    }
  }
}
```

### Customize Background
Edit `src/styles/index.css` and modify the `.faith-gpt-bg::after` content with your own text and verses.

### Add YouTube Links
Update the media recommendation videos in `faithgpt.js`:

```javascript
music: {
  videos: [
    { title: "Your Playlist", url: "https://youtube.com/..." }
  ]
}
```

---

## Technology Stack

- **Frontend**: React 18 + Vite
- **Authentication**: Firebase Auth (Email/Password, Google, Apple, Microsoft)
- **Database**: Cloud Firestore
- **Styling**: Custom CSS (ChatGPT-style theme)
- **Security**: Client-side encryption, rate limiting, input sanitization
- **State**: React hooks + encrypted localStorage
- **AI Logic**: Client-side JavaScript (no API required)
- **Hosting**: GitHub Pages / Firebase Hosting

---

## Safety & Ethical Guidelines

FaithGPT follows strict guidelines:

✅ **ALWAYS**:
- Use warm, empathetic, human-like language
- Include relevant Bible verses
- Encourage professional mental health support when needed
- Respect all users regardless of belief
- Provide crisis hotline info (988 in US)

❌ **NEVER**:
- Act as a professional therapist
- Give clinical medical advice
- Judge or condemn users
- Minimize real suffering
- Replace professional mental health care

---

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License — see LICENSE file for details.

---

## Support Resources

If you or someone you know is struggling:

- **National Suicide Prevention Lifeline**: 988 (call or text)
- **Crisis Text Line**: Text HOME to 741741
- **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/

---

## Contact & Questions

For questions, feedback, or suggestions:
- Open an issue on GitHub
- Contact the maintainers

---

## Acknowledgments

- Inspired by Christian compassion and biblical wisdom
- Built with love for those seeking faith, hope, and healing
- "For God so loved the world..." — John 3:16

---

**Made with faith & compassion** ✝️ **FaithGPT**
