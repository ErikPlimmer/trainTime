

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
	  // var timeNow = moment().format("HH:mm");

	  // Calculate the next arrival time 
	const train ={
	  	name: $("#train-name-input").val().trim(),
	  	destination: $("#destination-input").val().trim(),
	  	fArrivalTime: $("#time-input").val().trim(),
	  	frequency: $("#frequency-input").val().trim(),
	  	arrival:$(), 
	  	minAway:$()
	  	};

	  	//clears input text function
	  	clearText();

  		

		const firstTimeConverted = moment(train.fArrivalTime, "hh:mm");
		console.log("first converted number" ,firstTimeConverted);

		const timeNow = moment();

		const diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log(diffTime);

		const tRemainder = diffTime % train.frequency;
		console.log("remaider" ,tRemainder);

		const tMinutesTillTrain = train.frequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		const nextTrain = moment().add(tMinutesTillTrain, "minutes");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


		train.arrival = moment(nextTrain).format("hh:mm");

		train.minAway = tMinutesTillTrain;
  		console.log(train);


	 // Calulate how many minutes away 

	  	// pushes train object to database
	  	dbRef.push(train);

		console.log(train.arrival);
		console.log(train.minAway);


});



// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
dbRef.on("child_added", function(childSnapshot, prevChildKey) {

  // Train object Info
  const train = childSnapshot.val();

  


  // Add each train's data into the table
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
	//clears input text function
	function clearText() {
		$(".form-control").val("");
	}





 


