
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
var option;
var selectObject;
var opt;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const analytics = firebase.analytics();

// Get the modal
var studentModal = document.getElementById("studentModal");
//var delStudentModel = document.getElementById("delStudentModel");

// Get the button that opens the modal
var addStudentbtn = document.getElementById("addStudentModal");
//var delStudentbtn = document.getElementById("delStuBtn");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close2")[0];
//var span3 = document.getElementsByClassName("close3")[0];

// When the user clicks on the button, open the modal 
addStudentbtn.onclick = function () {
  studentModal.style.display = "block";
}
// delStudentbtn.onclick = function () {
//   delStudentModal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal

// span3.onclick = function () {
//   delStudentModel.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == studentModal) {
    studentModal.style.display = "none";
  }
}
function close() {
  studentModal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == delStudentModel) {
    delStudentModel.style.display = "none";
  }
}
function close() {
  delStudentModel.style.display = "none";
}

var uid;
var userEmail;
var userSchool;
var studentCName;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    uid = user.uid;
    userSchool = user.displayName;
    userEmail = user.email;
  }
  else {
    //window.location.replace("http://www.behavv.com");
  }
});


//Takes in student name from modal form
function newStudent() {
  var dCheck = true;
  var IDList = [];
  var studentfName = document.getElementById("studentfName").value;
  var studentlName = document.getElementById("studentlName").value;
  var studentID = document.getElementById("studentID").value;
  var studentNotes = document.getElementById("studentNotes").value;
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
    firebase.database().ref('Schools/' + userSchool + "/students/" + studentID + "/").set({ studentFName: studentfName, studentLName: studentlName, studentID: studentID, notes: studentNotes });
    location.reload();
    //studentID = null;
  }

}

// //Delete Student model
// deleteClassBtn.addEventListener('click', delStudent());

function delStudent() {

  var studentDID = document.getElementById("studentDID").value;
  var delStudRef = firebase.database().ref('Schools/' + userSchool + "/students/" + studentDID + "/");
  delStudRef.remove();
  studentModal.style.display = "none";
  location.reload();
  
  
    /*var IDList = [];
  var studentID = document.getElementById("studentID").value;
  studentModal.style.display = "none";
  firebase.database().ref('Schools/' + userSchool + "/students/")

  for (i = 0; i <= IDList.length; i++) {
    if (IDList[i] == (studentID)) {
      var delStudRef = firebase.database().ref('Schools/' + userSchool + "/students/" + studentID);
      delStudRef.remove();
      location.reload();
      break;
    } else if (i + 1 == IDList.length) {
      alert("A student with this ID doesn't exist");
      break;
    }
  }*/
}


//Fills student info to webpage

var students = [];
var studentID = [];
var studentList;

firebase.auth().onAuthStateChanged(function (user) {
  userSchool = user.displayName;
  var studentRef = firebase.database().ref('Schools/' + userSchool + "/students");
  studentRef.on('value', function (snapshot) {
    //console.log(snapshot);
    snapshot.forEach(function (childSnapshot) {
      //console.log(childSnapshot);
      var childData = childSnapshot.val();
      console.log(childData);

      studentRef.on('child_added', function (snapshot) {
        //Do something with the data
        //document.getElementById("classNameLi").innerHTML = childData.className;
      });
      students.push(childData);
      //console.log(students);
      studentID.push(childData.studentID);

      studentList = students.toString();

    });
    students.forEach(students => {
      var trNode = document.createElement('tr');
      document.getElementById("studentNameLi").appendChild(trNode);
      var node = document.createElement('td');
      node.classList.add("thID");
      var textNode = document.createTextNode(students.studentID);
      var textNode2 = document.createTextNode(students.studentFName);
      var textNode3 = document.createTextNode(students.studentLName);
      if (students.notes === undefined) {
        var textNode4 = document.createTextNode("None");
      } else {
        var textNode4 = document.createTextNode(students.notes);
      }
      var node2 = document.createElement('td');
      var node3 = document.createElement('td');
      var node4 = document.createElement('td');
      node.appendChild(textNode);
      node2.appendChild(textNode3);
      node3.appendChild(textNode2);
      node4.appendChild(textNode4);
      trNode.appendChild(node);
      trNode.appendChild(node2);
      trNode.appendChild(node3);
      trNode.appendChild(node4);
      document.getElementById("studentNameLi").appendChild(trNode);
    })
    //document.getElementById("studentNameLi").innerHTML = studentList;
  });

})
//log out functionality on top right
function signout() {
  var confirmLogout = confirm("Are you sure you wish to log out?");
  if(confirmLogout){
    firebase.auth().signOut();
    window.location.href = "login.html";
    alert("signed out");
  }
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

var opt;


// When the user clicks on the button, open the modal
addStuClassbtn.onclick = function () {
   
  var classGrab = firebase.database().ref("Schools/" + userSchool + "/classes");
  classGrab.once("value", function (snapshot) {
    snapshot.forEach(function (child) {
      opt = child.child("className").val();
      console.log(opt);
      document.getElementById("class").innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
    });
  });

  var studentGrab = firebase.database().ref("Schools/" + userSchool + "/students");
  studentGrab.once("value", function (snapshot) {
    snapshot.forEach(function (child) {
      option = document.createElement("option");
      //option.text = child.child("studentFName").val();
      option.text = (child.child("studentFName").val()+ " " + child.child("studentLName").val());
      //option.text.appendChild = child.child("studentLName").val();
      //option.text = child.child("studentID").val();
      //console.log(opt);
      var selectObject = document.getElementById("cid")//.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
      
      selectObject.add(option)
    });
  });
    
  setTimeout(function(){
    addStuClass.style.display = "block";
  },250);
}



// When the user clicks on <span> (x), close the modal
function closeasc() {
  studentModal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == addStudentClass) {
    addstuClass.style.display = "none";
  }
}
//adds students to class
function addStudentClass() {
  var studentcid = document.getElementById("cid").value;
  var className = document.getElementById("class").value;
  var addStuClass = firebase.database().ref("Schools/" + userSchool + "/classes/" + className + "/Student List/").child(studentcid); //location where to add students in class
  var addStuName = firebase.database().ref("Schools/" + userSchool + "/students/" + studentcid + "/"); //where to pull student info from
//make childSnapshot include first and last name
  addStuName.on('value', function (snapshot) {
    console.log(snapshot);
    snapshot.forEach(function (childSnapshot) {
      console.log(childSnapshot);
      var childSNData = childSnapshot.val();
      studentCName = childSNData

    });


    addStuClass.set({ studentcid: studentcid, studentName: studentCName });
    //alert(studentCName + " " + "has been added to" + " " + className);
    location.reload();
  })

};

var select = document.getElementById("selectNumber"); 
var options = ["1", "2", "3", "4", "5"]; 


function checkClass() {
  var classRef = firebase.database().ref('Schools/' + userSchool + "/classes");
  classRef.once("value", function (snapshot) {
    snapshot.forEach(function (child) {
      if (snapshot.hasChild(document.getElementById("class").value)) {
        checkStudent();
      }
      else {
        alert("class does not exist");
        location.reload();
        setTimeout();
      }
    });
  });
}

function checkStudent() {
  var classRef = firebase.database().ref('Schools/' + userSchool + "/students");
  classRef.once("value", function (snapshot) {
    snapshot.forEach(function (child) {
      if (snapshot.hasChild(document.getElementById("cid").value)) {
        addStudentClass();

      }
      else {
        //alert("student ID does not exist");
        location.reload();
        setTimeout();
      }
    });
  })
}

span.onclick = function () {
  studentModal.style.display = "none";
 
}
span2.onclick = function () {
  addStuClass.style.display = "none";
  var select = document.getElementById("class");
var length = select.options.length;
for (i = length-1; i >= 0; i--) {
  select.options[i] = null;
}
var select = document.getElementById("cid");
var length = select.options.length;
for (i = length-1; i >= 0; i--) {
  select.options[i] = null;
}
}

//adds students to class