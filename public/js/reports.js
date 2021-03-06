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



  //const analytics = firebase.analytics();
  
  var n = new Date();
  var y = n.getFullYear();
  var m = n.getMonth() + 1;
  var d = n.getDate();
  document.getElementById("date").innerHTML = m + "/" + d + "/" + y;
  //current date script by Lance on StackOverflow
  
  // import { content, content2 } from "./dashboard.js";

  var uid;
  var userEmail;
  var schoolName;
  var classes = [];
  var students = [];
  var studentsList;
  var studentNames = [];
  var studentNamesList;
  var studentTest;
  var taskCount = 0;
  
  var temp = [];
  var tasks = [];
  var tasksID = [];
  var taskList;
  var dTable;
  var gorger;
  var gorgerr;
  var cumul = 0;
  var classesList;
  var classCount = 0;
  var date;


  var reportModal = document.getElementById("reportModal");
  var openReportbtn = document.getElementById("saveButton");
  var cancelbtn = document.getElementById("cancel");
  var saveButton = document.getElementById("saveButtonR");
  var span1 = document.getElementsByClassName("close")[0];

  openReportbtn.onclick = function () {
    reportModal.style.display = "block";
  }
  cancelbtn.onclick = function () {
    reportModal.style.display = 'none';
  }
  span1.onclick = function () {
    reportModal.style.display = "none";
  }
  
  //gets the user's school name
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      uid = user.uid;
      schoolName = user.displayName;
      userEmail = user.email;
    }

  
  var classRef = firebase.database().ref("Schools/" + schoolName + "/classes");
   classRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          // console.log("running");
          var childCData = childSnapshot.val();
          var taskRef = firebase.database().ref('Schools/' + schoolName + "/classes/" + childCData.className+ "/Tasks");
          temp.push("ClassName: " + childCData.className);
          classCount = classCount + 1;

          //temp.push(" ");

          taskRef.on('value', function (snapshot) {
            
           classRef.on('value', function (snapshot) {
              snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                classRef.on('child_added', function (snapshot) {
                  //Do something with the data
              document.getElementById("classNameLi").innerHTML = childData.className;
         
                });
                classes.push(childData.className);
                //classes.push(childData.Tasks);
               });
            });
         var className;
         saveButton.onclick = function () {
           for (var i = 0; i < classes.length; i++) {
            //  console.log(schoolName);
             className = classes[i];
             var taskNumber = 0;
             firebase.database().ref('Schools/' + schoolName + "/classes/" + className + "/Tasks").orderByChild("tasks").once("value", function (snapshot) {
               snapshot.forEach(function (childSnapshot) {
                 taskNumber = taskNumber + 1;
               });
             });
             var rowsNumber = document.getElementById(className + "1").rows.length;
             console.log(rowsNumber);
             for (var p = 1; p < rowsNumber; p++) {
               var currentDate = m + "-" + d + "-" + y;
               var studentName = document.getElementById(className + "1").rows[p].cells[0].innerHTML;
               firebase.database().ref('Schools/' + schoolName + "/dailyReports").orderByKey().equalTo(currentDate).once("value", function (snapshot) {
         
                 var dateSnapshot = snapshot.val();
         
                 if (dateSnapshot) {
         
                 } else {
                   firebase.database().ref('Schools/' + schoolName + '/dailyReports/' + currentDate).push({});
                 }
               });

var mydate;
var finalDate;
                mydate = new Date();
// split  based on whitespace, then get except the first element
// and then join again



finalDate = mydate.toDateString().split(' ').slice(1).join(' ');

               
                 
               for (var j = 1; j < taskNumber + 1; j++) {
                 var taskName = document.getElementById(className + "1").rows[0].cells[j].innerHTML;
                 var ratingValue = document.getElementById(className + "1").rows[p].cells[j].firstChild.value;
                 if (ratingValue) {
                   firebase.database().ref('Schools/' + schoolName + '/dailyReports/' + finalDate + "/" + className + "/" + studentName + '/' + taskName).set({ rating: ratingValue });
                 }
         
               };
             };
           };
         };
       });
  
          taskRef.on('value', function (snapshot2) {
            snapshot2.forEach(function (childSnapshot2) {
              temp.push(childSnapshot2.val().taskName)
            })
          })
          
          
          var select = document.getElementById("classList");
          classes.push(childCData.className);
          

          //  var studentRef = firebase.database().ref('Schools/' + schoolName + "/classes/" + className + '/Student List');
          //  studentRef.on('value', function (snapshot) {
          //    snapshot.forEach(function (childSnapshot) {
          //      var childSData = childSnapshot.val();
          //     studentsList.push(childSData);
          //      console.log(studentsList);
          //    });
          //  studentTest = studentsList.toString();
          //    console.log(studentTest);
          //  });
        });
        for (var i = 0; i <= (temp.length - 1); i++) {
          var temp2 = temp[i];
          if (temp2.includes("ClassName")) {
            taskCount = 0;
            students = [];
            var temp3 = temp2.replace('ClassName: ', "");
            var stuRef = firebase.database().ref('Schools/' + schoolName + "/classes/" + temp3 + "/Student List");
            var node = document.createElement('h1');
            var textNode = document.createTextNode(temp3);
            var node2 = document.createElement('table');
            node.appendChild(textNode);
            // document.getElementById("classNameLi").appendChild(node)
            var tablenode = document.createElement('div');
            tablenode.setAttribute("id", temp3);
            node2.setAttribute("id", temp3 + "1");
            document.getElementById("classNameLi").appendChild(tablenode);

            document.getElementById('reportEnter').appendChild(node2);
            node.setAttribute("class", "reportEntry");

            tablenode.setAttribute("class", "reportChart");
            dTable = tablenode;
  
            let newRow = node2.insertRow(-1);
            let newCell = newRow.insertCell(0);
            let newText = document.createTextNode('');
            newCell.appendChild(newText);
            // document.getElementById("classNameLi").appendChild(tablenode);
            classCount++;
            // console.log(classCount);
  
            stuRef.on('value', function (snapshot3) {
              //console.log(snapshot3.val());
              snapshot3.forEach(function (childSnapshot3) {
                students.push(childSnapshot3.val().studentName);
              })
              
            })
            var tasksP = [];
            var className = temp[i].replace("ClassName: ", "");
            var classRef2 = firebase.database().ref("Schools/" + schoolName + "/classes/" + className + "/Tasks");

            // console.log(classRef2);
            classRef2.on('value', function (snapshot) {
                // console.log(snapshot.val())
                tasksP = Object.keys(snapshot.val())
                // console.log(tasksP);

              // var tempo = String(snapshot.val().className);
              // console.log(tempo);
              // // if(tempo.includes("Classname:")){
              // //   var className = snapshot.val();
              // // }
              // // console.log(className);
            // firebase.database().ref('Schools/' + schoolName + "/classes/" + "Mathology" + "/Tasks").orderByChild("tasks").once("value", function (snapshot) {
            //   snapshot.forEach(function (childSnapshot) {
            //     // taskNumber = taskNumber + 1;
            //   });
            // });
          });
          // console.log(tasksP);
          drawTableR(temp3, students, tasksP);

            for (var j = 0; j <= (students.length - 1); j++) {
              let newRow = node2.insertRow(-1);
              let newCell = newRow.insertCell(0);
              let newText = document.createTextNode(students[j]);
              newCell.appendChild(newText);

            }
          }
          else {
            // Insert a row at the end of the table
            let newRow = node2.rows[0];
            let newCell = newRow.insertCell(-1);
            let newText = document.createTextNode(temp[i]);
            newCell.appendChild(newText);
            //taskCount++;
            var rows = node2.getElementsByTagName("tr");
            // console.log(rows);
            // console.log(taskCount);
            if (taskCount != 1) {
              addCell(rows);
            }

          }

        };

        // var table = document.getElementById('tableID');
  
      });
  
  function addCell(rows) {
    // console.log(rows.length);
    for (var k = 1; k <= (rows.length - 1); k++) {
      let blankCell = rows[k].insertCell(-1);
      var ddnode = document.createElement('input');
      ddnode.value = k;
      blankCell.appendChild(ddnode);
    }
  }


  for (var i = 0; i < classes.length; i++){
     students = [];
    studentRef = firebase.database().ref('Schools/' + schoolName + "/classes" + "/" + classes[i] + "/Student List");
    studentRef.on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
         var childSData = childSnapshot.val();
         var identifier = childSData.studentcid;
        var finder = studentsNamesList.indexOf(identifier);
       finder = finder - 1;
        students.push(studentsNamesList[finder]);
       })
       studentsList = students.toString();
 
  
  
  
  //   //
     var node = document.createElement('ul');
     node.classList.add("tasks"); /*adds classList as class on ul*/
  
    var textNode = document.createTextNode("Task Name : " + temp + " Students: " + studentsList);
     node.appendChild(textNode);
     document.getElementById("classNameLi").appendChild(node);
  
       });
  
     };
  //Show tasks as table
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
  });
  date = new Date();
  date.setDate(date.getDate() - 13);
date.setHours(0,0,0,0)
  
    var studentList = [];
    function taskPercentDone(className, taskName){
      cumul = 0;
      firebase.database().ref('Schools/' + schoolName + "/classes/" + className +"/Student List").once("value", function (snapshot) {
        snapshot.forEach(function(item){
          var itum = item.val();
          itum = itum.studentName;
          studentList.push(itum);
        });
        for (m = 0; m < studentList.length; m++) {
          firebase.database().ref('Schools/'+ schoolName +'/dailyReports/'+ currentDate + '/'+ className +"/" + studentList[m] + "/" + taskName).once("value", function (snapshot) {
            var tSnap = snapshot.val();
            tSnap = tSnap.rating;
            tSnap = parseInt(tSnap);
            cumul += tSnap;
          });
        }
        }); 
    }
  
  });

  var tableURI
  google.charts.load('current', {'packages':['table']});
  google.charts.setOnLoadCallback(drawTableR);
  //console.log(temp);
  export default function drawTableR(div, students, tasksl) {
    
    var data = new google.visualization.DataTable();
    // 

    data.addColumn('string', 'Name');
      if(tasksl !== undefined){
        for(var j = 0; j <= tasksl.length-1; j++){
        data.addColumn('string', tasksl[j]);
        };
      }
      if(students !== undefined){
        data.addRows(students.length);
      for(var i = 0; i <= students.length-1; i++){
        data.setCell(i, 0, students[i], students[i], {style: 'width:100px'});
    //     for(var k = 1; k <= (data.getNumberOfColumns() - 1); k++){
    //       data.setCell((i), k, ('john' + k));
    // }
    }

//   for(var l = 1; l <= (data.getNumberOfRows() - 1); l++){
//     data.setCell(l, 0, '5');
// }
  }


  var mydate = new Date();
  var mdate = mydate.toDateString().split(' ').slice(1).join(' ');

  var dbRatingRef = firebase.database().ref('Schools/' + schoolName + "/dailyReports/" + mdate + "/" + div);
  dbRatingRef.once("value", function (snapshot) {

    // console.log(data.getColumnLabel(1));
    snapshot.forEach(function(childSnapshot) {
      // console.log(childSnapshot.key);
      for(var k = 0; k<=data.getNumberOfRows() - 1; k++){
        if(childSnapshot.key == data.getValue(k, 0)){
          childSnapshot.forEach(function(grandChildSnapshot){
            // console.log(grandChildSnapshot.val().rating);
            for(var i = 0; (i<=data.getNumberOfColumns() - 1); i++){
              if(grandChildSnapshot.key == (data.getColumnLabel(i))){
                data.setCell(k, i, grandChildSnapshot.val().rating, grandChildSnapshot.val().rating, {style: 'width:100px'});

              }
            }
            // console.log(grandChildSnapshot.key)
    // console.log(grandChildSnapshot.val())
          });
        }
      }
    });

    if(div !== undefined){
      var table = new google.visualization.Table(document.getElementById(div));
      if(typeof(document.getElementById(div)) != 'undefined' && (document.getElementById(div)) != null){
        // var table = new google.visualization.Table(document.getElementById(div));
        table.draw(data, {showRowNumber: true, allowHtml: true});
    
      }
    
    };
  });

  }



  function genPDF() {
    //alert("test");
    var classTitle;

    var doc = new jsPDF();
    doc.internal.scaleFactor = 2.25;
    doc.text(20, 20, 'TestPDF');
    doc.addImage(tableURI, 0, 0);
    // doc.addImage(content2, 'PNG', 10, 20, 100, 50);
    // doc.addImage(content, 'PNG', 120, 20, 65, 55);
    doc.fromHTML(document.getElementById('classNameLi'), 15, 15, {width: 1000}
    );
    // doc.addImage(content2, 'PNG', 10, 20, 100, 50);
    // doc.addImage(content, 'PNG', 120, 20, 65, 55);
    doc.addPage();
    doc.save('test.pdf'); 
  }



  // export { drawTableR } 
  //Example of taskPercentDone Usage needs className and taskName defined before it can run.
  // firebase.auth().onAuthStateChanged(function (user) {
  //   if (user != null) {
  //     taskPercentDone(className, taskName);
  //   setTimeout(function(){
  //   console.log(((cumul/(studentList.length * 5)) * 100) + "%");
  //  },1500); 
  //   } else {
  //     console.log("User not logged in.");
  //   }
  // });
  
  /*
  Research toward color boxes on dashboard
  https://www.w3schools.com/Jsref/prop_style_backgroundcolor.asp
  
  document.body.style.backgroundColor = "red"; //makes body elements red
  document.getElementById("myDiv").style.backgroundColor = "lightblue";
  
  */

