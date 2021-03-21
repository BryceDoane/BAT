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
var classDetailsModal = document.getElementById("classDetailsModal");

// Get the button that opens the modal
var addClassbtn = document.getElementById("addClassModal");
var deleteClassbtn = document.getElementById("deleteClassModal");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close2")[0];
var span3 = document.getElementsByClassName("close3")[0];

// When the user clicks on the button, open the modal 
addClassbtn.onclick = function () {
  classModal.style.display = "block";
}
deleteClassbtn.onclick = function () {
  deleteModal.style.display = "block";
}

var node = [];
var trNode=[];

// When the user clicks on <span> (x), close the modal
span1.onclick = function () {
  classModal.style.display = "none";
}
span2.onclick = function () {
  deleteModal.style.display = "none";
}
span3.onclick = function () {
 
  classDetailsModal.style.display = "none";

  
  var elements = document.getElementsByTagName('td')
while (elements[0]) elements[0].parentNode.removeChild(elements[0])
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
var tasks;
var classes = [];
var classRef = firebase.database().ref('Schools/');
var classesandtasks = [];
var classesList;
var studentName;
var taskss = [];
var classbtn;


//User State Listener
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    schoolName = user.displayName;
    uid = user.uid;
    //console.log(uid);
    userEmail = user.email;
    document.getElementById("linu").innerHTML = userEmail;
    //console.log(user);
    classRef = firebase.database().ref('Schools/' + schoolName);
  } else {
    //window.location.replace("http://www.behavv.com");
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
  firebase.database().ref("Schools/" + schoolName + "/classes/").child(className).set({ UID: uid, className: className });
  //firebase.database().ref(schoolName).child("classes").child(className).child("Tasks").set({ taskName: ""});
  location.reload();
}
//Create a new task
function newTask() {
  var taskName = document.getElementById("taskName").value;
  var select = document.getElementById("classList");
  var classSelect = select.options[select.selectedIndex].value;
  var classRef2 = firebase.database().ref("Schools/" + schoolName + "/classes/" + classSelect + "/Tasks/" + taskName + "/");
  classModal.style.display = "none";
  classRef2.set({ taskName: taskName });
  location.reload();
}
function deleteClass() {
  var select2 = document.getElementById("dClassList");
  var dClassSelect = select2.options[select2.selectedIndex].value;
  var classRef2 = firebase.database().ref('Schools/' + schoolName + '/classes/' + dClassSelect);
  console.log(classRef2);
  deleteModal.style.display = "none";
  classRef2.remove();
  location.reload();
}
function deleteTask() {
  var select3 = document.getElementById("dtClassList");
  var select4 = document.getElementById("dtTaskList").value;
  var dtClassSelect = select3.options[select3.selectedIndex].value;
  console.log(select3);
  //var taskSelect = select4.options[select4.selectedIndex].value;
  var taskRef = firebase.database().ref('Schools/' + schoolName + '/classes/' + dtClassSelect + "/Tasks/" + select4);
  deleteModal.style.display = "none";
  taskRef.remove();
  location.reload();
}

ColorPickIndex = 0;
ColorList = ['#B28DFF', '#BFFCC6', '#FFBEBC', '#853EFF', '#FFF5BA', '#C4FAF8', '#BAFFC9', '#BAE1FF', '#ffb3ba', '#AEC6CF', '#D7ECD9', '#FCECF5'];

firebase.auth().onAuthStateChanged(function (user) {
  var classRef = firebase.database().ref('Schools/' + schoolName + "/classes");
  classRef.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val().className;
      console.log(childData);
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
    var x = document.getElementById("deleteClassModal");
  

    classes.forEach(classes => {
      var node = document.createElement('button');
      node.classList.add("card");
      node.id = "cardbtn";
      node.style.background = ColorList[ColorPickIndex];
      ColorPickIndex ++;
      if(ColorPickIndex >= 11){
        ColorPickIndex = 0;
        
      }
      var textNode = document.createTextNode(classes);
      node.appendChild(textNode);
      var temp = 'showClass("' + classes + '")';
      node.setAttribute("onclick", temp);
      document.getElementById("classNameLi").appendChild(node);
    });
      if (typeof cardbtn === 'undefined') {  
        var noClassTxt = document.getElementById("classNameLi").innerHTML = "<span class='noClassText'>Click the button above to add a class!</span>";
        noClassTxt.id = "noClassText";
      }
      else{ noclassTxt.style.visibility = 'hidden';
      }
      // else{
      //   alert("doesn't exist")
      // }
      //console.log(snapshot)
  
    // openClassbtn.onclick = function () {
    //   classDetailsModal.style.display = "block";
    // }

    //document.getElementById("classNameLi").innerHTML = classesList;
  })

})


function showClass(className) {
  const delNode = document.getElementById("classTaskDetails");
   delNode.innerHTML = '';  //clears previous block clicked
  classDetailsModal.style.display = "block";
  var localClass = className;
  console.log(localClass);
  document.getElementById('classNameDisplay').innerHTML = localClass;
  var classRef2 = firebase.database().ref('Schools/' + schoolName + "/classes/" + localClass + "/Tasks");
  classRef2.on('value', function (snapshot) 
 {

    console.log(snapshot.val());

 
students = [];
studentID = [];
stuID = [];
//stuNamee = [];
taskList = []; 
firebase.auth().onAuthStateChanged(function (user) {
  userSchool = user.displayName;
  var studentRef = firebase.database().ref('Schools/' + userSchool + "/classes/"+ localClass + "/Student List");
  var taskListRef = firebase.database().ref('Schools/' + schoolName + "/classes/" + localClass + "/Tasks");
  taskListRef.on('value', function (snapshot) {
    //console.log(snapshot);
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      console.log(childData.taskName);
      taskList.push(childData.taskName);
;

      //Modal Tasks in Class List 
   var pNode = document.createElement('p');
   document.getElementById('classTaskDetails').appendChild(pNode);
   var taskElementList = document.createElement('p');
   taskElementList.classList.add("CardTaskList");
   var textNode3 = document.createTextNode(childData.taskName); 
   //console.log(taskList); //log
   taskElementList.appendChild(textNode3);
   pNode.appendChild(taskElementList);
   document.getElementById("classTaskDetails").appendChild(pNode);
    })})


  studentRef.on('value', function (snapshot) {
    //console.log(snapshot);
    snapshot.forEach(function (childSnapshot) {
      //console.log(childSnapshot);
      var childData = childSnapshot.val();
      
      stuName = (childData.studentName);
      stuID = (childData.studentcid);
      
      //console.log(stuName);
      

      studentRef.on('child_added', function (snapshot) {
        //Do something with the data
        //document.getElementById("classNameLi").innerHTML = childData.className;
      });
      students.push(childData);
      
      //console.log(childData);
      //console.log(students);
      studentID.push(childData.studentID);
    
      studentList = students.toString();
//console.log(studentList);
  
    
    //var length = students.vallength;
   //for (i = length - 1; i >= 0; i--) {
      //students[i] = null;
   // }
  






   //Modal Student in Class List
      var trNode = document.createElement('tr');
      document.getElementById("studentsLi").appendChild(trNode);
      var node = document.createElement('td');
      node.classList.add("thIDD");
      var textNode = document.createTextNode(stuName);
      //var textNode2 = document.createTextNode(stuName);
      var textNode2 = document.createTextNode(stuID);
      console.log(stuName);
      var node2 = document.createElement('td');
      var node3 = document.createElement('td');
      node.appendChild(textNode);
     
      node3.appendChild(textNode2);
      trNode.appendChild(node);
     // trNode.appendChild(node2);
      trNode.appendChild(node3);
      document.getElementById("studentsLi").appendChild(trNode);
    
      
    
  });
    //document.getElementById("studentNameLi").innerHTML = studentList;
  });

})

  })
}

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


// //gets signed in user
// firebase.auth().onAuthStateChanged(function (user) {
//   if (user != null) {
//     document.getElementById("linu").innerHTML = user.email;
//   } else {
//     document.getElementById("linu");
//   }
// })
//error checking on classes for duplicates
/*function checkClass() {
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
}/

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
//Delete Task dropdown
function changeTask() {
  var selectt = document.getElementById("dtTaskList");
  var length = selectt.options.length;
  for (i = length - 1; i >= 0; i--) {
    selectt.options[i] = null;
  }
  var classListDelete = document.getElementById("dtClassList").value;
  var TaskReff = firebase.database().ref('Schools/' + schoolName + "/classes/" + classListDelete + "/Tasks/");
  TaskReff.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val().taskName;

      var dtSelect = document.getElementById("dtTaskList");

      var option3 = document.createElement("option");

      option3.value = childData.charAt(0).toUpperCase() + childData.slice(1);
      option3.text = childData.charAt(0).toUpperCase() + childData.slice(1);

      dtSelect.appendChild(option3);

    })
  })
}


