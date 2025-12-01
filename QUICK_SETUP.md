# FaithGPT Quick Start Setup

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup Firebase (REQUIRED for Auth)
1. Go to https://console.firebase.google.com
2. Create a new project or select an existing one
3. Register a Web app in your project
4. Copy your Firebase config

### Step 3: Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your Firebase credentials
# (Replace YOUR_API_KEY_HERE, etc. with actual values)
```

**Your `.env` file should look like:**
```env
VITE_FIREBASE_API_KEY=AIzaSyDxxx...
VITE_FIREBASE_AUTH_DOMAIN=my-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=my-project-id
VITE_FIREBASE_STORAGE_BUCKET=my-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123...
VITE_ENCRYPTION_KEY=change-this-to-a-secure-key
```

### Step 4: Start Development Server
```bash
npm run dev
```

Open: http://localhost:5173/Christian-AI-helper/

### Step 5: Test Sign-Up/Login

**Sign Up:**
- Fill in First Name, Last Name, Email, Password
- Click "Finished"
- Should see "Access granted — Redirecting..."
- Enter the Chat page with nature background

**Log In:**
- Enter email and password you just created
- Click "Log In"
- Should enter Chat page immediately

---

## 📋 Firebase Setup Checklist

### Authentication
- [ ] Firebase project created
- [ ] Web app registered
- [ ] Authentication enabled in Firebase Console
- [ ] Email/Password provider enabled
- [ ] `.env` file has valid `VITE_FIREBASE_*` variables

### Firestore (Optional but Recommended)
- [ ] Firestore Database created
- [ ] Security rules configured:
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{uid} {
        allow read, write: if request.auth.uid == uid;
      }
    }
  }
  ```

### OAuth (Optional)
- [ ] Google Sign-In enabled (optional)
- [ ] Redirect URI configured: http://localhost:5173/

---

## 🆘 Troubleshooting

### Issue: "auth/network-request-failed"
**Solution:** Firebase credentials missing or invalid
1. Check `.env` file exists and is filled
2. Verify credentials are correct in Firebase Console
3. Restart: `npm run dev`

### Issue: Sign-up page blank
**Solution:** Dev server not running
1. Open terminal
2. Run: `npm run dev`
3. Open: http://localhost:5173/Christian-AI-helper/

### Issue: "Firebase is not configured"
**Solution:** Missing `.env` file or wrong credentials
1. Run: `cp .env.example .env`
2. Fill in your Firebase credentials
3. Restart: `npm run dev`

---

## 🔐 Security Notes

1. **Never commit `.env` to version control** — it contains secrets
2. **Change `VITE_ENCRYPTION_KEY`** in production
3. **Use strong passwords** for Firebase project
4. **Enable 2FA** on Firebase account

---

## 📚 Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

---

## ✅ Verification Checklist

- [ ] `npm run dev` runs without errors
- [ ] Browser shows FaithGPT login page
- [ ] Can sign up with email/password
- [ ] "Access granted" message shows
- [ ] Chat page loads with nature background
- [ ] Welcome message appears: "Welcome! How may I assist you today?"
- [ ] Can send messages (if AI is configured)

---

## 🔗 Useful Links

- Firebase Console: https://console.firebase.google.com
- Firebase Docs: https://firebase.google.com/docs
- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev

---

## 💡 Next Steps

After setup works:
1. Configure AI responses (see `src/faithgpt.js`)
2. Add Google/Apple/Microsoft OAuth (Firebase Console)
3. Deploy to Firebase Hosting or Vercel
4. Set up analytics (optional)

Need help? Check `TROUBLESHOOTING.md` for common issues.
