#include <Adafruit_Fingerprint.h>

HardwareSerial FingerSerial(2);
Adafruit_Fingerprint finger(&FingerSerial);

uint16_t getNextID()
{
  finger.getTemplateCount();
  return finger.templateCount + 1;
}

bool enrollFingerprint(uint16_t id)
{
  int p = -1;

  Serial.println("\nPlace finger...");

  while (p != FINGERPRINT_OK)
  {
    p = finger.getImage();
  }

  Serial.println("Image captured");

  p = finger.image2Tz(1);

  if (p != FINGERPRINT_OK)
  {
    Serial.println("Failed to process image");
    return false;
  }

  Serial.println("Remove finger");

  delay(2000);

  while (finger.getImage() != FINGERPRINT_NOFINGER);

  Serial.println("Place SAME finger again");

  p = -1;

  while (p != FINGERPRINT_OK)
  {
    p = finger.getImage();
  }

  Serial.println("Second image captured");

  p = finger.image2Tz(2);

  if (p != FINGERPRINT_OK)
  {
    Serial.println("Failed second image");
    return false;
  }

  p = finger.createModel();

  if (p != FINGERPRINT_OK)
  {
    Serial.println("Fingerprints do not match");
    return false;
  }

  p = finger.storeModel(id);

  if (p == FINGERPRINT_OK)
  {
    Serial.print("Enrollment successful! ID = ");
    Serial.println(id);

    return true;
  }

  Serial.println("Failed to store fingerprint");

  return false;
}

void setup()
{
  Serial.begin(115200);

  FingerSerial.begin(
      57600,
      SERIAL_8N1,
      16,
      17);

  finger.begin(57600);

  if (!finger.verifyPassword())
  {
    Serial.println("Fingerprint sensor not found!");
    while (1);
  }

  Serial.println("Attendify v0.1A");
  Serial.println("Type E to enroll");
}

void loop()
{
  if (Serial.available())
  {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();

    if (cmd == "E")
    {
      uint16_t id = getNextID();

      Serial.print("Assigning Finger ID: ");
      Serial.println(id);

      enrollFingerprint(id);
    }
  }
}