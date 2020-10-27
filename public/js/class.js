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
var deleteModal = document.getElementById("deleteModal");

// Get the button that opens the modal
var addClassbtn = document.getElementById("addClassModal");
var deleteClassbtn = document.getElementById("deleteClassModal");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks on the button, open the modal 
addClassbtn.onclick = function () {
  classModal.style.display = "block";
}
deleteClassbtn.onclick = function () {
  deleteModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function () {
  classModal.style.display = "none";
}
span2.onclick = function () {
  deleteModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == classModal) {
    classModal.style.display = "none";
  }
  if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
}

//Declare Variables
var uid = "";
var userEmail;
var schoolName;
var classes = [];
var tasks = [];
var classRef = firebase.database().ref('Schools/');
var classesandtasks = [];
var classesList;
var studentName;

//User State Listener
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    schoolName = user.displayName;
    uid = user.uid;
    //console.log(uid);
    userEmail = user.email;
    document.getElementById("linu").innerHTML = userEmail;
    console.log(user);
    classRef = firebase.database().ref('Schools/' + schoolName);
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
  //firebase.database().ref('classes').push({ className: className, UID: uid });
  firebase.database().ref("Schools").child(schoolName).child("classes").child(className).set({ UID: uid, className: className });
  //firebase.database().ref(schoolName).child("classes").child(className).child("Tasks").set({ taskName: ""});
  location.reload();
}
//Create a new task
function newTask() {
  var taskName = document.getElementById("taskName").value;
  var select = document.getElementById("classList");
  var classSelect = select.options[select.selectedIndex].value;
  var classRef2 = firebase.database().ref("Schools/" + schoolName + "/classes/" + classSelect + "Tasks").child(taskName);
  classModal.style.display = "none";
  classRef2.set("");
  location.reload();
}
function deleteClass() {
  var select2 = document.getElementById("dClassList");
  var dClassSelect = select2.options[select2.selectedIndex].value;
  var classRef2 = firebase.database().ref('classes/' + dClassSelect);
  deleteModal.style.display = "none";
  classRef2.remove();
  location.reload();
}
function deleteTask() {
  var select3 = document.getElementById("dtClassList");
  var dtClassSelect = select3.options[select3.selectedIndex].value;
  var classRef2 = firebase.database().ref('classes/' + dtClassSelect);
  deleteModal.style.display = "none";
  classRef2.remove();
  location.reload();
}
firebase.auth().onAuthStateChanged(function (user) {
  var classRef = firebase.database().ref('Schools/' + schoolName + "/classes");
  classRef.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      console.log(childSnapshot.val().className);
      var childData = childSnapshot.val().className;
      //console.log(childData);
      var select = document.getElementById("classList");
      var dSelect = document.getElementById("dClassList");
      var dtSelect = document.getElementById("dtClassList");

      var option = document.createElement("option");
      var option2 = document.createElement("option");
      var option3 = document.createElement("option");

      option.value = childData.charAt(0).toUpperCase() + childData.slice(1);
      option.text = childData.charAt(0).toUpperCase() + childData.slice(1);
      option2.value = childData.charAt(0).toUpperCase() + childData.slice(1);
      option2.text = childData.charAt(0).toUpperCase() + childData.slice(1);
      option3.value = childData.charAt(0).toUpperCase() + childData.slice(1);
      option3.text = childData.charAt(0).toUpperCase() + childData.slice(1);

      select.appendChild(option);
      dSelect.appendChild(option2);
      dtSelect.appendChild(option3);

      classRef.on('child_added', function (snapshot) {
        //Do something with the data
        //document.getElementById("classNameLi").innerHTML = childData.className;

      });
      classes.push(childData);
      //var tasks = (JSON.stringify(childData.Tasks));
      //classes.push(tasks);
      classesList = classes.toString();
      //console.log(classes);

    });
    for (i = 0; i < classes.length; i++) {
      var node = document.createElement('li');
      var textNode = document.createTextNode(classes[i]);
      node.appendChild(textNode);
      document.getElementById("classNameLi").appendChild(node);
    }
    //document.getElementById("classNameLi").innerHTML = classesList;
  })
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
//error checking on classes for duplicates
function checkClass() {
  var classRef = firebase.database().ref('Schools/' + schoolName + "/classes");
  classRef.once("value", function (snapshot) {
    snapshot.forEach(function (child) {
      if (snapshot.hasChild(document.getElementById("className").value)) {
        alert("Class already exists");
        location.reload();
        setTimeout();
      }
      else {
        newClass();
      }
    });
  });
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function showFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
