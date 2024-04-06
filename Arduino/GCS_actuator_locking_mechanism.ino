////////////////////////////////////////////////////////////////////////////////////////
// Cal Poly Pomona                                                                    //
// BANSHEE UAV - Robotics, Ground Control Station                                     //
// Actuator Locking Mechanism                                                         //
// March 27, 2024                                                                     //
// Jose Vega                                                                          //
////////////////////////////////////////////////////////////////////////////////////////
// run GCS_locking_mechanism_calibration code to get timing for actuators
// This code controls side and back actuators attached to Ground Control Station to hold drone in place
// using relays. It is also able to set the color of the NeoPixels attached to the underside of the station.

#include <avr/interrupt.h>
#include <avr/sleep.h>
#include <Adafruit_NeoPixel.h>

class Actuator{
  private:
    int in1;
    int in2;
  public:
  Actuator(int in1, int in2){
    this->in1 = in1;
    this->in2 = in2;
    pinMode(in1, OUTPUT);
    pinMode(in2, OUTPUT);
  }
  //functions to extend, retract, and stop actuators
  //relay inputs are active LOW
  void stop(){
    digitalWrite(in1, HIGH);
    digitalWrite(in2, HIGH);
  }
  void retract(){
    digitalWrite(in2, HIGH);
    digitalWrite(in1, LOW);
  }
  void extend(){
    digitalWrite(in1, HIGH);
    digitalWrite(in2, LOW);
  }
};
// interrupt pin
int ISR = 2;
// pins to activate relays
// side actuator pins
int actSidesP = 8;
int actSidesN = 7;
// back actuator pins
int actBackP = 6;
int actBackN = 5;
Actuator Sides(actSidesP, actSidesN);
Actuator Back(actBackP, actBackN);
// NeoPixels conencted to pin 9
int Neo = 9;
// number of NeoPixels used
int NumPixels = 12;
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NumPixels, Neo, NEO_GRB + NEO_KHZ800);
// bools to check state of the actuators and interrupt pin
volatile bool extended = false;
volatile bool ISR_flag = false;

void setup() {
  pinMode(ISR, INPUT);
  attachInterrupt(digitalPinToInterrupt(ISR), wakeUp, RISING);
  Sides.stop();
  Back.stop();
  strip.begin();
  // set Neopixels to green at start
  setGreen();
  sleepNow();
}

void loop() {
  delay(50);
  if(ISR_flag){
    // detach interrupt so that it does not trigger while the actuators are running
    detachInterrupt(digitalPinToInterrupt(ISR));
    if(extended){
      // if actuators are extended when ISR is triggered,
      // side actuators retract 10.5 seconds,
      Sides.retract();
      delay(10500);
      // then side & back actuators retract for 15 seconds
      Back.retract();
      delay(15000);
      Sides.stop();
      Back.stop();
      // set Neopixels to green after actuators are fully retracted
      // will have to be changed to set them green after the drone takes off
      setGreen();
    }
    else{
      // sets NeoPixels to red when first interrupt signal is received
      setRed();
      // if actuators are retracted when ISR is triggered,
      // extend side actuators based on calibration code timing to center drone
      Sides.extend();
      delay(20247);
      // retract for 1 second to allow back actuator to move drone
      Sides.retract();
      delay(1000);
      Sides.stop();
      // extend back actuator to move drone into place
      // based on calibration code timing
      Back.extend();
      delay(9615);
      Back.stop();
      // extend side actuators to hold drone in place
      Sides.extend();
      delay(1000);
      Sides.stop();
    }
    extended = !extended;
    delay(50);
    sleepNow();
  }
}
// functions to set NeoPixels red or green
void setGreen(){
  for(int i=0; i<strip.numPixels(); i++){
    strip.setPixelColor(i,strip.Color(0,255,0));
  }
  strip.show();
}
void setRed(){
  for(int i=0; i<strip.numPixels(); i++){
    strip.setPixelColor(i,strip.Color(255,0,0));
  }
  strip.show();
}
// function that runs when interrupt signal is received
void wakeUp(){
  delay(50);
  ISR_flag = true;
}
// function to set and activate sleep mode
void sleepNow(){
  delay(20);
  ISR_flag = false;
  attachInterrupt(digitalPinToInterrupt(ISR), wakeUp, RISING);
  sleep_enable();
  set_sleep_mode(SLEEP_MODE_PWR_DOWN);
  sleep_mode();
}