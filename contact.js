console.log("strona zaladowana");
if (firebase.auth().currentUser) {

        firebase.auth().signOut();
      }
function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                  document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
                } else {
                  document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
                }
              });
}
window.onload = function() {
      initApp();
    };
//Getting Elements
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const submit = document.getElementById('submit');


//Create references
const dbRefObject = firebase.database().ref();

//Submitting function
function submitData2() {
  var postData = {
    author: name.value,
    text: message.value
  };

  dbRefObject.child(email.value).set(postData);

  }

function submitData(){
  firebase.auth().signOut();
  var pass = document.getElementById('pass');
  console.log(pass.value);
  firebase.auth().signInWithEmailAndPassword('sobus.jan@gmail.com', pass.value).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);

          // [END_EXCLUDE]
        });

        var postData = {
          author: name.value,
          text: message.value
        };
        if (firebase.auth().currentUser) {
            dbRefObject.child(email.value).set(postData);

            // [END signout]
          }

    firebase.auth().signOut();
}
