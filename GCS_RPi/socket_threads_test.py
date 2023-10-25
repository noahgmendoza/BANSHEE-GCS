import socket
import threading
#import neopixel
#import board
import requests

# Server configuration
HOST = '192.168.1.94'
PORT = 7777

# Create a socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the specified address and port
server_socket.bind((HOST, PORT))

#LED setup
#pixels = neopixel.NeoPixel(board.D18, 12)

# Create an event to signal when the drone client is connected
drone_connnected = threading.Event()
# Create an event to signal when the battery swap finishes
mech_swap = threading.Event()

#Empty List for data
data_collect = []

# Handle Mech connection
def handle_mech(client_socket):
    print("Mech is connected.")

    # Wait for the drone client to be connected
    drone_connnected.wait()
    
    # Send Go cmd to Mech
    print("Initiate Battery Swap")
    client_socket.send("Go".encode('utf-8'))


    # Wait for Battery Swap to finish
    data = client_socket.recv(1024)
    while data.decode('utf-8') != 'Finished':
        data = client_socket.recv(1024)
    
    # Signal that the battery swap finished
    mech_swap.set()

    client_socket.close()

# Handle Drone connection
def handle_drone(client_socket):
    print("Drone is connected")
    
    # Signal that the drone client is connected
    drone_connnected.set()
    client_socket.send("Ready for transfer".encode('utf-8'))

    # Data transfer
    print("Data transferring")
    size_rec = client_socket.recv(1024)  # Receive the length of the list in binary
    size = size_rec.decode('utf-8')
    print('Size of list', size)
    size = int(size)  # Convert the string to an int

    try:
        for x in range(size):
            json_data = client_socket.recv(4096)
            json_decoded = json_data.decode('utf-8')
            print(json_decoded)
            data_collect.append(json_decoded)  # Use append to add elements to the list
            client_socket.send("Received".encode('utf-8'))
    except Exception as e:
        print(f"Error found: {e}")


    #Wait for battery swap to finish
    mech_swap.wait()

    #Inform drone: RGS done
    print("Robot Ground System completed")
    client_socket.send("Complete".encode('utf-8'))

    # Wait for drone takeoff msg
    msg = ''
    while msg != 'Takeoff':
        msg = client_socket.recv(1024)
        msg = msg.decode('utf-8')
    print(msg)
    client_socket.close()


# Main function to start the server
def main():
    try:
        print("GCS is listening")
        server_socket.listen(2)  # Allow up to 2 clients to connect
        while True:
            #Green LEDs
            #pixels.fill((0,255,0))

            clients_connected = 0
            while clients_connected < 2:
                client, address = server_socket.accept()
                id = client.recv(1024)
                print(f"Accepted connection from {address}")
                if id.decode('utf-8') == "Mech":
                    mech_client_thread = threading.Thread(target=handle_mech, args=(client,))
                    mech_client_thread.start()
                    clients_connected += 1
                elif id.decode('utf-8') == "Drone":
                    drone_client_thread = threading.Thread(target=handle_drone, args=(client,))
                    drone_client_thread.start()
                    clients_connected += 1
                    #LEDs RED: Drone Landed
                    #pixels.fill(255,0,0)
                else:
                    print("ERROR")
                    client.close()

            # Wait for both client handling threads to finish
            mech_client_thread.join()
            drone_client_thread.join()
            print("Data transfer and Battery swap completed")
            
            #Reset Thread event
            drone_connnected.clear()
            mech_swap.clear()

            #Sensor upload
            # print("Sensor Data upload")
            # try:
            #     requests.post("http://149.28.81.138:3000/sensor_data/upload", json = data_collect)
            # except Exception as e:
            #     print(f"Error found:  {e}")
                
            #Clear data list
            print(data_collect)
            data_collect.clear()
    except KeyboardInterrupt:
        server_socket.close()


if __name__ == "__main__":
    main()
