const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();
const request = require('request');

exports.sendLED = functions.database.ref("/motion_sensor").onUpdate((change,context) => {

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
  console.log('Motion: ' + change.after._data[diff[0]].motion);
  // console.log('moisterr: '+change.after._data[diff[0]].humidity);

  // console.log(context);
  const url = "http://31c5c6a2.ngrok.io";
  const motionVal = change.after._data[diff[0]].motion;
  // const Http = new XMLHttpRequest();

  console.log('Motion = ' + motionVal);


   if (motionVal == 1) {
    request(`${url}/led/1`, (error, res, body) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      console.log("MOTION - LED ON");
    })
  } else {
    request(`${url}/led/0`, (error, res, body) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      console.log("MOTION - LED OFF");
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
  const url = "http://31c5c6a2.ngrok.io";
  const temperatureval = change.after._data[diff[0]].temp;
  // const Http = new XMLHttpRequest();

  console.log('temperature = ' + temperatureval);


  if (temperatureval > 50) {
    request(`${url}/fan/100`, (error, res, body) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    })
    // console.log('FAN SET TO 100% DUTY CYCLE');
  } else if (temperatureval > 35) {
    request(`${url}/fan/50`, (error, res, body) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    })
  } else if (temperatureval > 20) {
    request(`${url}/fan/10`, (error, res, body) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    })
  } else {
    request(`${url}/fan/0`, (error, res, body) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    })
  }

});



