#include <AFMotor.h>

AF_DCMotor motor(4);
const int buttonPin = 2;
const int ledPin = A0;


void setup() {
  Serial.begin(9600);    
  Serial.println("Motor test with Interrupt");

  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  attachInterrupt(0,pin_ISR, RISING);
  // turn on motor
  motor.setSpeed(300);
 
  motor.run(RELEASE);
}

void loop() {
 
}

void pin_ISR(){

  digitalWrite(ledPin, HIGH);
  Serial.println("Run Motor");
  motor.setSpeed(255);
  motor.run(FORWARD);
  
  delay(500000);
  motor.run(RELEASE);
  digitalWrite(ledPin, LOW);

}
