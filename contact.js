console.log("strona zaladowana");

//Getting Elements
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const submit = document.getElementById('submit');

//Create references
const dbRefObject = firebase.database().ref();

//Submitting function
function submitData() {
  var postData = {
    author: name.value,
    text: message.value
  };
  dbRefObject.child(email.value).set(postData);

}
