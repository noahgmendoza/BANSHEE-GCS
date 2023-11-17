import RPi.GPIO as GPIO
import time
import board
import neopixel

#Pin definitions:
signalPin = 16
pixel_pin = board.D18
num_pixels = 12

print("ON")
time.sleep(1)
mode = GPIO.getmode()
print(mode)
GPIO.setup(signalPin, GPIO.OUT)

pixels = neopixel.NeoPixel(pixel_pin, num_pixels)

try:
    while 1:
        print("HIGH")
        pixels.fill((0, 255, 0))
        GPIO.output(signalPin, GPIO.HIGH)
        time.sleep(1)
        GPIO.output(signalPin, GPIO.LOW)
        print("LOW")
        # Wait for user input and convert it to an integer
        user_input = int(input("Enter an integer: "))     

        # Display the user input
        print("You entered:", user_input)
        #time.sleep(5)
        GPIO.output(signalPin, GPIO.HIGH)
        print("HIGH")
        pixels.fill((255, 0, 0))
        GPIO.output(signalPin, GPIO.LOW)
        print("LOW")
        #time.sleep(5)
        # Wait for user input and convert it to an integer
        user_input = int(input("Enter an integer: "))

        # Display the user input
        print("You entered:", user_input)
except KeyboardInterrupt:
    GPIO.cleanup()
