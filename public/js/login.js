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


  function signIn(){
  
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => alert(e.message));
    
   }
   
   
   function signOut(){
    
    auth.signOut();
    alert("Signed Out");
    
   }
   
   
   
   auth.onAuthStateChanged(function(user){
    
    if(user){
     
     var email = user.email;
     alert("Active User " + email);
     
     //Take user to a different or home page
  
     //is signed in
     
    }else{
     
     alert("No Active User");
     //no user is signed in
    }
    
    
    
   });
  
  