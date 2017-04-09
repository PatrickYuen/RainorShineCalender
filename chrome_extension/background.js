chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) 
{
	console.log("Hello");
	if (changeInfo.status == 'complete') //if tab is not fully loaded, ignore.
	{
	console.log("Hullo");
		var match = 'https://calendar.google.com/calendar/render';
		var id = "fkndgnmacepohnggjbhgiajoaggjmgim";
		if (tab.url.substring(0, match.length) === match)
		{
			console.log("Herro");
			//chrome.tabs.executeScript(tabId, { file: 'weather.js' }); //if URL match is found, run said script.
		//}
		
			var locations = document.getElementsByClassName('neb-break-words');
			var timeblock = document.getElementsByClassName('neb-date');
			var eventName = document.getElementsByClassName('ui-sch');
			//console.log(locations);
			
		}
	}
});