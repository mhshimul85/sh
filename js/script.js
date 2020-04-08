// Define Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAPIxRMHJgRBpeglySIYF6f0ExoLUbnqb0",
  authDomain: "smart-home-c80fc.firebaseapp.com",
  databaseURL: "https://smart-home-c80fc.firebaseio.com",
  projectId: "smart-home-c80fc",
  storageBucket: "smart-home-c80fc.appspot.com",
  messagingSenderId: "834279152976",
  appId: "1:834279152976:web:9a65dac1bc4b91bd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Our code here
$(document).ready(function(){
  // Defining Variable
  var ref = firebase.database().ref();
  var relayOne;
  var relayTwo;
  var relayThree;
  var relayFour;
  var hc;
  var intId = setInterval(counter, 3000);

	ref.on("value", function(snap){
    // Getting the values from firebase database
    relayOne = snap.val().relayOne;
    relayTwo = snap.val().relayTwo;
    relayThree = snap.val().relayThree;
    relayFour = snap.val().relayFour;
    hc = snap.val().hc;
  });

  function counter() {
    // Water level checker
    $('.water-tank-p').text(hc+"%");
    $('.water-tank-waterlevel').css("height", hc+"%");
    
    
    if( 0 <= hc && hc <= 20 ){
      $('.water-tank-waterlevel').css("background", "#ff0000");
    } else if( 20 < hc && hc <= 40) {
      $('.water-tank-waterlevel').css("background", "#ff66cc");
    } else if( 40 < hc && hc <= 60) {
      $('.water-tank-waterlevel').css("background", "#9900ff");
    } else if( 60 < hc && hc <= 80) {
      $('.water-tank-waterlevel').css("background", "#0080ff");
    } else if( 80 < hc && hc <= 100) {
      $('.water-tank-waterlevel').css("background", "#40ff00");
    } 
  }

  console.log(relayOne);
  //$('.text').text(relayOne+' '+relayTwo+' '+relayThree+' '+relayFour);
  // Code for realtime switch mode change
  function x(){
    if(relayOne == 1){
      $('.relayOne').attr('checked','checked');
    } else {
      $('.relayOne').removeAttr('checked');
    }

    if(relayTwo == 1){
      $('.relayTwo').attr('checked','checked');
    } else {
      $('.relayTwo').removeAttr('checked');
    }

    if(relayThree == 1){
      $('.relayThree').attr('checked','checked');
    } else {
      $('.relayThree').removeAttr('checked');
    }

    if(relayFour == 1){
      $('.relayFour').attr('checked','checked');
    } else {
      $('.relayFour').removeAttr('checked');
    }
    
  }

  window.setTimeout( x, 4000 );
  // On click Changes the data
  $('input').click(function(){
    
    var relay = $(this).attr('class');
    // Firebase Database location
    var firebaseRef = firebase.database().ref().child(relay);
    // Assigning the relays value to another variable
    switch (relay) {
      case 'relayOne':
        relay = relayOne;
        break;
      case 'relayTwo':
        relay = relayTwo;
        break;
      case 'relayThree':
        relay = relayThree;
        break;
      case 'relayFour':
        relay = relayFour;
        break;
      default:;
    }
    // Updating the relay values
    if(relay == 1){
		  firebaseRef.set(0);
		} else {
		  firebaseRef.set(1);
    }
  });

});
