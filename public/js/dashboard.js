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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const analytics = firebase.analytics();

// const myPromise = new Promise((resolve, reject) => {
//  startData()
// });

// myPromise
//   .then(loadData, console.log("Failed"))


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

var n = new Date();
var y = n.getFullYear();
var m = n.getMonth();
var d1 = n.getDay();
var d = weekday[n.getDay()];
document.getElementById("date").innerHTML = d + ", " + m + " " + d1 + ", " + y;
//current date script by Lance on StackOverflow

var uid;
var email;
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
var chartComplete;


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

async function loadChartInfo() {
  google.charts.load('current', { packages: ['corechart'] });
  google.load('visualization', { packages: ['corechart'] });
}


google.charts.load('current', { packages: ['corechart'] });
google.charts.load('visualization', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
async function drawOChart() {

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



  // var chart3 = new google.visualization.Table(document.getElementById('chartContainer5'));
  // drawCharts(data, options1);
  // drawCharts(data, options1);
  chart.draw(data, options1);

  // drawCharts(data2, options2)

  // ch
  // drawCharts(data2, options2);
  chart2.draw(data2, options2);

  google.visualization.events.addListener(chart, 'ready', function () {
    let content = chart.getImageURI();
    // drawCharts(data2, options2);
    //content = '<img src="' + chart.getImageURI() + '">';
    // $('#chartContainer3').append(content);
  });

  google.visualization.events.addListener(chart2, 'ready', function () {
    content2 = chart2.getImageURI()
    //content = '<img src="' + chart.getImageURI() + '">';
    // $('#chartContainer3').append(content);
  });
  content = chart.getImageURI();
  content2 = chart2.getImageURI();
  console.log(content, content2);
  return content, content2
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

  var data = this["marker" + name]
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







  data = new google.visualization.arrayToDataTable([
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
  var studentRep = firebase.database().ref('Schools/' + schoolName + "/classes/" + classes[i] + "/Student List/");
  studentRep.on('value', function (snapshot) {
    snapshot.forEach(function (childsSnapshot) {
      var studentData = childsSnapshot.val();
      studentsData = studentData.studentName;
      //console.log(studentsData);
    })
  })

  // referencing tasks list
  var taskRef = firebase.database().ref('Schools/' + schoolName + "/classes/" + classes[i] + "/Tasks/");
  taskRef.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      taskData = childData.taskName;
      //console.log(taskData);
      data.addRow([taskData, 20, 20, ""]);

      // data.addRow(["Test", , 20, ""]);

    })
  })
 // data.addRow(["testing", 40, 20, ""])
//console.log(taskData)
  // referencing student rating
  var totalArray = [];
  var totalRating = [];
  var ratingRep = firebase.database().ref('Schools/' + schoolName + "/dailyReports/" + today + "/" + classes[i] + "/" + studentsData + "/");
  ratingRep.on('value', function (snapshot) {

    snapshot.forEach(function (childsSnapshot) {

      ratingData = childsSnapshot.val();
      //console.log(ratingData)
      ratingsData = ratingData.rating;

     // console.log(ratingsData);
      firstArr = ratingsData

      lastArr.push(ratingsData);
      
      console.log(ratingsData)
      

      //console.log(lastArr)
//console.log(lastArr);


      loadFirebase = async () => {
        let db = await this.customersRef.orderByChild("ticket").once('value')
        return customers
      }




    });





  });

  //console.log(lastArr)
  //console.log(brycesArray);



  //console.log(lastArr);


  //console.log(lastArr)






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
    for (var i = 0; i <= (classes.length - 1); i++) {
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
    for (var i = 0; i <= (classes.length - 1); i++) {
      const text = document.createTextNode(classes[i]);
      var tag = document.createElement("p");
      var newRDiv = document.createElement("div");
      newRDiv.appendChild(tag);
      tag.appendChild(text);
      newRDiv.id = classes[i];
      newRDiv.className = "graphs";
      var element = document.getElementById("myPieChart");
      if (newRDiv !== null){
        element.appendChild(newRDiv);
      }

      drawChart(classes[i]);
    }
  })
})





firebase.auth().onAuthStateChanged(async function (user) {
  if (user) {
    uid = user.uid;
    email = user.email;
    schoolName = user.displayName;
    var classRef = firebase.database().ref('Schools/' + schoolName + "/classes");
    drawOChart();


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
          node.appendChild(textNode);
          // document.getElementById("classNameLi").appendChild(node)
          var tablenode = document.createElement('table');
          tablenode.setAttribute("id", temp3);
          dTable = tablenode;

          let newRow = tablenode.insertRow(-1);


          stuRef.on('value', function (snapshot3) {
            //console.log(snapshot3.val());
            snapshot3.forEach(function (childSnapshot3) {
              students.push(childSnapshot3.val().studentName);
            })
          })
          for (var j = 0; j <= (students.length - 1); j++) {
            let newRow = tablenode.insertRow(-1);
            let newCell = newRow.insertCell(0);
            let newText = document.createTextNode(students[j]);
            newCell.appendChild(newText);

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
  for (var k = 1; k <= (rows.length - 1); k++) {
    let blankCell = rows[k].insertCell(-1);
    var ddnode = document.createElement('input');
    ddnode.value = "1";
    
    blankCell.appendChild(ddnode);
  }
}









var tasks = [];
var taskList;
//Show tasks as table
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

 



  doc.save('test.pdf');
}

var studentList = [];
// function taskPercentDone(className, taskName) {
//   cumul = 0;
//   firebase.database().ref('Schools/' + schoolName + "/classes/" + className + "/Student List").once("value", function (snapshot) {
//     snapshot.forEach(function (item) {
//       var itum = item.val();
//       itum = itum.studentName;
//       studentList.push(itum);
//     });
//     for (m = 0; m < studentList.length; m++) {
//       firebase.database().ref('Schools/' + schoolName + '/dailyReports/' + currentDate + '/' + className + "/" + studentList[m] + "/" + taskName).once("value", function (snapshot) {
//         var tSnap = snapshot.val();
//         tSnap = tSnap.rating;
//         tSnap = parseInt(tSnap);
//         cumul += tSnap;
//       });
//     }
//   });
// };





//console.log(lastArr.length)
// console.log(lastArr)



// window.onload = function() {
//   setTimeout(loadData, 3000);
// };


export { drawOChart, loadChartInfo };
