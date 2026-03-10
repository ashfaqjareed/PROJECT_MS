const firebaseConfig = {
    apiKey: "AIzaSyDpVi97KqhRHf24Q8LsJ85NQsXUTQNSk9U",
    authDomain: "multi-super.firebaseapp.com",
    projectId: "multi-super",
    storageBucket: "multi-super.firebasestorage.app",
    messagingSenderId: "59719357330",
    appId: "1:59719357330:web:dc8be429c3dff4d340a74b",
    measurementId: "G-LTRT8Z6PH7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
