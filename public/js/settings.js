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
var emailVerified;
var userSchool;
var uid;
//function verifyEmail(){
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var user = firebase.auth().currentUser;
    //console.log("true");
    emailVerified = user.emailVerified;
    uid = user.uid;
    userSchool = user.displayName;
    var email = user.email;
    document.getElementById("email").placeholder = email;
    document.getElementById("school").placeholder = userSchool;
    if (emailVerified == true) {
      document.getElementById("emailVerifiedBool").innerHTML = "True";
    }
  } else {
   window.location.replace("http://www.behavv.com");
  }
})
//}
function verifyEmail() {
  var user = firebase.auth().currentUser;
  //console.log(user);
  if (emailVerified == true) {
    alert("Error: Email already verified");
  } else {
    alert("Email alert sent");
    user.sendEmailVerification().then(function () {
    }).catch(function (error) {
      alert(error);
      // An error happened.
    });
  }
}

const auth = firebase.auth();
//variable for forgot password email field
const conf = document.getElementById("confirmation");
//variable for delete button
const dbutton = document.getElementById("delb");

var del ="";
//function for delting user
function deleteu() {
  const confp = conf.value;
  firebase.database().ref('Schools/' + userSchool + "/Users").orderByChild('uid').equalTo(uid).once("value", function(snapshot) {
    snapshot.forEach((function(child) {
      del = child.key;
     })); 
    firebase.database().ref('Schools/' + userSchool + "/Users/" + del).remove();
  });
  alert("Account Deleted");
  if (confp == "Yes") {
    const user = firebase.auth().currentUser;
    window.location = "https://behavior-analysis-tracker.web.app/login.html";
    user.delete().then(function hey() {
    }).catch(function (error) {
      // An error happened.
    });
  }
}
//listens for click to submit button for delete account
dbutton.addEventListener('click', deleteu);

  //log out functionality on top right
  function signout(){firebase.auth().signOut();
    alert("signed out");};
  const sout = document.getElementById("lout");
  sout.addEventListener('click', signout);
  


//update password functionality 
const newPassword = document.getElementById("newpassword");
const newpass = document.getElementById("submitnp");


  
  const reset = () => { 
    const newpass = document.getElementById("submitnp");
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      alert("password reset email has been sent");
    }).catch(function(error) {
      // An error happened.
    });}
  //listens for click to submit button for forgot password
  

newpass.addEventListener('click', reset);

/*const updatep = () => {
var user = firebase.auth().currentUser;
  var newPassword = document.getElementById("newpassword").value;
  

  user.updatePassword(newPassword).then(function() {
    // Update successful.
  }).catch(function(error) {
    
  });
  if(newPassword.length > 5) {alert("password has been updated");
  }
  else{alert("password needs to be more than 5 characters")}
}

newpass.addEventListener('click', updatep);

//Makes the user logged out once the session has ended (tab has closed)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function () {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });*/

//gets signed in user
firebase.auth().onAuthStateChanged(function (user) {
  if (user != null) {
    document.getElementById("linu").innerHTML = user.email;
  } else {
    document.getElementById("linu");
  }
})
