// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", function () {
    const googleLogin = document.getElementById('google-btn');
    if (googleLogin) {
        googleLogin.addEventListener("click", function () {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    console.log(user);
                    window.location.href = '../templates/tp/index.html';
                })
                .catch((error) => {
                    console.error("Error signing in with Google:", error.message);
                });
        });
    } else {
        console.error('Google button not found');
    }

    function showMessage(message, divID) {
        var messageDiv = document.getElementById(divID);
        if (messageDiv) {
            messageDiv.style.display = "block";
            messageDiv.innerHTML = message;
            messageDiv.style.opacity = 1;
            setTimeout(function () {
                messageDiv.style.opacity = 0;
            }, 5000);
        }
    }

    // Email signUp
    const singUp = document.getElementById('submitSingUp');
    singUp.addEventListener('click', (event) => {
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
                showMessage('Account Created Successfully', 'singUpMessage');
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
                    showMessage('Email Address already Exists!!!', 'singUpMessage');
                } else {
                    showMessage('Error Creating Account', 'singUpMessage');
                }
            });
    });

    // Email signIn
    const singIn = document.getElementById('submitSingIn');
    singIn.addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const auth = getAuth();
        const db = getFirestore();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                showMessage('Login Successful', 'singInMessage');
                const user = userCredential.user;
                localStorage.setItem('loggedInUserId', user.uid);
                window.location.href = '../templates/tp/index.html';
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/invalid-credential') {
                    showMessage('Invalid Email or Password', 'singInMessage');
                } else {
                    showMessage('Account does not Exist', 'singInMessage');
                }
            });
    });
});
