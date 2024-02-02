import RPi.GPIO as GPIO
import socket
import time
import json
from pymavlink import mavutil

# Set up a MAVLink connection
mav = mavutil.mavlink_connection('/dev/serial0', baud=57600)
sensor_data = []

#Initialize landing flag
landing_flag = 0


def data_transfer(): 
    HOST = 'Insert IP' #GCS server IP
    PORT = Insert PORT
    socket_num = (HOST, PORT) #IP + Port
    
    client_socket  =  socket.socket(socket.AF_INET,socket.SOCK_STREAM) #creating a socket
    client_socket.connect(socket_num) #connecting to the server socket
    print("socket connect to server") #print after connecting to the server socket
    
    client_socket.send(b'Drone') #send data over the network socket
    print("send 'drone'") #print after send
    
    Response_server = client_socket.recv(1024) #defining the size of how much we can receive (upto 1024)
    print("received") #print after receive
    
    resp = Response_server.decode('utf-8') 
    if resp =='Ready for transfer': #if decoded utf-8 is Ready for transfer continue
        
        #Send total indexes of data
        size = len(sensor_data) #get the array size
        size = str(size) #convert it to string
        print("Size of list: ",size)
        client_socket.send(size.encode('utf-8')) #send the size of the encoded utf-8

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
            pass #continue loop. once it leaves, it will run switch() again
        client_socket.send('Takeoff'.encode('utf-8')) #sends encoded 'Takeoff' to the server
        client_socket.send(b'Takeoff') #needs to be converted in binary when sending it to the server
        Response_server = client_socket.recv(1024)
        if Response_server.decode('utf-8') =='Received':
            print('GCS Achknowledged')
        client_socket.close()




def landing(channel): #create a flag for landing
    global landing_flag
    landing_flag = not landing_flag
    print(f"Landing: + {landing_flag}")

 #Event listener on pin 17
GPIO.setmode(GPIO.BCM)

GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_UP) # set pin 17 as input with pull-up resistor
sending = 0

GPIO.add_event_detect(17, GPIO.BOTH, callback=landing, bouncetime = 1000) #event listener for voltage change
   
def main():
    try:
        while True:
            if landing_flag == False: #runs when drone is on the air
                msg = mav.recv_match(type='HEARTBEAT', blocking=True)
                #MAVLink_msg to dict
                dict_msg=msg.to_dict()
                print(dict_msg)
                #dict to json
                json_data=json.dumps(dict_msg)
                #json added to array
                sensor_data.append(json_data)
                time.sleep(1)
            else:
                data_transfer() #start transfer data when the drone is on the GCS
    except Exception as e:
        print(f"Error found: {e}")
if __name__=="__main__":
    main()
