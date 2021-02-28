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
const analytics = firebase.analytics();

import createTableR from './reports.js'

function loadData() {

  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  n = new Date();
  y = n.getFullYear();
  m = n.getMonth();
  d1 = n.getDay();
  d = weekday[n.getDay()];
  document.getElementById("date").innerHTML = d + ", " + m + " " + d1 + ", " + y;
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
  var userSchool;
  var classRef = firebase.database().ref('classes');
  var taskCount = 0;

  var temp = [];
  var tasks = [];
  var tasksID = [];
  var taskList;
  var dTable;
  var gorger;
  var gorgerr;
  var cumul = 0;
  var content;
  var content2;
  var ratingsData;
  var ratingData;
  var totalRatingss = [];
  var totalRatingArr = [];
  var ratingSum = [];
  var finalList = [];

  var arrayFive = [];
  var arrayMain = [];
  var firstArr = [];
  var lastArr = [];
  var brycesArray = [];
  var studentsData;
  var ratingInfo = 0;
  var ratingTotal;
  var missingVal;
  var doneRating;

  // var formModal = document.getElementById("formModal");
  // var infobtn = document.getElementById("addInfoModal");
  // var span1 = document.getElementsByClassName("close")[0];

  //  infobtn.onclick = function () {
  //  formModal.style.display = "block";
  // }
  // span1.onclick = function () {
  //   formModal.style.display = "none";
  // }
  // window.onclick = function (event) {
  //   if (event.target == formModal) {
  //     formModal.style.display = "none";
  //   }
  // }

  function drawOChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Number of Ratings'],
      ['5', 11],
      ['4', 2],
      ['3', 2],
      ['2', 2],
      ['1', 7]
    ]);

    var options1 = {
      title: 'Total Ratings',
      pieHole: 0.4,
      legend: 'none',
      titleTextStyle: {
        color: 'black',
        fontSize: 20,
      },
      chartArea: {
        // leave room for y-axis labels
        width: '90%'
      },
    };

    var chart = new google.visualization.PieChart(document.getElementById('chartContainer3'));
    google.visualization.events.addListener(chart, 'ready', function () {
      content = chart.getImageURI()
      //content = '<img src="' + chart.getImageURI() + '">';
      // $('#chartContainer3').append(content);
    });

    var data2 = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['Monday', 1000, 400],
      ['Tuesday', 1170, 460],
      ['Wednesday', 660, 1120],
      ['Thursday', 1030, 540],
      ['Friday', 1030, 540],
    ]);
    var options2 = {
      title: 'Weekly Comparison',
      pieHole: 0.4,
      legend: 'none',
      titleTextStyle: {
        color: 'black',
        fontSize: 20,
      },
      // chartArea: {
      //   // leave room for y-axis labels
      //   width: '60%'
      // },
    };

    var chart2 = new google.visualization.ColumnChart(document.getElementById('chartContainer4'));
    google.visualization.events.addListener(chart2, 'ready', function () {
      content2 = chart2.getImageURI()
      //content = '<img src="' + chart.getImageURI() + '">';
      // $('#chartContainer3').append(content);
    });

    // var data3 = new google.visualization.DataTable();
    // data3.addColumn('string', 'Name');
    // data3.addColumn('number', 'Salary');
    // data3.addColumn('boolean', 'Full Time Employee');
    // data3.addRows([
    //   ['Mike',  {v: 10000, f: '$10,000'}, true],
    //   ['Jim',   {v:8000,   f: '$8,000'},  false],
    //   ['Alice', {v: 12500, f: '$12,500'}, true],
    //   ['Bob',   {v: 7000,  f: '$7,000'},  true]
    // ]);
    // var options3 = {
    //   title: 'My Daily Activities',
    // };

    // var chart3 = new google.visualization.Table(document.getElementById('chartContainer5'));

    chart.draw(data, options1);
    chart2.draw(data2, options2);
    // export {content, content2 };
    // chart3.draw(data3, options3);
  }
  // Define the chart to be drawn.
  google.charts.load('current', { packages: ['corechart'] });

  function drawChart(name) {
    if (typeof (name) == "undefined") {
      return
    }
    // userSchool = user.displayName;
    var studentRef = firebase.database().ref('Schools/' + userSchool + "/classes");
    //studentRef.on('value', function (snapshot) {
    //console.log(snapshot);
    // snapshot.forEach(function (childSnapshot) {
    //   var childData = childSnapshot.val();
    //   var taskName = childData.taskName;

    // taskName = taskName.replace(/\s/g, '');
    // tasks.push(taskName);
    // console.log(taskName);
    //console.log(childData.className);
    //drawChart(className);
    // var data = this["marker" + name]
    var options = {
      title: name
      , width: 500
      , height: 300
      , isStacked: 'percent'
      , titleTextStyle: {
        color: 'black',
        fontSize: 20,
      },
      colors: ['green', 'red'],
      legend: 'none',
    };







    var data = new google.visualization.arrayToDataTable([
      ['Task', 'Completed', 'Incomplete', { role: 'annotation' }],

      ["Ex", 0, 0, ''],


    ]);
    data.removeRow(0)
    // calculating date to reference for daily report
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var m = String(today.getMonth() + 1).padStart(1, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = m + '-' + dd + '-' + yyyy;
    //console.log(today);


    // referencing student list
    var studentRep = firebase.database().ref('Schools/' + schoolName + "/classes/" + classes[i] + "/Student List");
    //console.log(studentRep);
    //console.log(studentRep.getChildrenCount());


    studentRep.on('value', function (snapshot) {

      //gives calculates number total rating should be out of (student count * 5)
      ratingTotal = (snapshot.numChildren() * 5);
      //console.log(ratingTotal);
      snapshot.forEach(function (childsSnapshot) {
        //console.log(snapshot.getChildrenCount());
        var studentData = childsSnapshot.val();
        studentsData = studentData.studentName
        var newArray = [];
        newArray.push(classes[i]);
        newArray.push(studentsData);
        brycesArray.push(newArray);
      })
    })
    //console.log(brycesArray);




    // referencing student rating
    var totalArray = [];
    var totalRating = [];

    var ratingRep = firebase.database().ref('Schools/' + schoolName + "/dailyReports/" + today + "/" + classes[i]);
    ratingRep.on('value', function (snapshot) {
      //console.log(snapshot.val());
      snapshot.forEach(function (childsSnapshot) {
        //console.log(childsSnapshot.val());
        var temp;
        temp = childsSnapshot.child("Draw").child("rating").val();
        //console.log(temp);
        if (temp !== null) {
          temp = parseFloat(temp)
          ratingInfo += temp;
        } else {
          ratingInfo += 0;
        }
        //console.log(ratingInfo);
        ratingData = childsSnapshot.val();
        //console.log(ratingData)
        ratingsData = ratingData.rating;

        // console.log(ratingsData);
        firstArr = ratingsData

        lastArr.push(ratingsData);


        //console.log(lastArr)



        loadFirebase = async () => {
          let db = await this.customersRef.orderByChild("ticket").once('value')
          return customers
        }




      });


      // console.log(ratingTotal);
      // console.log("---")
      // console.log(ratingInfo)
      // console.log("===")
      //   console.log(ratingTotal-ratingInfo);
      missingVal = 15 - ratingInfo;

      var g = arrayMain.length
      //console.log(g);
      firstArr = g

      //console.log(lastArr.slice(-1))



      //console.log(sum(arrayMain))
      ratingSum = sum(totalRating)
      finalList.push(ratingSum)

      //console.log(finalList)
      finalSum = sum(finalList)
      //console.log(finalSum)

      var sumTotalRating = sum(totalRating)
      //console.log(sumTotalRating)

      schoolsTotal = sumTotalRating;
      // console.log(schoolsTotal)





      //console.log("all =" + sum(schoolsTotal))
      //console.log(brycesArray);
      //lastArr.push(brycesArray);
    });

    //console.log(lastArr)
    //console.log(brycesArray);

    //console.log(sum(total += ratingsData))

    function sum(obj) {
      var sum = 0;
      for (var el in obj) {
        if (obj.hasOwnProperty(el)) {
          sum += parseFloat(obj[el]);
        }
      }
      return sum;
    }

    //console.log(lastArr);

    //console.log(lastArr)
    var ratingRep2 = firebase.database().ref('Schools/' + schoolName + "/dailyReports/" + today + "/" + classes[i]);
    //console.log(ratingRep2);
    ratingRep2.on('value', function (snapshot2) {
      //console.log(snapshot2.val())
      snapshot2.forEach(function (childSnapshot2) {
        // console.log(childSnapshot2.val());
        childSnapshot2.forEach(function (grandchildSnapshot) {
          console.log(grandchildSnapshot.key);
        })
      })
    })



    // referencing tasks list
    var taskRef = firebase.database().ref('Schools/' + schoolName + "/classes/" + classes[i] + "/Tasks/");
    taskRef.on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        taskData = childData.taskName;
        //console.log(taskData);

        for (var j = 0; j <= brycesArray.length; j++) {
          //console.log(brycesArray);
        }
        data.addRow([taskData, 20, 20, ""]);

        // data.addRow(["Test", , 20, ""]);
        ratingInfo = 0;
      })
    })


    // Instantiate and draw the chart.
    var chart = this.chart
    chart = new google.visualization.BarChart(document.getElementById(name));
    chart.draw(data, options);
    //console.log(childSnapshot);

    //})

    //})


    //console.log(name);
    // Define the chart to be drawn.

  }


  google.charts.setOnLoadCallback(drawChart);
  firebase.auth().onAuthStateChanged(function (user) {
    userSchool = user.displayName;
    var studentRef = firebase.database().ref('Schools/' + userSchool + "/classes/tasks/");
    studentRef.on('value', function (snapshot) {
      //console.log(snapshot);
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();

        var taskName = childData.taskName;
        taskName = taskName.replace(/\s/g, '');
        tasks.push(taskName);
        //console.log(childData.className);
        //drawChart(className);

        //console.log(childSnapshot);

      })
      for (i = 0; i <= (classes.length - 1); i++) {
        text = document.createTextNode(classes[i]);
        var tag = document.createElement("p");
        var newRDiv = document.createElement("div");
        newRDiv.appendChild(tag);
        tag.appendChild(text);
        newRDiv.id = classes[i];
        newRDiv.className = "graphs";
        var element = document.getElementById("myPieChart");
        element.appendChild(newRDiv);
        console.log(classes[i])
        drawChart(classes[i]);
        taskPercentDone(className, taskName);
        console.log
      }
    })
  })






  firebase.auth().onAuthStateChanged(function (user) {
    userSchool = user.displayName;
    var studentRef = firebase.database().ref('Schools/' + userSchool + "/classes");
    studentRef.on('value', function (snapshot) {
      //console.log(snapshot);
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();

        var className = childData.className;
        //className = className.replace(/\s/g, '');

        classes.push(className);
        //console.log(childData.className);
        //drawChart(className);

        //console.log(childSnapshot);

      })
      for (i = 0; i <= (classes.length - 1); i++) {
        const text = document.createTextNode(classes[i]);
        var tag = document.createElement("p");
        var newRDiv = document.createElement("div");
        newRDiv.appendChild(tag);
        tag.appendChild(text);
        newRDiv.id = classes[i];
        newRDiv.className = "graphs";
        var element = document.getElementById("myPieChart");
        element.appendChild(newRDiv);
        drawChart(classes[i]);
      }
    })
  })





  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      uid = user.uid;
      email = user.email;
      schoolName = user.displayName;
      var classRef = firebase.database().ref('Schools/' + schoolName + "/classes");
      drawOChart();
      //var studentNameRef = firebase.database().ref('Schools/' + schoolName + "/students");
      // studentNameRef.on('value', function (snapshot) {
      //   snapshot.forEach(function (childSnapshot) {
      //     var childSNData = childSnapshot.val();
      //     studentNames.push(childSNData.studentName);
      //     studentNames.push(childSNData.studentID);
      //     console.log(studentNames);
      //   });
      //   studentsNamesList = studentNames; //.toString();
      //   //console.log(studentsNamesList);
      // });

      classRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childCData = childSnapshot.val();
          var taskRef = firebase.database().ref('Schools/' + schoolName + "/classes/" + childSnapshot.val().className + "/Tasks");

          temp.push("ClassName: " + childCData.className);
          temp.push(" ");

          taskRef.on('value', function (snapshot2) {
            snapshot2.forEach(function (childSnapshot2) {
              temp.push(childSnapshot2.val().taskName)
            })
          })

          var select = document.getElementById("classList")
          classes.push(childCData.className);
          //console.log(temp);
          // var studentRef = firebase.database().ref('Schools/' + "null" + "/classes" + "/Test Class 2" + '/Student List');
          // studentRef.on('value', function (snapshot) {
          //   snapshot.forEach(function (childSnapshot) {
          //     var childSData = childSnapshot.val();
          //     studentsList.push(childSData);
          //     console.log(studentsList);
          //   });
          //   //studentTest = studentsList.toString();
          //   //console.log(studentTest);
          // });
        });
        for (i = 0; i <= (temp.length - 1); i++) {
          var temp2 = temp[i];
          if (temp2.includes("ClassName")) {
            taskCount = 0;
            students = [];
            temp3 = temp2.replace('ClassName: ', "");
            var stuRef = firebase.database().ref('Schools/' + schoolName + "/classes/" + temp3 + "/Student List");
            var node = document.createElement('h1');
            var textNode = document.createTextNode(temp3);
            node.appendChild(textNode);
            // document.getElementById("classNameLi").appendChild(node)
            var tablenode = document.createElement('table');
            tablenode.setAttribute("id", temp3);
            dTable = tablenode;

            let newRow = tablenode.insertRow(-1);
            // let newCell = newRow.insertCell(0);
            // let newText = document.createTextNode('');
            // newCell.appendChild(newText);
            //document.getElementById("classNameLi").appendChild(tablenode);
            //classCount++;
            //console.log(classCount);

            stuRef.on('value', function (snapshot3) {
              //console.log(snapshot3.val());
              snapshot3.forEach(function (childSnapshot3) {
                students.push(childSnapshot3.val().studentName);
              })
            })
            for (j = 0; j <= (students.length - 1); j++) {
              let newRow = tablenode.insertRow(-1);
              let newCell = newRow.insertCell(0);
              let newText = document.createTextNode(students[j]);
              newCell.appendChild(newText);
              //console.log(tablenode.rows[0].cells.length);
              // var divnode = document.createElement('div');
              // divnode.id = "taskID";
              // var trNode = document.createElement('tr');
              // trNode.id = "nodeID";
              // //document.getElementById("classNameLi").appendChild(divnode);
              // document.getElementById("classNameLi").appendChild(trNode);
              // var dnode = document.createElement('td');
              // var textNode2 = document.createTextNode(students[j]);
              // dnode.appendChild(textNode2);
              // trNode.appendChild(dnode);
              // document.getElementById("classNameLi").appendChild(trNode)
            }
          }
          else {
            // Insert a row at the end of the table
            let newRow = tablenode.rows[0];
            let newCell = newRow.insertCell(-1);
            let newText = document.createTextNode(temp[i]);
            newCell.appendChild(newText);
            taskCount++;
            var rows = tablenode.getElementsByTagName("tr");

            if (taskCount != 1) {
              addCell(rows);
            }


          }


        };


        // var table = document.getElementById('tableID');

      });

    } else {
      //window.location.replace("http://www.behavv.com");
    }
  })

  function addCell(rows) {
    for (k = 1; k <= (rows.length - 1); k++) {
      let blankCell = rows[k].insertCell(-1);
      var ddnode = document.createElement('input');
      ddnode.value = "1";
      blankCell.appendChild(ddnode);
    }
  }

  // for (i = 0; i < classes.length; {
  //   students = [];

  //   var studentRef = firebase.database().ref('Schools/' + schoolName + "/classes" + "/" + classes[i] + "/Student List");
  //   studentRef.on('value', function (snapshot) {
  //     snapshot.forEach(function (childSnapshot) {
  //       var childSData = childSnapshot.val();
  //       var identifier = childSData.studentcid;
  //       var finder = studentsNamesList.indexOf(identifier);
  //       finder = finder - 1;
  //       students.push(studentsNamesList[finder]);
  //     });
  //     studentsList = students.toString();
  //     //console.log(studentsList);
  //   });
  // }

  //   //
  //   var node = document.createElement('ul');
  //   node.classList.add("tasks"); /*adds classList as class on ul*/

  //   var textNode = document.createTextNode("Task Name : " + temp + " Students: " + studentsList);
  //   node.appendChild(textNode);
  //   //document.getElementById("classNameLi").appendChild(node);

  //     });

  //   //
  //   var node = document.createElement('ul');
  //   node.classList.add("tasks"); /*adds classList as class on ul*/

  //   var textNode = document.createTextNode("Task Name : " + temp + " Students: " + studentsList);
  //   node.appendChild(textNode);
  //   //document.getElementById("classNameLi").appendChild(node);

  //     });

  //   });

  // };


  var tasks = [];
  var taskList;
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

  var studentList = [];
  var cumul = 0;
  function taskPercentDone(className, taskName) {
    cumul = 0;
    firebase.database().ref('Schools/' + schoolName + "/classes/" + className + "/Student List").once("value", function (snapshot) {
      snapshot.forEach(function (item) {
        var itum = item.val();
        itum = itum.studentName;
        studentList.push(itum);
      });
      for (m = 0; m < studentList.length; m++) {
        firebase.database().ref('Schools/' + schoolName + '/dailyReports/' + currentDate + '/' + className + "/" + studentList[m] + "/" + taskName).once("value", function (snapshot) {
          var tSnap = snapshot.val();
          tSnap = tSnap.rating;
          tSnap = parseInt(tSnap);
          cumul += tSnap;
        });
      }
    });
  };

  function genPDF() {
    //alert("test");
    analytics.logEvent('download_report');
    var doc = new jsPDF();
    doc.text(20, 20, 'TestPDF');
    doc.addImage(content2, 'PNG', 10, 20, 100, 50);
    doc.addImage(content, 'PNG', 120, 20, 65, 55);
    doc.addPage();
    margins = {
      top: 70,
      bottom: 40,
      left: 30,
      width: 550
    };

    // var source = window.document.getElementsByTagName("body")[0];
    // doc.fromHTML(
    //     source,
    //     15,
    //     15,
    //     {
    //       'width': 180
    //     });
    //  console.log(source);
    // console.log(content2);


    doc.save('test.pdf');
  }
  // tasksRef.on('value', function (snapshot) {
  //   //console.log(snapshot);
  //   console.log()
  //   var classesRef = firebase.database().ref('classes');
  //   var classesList;
  //   classesRef.on('value', function (snapshot) {
  //     snapshot.forEach(function (childSnapshot) {
  //       var childData = childSnapshot.val();
  //       classesRef.on('child_added', function (snapshot) {
  //         //Do something with the data
  //         //document.getElementById("classNameLi").innerHTML = childData.className;

  //       });
  //       classes.push(childData.className);
  //       classes.push(childData.Tasks);
  //     });
  //var className;
  /*saveButton.onclick = function () {
    for (i = 0; i < classes.length; i++) {
      console.log(schoolName);
      className = classes[i];
      var taskNumber = 0;
      firebase.database().ref('Schools/' + schoolName + "/classes/" + className + "/Tasks").orderByChild("tasks").once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          taskNumber = taskNumber + 1;
        });
      });
      var rowsNumber = document.getElementById(className).rows.length;
      for (p = 1; p < rowsNumber; p++) {
        var currentDate = m + "-" + d + "-" + y;
        var studentName = document.getElementById(className).rows[p].cells[0].innerHTML;
        firebase.database().ref('Schools/' + schoolName + "/dailyReports").orderByKey().equalTo(currentDate).once("value", function (snapshot) {
  
          var dateSnapshot = snapshot.val();
  
          if (dateSnapshot) {
  
          } else {
            firebase.database().ref('Schools/' + schoolName + '/dailyReports/' + currentDate).push({});
          }
        });
  
        for (j = 1; j < taskNumber + 1; j++) {
          var taskName = document.getElementById(className).rows[0].cells[j].innerHTML;
          var ratingValue = document.getElementById(className).rows[p].cells[j].firstChild.value;
          if (ratingValue) {
            firebase.database().ref('Schools/' + schoolName + '/dailyReports/' + currentDate + "/" + className + "/" + studentName + '/' + taskName).set({ rating: ratingValue });
          }
  
        };
      };
    };
  };
  */
  var studentList = [];
  function taskPercentDone(className, taskName) {
    cumul = 0;
    firebase.database().ref('Schools/' + schoolName + "/classes/" + className + "/Student List").once("value", function (snapshot) {
      snapshot.forEach(function (item) {
        var itum = item.val();
        itum = itum.studentName;
        studentList.push(itum);
      });
      for (m = 0; m < studentList.length; m++) {
        firebase.database().ref('Schools/' + schoolName + '/dailyReports/' + currentDate + '/' + className + "/" + studentList[m] + "/" + taskName).once("value", function (snapshot) {
          var tSnap = snapshot.val();
          tSnap = tSnap.rating;
          tSnap = parseInt(tSnap);
          cumul += tSnap;
        });
      }
    });
  };

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

  //console.log(lastArr)


  //console.log(lastArr  
  //console.log(lastArr.length)
  //console.log(lastArr)

}
window.onload = function () {
  setTimeout(loadData, 3000);
}

