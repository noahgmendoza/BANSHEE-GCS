import socket
import threading
import time
import RPi.GPIO as GPIO
import requests
import smbus
import struct

# Define variables
HOST = '192.168.1.61'
PORT = 3300

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

# Define flags
drone_connected = False
mech_connected = False
drone_socket = None
mech_socket = None

# Thread waiting events
m_standby = threading.Event()
d_standby = threading.Event()

#Initialize GPIO
GPIO.setmode(GPIO.BCM)

# Set the GPIO mode to BCM
GPIO.setmode(GPIO.BCM)

# Set the GPIO pin number
pin = 18

# Set the pin as an input
GPIO.setup(pin, GPIO.OUT)


def initialize_server():
    # Create a socket
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Bind the socket to the specified address and port
    server_socket.bind((HOST, PORT))
    
    return server_socket

def handle_drone(drone_client):
    global drone_connected
    try:
        GPIO.output(pin, GPIO.HIGH)
        time.sleep(2)
        GPIO.output(pin, GPIO.LOW)
        # Send Confirmation
        drone_client.sendall(b'0')
        m_standby.set()

        data = drone_client.recv(1024)
        print("Received:", data.decode())

        d_standby.wait()

        # Wait for confirmation from the server
        data = drone_client.recv(1024)
        print("Received:", data.decode())

        m_standby.clear()
        time.sleep(1)

    finally:
        drone_connected = False
        drone_client.close()

def handle_mech(mech_client):
    global mech_connected
    try:
        while True:
            # Send confirmation
            mech_client.sendall(b'0')

            # Wait for drone landing
            m_standby.wait()

            # Initiate BTP
            mech_client.sendall(b'Go')

            # Wait for BTP completion
            data = mech_client.recv(1024)
            print("Received:", data.decode())

            # Inform drone BTP completed
            d_standby.set()

            # Clear mech
            m_standby.clear()

            time.sleep(1)
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        mech_connected = False
        mech_client.close()
      
def read_data():
    # Read data from Arduino via I2C
    data = bus.read_i2c_block_data(address, 0, struct.calcsize(struct_format))
    
    # Unpack received data into float values
    unpacked_data = struct.unpack(struct_format, bytes(data))
    
    return unpacked_data

def main():
    server_socket = initialize_server()

    while True:
        global drone_connected, mech_connected
        try:
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
          
            server_socket.listen(3)
            print("Waiting for connections")
            while not(drone_connected and mech_connected):
                client, address = server_socket.accept()
                id = client.recv(1024).decode('utf-8')
                print(f"Accepted connection from {address}")
                if id == "Mech":
                    mech_client_thread = threading.Thread(target=handle_mech, args=(client,))
                    print("Mech Connected")
                    mech_client_thread.start()
                    mech_connected = True
                    
                elif id == "Drone":
                    drone_client_thread = threading.Thread(target=handle_drone, args=(client,))
                    print("Drone connected")
                    drone_client_thread.start()
                    drone_connected = True
    
                else:
                    print("ERROR")
                    client.close()
                if drone_connected == True:
                    drone_client_thread.join()

        except Exception as e:
            print(f"Error: {e}")
        finally:
            #Clean up
            GPIO.cleanup()

if __name__ == "__main__":
    main()
