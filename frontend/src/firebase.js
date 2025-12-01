import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCYQtMJ6o0DMQur925vzY_0kI84mD0U5yc",
    authDomain: "frameratr-2d006-e41ab.firebaseapp.com",
    projectId: "frameratr-2d006-e41ab",
    storageBucket: "frameratr-2d006-e41ab.firebasestorage.app",
    messagingSenderId: "32619418632",
    appId: "1:32619418632:web:7f02a384bb2dc72416edb",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

export function waitForUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        if (user) resolve(user);
        else reject(new Error("User not signed in"));
      },
      reject
    );
  });
}
