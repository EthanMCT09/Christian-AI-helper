# FaithGPT Deployment & Setup Guide

This guide covers everything you need to set up and deploy FaithGPT.

## Table of Contents
1. [Firebase Setup](#firebase-setup)
2. [Local Development](#local-development)
3. [Production Deployment](#production-deployment)
4. [Environment Configuration](#environment-configuration)
5. [Security Hardening](#security-hardening)
6. [Troubleshooting](#troubleshooting)

---

## Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"**
3. Enter project name: `faithgpt` (or your preferred name)
4. Select location
5. Create the project (wait 1-2 minutes)

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **"Get started"** (if first time)
3. **Enable these sign-in methods:**
   - **Email/Password**: Click to enable
   - **Google**: Click to enable, add your app name
   - **Apple**: Click to enable, requires Apple developer account
   - **Microsoft**: Click to enable, add your tenant info

### Step 3: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll restrict with rules)
4. Select location (same as project)
5. Click **"Enable"**

### Step 4: Set Up Firestore Security Rules

1. In Firestore, go to **Rules** tab
2. Replace rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - each user can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      
      // User preferences
      match /preferences/{document=**} {
        allow read, write: if request.auth.uid == userId;
      }
      
      // User conversations (stored encrypted)
      match /conversations/{document=**} {
        allow read, write: if request.auth.uid == userId;
      }
    }
    
    // Analytics (write-only from frontend)
    match /analytics/{userId} {
      allow write: if request.auth.uid == userId;
      allow read: if false; // Only admins can read
    }
    
    // Default deny
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click **"Publish"**

### Step 5: Get Firebase Credentials

1. In Firebase Console, click **"Project Settings"** (gear icon)
2. Go to **"Your apps"** section
3. Find Web app, click copy icon next to SDK config
4. Copy the config object:

```javascript
{
  "apiKey": "YOUR_API_KEY",
  "authDomain": "YOUR_AUTH_DOMAIN",
  "projectId": "YOUR_PROJECT_ID",
  "storageBucket": "YOUR_STORAGE_BUCKET",
  "messagingSenderId": "YOUR_SENDER_ID",
  "appId": "YOUR_APP_ID"
}
```

---

## Local Development

### Step 1: Install Dependencies

```bash
# Navigate to project
cd /Users/miakeompyuteo/CodingProjects/HelloWorld

# Install npm packages
npm install
```

### Step 2: Configure Environment

1. Create `.env` file in project root:

```bash
cp .env.example .env
```

2. Edit `.env` with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# IMPORTANT: Change this for production!
VITE_ENCRYPTION_KEY=faithgpt-secret-key-change-in-production-2025

# Optional: Analytics
VITE_GOOGLE_ANALYTICS_ID=G_YOUR_GA_ID

# Environment
VITE_ENV=development
```

### Step 3: Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173/Christian-AI-helper/`

### Step 4: Test Features

1. **Sign Up**: Create new account with email/password
2. **Log In**: Log in with created account
3. **Chat**: Send messages and verify responses
4. **Settings**: Test different tone/Bible version/theme options
5. **Export**: Export conversation and verify file
6. **Clear**: Clear conversation and verify deletion
7. **Logout**: Confirm logout and return to login

---

## Production Deployment

### Option 1: GitHub Pages Deployment

```bash
# Build production bundle
npm run build

# Deploy to GitHub Pages
npm run deploy
```

App will be deployed to: `https://EthanMCT09.github.io/Christian-AI-helper/`

### Option 2: Firebase Hosting Deployment

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Build app
npm run build

# Deploy
firebase deploy
```

### Option 3: Vercel / Netlify Deployment

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## Environment Configuration

### Development Environment
```env
VITE_ENV=development
VITE_FIREBASE_API_KEY=your-dev-key
# ... other dev credentials
VITE_ENCRYPTION_KEY=dev-encryption-key
```

### Production Environment
```env
VITE_ENV=production
VITE_FIREBASE_API_KEY=your-prod-key
# ... other prod credentials
VITE_ENCRYPTION_KEY=strong-random-encryption-key-min-32-chars
```

**Generate strong encryption key:**
```bash
# On Mac/Linux
openssl rand -base64 32

# Or use Python
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

---

## Security Hardening

### 1. Update Encryption Key

```bash
# Generate new strong key
openssl rand -base64 32

# Update in .env (PRODUCTION ONLY!)
VITE_ENCRYPTION_KEY=your-new-strong-key
```

### 2. Configure CORS Headers

For backend (if using Node/Express):

```javascript
const cors = require('cors');
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

### 3. Add Security Headers

For Vite production:

```javascript
// vite.config.js
export default {
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    }
  }
};
```

### 4. Enable HTTPS

- **GitHub Pages**: Automatically enabled
- **Firebase Hosting**: Automatically enabled
- **Custom Domain**: Use Let's Encrypt for free SSL/TLS

### 5. Regular Security Updates

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update packages
npm update

# Check outdated packages
npm outdated
```

### 6. Firebase Security Rules Review

1. Monthly: Review Firestore security rules
2. Check: Enable Security Rules audit logs
3. Monitor: Firestore data access patterns
4. Update: Add/modify rules as needed

---

## Troubleshooting

### Issue: "Firebase config invalid"
**Solution:**
```bash
# Verify .env file exists and has correct credentials
cat .env

# Check Firebase Console for correct values
# Make sure VITE_ prefix is used (not REACT_APP_)
```

### Issue: "Authentication not working"
**Solution:**
1. Check Firebase Console > Authentication > Enabled providers
2. Verify email/password is enabled
3. Check OAuth provider configs (Google, Apple, Microsoft)
4. Verify redirect URLs are correct
5. Clear browser localStorage and try again

### Issue: "Conversations not saving"
**Solution:**
1. Check browser console for errors
2. Verify Firestore is created and initialized
3. Check Firestore Security Rules allow write access
4. Verify localStorage is enabled in browser
5. Check that encryption module is working

### Issue: "Build fails"
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run build
```

### Issue: "Deployment fails to GitHub Pages"
**Solution:**
1. Check vite.config.js has correct base path
2. Verify GitHub repo settings allow Pages deployment
3. Check deployment branch is correct
4. Run `npm run build` locally to verify build works
5. Check `.env` has valid Firebase credentials

### Issue: "Slow performance in production"
**Solution:**
```bash
# Analyze bundle size
npm install -D rollup-plugin-visualizer

# Check Chrome DevTools Performance tab
# Reduce number of context messages (now 10, can reduce to 5)
# Enable gzip compression in web server
# Use CDN for static assets
```

### Issue: "Login redirects to blank page"
**Solution:**
1. Check OAuth redirect URLs in Firebase Console
2. For Google: Add http://localhost:5173 and production URL
3. For Apple: Verify domain is verified
4. For Microsoft: Check tenant configuration
5. Clear browser cookies and try again

### Issue: "User data not persisting across sessions"
**Solution:**
1. Check Firestore database exists
2. Verify user document is created in Firestore
3. Check Security Rules allow user to read their data
4. Verify browser localStorage is enabled
5. Check for any console errors during login

---

## Monitoring & Maintenance

### Weekly Tasks
- Monitor Firebase usage/costs in console
- Check error logs in browser console
- Test login with different providers
- Verify conversations save and encrypt properly

### Monthly Tasks
- Update npm dependencies: `npm update`
- Review Firebase Security Rules
- Check analytics dashboard
- Review user feedback

### Quarterly Tasks
- Full security audit
- Update encryption key (if needed)
- Performance optimization
- Backup user data (export from Firestore)

### Annually Tasks
- Update all major dependencies
- Conduct security penetration testing
- Review and update privacy policy
- Audit Firebase costs and optimization

---

## Support & Resources

- **Firebase Docs**: https://firebase.google.com/docs
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Tailwind Docs**: https://tailwindcss.com/docs

---

## Next Steps

1. ✅ Complete Firebase setup
2. ✅ Configure .env with your credentials
3. ✅ Run locally with `npm run dev`
4. ✅ Test all authentication methods
5. ✅ Test conversation encryption
6. ✅ Deploy to production
7. ✅ Monitor and maintain

**Questions?** Check the main README or reach out to: support@faithgpt.example.com
