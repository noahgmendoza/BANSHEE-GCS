import socket
import time

def mech_client():
    # Connect to the server
    server_address = ('localhost', 3300)  # Adjust the IP address and port if necessary
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect(server_address)

    try:
        # Receive confirmation from the server
        data = client_socket.recv(1024)
        print("Received:", data.decode())

        if data.decode() == '0':
            # Send notification to the server that mechanic is ready
            client_socket.sendall(b'0')

            # Wait for notification from the server to start the task
            data = client_socket.recv(1024)
            print("Received:", data.decode())

            if data.decode() == 'G':
                # Simulate mechanic task
                print("Mech task is in progress...")
                time.sleep(3)  # Simulate task duration

                # Inform the server that the task is completed
                client_socket.sendall(b'0')
                print("Mech task completed")

                # Wait for confirmation from the server
                data = client_socket.recv(1024)
                print("Received:", data.decode())

    finally:
        # Close the connection
        client_socket.close()

if __name__ == "__main__":
    mech_client()
