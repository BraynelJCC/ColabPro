// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBO036C1qXOP8H2eoLfce-O-cCx5T_PL18",
    authDomain: "colabpro-8e607.firebaseapp.com",
    projectId: "colabpro-8e607",
    storageBucket: "colabpro-8e607.appspot.com",
    messagingSenderId: "89721121841",
    appId: "1:89721121841:web:f94ab04006bac4758e7910"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divID) {
    var messageDiv = document.getElementById(divID);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

const singUp = document.getElementById('submitSingUp').addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.getElementById('rName').value;
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                name: name,
                email: email
            };
            showMessage('Account Created Succesfully', 'singUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = '../templates/fruit.html';
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                showMessage('Email Adress already Exists!!!', 'singUpMessage');
            }
            else {
                showMessage('Error Creating Account', 'singUpMessage');
            }
        });
});

