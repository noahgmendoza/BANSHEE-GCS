import json
import socket
import time
import neopixels
import board
import paramiko
import os
import sys
import datetime

counter = 0

def create_json(ctime, data_collect):
	filename = ctime
	json_obj = json.dumps(data_collect, indent=sys.getsizeof(data_collect))

	with open(current_path+ filename, "w+") as outfile:
		outfile.write(json_obj)

# boolean function to check the connection
def check_connection():
	if ssh.get_transport().is_active():
		return True
	else:
		return False
		
# function to check SSH connection	
def check_ssh_connection(retry_time):
	while check_connection() == False:
		retry_count += 1
		print("Reconnecting in ", retry_time, "seconds...")
		time.sleep(retry_time)
		ssh = connect_to_vps()
	
		if retry_count == 5:
			print("connection failed. Try again later")
			retry_count = 0
			break
			
# function to establish SSH
def establish_ssh(host, port, username, password):
	ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

	ssh.connect(hostname=host, port=port, username=username, password=password)

	stdin, stdout, stderr = ssh.exec_command('ls')
	print(stdout.readlines())
	check_ssh_connection(retry_time)
	
# write the datas in JSON file
#test data
data_collect = {
	"name": "sdfg",
	"rollno": 45,
	"gpa": 3.4
}

def upload_file_to_VPS(ctime):
	local_path = current_path + ctime
	remote_path = '/root/GCS/' + ctime

	sftp.put(local_path,remote_path)

def main():
    #Initialize server and LEDs
    server_socket = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    host_ip = '192.168.1.28'
    port_num = 62000
    socket_num = (host_ip,port_num)
    server_socket.bind(socket_num)
    pixels = neopixel.NeoPixel(board.D18, 12)
    global counter

    #
    host = '173.230.155.155'
    port = 22
    username = ''
    password = ''
    retry_time = 5
    retry_count = 0;
    current_path = os.getcwd()+ '/'
    now = datetime.datetime.now()
    ctime= "data_{}.json".format(now.strftime("%Y-%m-%d"))

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
        ssh = paramiko.SSHClient()
        establish_ssh(host, port, username, password)

        # create JSON file
        create_json(ctime, data_collect)

        # Upload the file to VPS
        sftp = ssh.open_sftp()
        upload_file_to_VPS(ctime)
        # close SFTP
        sftp.close()
        # close SSH
        ssh.close()



        

if __name__=="__main__":
    main()
