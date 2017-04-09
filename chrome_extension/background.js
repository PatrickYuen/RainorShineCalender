number = "+19082104399"
window.onload = function(event) {
	var events = getElementsByClassName(document.body, 'cbrd');
	
	//push_event("+19082104399", "test", 4, 9, 2017, 8, 41)
	//get_weather("Brisbane", 4, 10, 2017, 11, 1)

	var cal_info = []
	
	//Sooper Bad
	month = 4
	dates = [9,10,11,11,12,12,12,13,13,14,14,14]
	year = 2017
	
	clear_src = "https://img.clipartfest.com/76d86a2bf207ddd0fec470ad6b5333ac_download-tiny-sun-clipart-sun-clipart-small_100-100.png";
	rain_src = "http://www.clipartbest.com/cliparts/dT7/66y/dT766yxEc.png";
	
	var counter = 0;
	
	for(ev in events){
		var event_box = getElementsByClassName(events[ev], "evt-lk")
		var time = getElementsByClassName(events[ev], "chip-caption")
		var city = getElementsByClassName(events[ev], "cloc")
		if(event_box.length > 0 && time.length > 0 && event_box.length > 0) {
			var event_name = event_box[0].innerText;
			var event_time = time[0].innerText;
			var event_city = city[0].innerText;
			
			shorttime = event_time.split("p")[0].split(":");
			hour = parseInt(shorttime[0]);
			minute = shorttime[1] === undefined? 0:parseInt(shorttime[1]);
			
			weather = get_weather(city, month, dates[counter], year, hour, minute, event_box[0]);
			
			console.log(event_name, event_time, event_city, weather, hour, minute);
			
			//Send Post Event to flask server
			push_event(number, name, month, dates[counter], year, hour, minute)
			
		}
		counter += 1;
	}
	
};

function get_weather(lat, lon) {
	//Get Weather from openWeather API
	var url_test = "https://4c1803fe.ngrok.io/weather?lat=" + str(lat) + "&lon=" + str(lon);
	
	var jqxhr = $.get( 
		url_test, 
		function(data) {
			console.log(data['res']);
		}
	);
}

function get_weather(city, month, day, year, hour, minute, el) {

	time = new Date();
	time.setMonth(month - 1);
	time.setDate(day);
	time.setYear(year);
	time.setHours(hour);
	time.setMinutes(minute);
	//console.log(time)
		
	time = Math.round(time.getTime() / 1000);
	
	//Get Weather from openWeather API
	var url_test = "https://4c1803fe.ngrok.io/forecast?city=" + city + "&time=" + time;
	
	var jqxhr = $.get( 
		url_test, 
		function(data) {
			console.log(data['res']);
			
			//Add Picture
			ele = document.createElement('img');
			ele.src = data['res'] == 'Clear'? clear_src: rain_src;
			ele.style = "width:30px;height:30px;";
			el.appendChild(ele);
		}
	);
}

function get_weather_city(city) {
	//Get Weather from openWeather API
	var url_test = "https://4c1803fe.ngrok.io/forecast?q=" + str(city);
	
	var jqxhr = $.get( 
		url_test, 
		function(data) {
			console.log(data['res']);
		}
	);
}

function push_event(number, name, month, day, year, hour, minute) {
	
	//Get Weather from openWeather API
	var url_test = "https://4c1803fe.ngrok.io/schedule";
	var date = month + " " + day + " " + year + " " + hour + ":" + minute;

	
	var jqxhr = $.post( 
		url_test, 
		"{\"name\":\""+name+"\",\"dest_num\":\""+number+"\",\"time\":\"" + date+ "\"}",
		function(data, status) {
			console.log("Hi");
		}
	);
}

//TODO: On change

function getElementsByClassName(root, className) {
  var elements = root,
      matches  = [];

  function traverse(node) {
    for(var i = 0; i < node.childNodes.length; i++) {
      if(node.childNodes[i].childNodes.length > 0) {
        traverse(node.childNodes[i]);
      }
      
      if(node.childNodes[i].getAttribute && node.childNodes[i].getAttribute('class')) {
        if(node.childNodes[i].getAttribute('class').split(" ").indexOf(className) >= 0) {
          matches.push(node.childNodes[i]);
        }
      }
    }
  }
  
  traverse(elements);
  return matches;
    
}
	