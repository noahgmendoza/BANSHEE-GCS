
import json
import socket
import time
import neopixels
import board

counter = 0

def main():
    #Initialize server and LEDs
    server_socket = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    host_ip = '192.168.1.28'
    port_num = 62000
    socket_num = (host_ip,port_num)
    server_socket.bind(socket_num)
    pixels = neopixel.NeoPixel(board.D18, 12)
    global counter

    while True:
        #Color Green
        pixels.fill((0,255,0))
        #Collect
        data_collect = []

        bytes_to_receive = 9090
        server_socket.listen(1)
        print('waiting for a connection...')
        client_socket,address = server_socket.accept()
        print('Connection estalished')

        #Change LED to red
        pixels.fill(255,0,0)

        Response_client=client_socket.recv(1024)
        if Response_client.decode('utf-8') == 'ready':
            print('client is ready to transfer data')
        client_socket.sendall(b'Server_ready')

        size_rec = client_socket.recv(1024)
        size = size_rec.decode('utf-8')
        print('\nSize of list ',size)

        try:
            for x in range(size):
                json_data = client_socket.recv(bytes_to_receive)
                data_collect[x] = json_data.decode('utf-8')
                client_socket.sendall(b'Received')
        except Exception as e:
            print(f"Error found:  {e}")

        print(data_collect)
        counter =  counter +  1
        print('Number of  data transfers: ' + str(counter))

        client_socket.close()
        print("closed client connection")

        #Listen for Drone takeoff
        server_socket.listen(1)
        print('waiting for drone takeoff')
        client_socket,address = server_socket.accept()
        
        Response_client=client_socket.recv(1024)
        if Response_client.decode('utf-8') == 'Takeoff':
            print('Drone is leaving')
        client_socket.sendall(b'Received')
        client_socket.close()



        

if __name__=="__main__":
    main()