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
  const auth = firebase.auth();

// Reference messages collection
var messagesRef = firebase.database().ref('user');
var loginTest = firebase.database().ref('user')
var schools = [];
var testPhone = "Enter Phone Number";

//console.log(testPhone);

// Listen for form submit
document.getElementById('loginbtn').addEventListener('click', submitForm);


// Submit form
function submitForm(e){
  e.preventDefault();
  // Get values
  var fname = getInputVal('fname');
  var email = getInputVal('email');
  var school = getInputVal('school'); 
  var password = getInputVal('password'); 
  var password2 = getInputVal('password2'); 
  if (password != password2) {
    alert('Passwords do not match');
    return;
    }
  
  saveMessage(fname,email, school, password);

  
}

// Function to get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(fname, email, school, password){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(result) {
    
    document.getElementById("createdText").innerHTML = "Account Created!";
    setTimeout(window.location.reload.bind(window.location), 4000);

    //alert("Account created - you can now login!");
    return result.user.updateProfile({
      displayName: school,
      photoURL: fname,
      phoneNumber: testPhone //firebase user object feilds. Can take in strings
    })
  
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/email-already-in-use') {
      alert('Email already in use');
    } 
    
  });

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var uid = user.uid;
    //var schoolName = user.displayName;
  
    firebase.database().ref('Schools/' + school + "/Users").orderByChild("email").equalTo(email).once("value", function(snapshot) {
     var emailSnapshot = snapshot.val();
     
      if (emailSnapshot){
        return(school);
        
      }else{
          firebase.database().ref('Schools/' + school + '/Users').push({ name: fname, email: email, uid: uid, schoolName: school });
          // Show alert
            document.querySelector('.alert').style.display = 'block';

            // Hide alert after 3 seconds
            setTimeout(function(){
              document.querySelector('.alert').style.display = 'none';
            },3000);

            // Clear form
            // document.getElementById('signup').reset();

        }

  }); 
}
});
}



/*function saveUser(fname, email){
  var user = firebase.auth().currentUser;
  if (user) {
    // User is signed in.
    var uid = user.uid;
    firebase.database().ref('user').push({name:fname, email: email, uid: uid});
  
  }else{
    var uid = user.uid;
  }
}
  //Listens for the login action on login button
  document.getElementById('login').addEventListener('login', submitForm);

  function submitForm(e){
    e.preventDefault();
  
      // Get values
    var email = getInputVal('loginEmail');
    var password = getInputVal('loginPassword');

    
    saveLogin(email,password);
  
    // Show alert
    document.querySelector('.alert').style.display = 'block';
  
    // Hide alert after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').style.display = 'none';
    },3000);
  
    // Clear form
    document.getElementById('login').reset();
  
  }
  
  // Function to get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
  

  var databaseEmail = firebase.database().ref(email);
  var databaseName = firebase.database().ref(name);
    function loginTest(email, fname){
      var loginTest = loginTest.push();
      loginTest.push(email, fname);
 }
 */