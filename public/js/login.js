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
  firebase.auth().signOut();
  const auth = firebase.auth();
  firebase.auth().setPersistence(app.auth.Auth.Persistence.LOCAL);

  firebase.auth().onAuthStateChanged(user => {
    if(user){
      console.log(user);
      alert("Active User " + user.email);
      btnLogout.classList.remove('hide');
       
    }else{
      console.log("No Active User");
       //no user is signed in
      }
    });

  // get elements
  const btnLogin = document.getElementById('loginbtn');
  const txtEmail = document.getElementById("email");
  const pass = document.getElementById("password");
  const btnLogout = document.getElementById('logoutbtn');
 
//Signs In User
  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = pass.value;
    
    const promise = firebase.auth().signInWithEmailAndPassword(email, password);
    promise.catch(e => alert(e.message));


    //Checks If Auth Status has changed
});

btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
  console.log("Signed out");
});

    /*function signOut(){
  
      auth.signOut();
      alert("Signed Out");
      
     }*/

    

   
  