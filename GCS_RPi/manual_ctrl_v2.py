import RPi.GPIO as GPIO
import time
import board
import neopixel

# Pin definitions
signalPin = 16  # GPIO pin to toggle
pixel_pin = board.D18  # Pin for NeoPixel data
num_pixels = 12  # Number of NeoPixel LEDs

# GPIO setup
GPIO.setmode(GPIO.BCM)  # Set GPIO numbering mode to BCM
GPIO.setup(signalPin, GPIO.OUT)  # Set the signal pin as an output

# NeoPixel setup
pixels = neopixel.NeoPixel(pixel_pin, num_pixels)

print("GPIO and NeoPixel setup complete. Running in a loop...")

try:
    while True:
        # Turn on GPIO pin and set LEDs to green
        GPIO.output(signalPin, GPIO.HIGH)
        pixels.fill((0, 255, 0))  # Green color
        print("GPIO HIGH - LEDs GREEN")
        time.sleep(1)  # Wait for 1 second

        # Turn off GPIO pin and set LEDs to red
        GPIO.output(signalPin, GPIO.LOW)
        pixels.fill((255, 0, 0))  # Red color
        print("GPIO LOW - LEDs RED")
        time.sleep(1)  # Wait for 1 second

except KeyboardInterrupt:
    # Cleanup GPIO and turn off LEDs on exit
    print("Cleaning up GPIO and turning off LEDs...")
    GPIO.cleanup()
    pixels.fill((0, 0, 0))  # Turn off all LEDs
    print("Cleanup complete.")
