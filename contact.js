
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
const kids_field = document.getElementById('kids_field');
const number_kids = document.getElementById('number_kids');
const kids_names = document.getElementsByName('kid');
const infants_field = document.getElementById('infants_field');
const number_infants = document.getElementById('number_infants');
const infants_names = document.getElementsByName('infant');
const after_field = document.getElementById('after_field');
const after_stay = document.getElementById('after_stay');
const after_transport = document.getElementById('after_transport');
const after_self = document.getElementById('after_self');
const transport_in = document.getElementById('transport_in');
const transport_field = document.getElementById('transport_field');
const diet_field = document.getElementById('diet_field');
const diet = document.getElementById('diet');
const friday_field = document.getElementById('friday_field');
const friday = document.getElementById('friday');



//Hiding some elements before verification
messagebox.style.display='none';
submit.style.display='none';
reset.style.display='none';
adults_field.style.display='none';
kids_field.style.display='none';
infants_field.style.display='none';
after_field.style.display='none';
transport_field.style.display='none';
friday_field.style.display='none';
diet_field.style.display='none';

for (var i = 0; i < adults_names.length; ++i)
    {
            adults_names[i].style.display = 'none';
    }
for (var i = 0; i < infants_names.length; ++i)
    {
            infants_names[i].style.display = 'none';
    }
for (var i = 0; i < kids_names.length; ++i)
    {
            kids_names[i].style.display = 'none';
    }

//Function listening for auth changes and showing/hiding appropriate fields
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
                  kids_field.style.display='block';
                  infants_field.style.display='block';
                  after_field.style.display='block';
                  transport_field.style.display='block';
                  friday_field.style.display='block';
                  diet_field.style.display='block';

                } else {
                //  document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
                  messagebox.style.display='none';
                  submit.style.display='none';
                  reset.style.display='none';
                  adults_field.style.display='none';
                  kids_field.style.display='none';
                  infants_field.style.display='none';
                  after_field.style.display='none';
                  transport_field.style.display='none';
                  friday_field.style.display='none';
                  diet_field.style.display='none';

                }
              });
}

//Function giving proper number of fields depending on selection
number_adults.onchange = function() {

    for (var i = 0; i < adults_names.length; ++i)
    {
        if(i < number_adults.value){
            adults_names[i].style.display = 'inline';

        } else {
            adults_names[i].style.display = 'none';
        }
    }

};

number_kids.onchange = function() {

    for (var i = 0; i < kids_names.length; ++i)
    {
        if(i < number_kids.value){
            kids_names[i].style.display = 'inline';

        } else {
            kids_names[i].style.display = 'none';
        }
    }

};
number_infants.onchange = function() {

    for (var i = 0; i < infants_names.length; ++i)
    {
        if(i < number_infants.value){
            infants_names[i].style.display = 'inline';

        } else {
            infants_names[i].style.display = 'none';
        }
    }

};

window.onload = function() {
      initApp();
    };

//Create database reference
const dbRefObject = firebase.database().ref();

//Adding action to the verification button
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

//Adding action to submission button
submit.addEventListener('click', e=>{
  var postData = {
    author: name.value,
    message: message.value,
    email:email.value,
    adults:Number(number_adults.value)+1,
    kids:Number(number_kids.value),
    infants:Number(number_infants.value),
    transport_in:transport_in.checked,
    after_stay:after_stay.checked,
    after_self:after_self.checked,
    after_transport:after_transport.checked,
    diet:diet.checked,
    friday:friday.checked
    };
    for (var i=1;i<=number_adults.value;i++){
      var j=i+1;
      postData['adult'+j]=document.getElementById('adult'+i).value;
    }
    for (var i=1;i<=number_kids.value;i++){
      postData['kid'+i]=document.getElementById('kid'+i).value;
    }
    for (var i=1;i<=number_infants.value;i++){
      postData['infant'+i]=document.getElementById('infant'+i).value;
    }
    console.log(postData);
          // [END_EXCLUDE]
      dbRefObject.child(name.value).set(postData).catch(function(error) {
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
