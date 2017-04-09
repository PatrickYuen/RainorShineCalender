
window.onload = function(event) {

			//location class
			var locations = document.getElementsByClassName('cloc');
			//time class
			var timeblock = document.getElementsByClassName('chip-caption');
			//event name class
			var eventName = document.getElementsByClassName('ctdiv');
			//date class
			var date = document.getElementsByClassName('wk-dayname');
			
			var i, j, k, l;
			for (i = 0; (i < locations.length); i++)
			{
				var actualLocation = locations[i].innerHTML;
				console.log(actualLocation); //lists all locations.
			} 

			for (j = 0; (j < timeblock.length); j++)
			{
				var actualTime = timeblock[j].outerText;
				
				console.log(actualTime); //lists all time periods.
			}

			for (k=0; (k < eventName.length); k++)
			{
				var actualName = eventName[k].innerText;
				console.log(actualName); //lists all the event names.
			}

			for (l=0; (l < date.length); l++)
			{
				var realdate = date[l].innerText;
				console.log(realdate); //lists all the dates.
			}

			// console.log(locations);
			//console.log(timeblock);
			// console.log(eventName);
			//console.log(date);
			//document.body.innerHTML+='<div>Pizza</div>';
		};