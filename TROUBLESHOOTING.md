# FaithGPT Troubleshooting Guide

## Common Issues & Solutions

### ❌ "Unable to create account: Firebase: Error (auth/network-request-failed)"

**Root Cause:** Firebase credentials are missing or invalid in your `.env` file.

**Solution:**

1. **Copy `.env.example` to `.env`:**
   ```bash
   cp .env.example .env
   ```

2. **Get your Firebase credentials:**
   - Go to https://console.firebase.google.com
   - Select your project
   - Click **Project Settings** (gear icon) → **General**
   - Scroll to **Your apps** and click the Web app
   - Copy the Firebase config object

3. **Fill in your `.env` file:**
   ```env
   VITE_FIREBASE_API_KEY=YOUR_API_KEY_HERE
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=1:your-app-id:web:your-web-config-id
   ```

4. **Restart the dev server:**
   ```bash
   npm run dev
   ```

---

### ❌ "This email is already registered. Please log in instead."

**Root Cause:** The email already exists in Firebase.

**Solution:**
- Use the **Log In** page instead
- If you forgot the password, contact your Firebase administrator
- Or delete the user from Firebase Console and try again

---

### ❌ "Please enter a valid email address."

**Root Cause:** Email format is invalid.

**Solution:**
- Use a standard email format: `yourname@example.com`
- Check for spaces or special characters

---

### ❌ "Password is too weak. Use at least 6 characters."

**Root Cause:** Password doesn't meet minimum requirements.

**Solution:**
- Use at least 6 characters
- Example: `MyPassword123`

---

### ❌ "Please enter your first and last name."

**Root Cause:** First name or last name field is empty.

**Solution:**
- Fill in both **First Name** and **Last Name** fields
- Don't use spaces only; enter actual names

---

### ❌ Sign-up button disabled or not responding

**Root Cause:** Form validation or loading state issue.

**Solution:**
1. Ensure all required fields are filled:
   - First Name
   - Last Name
   - Email
   - Password
   - Confirm Password
   - Date of Birth (optional but recommended)

2. Check browser console for errors:
   - Press `F12` to open Developer Tools
   - Go to **Console** tab
   - Look for red error messages

---

### ❌ "Access granted — Redirecting..." but stuck on sign-up page

**Root Cause:** Firebase auth state not propagating properly.

**Solution:**
1. Wait 2-3 seconds (the redirect delay is intentional)
2. Refresh the page (`F5` or `Cmd+R`)
3. Check that Firebase credentials are valid in `.env`
4. Clear browser cache and cookies:
   - Press `F12` → **Application** tab
   - Delete all cookies and localStorage for `localhost:5173`
   - Refresh the page

---

### ❌ Blank login/signup page or nothing loads

**Root Cause:** Dev server not running or wrong URL.

**Solution:**
1. Make sure dev server is running:
   ```bash
   npm run dev
   ```

2. Open the correct URL:
   - http://localhost:5173/Christian-AI-helper/
   - NOT http://localhost:8080

3. If page is still blank:
   - Open browser console (`F12`)
   - Check for JavaScript errors
   - Look for Firebase initialization messages

---

### ❌ "Firebase is not configured. Running in development mode without auth."

**Root Cause:** Firebase credentials are missing (warning, not error).

**Solution:**
- Same as "network-request-failed" error above
- Add Firebase credentials to `.env` and restart

---

### ❌ Can login but chat page doesn't load

**Root Cause:** Lazy-loaded Chat component failing or Firebase Firestore not accessible.

**Solution:**
1. Check browser console for errors
2. Ensure Firestore is enabled in Firebase Console:
   - Firebase Console → **Firestore Database**
   - Click **Create Database**
   - Use default settings

3. Ensure auth rules allow reads/writes:
   - Go to **Firestore Database** → **Rules**
   - Use these rules:
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

---

### ❌ Google/Apple/Microsoft sign-in button shows error

**Root Cause:** OAuth providers not configured or redirect URI mismatch.

**Solution:**

**For Google:**
1. Firebase Console → **Authentication** → **Sign-in method**
2. Enable **Google**
3. Add OAuth Credential Redirect URIs:
   - http://localhost:5173/ (dev)
   - https://yourdomain.com/ (production)

**For Apple & Microsoft:**
- Contact your Firebase support or use Email/Password for now
- OAuth provider setup requires additional console configuration

---

## Debugging Tips

### 1. Check Browser Console
```
Press F12 → Console tab
Look for error messages with red background
```

### 2. Check Dev Server Logs
Look at terminal output where you ran `npm run dev`:
```bash
[vite] page reload src/App.jsx
[vite] hmr update /src/...
```

### 3. Verify `.env` File
```bash
# Check that .env exists (not .env.example)
ls -la .env

# Verify credentials are filled in
cat .env
```

### 4. Clear Cache
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### 5. Restart Everything
```bash
# Kill dev server (Ctrl+C)
# Clear browser cache (F12 → Application → Clear)
# Restart dev server
npm run dev
```

---

## Firebase Setup Checklist

- [ ] Firebase project created at console.firebase.google.com
- [ ] Web app registered in Firebase project
- [ ] `.env` file created (copied from `.env.example`)
- [ ] Firebase credentials filled into `.env`
- [ ] Firebase Authentication enabled
- [ ] Google (or other) sign-in provider enabled (optional)
- [ ] Firestore Database created
- [ ] Firestore rules configured (see above)
- [ ] Dev server restarted after `.env` changes

---

## Still Having Issues?

1. **Check the logs:**
   - Browser console (`F12`)
   - Terminal output (`npm run dev`)

2. **Verify Firebase credentials:**
   - Go to https://console.firebase.google.com
   - Check that your project and app are active
   - Copy credentials again and verify they match `.env`

3. **Test with a fresh account:**
   - Use a different email for sign-up
   - Check Firebase Console → Authentication → Users to see created accounts

4. **Check network connectivity:**
   - Open browser Network tab (`F12` → Network)
   - Try signing up and look for failed requests
   - Failed Firebase API calls indicate a credentials or connectivity issue

---

## Contact & Support

For persistent issues:
1. Check this troubleshooting guide completely
2. Review `.env` file setup
3. Ensure Firebase project is active
4. Check Firebase Console for error logs
