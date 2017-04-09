import twilio.twiml
import atexit
import datetime
import sys
import json
import requests

from flask import Flask, request, redirect, Response
from apscheduler.schedulers.background import BackgroundScheduler
from twilio.rest import Client

app = Flask(__name__)

# put your own credentials here
account_sid = "AC20f7ada53a2d3e4c21d9efcaba259cf7"
auth_token = "dc553ee77c173821f6f534ce7dd505bb"
twilio_num = "+19083605630"

client = Client(account_sid, auth_token)

sched = BackgroundScheduler(daemon=True)
# Explicitly kick off the background thread
sched.start()

# Shutdown your scheduler thread if the web process is stopped
atexit.register(lambda: sched.shutdown(wait=False))

#Send Weather Alerts: 
#TODO: Figure out weather api + Get latitude and longitude
def weather_alert(dest_num, job_name):
	weather = get_weather("40.7286948","-73.9978484")
	client.messages.create(
		to=dest_num,
		from_=twilio_num,
		body=weather)
		
	#Remove Job
	del jobs_name[job_name]
		
jobs_name = {} #job name : {job id,job time}

# Schedule Job 
# Use, send post: curl --data "{\"dest_num\":\"+19082104399\",\"time\":\"4 9 2017 0:39\",\"name\":\"test\"}" http://127.0.0.1:5000/schedule
@app.route("/schedule", methods=['POST'])
def scheduler_weather_report():

	#Hacky
	data = get_json(request.get_data())
	
	dest_num = data["dest_num"]
	time = data["time"] #'4 9 2017 24:33'
	jobtime = datetime.datetime.strptime(time, '%m %d %Y %H:%M')
	
	job_name = data["name"]
    
	if job_name in jobs_name:
		job = jobs_name[job_name]
		
		#Check if scheduled
		if jobtime != job["job_time"]:
			#Reschedule Job
			sched.reschedule_job(job["job_id"], jobstore=None, trigger='date', run_date=jobtime)
			
			#Add Job ID
			jobs_name[job_name]["job_time"] = jobtime
	else:
		job = sched.add_job(weather_alert, 'date', run_date=jobtime, args=[dest_num, job_name])
	
		#Add Job ID
		jobs_name[job_name] = {"job_id": job.id, "job_time": jobtime}
	
	#print(get_weather("40.7286948","-73.9978484"), file=sys.stderr)
	print(jobs_name)
	
	return "200 ok"

#TODO: Implement
@app.route("/", methods=['GET', 'POST'])
def chat_respond():
	"""Respond to incoming calls with a simple text message."""

	resp = twilio.twiml.Response()
	
	city = request.values['Body'].lower()
	
	resp.message(get_weather_city(city))
	
	return str(resp)
	
def get_json(byte_info):
	return json.loads(byte_info.decode("utf-8"))
	
def get_weather(lat, lon):
	url = "http://api.openweathermap.org/data/2.5/weather?lat={0}&lon={1}&appid=3f11122384c719fb2a0a7b77f6af8dba".format(lat,lon)
	
	#TODO: Get all of weather attributes + temp
	
	return get_json(requests.get(url).content)['weather'][0]['main']
	
def get_weather_city(city):
	url = "http://api.openweathermap.org/data/2.5/weather?q={0}&appid=3f11122384c719fb2a0a7b77f6af8dba".format(city)
	
	#TODO: Get all of weather attributes + temp
	#print(get_json(requests.get(url).content))
	
	return get_json(requests.get(url).content)['weather'][0]['main']

if __name__ == "__main__":
    app.run(debug=True)