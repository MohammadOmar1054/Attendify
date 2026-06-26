#include <Adafruit_Fingerprint.h>

HardwareSerial FingerSerial(2);
Adafruit_Fingerprint finger(&FingerSerial);

void setup()
{
  Serial.begin(115200);

  FingerSerial.begin(57600, SERIAL_8N1, 16, 17);
  finger.begin(57600);

  if (!finger.verifyPassword())
  {
    Serial.println("Sensor not found!");
    while (1);
  }

  finger.getTemplateCount();

  Serial.print("Stored fingerprints: ");
  Serial.println(finger.templateCount);
}

void loop()
{
}