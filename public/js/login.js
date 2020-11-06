  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB9Y2gGnOUC9tG_4piaqqCEhMxdi5yxQDI",
    authDomain: "behavior-analysis-tracker.firebaseapp.com",
    databaseURL: "https://behavior-analysis-tracker.firebaseio.com",
    projectId: "behavior-analysis-tracker",
    storageBucket: "behavior-analysis-tracker.appspot.com",
    messagingSenderId: "392015561610",
    appId: "1:392015561610:web:d9d2686cb3c9b312e4fe73",
    measurementId: "G-EM4XVKW2YS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

/**
     * Handles the sign in button press.
     */
    function toggleSignIn() {
      if (firebase.auth().currentUser) {
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
      } else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
      alert('Please enter an email address.');
      return;
      }
      if (password.length < 4) {
      alert('Please enter a password.');
      return;
      }
      
        //
      // Sign in with email and pass.
      // [START authwithemail]
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
      } else {
      alert(errorMessage);
      }
      console.log(error);
      document.getElementById('loginbtn').disabled = false;
      // [END_EXCLUDE]
      });
      // [END authwithemail]
      }
      document.getElementById('loginbtn').disabled = true;
      }
      /**
           * initApp handles setting up UI event listeners and registering Firebase auth listeners:
           *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
           *    out, and that is where we update the UI.
           */
      function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      // User is signed in.
      var email = user.email;
      alert("signed in as " + email);
      // document.getElementById('signed-in-user').textContent = email;
      // document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      // document.getElementById('loginbtn').textContent = 'Sign out';
      window.location = "/public/dashboard.html";

      // [END_EXCLUDE]
      } else {
      // User is signed out.
      // [START_EXCLUDE]
      // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      // document.getElementById('loginbtn').textContent = 'Sign in';
      // document.getElementById('signed-in-user').textContent = "";
      console.log("signed out");
      // [END_EXCLUDE]
      }
      // [START_EXCLUDE silent]
      document.getElementById('loginbtn').disabled = false;
      // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('loginbtn').addEventListener('click', toggleSignIn, false);
      }
      window.onload = function() {
      initApp();
      };


      // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const auth = firebase.auth();
//variable for forgot password email field
const sub = document.getElementById("emailf");
//variable for submit button to forgot password
const fbutton = document.getElementById("fpass");

//function for password reset
const reset = () => { 
  const rmail = sub.value;
//sends password reset email 
  auth.sendPasswordResetEmail(rmail)
  .then(() => {
    alert('password reset sent!');
  // Email sent.
})
.catch(error => {
  console.log('error');
  
})}
//listens for click to submit button for forgot password
fbutton.addEventListener('click', reset);

function newClass() {
  var className = document.getElementById("className");
  console.log(className);
}

//Makes the user logged out once the session has ended (tab has closed)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

   
  