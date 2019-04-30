const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();
const request = require('request');

exports.sendLED = functions.database.ref("/motion_sensor").onUpdate((change,context) => {

  keyBefore = Object.keys(change.before._data);
  keyAfter = Object.keys(change.after._data);
  diff = [];
  joined = keyBefore.concat(keyAfter);
  for (i = 0; i <= joined.length; i++) {
    current = joined[i];
    if (joined.indexOf(current) == joined.lastIndexOf(current)) {
      diff.push(current);
    }
  }
  
  console.log('Motion: ' + change.after._data[diff[0]].motion);
<<<<<<< HEAD
  // console.log('moisterr: '+change.after._data[diff[0]].humidity);

  // console.log(context);
  const url = "http://d86f7387.ngrok.io";
=======
  
  const url = "http://31c5c6a2.ngrok.io";
>>>>>>> 60eb08e6115a136da6dc89408ff80af14f241402
  const motionVal = change.after._data[diff[0]].motion;
  

  console.log('Motion = ' + motionVal);


   if (motionVal == 1) {
    request(`${url}/led/1`, (error, res, body) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      console.log("FIREBASE FUNCTIONS TRIGGERED - MOTION - LED ON");
    })
  } else {
    request(`${url}/led/0`, (error, res, body) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      console.log("FIREBASE FUNCTIONS TRIGGERED - MOTION - LED OFF");
    })
  }

});

exports.sendFan = functions.database.ref("/temp_sensor").onUpdate((change, context) => {

  // console.log(change.before._data);
  // console.log(change.after._data);
  keyBefore = Object.keys(change.before._data);
  keyAfter = Object.keys(change.after._data);
  diff = [];
  joined = keyBefore.concat(keyAfter);
  for (i = 0; i <= joined.length; i++) {
    current = joined[i];
    if (joined.indexOf(current) == joined.lastIndexOf(current)) {
      diff.push(current);
    }
  }
  // console.log(diff.length);
  console.log('moist: ' + change.after._data[diff[0]].temp);
  // console.log('moisterr: '+change.after._data[diff[0]].humidity);

  // console.log(context);
  const url = "http://d86f7387.ngrok.io"; // chamge at every NGROK boot
  const temperatureval = change.after._data[diff[0]].temp;
  // const Http = new XMLHttpRequest();

  console.log('temperature = ' + temperatureval);


  if (temperatureval > 30) {
    request(`${url}/fan/100`, (error, res, body) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      console.log("FIREBASE FUNCTIONS TRIGGERED - FAN -  SET TO DUTY CYCLE 100%");
    })
    // console.log('FAN SET TO 100% DUTY CYCLE');
  } else if (temperatureval > 27.7) {
    request(`${url}/fan/50`, (error, res, body) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      console.log("FIREBASE FUNCTIONS TRIGGERED - FAN -  SET TO DUTY CYCLE 100%");
    })
  } else if (temperatureval > 25) {
    request(`${url}/fan/10`, (error, res, body) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      console.log("FIREBASE FUNCTIONS TRIGGERED - FAN -  SET TO DUTY CYCLE 100%");
    })
  } else {
    request(`${url}/fan/0`, (error, res, body) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      console.log("FIREBASE FUNCTIONS TRIGGERED - FAN -  SET TO DUTY CYCLE 100%");
    })
  }

});


exports.defaultFan = functions.database.ref("/users/").onUpdate((change, context) => {

 const fan = change.data();
 const speed = fan.temp;

 const { spawn } = require('child_process');
 const pyProg = spawn('python', ['fan.py', speed]);

 pyProg.stdout.on('data', function(data) {

     console.log(data.toString());
     res.write(data);
     res.end('USER FAN SPEED SET /n END');
 });

});
