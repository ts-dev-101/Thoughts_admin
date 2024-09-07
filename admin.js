import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";



// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXysLXql-3xkmC40ahDCTXoj3lXKo8ZUs",
  authDomain: "anything-aaf47.firebaseapp.com",
  projectId: "anything-aaf47",
  storageBucket: "anything-aaf47.appspot.com",
  messagingSenderId: "580140263",
  appId: "1:580140263:web:03048fa1f8b5a9b0847642",
  measurementId: "G-JH13NF4J3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Function to fetch and display visit data
function displayVisitData() {
  const visitsContainer = document.getElementById('visits-container');

  const visitsQuery = query(
    collection(db, 'visit'),
    orderBy('timestamp', 'desc') // Sort by timestamp in descending order
  );

  onSnapshot(visitsQuery, (snapshot) => {
    visitsContainer.innerHTML = '';

    if (snapshot.empty) {
      console.log("No visits found");
    } else {
      snapshot.forEach((doc) => {
        const visitData = doc.data();
        
        // Debugging logs
        console.log("Fetched visit data: ", visitData);

        const visitElement = document.createElement('div');
        visitElement.className = 'visit-box';

        const timestamp = visitData.timestamp?.seconds
          ? new Date(visitData.timestamp.seconds * 1000).toLocaleString()
          : 'Timestamp not available';

        visitElement.innerHTML = `
          <p><strong>IP:</strong> ${visitData.ip || 'Unknown'}</p>
          <p><strong>Browser Info:</strong> ${visitData.browserInfo?.userAgent || 'Unknown'}, ${visitData.browserInfo?.platform || 'Unknown'}</p>
          <p><strong>Timestamp:</strong> ${timestamp}</p>
        `;
        visitsContainer.appendChild(visitElement);
      });
    }
  }, (error) => {
    console.error("Error fetching visit data: ", error);
  });
}




// Fetch and display visit data on page load
window.onload = displayVisitData;