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
    userEmail = user.email;
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

//Create table
var mountains = [];


function generateClassesTable(mountains) {

  let table = document.querySelector("table");
  let data = Object.keys(mountains[0]);
  generateTable(table, mountains);
  generateTableHead(table, data);
  
  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }
  mountains = [];
}

// View classes
var classesRef = firebase.database().ref('classes');
var classesList;
classesRef.on('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var childData = childSnapshot.val();
    classesRef.on('child_added', function (snapshot) {
      //Do something with the data
      //document.getElementById("classNameLi").innerHTML = childData.className;

    });
    classes.push(childData.className);
    classes.push(childData.Tasks);
  });
  for (i = 0; i < (classes.length / 2); i++) {
    var td = document.createElement('TABLE');
    document.getElementById("classNameLi").appendChild(td);
    mountains = [
      { StudentName: "Bryce", Bring_Pencils: 1, Bring_Homework: 1, Task4: 3, task3: 9 },
      { name: "Gage", task1: 4, task2: 5, task3: 3, task4: 6 },
      { name: "Matt", task1: 2, task2: 2, task3: 3, task4: 6  },
      { name: "Eddie", task1: 5, task2: 3, task3: 3, task4: 6  },
      { name: "Pat", task1: 3, task2: 4, task3: 3, task4: 6  }
    ];
  
  }

  generateClassesTable(mountains);
  console.log(mountains[1].task2);
  /*
  //document.getElementById("classNameLi").innerHTML = ("<li>" + classesList + "</li>");
    for (i = 0; i < classes.length; i++) {
      if (i%2 == 0){
        //console.log(classes[i]);
        var node = document.createElement("li");                 // Create a <li> node
        var textnode = document.createTextNode(classes[i]);  //Create a text node
        node.appendChild(textnode);
        document.getElementById("classNameLi").appendChild(node);
      }else {
        var taskText = classes[i];
        //taskText.flat(1);
        console.log(JSON.stringify(classes[i]));
        var node2 = document.createElement("ul");                 // Create a <li> node
        var textnode2 = document.createTextNode(JSON.stringify(classes[i]));  //Create a text node
        node2.appendChild(textnode2);
        document.getElementById("classNameLi").appendChild(node2);
      }

      for (j = 0; j < classes[i].length; j++){
        //console.log(classes[1]);
      }


    }
    //console.log(classes);
    //onsole.log(classes[1]);
    */
});