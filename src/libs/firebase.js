import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from 'src/config';

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

// Firebase context API
// export const FirebaseContext = createContext();
// export const useFirebaseData = () => useContext(FirebaseContext);
