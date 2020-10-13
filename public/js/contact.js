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


// Listen for form submit
document.getElementById('contact').addEventListener('sendIt', submitForm);


// Submit form
function submitForm(e){
  e.preventDefault();
  // Get values
  var fname = getInputVal('fname');
  var email = getInputVal('email');
  var topic = getInputVal('topic'); 
  var association = getInputVal('association'); 
  var message = getInputVal('message'); 

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
//FUnction to compile message and mail it
function sendIt(fname, email, topic, association, message){
  //var msg = "Name: " + fname + '\n' + 'Email:' + email + '\n'
  //+ "Topic: " + topic + '\n' + "School or Company: " + association + '\n' + message;
  mail("BehavvTracker@gmail.com","Customer Support", msg);
}

