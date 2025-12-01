# FaithGPT — Enhanced Christian AI Assistant

**FaithGPT 2.0** is a secure, compassionate, spiritually grounded AI assistant with advanced features for mental health support, faith guidance, media recommendations, and personalized Christian resources.

## ✨ Major Features

### 🔐 Authentication & Security
- **Multi-Provider Login**: Google, Apple, Microsoft, and email/password authentication
- **Secure Sign-Up**: Collects first/last name, email, password, and date of birth
- **Safe Credential Handling**: Incorrect login attempts show generic messages for security
- **Firebase Authentication**: Industry-standard secure authentication
- **HTTPS/TLS Encryption**: All data transmitted securely
- **XSS & Injection Protection**: Input sanitization and validation
- **Rate Limiting**: Prevents abuse with request throttling
- **CSRF Protection**: Token-based cross-site request forgery protection

### 🔒 Data Encryption & Privacy
- **Conversation Encryption**: AES-256 encryption for all stored conversations
- **Password Security**: Hashed and salted with Firebase Authentication
- **Firestore Security Rules**: Access restricted to user's own data
- **Privacy Statement**: Clear, comprehensive privacy policy included
- **Data Control**: Users can export, delete, or clear conversations anytime
- **No Data Selling**: Conversations never shared with third parties
- **GDPR Compliance Ready**: Full data access, export, and deletion rights

### 🧠 Advanced AI Features
- **Context Awareness**: Remembers conversation history for better responses
- **Natural Language Understanding**: Detects varied questions and intent patterns
- **Emotional Intensity Detection**: Identifies crisis, high, medium, and low intensity messages
- **Follow-Up Awareness**: Recognizes clarification requests and related topics
- **Personalized Tone**: Encouraging, Serious, Casual, or Gentle based on user preference
- **Multiple Bible Versions**: KJV, NIV, ESV, NKJV, NLT, NASB support
- **Smart Topic Detection**: Accurate categorization for mental health, faith, purpose, relationships, media, preaching, and general Q&A
- **Prompt Engineering**: Context-aware prompts for supportive, Christian-centered responses
- **Safe Response Language**: Fallback responses when AI uncertain about user intent

### 🎯 Conversation Topics Supported
- **Mental Health**: Anxiety, loneliness, depression, grief, guilt, anger, exhaustion, burnout
- **Faith & Spirituality**: Doubts, salvation, prayer, Scripture study, God's existence and nature
- **Life Purpose**: Career, calling, meaning, future direction
- **Relationships**: Dating, marriage, partnerships, conflict resolution
- **Worship & Media**: Music recommendations, sermon links, praise videos
- **General Christian Q&A**: Theological questions, Bible explanations, Christian advice

### 🛡️ Crisis Support
- **Immediate Detection**: Recognizes suicidal ideation, self-harm, and crisis language
- **Empathetic Response**: Provides warm support with immediate resources
- **Resource Directives**: Links to 988 (Suicide & Crisis Lifeline), crisis text lines, professional help
- **Never a Substitute**: Always directs serious crises to professional mental health care

### 🎨 Customizable User Experience
- **Background Themes**: 
  - Nature-Themed (Peaceful + Calming)
  - Scripture-Based Background
  - Symbolic Christian Backgrounds
  - Welcoming Church (Peaceful & Christian-Centered)
- **Bible Version Selection**: Choose preferred Bible translation
- **Tone Customization**: Adjust AI personality (encouraging, serious, casual, gentle)
- **Settings Persistence**: User preferences saved and restored
- **Responsive Design**: Works seamlessly on phones, tablets, computers

### 📊 Analytics & Improvements
- **Usage Tracking**: Monitors conversation patterns and topics
- **Response Time Analytics**: Measures AI performance
- **Session Analytics**: Tracks user engagement and session duration
- **Most Common Topics**: Identifies focus areas for improvement
- **Event Logging**: All user actions tracked (export, clear, settings changes)
- **Privacy-Respecting**: Aggregated and anonymized, never personally identifying

### 👥 User Management
- **Account Creation**: Sign up with personal information
- **Profile Management**: Edit user preferences and settings
- **Data Export**: Download all conversations in JSON format
- **Data Deletion**: Permanently delete account and all associated data
- **Session Management**: Secure logout with session cleanup

## 🏗️ Architecture

### Frontend Stack
- **React 18** — Interactive UI with hooks and state management
- **Vite** — Fast build tool and dev server
- **Tailwind CSS** — Responsive utility-first styling
- **Firebase SDK** — Authentication and real-time database
- **Crypto-JS** — Client-side conversation encryption

### Backend Integration
- **Firebase Authentication** — Secure user management
- **Cloud Firestore** — NoSQL database for user data and preferences
- **Firebase Security Rules** — Access control and data protection
- **Environment Variables** — Secure configuration management

### Core Modules
- **`faithgpt.js`** (427 lines) — AI logic with intent detection and response generation
- **`contextModule.js`** — Conversation history and context tracking
- **`analyticsModule.js`** — Usage analytics and event logging
- **`securityModule.js`** — Input validation, rate limiting, XSS protection
- **`encryption.js`** — AES-256 conversation encryption
- **`firebase.js`** — Firebase initialization and configuration

### Components
- **`App.jsx`** — Main app with authentication routing
- **`Login.jsx`** — Multi-provider login interface
- **`SignUp.jsx`** — Account creation with validation
- **`Chat.jsx`** — Main chat interface with encryption and analytics
- **`Settings.jsx`** — User preferences and customization
- **`Privacy.jsx`** — Privacy policy and data protection statement

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/EthanMCT09/Christian-AI-helper.git
cd HelloWorld

# Install dependencies
npm install

# Configure Firebase
# 1. Create a project at https://console.firebase.google.com
# 2. Copy your Firebase config
# 3. Update .env with your Firebase credentials
```

### Configuration

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-id
VITE_FIREBASE_APP_ID=your-app-id

# Change this to a strong encryption key in production
VITE_ENCRYPTION_KEY=your-strong-encryption-key-here

# Google Analytics (optional)
VITE_GOOGLE_ANALYTICS_ID=G_YOUR_GA_ID
```

### Development

```bash
# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## 🔑 Key Features Explained

### Login & Authentication
1. Users see login page on first visit
2. Can login with Google, Apple, Microsoft, or email/password
3. New users click "Don't have an account? Sign up"
4. Sign-up form collects personal information and validates password strength
5. Upon successful signup, user data stored securely in Firestore
6. Incorrect login attempts show safe generic error messages
7. Logout clears session and returns to login page

### Conversation Encryption
- All conversations automatically encrypted with AES-256 before storage
- Encryption happens client-side for privacy
- Encryption key can be customized in production
- Users can export encrypted conversations as JSON
- Clear conversation function removes encrypted data from storage

### Context Awareness
- AI remembers last 10 messages for conversation context
- Detects follow-up questions and related topics
- Generates context-appropriate responses based on conversation history
- Understands emotional intensity (crisis, high, medium, low)
- Adapts tone based on user preference and message content

### Analytics Tracking
- Tracks all user actions (messages, exports, clears, settings)
- Measures response generation time
- Records session duration and message count
- Identifies most common topics
- Helps improve AI accuracy and helpfulness
- No personally identifying information in analytics

### Security Measures
- Input sanitization prevents XSS attacks
- Rate limiting prevents message spam
- CSRF token protection for form submissions
- Password strength validation (8+ chars, uppercase, lowercase, number)
- Email format validation
- Injection attempt detection
- HTTPS enforcement in production

## 📋 How to Use FaithGPT

### First Time User
1. **Sign Up**: Click "Don't have an account? Sign up"
2. **Enter Information**: Provide first name, last name, email, date of birth, and strong password
3. **Verify Email**: Check email for verification (if using email provider)
4. **Start Chatting**: Begin conversation with FaithGPT

### Regular User
1. **Log In**: Enter email and password, or use social login
2. **Chat**: Type messages and receive compassionate, faith-based responses
3. **Settings**: Customize tone, Bible version, and background theme
4. **Export**: Download conversations as JSON for backup
5. **Clear**: Delete conversation history from device

### Crisis Support
If discussing mental health crisis:
1. FaithGPT immediately provides compassionate support
2. Offers relevant Bible verses and prayers
3. Provides links to 988 (Suicide & Crisis Lifeline)
4. Encourages contacting professional mental health providers
5. Always safe, never dismissive of serious concerns

## 🔗 Resources Included

### Bible Verses (Categorized)
- Anxiety & Worry: 1 Peter 5:7, Philippians 4:6, Matthew 6:34
- Loneliness: Hebrews 13:5, Psalm 34:18, Matthew 11:28
- Depression: Psalm 23:1, Psalm 42:11, Psalm 30:5
- Grief: Psalm 34:18, Matthew 5:4, John 11:35
- Guilt & Shame: 1 John 1:9, Ephesians 4:32, Romans 8:1
- Anger: Ephesians 4:26, Proverbs 15:1, Ephesians 4:31
- Purpose & Direction: Jeremiah 29:11, Proverbs 3:5-6, Colossians 3:23
- And many more...

### Music & Worship Links
- Hillsong Worship playlists
- Bethel Music recommendations
- Jesus Culture videos
- Elevation Worship content
- Topic-specific worship collections

### Preaching Resources
- TD Jakes sermons
- Joyce Meyer teachings
- John MacArthur studies
- Priscilla Shirer messages
- Short-form faith content

## 🛠️ Configuration

### Environment Variables
See `.env.example` for all available options:

```env
# Firebase (required)
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID

# Security
VITE_ENCRYPTION_KEY (change in production!)

# Analytics
VITE_GOOGLE_ANALYTICS_ID (optional)

# Environment
VITE_ENV=development|production
```

### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project
3. Enable Authentication (Email/Password, Google, Apple, Microsoft)
4. Create Firestore Database
5. Set up Security Rules (use provided defaults)
6. Copy credentials to `.env`

### Customize AI Responses
Edit `src/faithgpt.js` to:
- Add new topics and keywords
- Customize Bible verses for each topic
- Adjust tone and voice
- Add new response types
- Modify media recommendations

## 📱 Responsive Design

Works perfectly on:
- **Desktop**: Full featured experience
- **Tablet**: Optimized layout with touch controls
- **Mobile**: Responsive design with fast loading

## 🔐 Security Best Practices

### For Users
- Use strong, unique passwords (8+ characters)
- Enable two-factor authentication if available
- Don't share sensitive information in public chats
- Clear conversations after discussing sensitive topics
- Review privacy policy before sharing personal information
- Report security issues to: security@faithgpt.example.com

### For Developers
- Change `VITE_ENCRYPTION_KEY` in production
- Use environment variables for all secrets
- Enable Firebase Security Rules before production
- Implement rate limiting on backend
- Enable HTTPS in production
- Regularly update dependencies
- Audit Firebase Firestore rules
- Use Content Security Policy headers

## 📊 Analytics & Privacy

FaithGPT collects minimal analytics:
- **Tracked**: Message count, response time, user actions, topics
- **NOT Tracked**: Message content, personal information, identifying data
- **Aggregated**: All analytics are anonymized and aggregated
- **User Control**: Users can opt-out in Settings
- **Deletion**: Analytics deleted with account deletion

## ⚠️ Limitations & Disclaimers

**FaithGPT is NOT a substitute for professional mental health care.**

If you or someone you know is:
- Experiencing suicidal thoughts
- In immediate danger
- Dealing with severe mental illness
- Suffering from addiction
- Experiencing abuse or trauma

**Please reach out to:**
- **988 Suicide & Crisis Lifeline** (US): Call or text 988
- **Crisis Text Line**: Text HOME to 741741
- **Emergency Services**: Call 911 (US) or your local emergency number
- **Local Mental Health Professional**: Therapist, psychiatrist, counselor
- **Your Pastor or Religious Leader**: Spiritual guidance and support
- **National Domestic Violence Hotline**: 1-800-799-7233
- **SAMHSA National Helpline** (Substance Abuse): 1-800-662-4357

## 🤝 Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source. See `LICENSE` file for details.

## 🙏 Values & Mission

FaithGPT operates on core principles:

- **✝️ Spiritually Grounded**: Every response rooted in Christian Scripture and values
- **🫂 Deeply Empathetic**: Warmth, genuine understanding, authentic connection
- **🛡️ Safe & Responsible**: Never pretends to be therapist, detects crises, directs to professional help
- **📚 Well-Informed**: Curated verses, biblical examples, credible resources
- **🙏 Prayerful**: Includes prayers, encourages personal prayer, connects to faith communities
- **🔐 Privacy-Focused**: User data encrypted, never sold, fully user-controlled
- **💪 Empowering**: Gives tools for spiritual growth, mental wellness, purpose discovery

## 📞 Support & Contact

- **Email**: support@faithgpt.example.com
- **Privacy Concerns**: privacy@faithgpt.example.com
- **Security Issues**: security@faithgpt.example.com
- **Website**: www.faithgpt.example.com
- **GitHub Issues**: [Report a bug](https://github.com/EthanMCT09/Christian-AI-helper/issues)

---

**FaithGPT — Made with faith, compassion, and the hope that everyone knows they are deeply loved and valued by God.**

*"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." — John 3:16*

*"Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, 'This is the way; walk in it.'" — Isaiah 30:21*
