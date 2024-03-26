#include <SPI.h>
#include <RF24.h>

RF24 radio(7, 8); // CE, CSN

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
  radio.openWritingPipe(0xF0F0F0F0E1LL); // Set the address for writing data
}

void loop() {
  // Reading sensor data (replace with actual sensor readings)
  sensorData.id = 1;
  sensorData.total_volt = 11.0;
  sensorData.cell1 = 13.0;
  sensorData.cell2 = 13.0;
  sensorData.cell3 = 12.0;
  sensorData.cell4 = 9.0;

  // Transmit the struct over NRF24L01
  radio.write(&sensorData, sizeof(sensorData));

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
  
  delay(1000); // Delay for 1 second
}
