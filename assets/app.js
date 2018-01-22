  var config = {
    apiKey: "AIzaSyBI3aOCRkVOYbk9pX3iMhsiBcwmfvQl_Cc",
    authDomain: "test-86497.firebaseapp.com",
    databaseURL: "https://test-86497.firebaseio.com",
    projectId: "test-86497",
    storageBucket: "test-86497.appspot.com",
    messagingSenderId: "717069933526"
  };
  firebase.initializeApp(config);


  const dbRef = firebase.database().ref("trainTime");


$("#add-train-btn").click(function(event) {
	event.preventDefault();

	  const train ={
	  	name: $("#train-name-input").val().trim(),
	  	destination: $("#destination-input").val().trim(),
	  	time: $("#time-input").val().trim(),
	  	frequency: $("#frequency-input").val().trim(),
	  	arrival:(""), 
	  	minAway:("")
	  	};

	  	dbRef.push(train);
	  	clearText();
  	console.log(train);

});



// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
dbRef.on("child_added", function(childSnapshot, prevChildKey) {

  // Employee Info
  const train = childSnapshot.val();

  
  // Calculate the next arrival time 

  // newEmp.months = moment().diff(moment.unix(newEmp.start, "X"), "months");
  // console.log(newEmp.months);

  // Calulate how many minutes away 
  // newEmp.start = moment.unix(newEmp.start).format("MM/DD/YY");

  // newEmp.billed = newEmp.months * newEmp.rate;
  // console.log(newEmp.billed);

  // Add each employee's data into the table
  $("#train-table > tbody").append(createTrainRow(train));
});

function createTrainRow(train) {
  const trow = $('<tr>');
  trow.append(`<td>${train.name}</td>`)
      .append(`<td>${train.destination}</td>`)
      .append(`<td>${train.frequency}</td>`)
      .append(`<td>${train.arrival}</td>`)
      .append(`<td>${train.minAway}</td>`);

  return trow;
}

	function clearText() {
		$(".form-control").val("");
	}

var timeNow = moment().format("HH:mm:ss a");


console.log(timeNow);

