import requests

GPS_location = "Chino Hills"

currentTime = "2023-09-28T21:48:03.257734"

heartbeat = {"mavpackettype": "HEARTBEAT", "type": 4, "autopilot": 7, "base_mode": 5, "custom_mode": 0, "system_status": 3, "mavlink_version": 3, "system_staus": 6}

collected = {
    "Landing": {"Location": GPS_location, "DateTime": currentTime},
    "Sensor data": [],
    "Chunk": 0
}

# Set the chunk size
chunk_size = 500

for x in range(2000):
    collected["Sensor data"].append(heartbeat)

# Calculate the number of iterations needed
num_iterations = len(collected["Sensor data"]) // chunk_size + 1
print(f"Number of uploads: {num_iterations}")

# Select indices dynamically in each iteration
for iteration in range(num_iterations):
    start_index = iteration * chunk_size
    end_index = min((iteration + 1) * chunk_size, len(collected["Sensor data"]))

    # Extract the chunk of data from one dictionary inside the list
    selected_data = collected["Sensor data"][start_index:end_index]
    
    # Create a payload for each chunk
    payload = {"Landing": collected["Landing"], "Sensor data": selected_data, "Chunk": iteration}

    # Send a request for the new dictionary
    r = requests.post("http://149.28.81.138:3000/app/sensor_data/upload", json=payload)

    print(f"Iteration {iteration + 1}: {r.text}")

print("end")
