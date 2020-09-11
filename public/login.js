var ui = new firebaseui.auth.AuthUI(firebase.auth());
const firebaseConfig = {
    apiKey: "AIzaSyB9Y2gGnOUC9tG_4piaqqCEhMxdi5yxQDI",
    authDomain: "behavior-analysis-tracker.firebaseapp.com",
    databaseURL: "https://behavior-analysis-tracker.firebaseio.com",
    projectId: "behavior-analysis-tracker",
    storageBucket: "behavior-analysis-tracker.appspot.com",
    messagingSenderId: "392015561610",
    appId: "1:392015561610:web:d9d2686cb3c9b312e4fe73",
    measurementId: "G-EM4XVKW2YS"
  };

  firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('users');

// Listen for form submit
document.getElementById('signup').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var fname = getInputVal('fname');
  var lname = getInputVal('lname');
  var email = getInputVal('email');
  var password = getInputVal('password');
  

  // Save user
  saveMessage(fname, lname, email, password);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('signup').reset();
}

// Function to get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save user to firebase
function saveMessage(fname, lname, email, password){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    fname: fname,
    lname:lname,
    email:email,
    password:password
  });
}