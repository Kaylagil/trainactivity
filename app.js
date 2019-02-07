{/* <tr>
<th scope="row">1</th>
<td>Mark</td>
<td>Otto</td>
<td>@mdo</td>
</tr> */}
var db = firebase.database();


$('#submit').on('click', function(){
    var newTrain = {
        trainName : $('#trainName').val(),
        destination: $('#destination').val(),
        firstTrainTime: $('#firstTrainTime').val(),
        frequency: $('#frequency').val(),
    }
    db.ref().push(newTrain)
    

});

db.ref().on('child_added', function(snapshot){
    var result = snapshot.val();
     // Assumptions
     var tFrequency = result.frequency;

     // Time is 3:30 AM
     var firstTime = result.firstTrainTime;
 
     // First Time (pushed back 1 year to make sure it comes before current time)
     var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
     console.log(firstTimeConverted);
 
     // Current Time
     var currentTime = moment();
     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
 
     // Difference between the times
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);
 
     // Time apart (remainder)
     var tRemainder = diffTime % tFrequency;
     console.log(tRemainder);
 
     // Minute Until Train
     var tMinutesTillTrain = tFrequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
 
     // Next Train
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
 
   
    
    $('#tableBody')
    .append(
        `
        <tr>
            <td scope="row">${result.trainName}</td>
            <td>${result.destination}</td>
            <td>${result.frequency}</td>
            <td> ${nextTrain}</td>
            <td>${tMinutesTillTrain}</td>
           
        </tr> 
        `
    )

})