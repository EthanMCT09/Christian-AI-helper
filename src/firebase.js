import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - uses environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validate Firebase configuration
const isConfigured = Object.values(firebaseConfig).every(val => val && val !== 'undefined');

if (!isConfigured) {
  if (import.meta.env.PROD) {
    console.error('❌ CRITICAL: Firebase is not configured!');
    console.error('📋 Setup Instructions:');
    console.error('1. Copy .env.example to .env in the project root');
    console.error('2. Go to https://console.firebase.google.com');
    console.error('3. Get your Firebase project credentials');
    console.error('4. Fill in the VITE_FIREBASE_* variables in .env');
    console.error('5. Restart the application');
    throw new Error('Firebase configuration is missing. See console for setup instructions.');
  } else {
    // Development mode: warn but don't crash
    console.warn('⚠️  Firebase credentials not configured');
    console.warn('📋 To enable auth features:');
    console.warn('   1. cp .env.example .env');
    console.warn('   2. Add Firebase credentials to .env');
    console.warn('   3. Restart: npm run dev');
    console.warn('');
    console.warn('🔗 Get credentials at: https://console.firebase.google.com');
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Enable Firebase emulator in development (optional)
// COMMENTED OUT: Using real Firebase instead of local emulators
// Uncomment these lines ONLY if you're running Firebase emulators locally
// if (import.meta.env.DEV) {
//   try {
//     connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
//   } catch (e) {
//     // Emulator already connected
//   }

//   try {
//     connectFirestoreEmulator(db, 'localhost', 8080);
//   } catch (e) {
//     // Emulator already connected
//   }
// }

export default app;
