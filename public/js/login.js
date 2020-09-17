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
  const auth = firebase.auth();
 
//Signs In User
function signIn(){
  
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    alert("Signed In " + email.value);

    window.open("https://behavior-analysis-tracker.web.app/loggedIn.html"); //loggedin.html;
 }

 //Checks If Auth Status has changed
 
 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
   alert("You are signed in");
  } else { 
    alert("not signed in");
  }
});
    
  //Signs Out User
   
   function signOut(){
    
    firebase.auth.signOut();
    alert("Signed Out");
    
  };
   
  