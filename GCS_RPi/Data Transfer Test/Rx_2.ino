#include <Wire.h>
#include <SPI.h>
#include <RF24.h>

RF24 radio(7, 8); // CE, CSN
#define SLAVE_ADDRESS 0x04

struct SensorData {
  int id;
  float total_volt;
  float cell1;
  float cell2;
  float cell3;
  float cell4;
};

SensorData sensorData;

void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.openReadingPipe(1, 0xF0F0F0F0E1LL); // Set the address for reading data
  radio.startListening();

  Wire.begin(SLAVE_ADDRESS); // Initialize I2C communication as slave
  Wire.onRequest(sendData); // Register sendData function to respond to master's requests
}

void loop() {
  if (radio.available()) {
    radio.read(&sensorData, sizeof(sensorData));
    
    // Print received sensor data
    Serial.print("Received Data: ");
    Serial.print("ID: ");
    Serial.println(sensorData.id);
    Serial.print(sensorData.total_volt);
    Serial.print("V, ");
    Serial.print(sensorData.cell1);
    Serial.print("V, ");
    Serial.print(sensorData.cell2);
    Serial.print("V, ");
    Serial.print(sensorData.cell3);
    Serial.print("V, ");
    Serial.print(sensorData.cell4);
    Serial.println("V");

    delay(1000);
  }
}

void sendData() {
  // Pack the sensor data into a byte array
  byte buf[sizeof(sensorData)];
  memcpy(buf, &sensorData, sizeof(sensorData));

  // Send the data over I2C
  Wire.write(buf, sizeof(sensorData));
}
