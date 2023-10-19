import socket
import threading

# Server configuration
HOST = '192.168.1.94'
PORT = 7777

# Create a socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the specified address and port
server_socket.bind((HOST, PORT))

# Create an event to signal when the drone client is connected
drone_connnected = threading.Event()
# Create an event to signal when the battery swap finishes
mech_swap = threading.Event()


# Handle Mech protocol
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

# Function Drone data transfer
def handle_drone(client_socket):
    print("Drone is connected")
    
    # Signal that the drone client is connected
    drone_connnected.set()
    
    #Data transfer code placeholder
    print("Data transferring")

    #Wait for battery swap to finish
    mech_swap.wait()

    #Inform drone: RGS done
    print("RGS completes")
    client_socket.send("Complete".encode('utf-8'))

    # Wait for drone takeoff msg
    data = client_socket.recv(1024)
    while data.decode('utf-8') != 'Takeoff':
        data = client_socket.recv(1024)

    client_socket.close()

# Main function to start the server
def main():
    try:
        print("GCS is listening")
        server_socket.listen(2)  # Allow up to 2 clients to connect
        while True:
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
    except KeyboardInterrupt:
        server_socket.close()


if __name__ == "__main__":
    main()
