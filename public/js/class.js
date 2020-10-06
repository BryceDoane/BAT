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

// Get the modal
var classModal = document.getElementById("classModal");

// Get the button that opens the modal
var addClassbtn = document.getElementById("addClassModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
addClassbtn.onclick = function() {
  classModal.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  classModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == classModal) {
    classModal.style.display = "none";
  }
}

//Takes in class name from modal form
function newClass() {
    var className = document.getElementById("className").value;
    alert(className);
    classModal.style.display = "none";
    firebase.database().ref('classes').push({className:className, task:"temp"});
  }
  