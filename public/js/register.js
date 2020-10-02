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

// Reference messages collection
var messagesRef = firebase.database().ref('user');
var loginTest = firebase.database().ref('user')


// Listen for form submit
document.getElementById('signup').addEventListener('submit', submitForm);


// Submit form
function submitForm(e){
  e.preventDefault();
  // Get values
  var fname = getInputVal('fname');
  var email = getInputVal('email');
  var password = getInputVal('password'); 
  var password2 = getInputVal('password2'); 
  if (password != password2) {
    alert('Password do not match');
    return;
    }
  
  
  saveMessage(fname,email,password);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  // document.getElementById('signup').reset();


}

// Function to get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(fname, email, password){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/email-already-in-use') {
      alert('Email already in use');
    } 
    
    else {
      alert(errorMessage);
    }

    // ...
  });

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var uid = user.uid;
    firebase.database().ref('user').push({name:fname, email: email, uid: uid});
}
});

/*function saveUser(fname, email){
  var user = firebase.auth().currentUser;
  if (user) {
    // User is signed in.
    var uid = user.uid;
    firebase.database().ref('user').push({name:fname, email: email, uid: uid});
  
  }else{
    var uid = user.uid;
  }
}
  //Listens for the login action on login button
  document.getElementById('login').addEventListener('login', submitForm);

  function submitForm(e){
    e.preventDefault();
  
      // Get values
    var email = getInputVal('loginEmail');
    var password = getInputVal('loginPassword');

    
    saveLogin(email,password);
  
    // Show alert
    document.querySelector('.alert').style.display = 'block';
  
    // Hide alert after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').style.display = 'none';
    },3000);
  
    // Clear form
    document.getElementById('login').reset();
  
  }
  
  // Function to get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
  

  var databaseEmail = firebase.database().ref(email);
  var databaseName = firebase.database().ref(name);
    function loginTest(email, fname){
      var loginTest = loginTest.push();
      loginTest.push(email, fname);
 }
 */