import requests
import smbus
import struct

# Define I2C address
address = 0x04

# Define the struct format
struct_format = 'ifffff' #make sure to match the struct format :D

# Open I2C interface
bus = smbus.SMBus(1)

# Define the URL
url = "http://207.246.96.137:3300/api/rgs/voltages"  

# Define headers
headers = {
    "Content-Type": "application/json"
}

def read_data():
    # Read data from Arduino via I2C
    data = bus.read_i2c_block_data(address, 0, struct.calcsize(struct_format))
    
    # Unpack received data into float values
    unpacked_data = struct.unpack(struct_format, bytes(data))
    
    return unpacked_data

# Read data from Arduino
sensor_data = read_data()


# Print received sensor data
print("Received sensor data:")
print("ID:", sensor_data[0])
print("Total Volts:", sensor_data[1])
print("Cell 1:", sensor_data[2])
print("Cell 2:", sensor_data[3])
print("Cell 3:", sensor_data[4])
print("Cell 4:", sensor_data[5])

# Construct payload
payload = {
    "location": "Pomona",
    "batt_id" : sensor_data[0],
    "total_volt": sensor_data[1],
    "volts": {
        "Cell1": sensor_data[2],
        "Cell2": sensor_data[3],
        "Cell3": sensor_data[4],
        "Cell4": sensor_data[5],
    }
}

# Send the PUT request
response = requests.put(url, json=payload, headers=headers)

# Print response
print(response.text)