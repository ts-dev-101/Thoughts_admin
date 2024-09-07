// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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

// Function to render items
function renderItems(snapshot) {
  const itemsContainer = document.getElementById('items-container');
  itemsContainer.innerHTML = '';

  snapshot.forEach((doc) => {
    const data = doc.data();
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.innerHTML = `
      <span>${data.text}</span>
      <div class="actionBtn">
        <button class="button" onclick="editItem('${doc.id}', '${data.text}')">Edit</button>
        <button class="button" onclick="deleteItem('${doc.id}')">Delete</button>
      </div>
    `;
    itemsContainer.appendChild(itemDiv);
  });
}

// Function to handle real-time updates
function setupRealtimeListener() {
  const postsRef = collection(db, 'posts'); // 'Posts' collection
  onSnapshot(postsRef, (snapshot) => {
    renderItems(snapshot);
  });
}

// Function to edit an item
window.editItem = async function(id, currentValue) {
  const newValue = prompt('Enter new value:', currentValue);
  if (newValue && newValue !== currentValue) {
    const itemRef = doc(db, 'posts', id);
    try {
      await updateDoc(itemRef, {
        text: newValue
      });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }
}

// Function to delete an item
window.deleteItem = async function(id) {
  const confirmDelete = confirm('Are you sure you want to delete this item?');
  if (confirmDelete) {
    const itemRef = doc(db, 'posts', id);
    try {
      await deleteDoc(itemRef);
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  }
}

// Initialize
setupRealtimeListener();