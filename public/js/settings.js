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

const auth = firebase.auth();
//variable for forgot password email field
const conf = document.getElementById("confirmation");
//variable for delete button
const dbutton = document.getElementById("delb");

//function for delting user
function deleteu(){ 
  const confp = conf.value;
  if (confp == "Yes"){
alert('your account has been deleted');
window.location.replace("https://behavior-analysis-tracker.web.app");
alert('your account has been deleted');


const user = firebase.auth().currentUser;
user.delete().then(function hey() {
}).catch(function(error) {
  // An error happened.
});
}}
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
const updatep = () => {
const uppass = newPassword.value;
const user = firebase.auth().currentUser;
user.updatePassword(uppass).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.*/
})}

newpass.addEventListener('click', updatep);


