
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAolMiEi_A7hLXp5FGhyNpUSDuwnwMeHsQ",
  authDomain: "cdtm-hackathon-signup.firebaseapp.com",
  projectId: "cdtm-hackathon-signup",
  storageBucket: "cdtm-hackathon-signup.firebasestorage.app",
  messagingSenderId: "392130105700",
  appId: "1:392130105700:web:c5b3b0dd643772a9dcea71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Check if team name exists
export async function checkTeamName(teamName: string): Promise<boolean> {
  try {
    // Convert to lowercase as per database storage format
    const teamNameLower = teamName.toLowerCase().trim();
    
    // Query Firestore
    const teamsRef = collection(db, "Teams");
    const q = query(teamsRef, where("name", "==", teamNameLower));
    const querySnapshot = await getDocs(q);
    
    // If querySnapshot is not empty, team name exists
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking team name: ", error);
    throw error;
  }
}
