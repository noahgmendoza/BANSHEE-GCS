
from datetime import datetime
import json
import random

#Random Seed
random.seed(9)

#Get current date and time in IS0 8601 format,  easy parse for js
current_datetime = datetime.now().isoformat()

#RGS Locations
known_locations = ["Pomona","Diamond Bar", "Corona","Chino Hills", "Los Angeles"]
location = {"Location": known_locations[random.randint(0,4)],
            "DateTime": current_datetime}
#Sensor data format (tmp: Heartbeat)
sample = {"mavpackettype":"HEARTBEAT", 
          "type": 0, 
          "autopilot": 3, 
          "base_mode": 81, 
          "custom_mode": 0, 
          "system_status": 3, 
          "mavlink_version": 3}
data = []

#fill 10 items in data
for seed in range (10):
    sample["type"] = random.randint(1,10)
    sample["autopilot"] = random.randint(1,10)
    sample["base_mode"] = random.randint(1, 10)
    sample["system_staus"] = random.randint(1,10)
    data.append(sample)

#Combine two dictionaries into one
json_data = {
    "Landing": location,
    "Sensor data": data
}

json_file_name = "sample_data.json"

#create json_file in working directory
with open(json_file_name, 'w') as json_file:
    json.dump(json_data, json_file)

def main():
    print("Done")

if __name__=="__main__":
    main()
