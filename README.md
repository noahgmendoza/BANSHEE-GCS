# BANSHEE-GCS

## Overview
BANSHEEUAV extends UAV flight time by optimizing battery management with battery hotswapping. The Ground Control Station (GCS) in the Robotic Ground System (RGS) prolongs drone activity with wireless charging, ensures drone security during battery swapping with linear actuators, indicates landing status with LEDs, and reads battery voltages from the Battery Vending Machine (BVM). This website offers a user-friendly interface for accessing drone data and battery voltage. Telemetry data collected during battery swaps is uploaded by the drone.

## Contributors
- Don Huynh
- Brian Lam
- Jose Vega
- Ruben Banzon
- Jaecheol Han

## Components

### Drone (Don Huynh, Brian Lam, Jaecheal Han)
- Collects mavlink messages via UART from Pixhawk Flight Controller 2.4.8
- Uploads accumulated data to node.js server via POST request
- Connects to GCS TCP socket
- Event listener detects induction coil connection

### Ground Control Station (GCS) (Don Huynh, Brian Lam)
- Hosts TCP socket server
- Supports multi-threaded client connections

### NRF (Ruben Banzon)
- Arduino-based Battery Vending Machine (BVM) sends battery voltages to GCS Arduino, which relays data to GCS RPi
- Utilizes PUT requests to update MongoDB documents

### Arduino Motor Control and NeoPixel LEDs (Jose Vega)
- Arduino sleeps to reduce power consumption
- GCS RPi interrupt triggers the linear actuator locking mechanism
- NeoPixel LEDs indicate GCS vacancy/occupied status

### Web Application (Don Huynh, Brian Lam, Ruben Banzon)
#### Backend **Don Huynh
- Utilizes Nginx web server on VPS, Node.js, Express.js, and MongoDB
- Provides a RESTful API for drone telemetry data and real-time battery voltages from the BVM
- Implements user authentication

#### Frontend **Brian Lam **Ruben Banzon
- Developed using HTML, CSS, JavaScript, and React
- Offers user login functionality and a dashboard for viewing drone data tables and battery voltages
- Includes visuals and descriptions of the BANSHEEUAV mission

## For more BANSHEE UAV related activities
### Official Website: https://www.bansheeuav.tech
### RGS website: https://rgs.bansheeuav.tech

