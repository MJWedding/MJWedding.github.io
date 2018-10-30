
if (firebase.auth().currentUser) {

        firebase.auth().signOut();
      }

//Getting Elements
const name = document.getElementById('name');
const email = document.getElementById('email');
const messagebox = document.getElementById('messagebox');
const submit = document.getElementById('submit');
const bottom = document.getElementById('bottom');
const verify = document.getElementById('verify');
const reset = document.getElementById('reset');
const message = document.getElementById('message');
const adults_field = document.getElementById('adults_field');
const number_adults = document.getElementById('number_adults');
const adults_names = document.getElementsByName('adult');
console.log(adults_names);


messagebox.style.display='none';
submit.style.display='none';
reset.style.display='none';
adults_field.style.display='none';

for (var i = 0; i < adults_names.length; ++i)
    {

            adults_names[i].style.display = 'none';

    }

function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                //  document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';

                  messagebox.style.display='block';
                  submit.style.display='block';
                  reset.style.display='block';
                  adults_field.style.display='block';

                } else {
                //  document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
                  messagebox.style.display='none';
                  submit.style.display='none';
                  reset.style.display='none';
                  adults_field.style.display='none';

                }
              });
}

number_adults.onchange = function() {
console.log(number_adults.value);
    for (var i = 0; i < adults_names.length; ++i)
    {
        if(i < number_adults.value){
            adults_names[i].style.display = 'inline';
            console.log('changed');
        } else {
            adults_names[i].style.display = 'none';
        }
    }

}
window.onload = function() {
      initApp();
    };

//Create references
const dbRefObject = firebase.database().ref();

verify.addEventListener('click', e=>{
  var pass = document.getElementById('pass');
  firebase.auth().signInWithEmailAndPassword('sobus.jan@gmail.com', pass.value).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errormessagebox = error.messagebox;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errormessagebox);
          }
          console.log(error);

          // [END_EXCLUDE]
        });
});

submit.addEventListener('click', e=>{
  var postData = {
    author: name.value,
    text: message.value
    };
          // [END_EXCLUDE]
      dbRefObject.child(email.value).set(postData).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errormessagebox = error.messagebox;
              // [START_EXCLUDE]
              alert(errormessagebox);

              console.log(error);

              // [END_EXCLUDE]
            });
      alert('Your data was added');
    });
