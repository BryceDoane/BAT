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
addClassbtn.onclick = function () {
  classModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  classModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == classModal) {
    classModal.style.display = "none";
  }
}

//Declare Variables
var uid;
var userEmail;
var classes = [];
var tasks = [];

//User State Listener
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    uid = user.uid;
    console.log(uid);
    //userEmail = user.email;
  } else {
    // No user is signed in.
  }
});
var classAdded = false;
//Takes in class name from modal form
function newClass() {
  var className = document.getElementById("className").value;
  //var UID = user.uid;
  classModal.style.display = "none";
  firebase.database().ref('classes').push({ className: className, task: "temp", UID: uid });
  location.reload();
}

var classRef = firebase.database().ref('classes');
var classes = [];
var classesandtasks = [];
var classesList;
classRef.on('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var childData = childSnapshot.val();
    classRef.on('child_added', function (snapshot) {
      //Do something with the data
      //document.getElementById("classNameLi").innerHTML = childData.className;

    });
    classes.push(childData.className);
    classes.push(JSON.stringify(childData.Tasks));
    classesList = classes.toString();

  });
  for (i = 0; i < classes.length; i++){
    if (i % 2 == 0){
    var node = document.createElement('li');
    }else {
      var node = document.createElement('ul');
    }
    var textNode = document.createTextNode(classes[i]);
    node.appendChild(textNode);
    document.getElementById("classNameLi").appendChild(node);
  }
  //document.getElementById("classNameLi").innerHTML = classesList;
});

//log out functionality on top right
  function signout(){firebase.auth().signOut();
    alert("signed out");};
  const sout = document.getElementById("lout");
  sout.addEventListener('click', signout);

  //gets signed in user
firebase.auth().onAuthStateChanged(function (user) {
  if (user != null) {
    //document.getElementById("linu").innerHTML = user.email;
  } else {
    //document.getElementById("linu").innerHTML = user.email;
  }
})