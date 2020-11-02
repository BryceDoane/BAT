
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
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks on the button, open the modal 
addStudentbtn.onclick = function () {
  studentModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  studentModal.style.display = "none";
}
span2.onclick = function () {
  addStuClass.style.display = "none";
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
    userSchool = user.displayName;
    email = user.email;
    console.log(uid);
    console.log(email);
  }
  else {
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
  firebase.database().ref('Schools/' + userSchool + "/students/")
  //.child(studentName).set({ SUID: studentID, studentName: studentName });
  /* .on("child_added", function (snapshot) {
    IDList.push(snapshot.val().studentID);
  });*/
  for (i = 0; i <= IDList.length; i++) {
    if (IDList[i] == (studentID)) {
      alert("A student with that ID already exists");
      dCheck = false;
      console.log(dCheck);
      location.reload();
      break;
    }
  }
  console.log(dCheck);
  if (dCheck == true) {
    firebase.database().ref('Schools/' + userSchool + "/students/" + studentID + "/").set({ studentName: studentName, studentID: studentID });
    location.reload();
    //studentID = null;
  }

}

//Fills student info to webpage

var students = [];
var studentID = [];
var studentList;

firebase.auth().onAuthStateChanged(function (user) {
  userSchool = user.displayName;
  var studentRef = firebase.database().ref('Schools/' + userSchool + "/students");
  studentRef.on('value', function (snapshot) {
    console.log(snapshot);
    snapshot.forEach(function (childSnapshot) {
      console.log(childSnapshot);
      var childData = childSnapshot.val();

      studentRef.on('child_added', function (snapshot) {
        //Do something with the data
        //document.getElementById("classNameLi").innerHTML = childData.className;
      });
      students.push(childData);
      studentID.push(childData.studentID);

      studentList = students.toString();

    });
    students.forEach(students => {
      var trNode = document.createElement('tr');
      document.getElementById("studentNameLi").appendChild(trNode);
      var node = document.createElement('td');
      node.classList.add("thID");
      var textNode = document.createTextNode(students.studentID);
      var textNode2 = document.createTextNode(students.studentName);
      var node2 = document.createElement('td');
      node.appendChild(textNode);
      node2.appendChild(textNode2);
      trNode.appendChild(node);
      trNode.appendChild(node2);
      document.getElementById("studentNameLi").appendChild(trNode);
    })
    //document.getElementById("studentNameLi").innerHTML = studentList;
  });

})
//log out functionality on top right
function signout() {
  firebase.auth().signOut();
  alert("signed out");
};
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

var addStuClass = document.getElementById("addStuClass");

// Get the button that opens the modal
var addStuClassbtn = document.getElementById("addStuClassModal");


// When the user clicks on the button, open the modal
addStuClassbtn.onclick = function () {
  addStuClass.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeasc() {
  studentModal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == addstuClass) {
    addstuClass.style.display = "none";
  }
}

function checkClass() {
  //checks class 
  var classRef = firebase.database().ref('Schools/' + userSchool + "/classes//");
  //Checks Student
  var sturef = firebase.database().ref('');
  classRef.once("value", function (snapshot) {
    snapshot.forEach(function (child) {
      if (snapshot.hasChild(document.getElementById("StudentID").value) && snapshot.hasChild(document.getElementById("classID").value)) {
        alert("Class already exists");
        location.reload();
        setTimeout();
      }

      else {
        newClass();
      };
    });
  });
}

function addstudentClass() {
  var studentCID = document.getElementById("studentCID").value;
  var classID = document.getElementById("classID").value;
    firebase.database().ref('Schools/' + userSchool + "/classes/" + classID + "/").set({ studentCID: studentCID, ClassID: ClassID, });
    location.reload();
}