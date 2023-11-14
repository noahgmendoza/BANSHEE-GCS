import socket
import time
import sys
# Server configuration
HOST = '149.28.81.138'
PORT = 80
client_socket  =  socket.socket(socket.AF_INET,socket.SOCK_STREAM)
server_address  = (HOST,PORT)
client_socket.connect(server_address)


print("Connected to server")
client_socket.send("Mech".encode('utf-8'))

try:
    while True:
        #Wait for battery swap request
        serv_req = client_socket.recv(1024).decode('utf-8')
        if serv_req == "Go":
            print("Battery Swap")
            time.sleep(5)
            client_socket.send("Finished".encode('utf-8'))
            print("Done")
        else:
            print("Error")
            break
finally:
    client_socket.close()
    print("Force quit")

