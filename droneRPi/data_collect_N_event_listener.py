import RPi.GPIO as GPIO
import socket
import time
import json
from pymavlink import mavutil

# Set up a MAVLink connection
mav = mavutil.mavlink_connection('/dev/serial0', baud=57600)
data = []


def switch():
    while True:
        yield True
        yield False
def simple_transfer():
    HOST = '192.168.1.26'
    PORT = 62000
    client_socket  =  socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    server_address  = (HOST,PORT)
    client_socket.connect(server_address)
    
    client_socket.sendall(b'ready')

    Response_server = client_socket.recv(1024)
    if Response_server.decode('utf-8') =='Server_ready':
        print('Server ready')
    
    #Send total indexes of data
    size = len(data)
    size = str(size)
    print("Size of list: ",size)
    client_socket.sendall(bytes(size,encoding='utf-8'))

    size = int(size)
    #Send through array up to max
    for x in range(size):
        client_socket.sendall(bytes(data[x],encoding='utf-8'))
        Response_server = client_socket.recv(1024)
        if Response_server.decode('utf-8') == 'Received':
            print('\tSent item #' + str(x))
    #Finished transfer
    client_socket.close()
    print('finished')

def  takeoff():
    HOST = '192.168.1.26'
    PORT = 62000
    client_socket  =  socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    server_address  = (HOST,PORT)
    client_socket.connect(server_address)
    
    client_socket.sendall(b'Takeoff')
    Response_server = client_socket.recv(1024)
    if Response_server.decode('utf-8') =='Received':
        print('GCS Achknowledged')
    client_socket.close()

def data_transfer(channel):
    global mode, sending
    if mode.__next__():
        sending = 1
        
        simple_transfer()
        global counter
        counter += 1
        print('Data transfers from drone: '+ str(counter))
        data.clear()
        print('Cleared')
    else:
        takeoff()
        sending = 0
        print("Drone takeoff")


#Define  debounce delay (in seconds)
debounce_delay = 1
#Mode start at false
mode  =  switch()

GPIO.setmode(GPIO.BCM)
counter = 0


GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_UP) # set pin 17 as input with pull-up resistor
sending = 0

def main():
    global  debounce_delay, sending
    while True:
        if(sending == 0):
            debounce_delay = int(len(data)) / 50
            debounce_delay = int(debounce_delay)
            if(debounce_delay<=0):
                debounce_delay=1
            GPIO.remove_event_detect(17)
            GPIO.add_event_detect(17, GPIO.BOTH, callback=data_transfer, bouncetime = debounce_delay*1000)

        
        msg = mav.recv_match(type='HEARTBEAT', blocking=True)
        #MAVLink_msg to dict
        dict_msg=msg.to_dict()
        #dict to json
        json_data=json.dumps(dict_msg)
        #json added to array
        data.append(json_data)
        time.sleep(1)

if __name__=="__main__":
    main()
