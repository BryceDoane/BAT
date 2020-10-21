
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
var studentModal = document.getElementById("studentModal");

// Get the button that opens the modal
var addStudentbtn = document.getElementById("addStudentModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
addStudentbtn.onclick = function () {
  studentModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  studentModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == studentModal) {
    studentModal.style.display = "none";
  }
}
function close() {
  studentModal.style.display = "none";
}

var uid;
var userEmail;
var userSchool;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    uid = user.uid;
    userSchool = user.school;
    email = user.email;
    console.log(userSchool);
  } else {
    // No user is signed in.
  }
});


//Takes in student name from modal form
function newStudent() {
  var dCheck = true;
  var IDList = [];
  var studentName = document.getElementById("studentName").value;
  var studentID = document.getElementById("studentID").value;
  studentModal.style.display = "none";
  //TODO: pull school name from user
  firebase.database().ref('student').orderByChild('studentID').on("child_added", function(snapshot) {
    IDList.push(snapshot.val().studentID);
});
for(i = 0; i <= IDList.length; i++){
  if(IDList[i] == (studentID)){
    alert("A student with that ID already exists");
    dCheck = false;
    console.log(dCheck);
    location.reload();
    break;
  }
}
console.log(dCheck);
  if (dCheck == true){
    firebase.database().ref('student').push({ studentName: studentName, studentID: studentID, schoolName: userSchool });
    location.reload();
    //studentID = null;
  }
  
}

//Fills student info to webpage
var studentRef = firebase.database().ref('student');
var students = [];
var studentList;
studentRef.on('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var childData = childSnapshot.val();
    studentRef.on('child_added', function (snapshot) {
      //Do something with the data
      //document.getElementById("classNameLi").innerHTML = childData.className;

    });
    students.push(childData.studentName);
    studentList = students.toString();

  });
  document.getElementById("studentNameLi").innerHTML = studentList;
});

//log out functionality on top right
function signout(){firebase.auth().signOut();
  alert("signed out");};
const sout = document.getElementById("lout");
sout.addEventListener('click', signout);

//gets signed in user
firebase.auth().onAuthStateChanged(function (user) {
  if (user != null) {
    document.getElementById("linu").innerHTML = user.email;
  } else {
    document.getElementById("linu");
  }
})