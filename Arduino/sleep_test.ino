from gpiozero import DigitalOutputDevice
from time import sleep

ArdActivatePin = DigitalOutputDevice(14,True ,False, None)

# blinking an LED forever
while True:
  #set the led ON for 5 second
  ArdActivatePin.on()
  sleep(5)
  #set the led Off for 5 second
  ArdActivatePin.off()
  sleep(5)
