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

//function verifyEmail(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var user = auth.currentUser();
      console.log("true");
      var emailVerified = user.emailVerified;
      var uid = user.uid;
      var email = user.email;
      if (emailVerified == true){
        alert("Email verified");
      }
    }else {
        console.log("false");
    }
})
//}
function verifyEmail(){
    var user = firebase.auth().currentUser;
    console.log(user);
    user.sendEmailVerification().then(function() {
}).catch(function(error) {
    alert(error);
      // An error happened.
    });
}