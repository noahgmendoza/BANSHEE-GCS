import socket
import sys
import json
landing_flag = 1

HOST = '149.28.81.138'
PORT = 80
socket_num = (HOST, PORT) #IP + Port

client_socket  =  socket.socket(socket.AF_INET,socket.SOCK_STREAM) #creating a socket
client_socket.connect(socket_num) #connecting to the server socket
try:
        print("socket connect to server") #print after connecting to the server socket

        client_socket.send("Drone".encode('utf-8')) #send data over the network socket
        print("send 'drone'") #print after send

        Response_server = client_socket.recv(4096) #defining the size of how much we can receive (upto 4096)
        resp = Response_server.decode('utf-8') 
        print(resp)

        sample = {"mavpackettype": "HEARTBEAT", "type": 4, "autopilot": 7, "base_mode": 5, "custom_mode": 0, "system_status": 3, "mavlink_version": 3, "system_staus": 6}, {"mavpackettype": "HEARTBEAT", "type": 4, "autopilot": 7, "base_mode": 5, "custom_mode": 0, "system_status": 3, "mavlink_version": 3, "system_staus": 6}, {"mavpackettype": "HEARTBEAT", "type": 4, "autopilot": 7, "base_mode": 5, "custom_mode": 0, "system_status": 3, "mavlink_version": 3, "system_staus": 6}, {"mavpackettype": "HEARTBEAT", "type": 4, "autopilot": 7, "base_mode": 5, "custom_mode": 0, "system_status": 3, "mavlink_version": 3, "system_staus": 6}, {"mavpackettype": "HEARTBEAT", "type": 4, "autopilot": 7, "base_mode": 5, "custom_mode": 0, "system_status": 3, "mavlink_version": 3, "system_staus": 6}, {"mavpackettype": "HEARTBEAT", "type": 4, "autopilot": 7, "base_mode": 5, "custom_mode": 0, "system_status": 3, "mavlink_version": 3, "system_staus": 6}, {"mavpackettype": "HEARTBEAT", "type": 4, "autopilot": 7, "base_mode": 5, "custom_mode": 0, "system_status": 3, "mavlink_version": 3, "system_staus": 6}, {"mavpackettype": "HEARTBEAT", "type": 4, "autopilot": 7, "base_mode": 5, "custom_mode": 0, "system_status": 3, "mavlink_version": 3, "system_staus": 6}, {"mavpackettype": "HEARTBEAT", "type": 4, "autopilot": 7, "base_mode": 5, "custom_mode": 0, "system_status": 3, "mavlink_version": 3, "system_staus": 6}, {"mavpackettype": "HEARTBEAT", "type": 4, "autopilot": 7, "base_mode": 5, "custom_mode": 0, "system_status": 3, "mavlink_version": 3, "system_staus": 6}

        if resp =="Ready": #if decoded utf-8 is Ready for transfer continue
                print("received") #print after receive

                sensor_data = []                
                for x in range(30000):
                        sensor_data.append(json.dumps(sample))

                #Send total indexes of data
                size = len(sensor_data)  # Get the array size
                size_str = str(size)  # Convert it to a string
                print("Size of list:", size_str)
                client_socket.send(size_str.encode('utf-8'))  # Send the size as encoded utf-8

                size = int(size)
                #Send through array up to max
                try:
                        for x in range(size):
                                client_socket.send(sensor_data[x].encode('utf-8'))
                                Response_server = client_socket.recv(1024)
                                if Response_server.decode('utf-8') == 'Received':
                                        print('\tSent item #' + str(x))
                                else:
                                        client_socket.send(sensor_data[x].encode('utf-8')) #error checking
                except Exception as e:
                        print(f"Error found: {e}")
                
                Response_server = client_socket.recv(1024)
                if Response_server.decode('utf-8') == 'Complete':
                        print('Robot Ground System Complete')

                while landing_flag == 1:
                        landing_flag = input("Enter status command: ")
                
                client_socket.send('Takeoff'.encode('utf-8')) #sends encoded 'Takeoff' to the server
                Response_server = client_socket.recv(1024)
                if Response_server.decode('utf-8') =='Received':
                        print('GCS Achknowledged')
                client_socket.close()
except e as error:
        print(e)
finally:
        client_socket.close()
        print("Force quit")
        sys.exit(1)  # Exit the program with a non-zero status code