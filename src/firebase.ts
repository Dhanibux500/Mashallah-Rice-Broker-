import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  doc,
  getDocFromServer,
} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Connect to the provisioned database ID with persistent cache and experimentalForceLongPolling to avoid 10-second timeout on 3G / mobile networks
export const db = initializeFirestore(
  app,
  {
    experimentalForceLongPolling: true,
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
  },
  firebaseConfig.firestoreDatabaseId || undefined
);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export async function signInWithGooglePopup() {
  return await signInWithPopup(auth, googleProvider);
}

// Connection test helper with defensive timeout to prevent 10s hang on slow 3G/offline
export async function testFirestoreConnection() {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('the client is offline (timeout)')), 3500)
    );
    await Promise.race([
      getDocFromServer(doc(db, 'test', 'connection')),
      timeoutPromise,
    ]);
    console.log('[Firestore] Connected to online database successfully.');
  } catch (error) {
    if (error instanceof Error && (error.message.includes('offline') || error.message.includes('timeout'))) {
      console.warn('[Firestore] Operating with resilient local cache & long-polling.');
    } else {
      console.log('[Firestore] Ready.');
    }
  }
}

