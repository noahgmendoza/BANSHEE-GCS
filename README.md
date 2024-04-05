# BANSHEE-GCS

## Overview
BANSHEEUAV optimizes UAV flight time through efficient battery management, including hotswapping capabilities. Within the Robotic Ground System (RGS), the Ground Control Station (GCS) employs wireless charging and linear actuators for secure battery swapping, LED indicators for landing status, and interfaces with the Battery Vending Machine (BVM) to monitor battery voltages. This website provides a user-friendly interface for accessing drone data and battery status, with telemetry data uploaded during battery swaps.

## Contributors
- Don Huynh: Developed backend components including the GCS TCP server, and handled drone telemetry data collection and upload.
- Brian Lam: Led frontend development, designed the user interface, and contributed to drone data collection.
- Jose Vega: Implemented Arduino motor control and contributed to GCS hardware integration.
- Ruben Banzon: Developed NRF communication and contributed to login UI.
- Jaecheol Han: Contributed to early data upload mechanisms.

## Components

### Drone (Don Huynh, Brian Lam, Jaecheal Han)
- Collects mavlink messages via UART from Pixhawk Flight Controller 2.4.8.
- Uploads accumulated data to node.js server via POST request.
- Connects to GCS TCP socket.
- Event listener detects induction coil connection.

### Ground Control Station (GCS) (Don Huynh, Brian Lam)
- Hosts TCP socket server.
- Supports multi-threaded client connections.

### NRF (Ruben Banzon)
- Arduino-based Battery Vending Machine (BVM) sends battery voltages to GCS Arduino, which relays data to GCS RPi.
- Utilizes PUT requests to update MongoDB documents.

### Arduino Motor Control and NeoPixel LEDs (Jose Vega)
- Arduino sleeps to reduce power consumption.
- GCS RPi interrupt triggers the linear actuator locking mechanism.
- NeoPixel LEDs indicate GCS vacancy/occupied status.

### Web Application (Don Huynh, Brian Lam, Ruben Banzon)
#### Backend (Don Huynh)
- Utilizes Nginx web server on VPS, Node.js, Express.js, and MongoDB.
- Provides a RESTful API for drone telemetry data and real-time battery voltages from the BVM.
- Implements user authentication.

#### Frontend (Brian Lamm Ruben Banzon)
- Developed using HTML, CSS, JavaScript, and React.
- Offers user login functionality and a dashboard for viewing drone data tables and battery voltages.
- Includes visuals and descriptions of the BANSHEEUAV mission.

## For more BANSHEE UAV related activities
- Official Website: [BANSHEEUAV Official Website](https://www.bansheeuav.tech)
- RGS Website: [Robotic Ground System (RGS)](https://rgs.bansheeuav.tech)
