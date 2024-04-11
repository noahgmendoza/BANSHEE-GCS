////////////////////////////////////////////////////////////////////////////////////////
// Cal Poly Pomona                                                                    //
// BANSHEE UAV - Robotics, Ground Control Station                                     //
// Actuator Locking Mechanism Calibration                                             //
// March 27, 2024                                                                     //
// Jose Vega                                                                          //
////////////////////////////////////////////////////////////////////////////////////////
// should be run with Arduino and relay module to see times in serial monitor
// (might be able to use PCB with UNO connected via RX and TX, but has not been tested)
// This code uses 3 buttons to get the timing the actuators will run. To operate, press 
// the corresponding button to start the timer and then press again when the actuator has
// extended to teh desired position. Repeat for the other actuator. If a mistake is made,
// the third button (retract) can be used to retract all actuators and reset the timers.
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
int actSidesP = 8;
int actSidesN = 7;
int actBackP = 6;
int actBackN = 5;
// pins for calibration buttons
int sidesCal = 13;
int backCal = 12;
int retract = 11;
// variables for timers
unsigned long sidesTimer = 0;
unsigned long backTimer = 0;
unsigned long startTime = 0;
unsigned long endTime = 0;
// bools to check states of back and side actuators
bool sidesExt = false;
bool backExt = false;
// variables to store states of buttons
// code uses HIGH state so buttons should be normally grounded
int sideButtonState = 0;
int backButtonState = 0;
int retractButtonState = 0;
int lastSideButtonState = 0;
int lastBackButtonState = 0;
int lastRetractButtonState = 0;

Actuator actSides(actSidesP, actSidesN);
Actuator actBack(actBackP,actBackN);

void setup(){
  Serial.begin(9600);
  pinMode(sidesCal, INPUT);
  pinMode(backCal, INPUT);
  pinMode(retract, INPUT);
  actSides.stop();
  actBack.stop();
}

void loop(){
  // read states of buttons 
  sideButtonState = digitalRead(sidesCal);
  backButtonState = digitalRead(backCal);
  retractButtonState = digitalRead(retract);
  // retracts all actuators based on current timers and resets timers
  if(lastRetractButtonState==LOW && retractButtonState==HIGH){
    actSides.retract();
    delay(sidesTimer);
    actSides.stop();
    actBack.retract();
    delay(backTimer);
    actBack.stop();
    sidesTimer = 0;
    backTimer = 0;
    Serial.println("Actuators retracted");
    delay(10);
  }
  // next 2 if statements are used to obtain actuator timing
  // press corresponding button to start timer and again to stop
  // can be used multiple times in case actuators did not extend enough
  
  // starts timer when side calibration button is pressed and back actuator calibration is not running
  if(lastSideButtonState==LOW && sideButtonState==HIGH && !backExt){
    // if sides are extended, stop actuators and calculate run time
    if(sidesExt){
      actSides.stop();
      sidesTimer = sidesTimer + millis() - startTime;
      sidesExt = false;
      Serial.print("Side actuators timer: ");
      delay(10);
      Serial.print(sidesTimer);
      delay(10);
      Serial.println("ms");
      delay(10);
    }
    // if sides are retracted, get start time and extend actuators
    else{
      actSides.extend();
      startTime = millis();
      sidesExt = true;
    }
  }
  // same as if statement above for side actuators
  if(lastBackButtonState==LOW && backButtonState==HIGH && !sidesExt){
    if(backExt){
      actBack.stop();
      backTimer = backTimer + millis() - startTime;
      backExt = false;
      Serial.print("Back actuator timer: ");
      delay(10);
      Serial.print(backTimer);
      delay(10);
      Serial.println("ms");
      delay(10);
    }
    else{
      actBack.extend();
      startTime = millis();
      backExt = true;
    }
  }
  lastSideButtonState = sideButtonState;
  lastBackButtonState = backButtonState;
  lastRetractButtonState = retractButtonState;
}