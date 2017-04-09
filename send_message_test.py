from twilio.rest import Client

# put your own credentials here
account_sid = "AC20f7ada53a2d3e4c21d9efcaba259cf7"
auth_token = "dc553ee77c173821f6f534ce7dd505bb"

twilio_num = "+19083605630"

numbers = ["+19082104399", "+17326485332"]

client = Client(account_sid, auth_token)

for num in numbers:
	client.messages.create(
		to=num,
		from_=twilio_num,
		body="test")