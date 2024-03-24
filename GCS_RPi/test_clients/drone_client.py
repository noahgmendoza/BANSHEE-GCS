import socket
import RPi.GPIO as GPIO
import time

# Set the GPIO mode to BCM
GPIO.setmode(GPIO.BCM)

# Set the GPIO pin number
pin = 18

# Set the pin as an input
GPIO.setup(pin, GPIO.IN)

# Enable edge detection for both rising and falling edges
GPIO.add_event_detect(pin, GPIO.BOTH)

def drone_client():
    # Connect to the server
    server_address = ('192.168.1.61', 3300)  # Adjust the IP address and port if necessary
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect(server_address)

    try:
        # Send the client ID
        client_socket.sendall(b'Drone')

        # Wait for confirmation from the server
        data = client_socket.recv(1024)
        print("Received:", data.decode())

        # Simulate drone task
        print("Drone task is in progress...")
        time.sleep(10)

        # Inform the server that the task is completed
        client_socket.sendall(b'Task completed')

        # Wait for confirmation from the server
        data = client_socket.recv(1024)
        print("Received:", data.decode())

    finally:
        # Close the connection
        client_socket.close()

def main():
    print("sgfhfjhlk")
    try:
        while True:
            # Wait for an edge to be detected
            GPIO.wait_for_edge(pin, GPIO.BOTH)
            print("Flying")
            # Get the current state of the pin
            state = GPIO.input(pin)

            # Print the state
            if state == GPIO.HIGH:
                print("Rising edge detected")
                drone_client()
            else:
                print("Falling edge detected")

            # Wait for a short time to avoid multiple detections
            time.sleep(0.1)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
