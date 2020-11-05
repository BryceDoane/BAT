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

n = new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("date").innerHTML = m + "/" + d + "/" + y;
//current date script by Lance on StackOverflow

var uid;
var userEmail;
var schoolName;
var classes = [];
var students = [];
var studentsList;
var studentNames = [];
var studentNamesList;
var studentTest;
var classRef = firebase.database().ref('classes');
var classesList;

var temp = [];
var tasks = [];
var tasksID = [];
var taskList;

var gorger;
var gorgerr;


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    uid = user.uid;
    email = user.email;
    schoolName = user.displayName;
    var classRef = firebase.database().ref('Schools/' + schoolName + "/classes");
    var studentNameRef = firebase.database().ref('Schools/' + schoolName + "/students");
    studentNameRef.on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childSNData = childSnapshot.val();
        studentNames.push(childSNData.studentName);
        studentNames.push(childSNData.studentID);
      });
      studentsNamesList = studentNames; //.toString();
      //console.log(studentsNamesList);
    });
    classRef.on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childCData = childSnapshot.val();
        var taskRef = firebase.database().ref('Schools/' + schoolName + "/classes/" + childSnapshot.val().className + "/Tasks");
        temp.push("ClassName: " + childCData.className);
        

        taskRef.on('value', function (snapshot2) {
          snapshot2.forEach(function (childSnapshot2) {

            //console.log(childCData.className);
           temp.push(childSnapshot2.val().taskName)

           //
  
           
            //console.log(childSnapshot2.val().taskName);
          })
        })

        var select = document.getElementById("classList")

        classes.push(childCData.className);
        classesList = classes.toString();

        
        
      });
      console.log(temp);
    for (i = 0; i <= (temp.length -1); i++){
      var temp2 = temp[i];
      console.log(temp2);
      if (temp2.includes("ClassName")){
        var node = document.createElement('h1');
        var textNode = document.createTextNode(temp[i]);
        node.appendChild(textNode);
        document.getElementById("classNameLi").appendChild(node)
    }
  else{

      var node = document.createElement('th');
      node.classList.add("thID");
      var textNode = document.createTextNode(temp[i]);
      node.appendChild(textNode);
      document.getElementById("classNameLi").appendChild(node)

  }
  };
    

      console.log(temp);
      var studentRef = firebase.database().ref('Schools/' + "null" + "/classes" + "/Test Class 2" + '/Student List');
      studentRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childSData = childSnapshot.val();
          studentsList.push(childSData);
        });
        //studentTest = studentsList.toString();
        //console.log(studentTest);
      });

      for (i = 0; i < classes.length; i++) {
        students = [];

        var studentRef = firebase.database().ref('Schools/' + schoolName + "/classes" + "/" + classes[i] + "/Student List");
        studentRef.on('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            var childSData = childSnapshot.val();
            var identifier = childSData.studentcid;
            var finder = studentsNamesList.indexOf(identifier);
            finder = finder - 1;
            students.push(studentsNamesList[finder]);

          });
          studentsList = students.toString();
          //console.log(studentsList);
        });
      


      }
      for (i = 0; i <= classes.length; i++) {
        var ctext = classes[i];//document.getElementById('classNameLi').nodevalue;
        var tasksRef = firebase.database().ref("Schools/" + schoolName + "/classes/" + ctext + "/Tasks");
        

        tasksRef.on('value', function (snapshot) {
          //console.log(snapshot.val());
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            tasks.push(childData);
            tasksID.push(childSnapshot.val().taskName);
            //console.log(childData);
            //console.log(tasks);
            taskList = tasks.toString();
              //EachTask2class
             // var tasksReff = firebase.database().ref("Schools/" + schoolName + "/classes/" + ctext + "/tasks/");
              var node = document.createElement('ul');
              node.classList.add("classList"); /*adds classList as class on ul*/
              var textNode = document.createTextNode("Class: " + classes[i] + " Students: " + studentsList);
              node.appendChild(textNode);
              document.getElementById("classNameLi").appendChild(node);
              
          
        //
        var node = document.createElement('ul');
        node.classList.add("tasks"); /*adds classList as class on ul*/

        var textNode = document.createTextNode("Task Name : " + temp + " Students: " + studentsList);
        node.appendChild(textNode);
        document.getElementById("classNameLi").appendChild(node);

          });

        });

      };
    });

    //document.getElementById("classNameLi").innerHTML = classesList;
  }

  var tasks = [];
  var taskList;
  //Show tasks as table
    schoolName = user.displayName;
    var tasksRef = firebase.database().ref("Schools/" + schoolName + "/classes/MGMT/Tasks/");
    tasksRef.on('value', function (snapshot) {
      //console.log(snapshot);
console.log()
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

        document.getElementById("taskNameLi").innerHTML = taskList;
      });
      //trying to seperate tasks
      // /tasksReff.on('value', function (snapshot) {
      //   snapshot.forEach(function (childSnapshot) {
      //     var childData = childSnapshot.val();
      //     tasksReff.on('child_added', function (snapshot) {
      //       //Do something with the data
      //       //document.getElementById("classNameLi").innerHTML = childData.className;

      //     });
      //     crash.push(childData.className);
      //     classes.push(childData.Tasks);
      //   });

      //   document.getElementById("taskNameLi").innerHTML = taskList;
      // });

      for (i = 0; i < (classes.length / 2); i++) {
        var td = document.createElement('TABLE');
        document.getElementById("classNameLi").appendChild(td);
        mountains = [
          { StudentName: "Bryce", Bring_Pencils: 1, Bring_Homework: 1, Task4: 3, task3: 9 },
          { name: "Gage", task1: 4, task2: 5, task3: 3, task4: 6 },
          { name: "Matt", task1: 2, task2: 2, task3: 3, task4: 6 },
          { name: "Eddie", task1: 5, task2: 3, task3: 3, task4: 6 },
          { name: "Pat", task1: 3, task2: 4, task3: 3, task4: 6 }
        ];

      }
    });



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
})






//Show tasks as table
// firebase.auth().onAuthStateChanged(function (user) {
//   if (user) {
//     uid = user.uid;
//     email = user.email;

//     schoolName = user.displayName;
//     var ctext = classes[1];//document.getElementById('classNameLi').nodevalue;
//     //console.log(classes);
//     var tasksRef = firebase.database().ref("Schools/liberty/classes/" + ctext + "/Tasks/");
//     tasksRef.on('value', function (snapshot) {
//       //console.log(snapshot);
//       snapshot.forEach(function (childSnapshot) {
//         console.log(childSnapshot);
//         var childData = childSnapshot.val();
//         tasksRef.on('child_added', function (snapshot) {
//           //Do something with the data
//           //document.getElementById("classNameLi").innerHTML = childData.className;
//         });
//         tasks.push(childData);
//         taskList = tasks.toString();

//       });
//       document.getElementById("taskNameLi").innerHTML = taskList;
//     });
//   }
//   else {
//     // No user is signed in.
//     //window.location = "http://behavv.com/index.html";
//   }
// });

// var classRef = firebase.database().ref('Schools/' + schoolName + "/classes");
//     classRef.on('value', function (snapshot) {
//       snapshot.forEach(function (childSnapshot) {
//         var childCData = childSnapshot.val();
//         var select = document.getElementById("classList")
//         classRef.on('child_added', function (snapshot) {
//           //Do something with the data
//           //document.getElementById("classNameLi").innerHTML = childData.className;

//         });
//         classes.push(childCData.className);
//         classesList = classes.toString();

//       });

//       for (i = 0; i < classes.length; i++) {
//         var node = document.createElement('ul');
//         node.classList.add("classList"); /*adds classList as class on ul*/
//         var textNode = document.createTextNode(classes[i]);
//         node.appendChild(textNode);
//         document.getElementById("classNameLi").appendChild(node);


//       }
//       //document.getElementById("classNameLi").innerHTML = classesList;
//     });
//   } else {
//     // No user is signed in.
//     // window.location = "http://behavv.com/index.html";
//   }

