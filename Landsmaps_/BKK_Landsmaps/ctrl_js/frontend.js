
var mydt = [];
var camdt = [];
var onlycamdt = [];
$(function () {
  // if user is running mozilla then use it's built-in WebSocket
  window.WebSocket = window.WebSocket || window.MozWebSocket;

  var connection = new WebSocket('ws://122.155.197.220:15551');

  connection.onopen = function () {
    // connection is opened and ready to use
     
  };

  connection.onerror = function (error) {
    // an error occurred when sending/receiving data
  };

  
  connection.onmessage = function (message) {
    // try to decode json (I assume that each message
      // from server is json)

      if (!getdata) return;
      mydt = JSON.parse(message.data);



      
      if (mydt.type=="alm") //if (alarm_json != mydt)
      {
          //  if (alarm_json != mydt.data) {
         // mjs = JSON.stringify(mydt.data)
          alarm_json = mydt;
          get_alarm();
          //console.log('get new alarm : ' + JSON.stringify(alarm_json));
          //} 
          
      }

      if (mydt.type == "allcam") {

          camdt = mydt.data;
          get_camera_alarm();
          // console.log(JSON.stringify(camdt));

      }

      if (mydt.type == "onlycam") {

          onlycamdt = mydt.data;
          get_camera();
          // console.log(JSON.stringify(camdt));
      }

      //console.log(alarm_json);

      //alert(json);
     // document.getElementById('content').innerHTML = "555 " + JSON.stringify(mydt);
      //var st = "";
      //var k = 0;
      //k = 5;//mydt.rowCount - 1;

      //document.getElementById("alarm_notify_list").innerHTML = "";
      //for (i = 0; i < k; i++)
      //{
      //    document.getElementById("alarm_notify_list").innerHTML += "<p><a href='#'><img id='ItemPreview' src='" + "data:image/png;base64," + btoa(String.fromCharCode.apply(null, new Uint8Array(mydt.rows[i].alarmimage.data))) + "' style='width:100px' /></a?</p>";
      //}

      //n = mydt.rowCount;
      //console.log(n);

      //i = 0;
      //document.getElementById("alarm_list").innerHTML = "";
      //for (i = 0; i < n; i++) {
      //    document.getElementById("alarm_list").innerHTML += "<p><a href='#'><img id='ItemPreview' src='" + "data:image/png;base64," + btoa(String.fromCharCode.apply(null, new Uint8Array(mydt.rows[i].alarmimage.data))) + "' style='width:320px' /></a?</p>";
      //}


//document.getElementById("myi").innerHTML =st ;
   // console.log(JSON.stringify(mydt));
    //console.log("some thing in");
    //try {
    //  var json = JSON.parse(message.data);
    //} catch (e) {
    //  console.log('This doesn\'t look like a valid JSON: ',
    //      message.data);
    //  return;
   // }
    // handle incoming message
  };
});