#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_Fingerprint.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

#define OLED_SDA 21
#define OLED_SCL 22

#define BUZZER_PIN 4

HardwareSerial FingerSerial(2);
Adafruit_Fingerprint finger(&FingerSerial);

Adafruit_SSD1306 display(
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  &Wire,
  -1
);

struct Student {
  uint16_t fingerID;
  const char* name;
  const char* studentID;
};

Student students[] = {
  {1, "Mohammad Omar", "R25EI028"}
};

const int STUDENT_COUNT =
  sizeof(students) / sizeof(students[0]);

bool attendanceMode = false;

void showMessage(
  String line1,
  String line2 = "")
{
  display.clearDisplay();

  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);

  display.setCursor(0, 10);
  display.println(line1);

  display.setCursor(0, 30);
  display.println(line2);

  display.display();
}

void successBeep()
{
  digitalWrite(BUZZER_PIN, HIGH);
  delay(200);
  digitalWrite(BUZZER_PIN, LOW);
}

void errorBeep()
{
  digitalWrite(BUZZER_PIN, HIGH);
  delay(100);
  digitalWrite(BUZZER_PIN, LOW);

  delay(100);

  digitalWrite(BUZZER_PIN, HIGH);
  delay(100);
  digitalWrite(BUZZER_PIN, LOW);
}

Student* findStudent(uint16_t id)
{
  for (int i = 0; i < STUDENT_COUNT; i++)
  {
    if (students[i].fingerID == id)
    {
      return &students[i];
    }
  }

  return NULL;
}

void countFingerprints()
{
  finger.getTemplateCount();

  Serial.print("Stored fingerprints: ");
  Serial.println(finger.templateCount);
}

void recognizeFinger()
{
  int p = finger.getImage();

  if (p != FINGERPRINT_OK)
    return;

  p = finger.image2Tz();

  if (p != FINGERPRINT_OK)
    return;

  p = finger.fingerFastSearch();

  if (p != FINGERPRINT_OK)
  {
    Serial.println("Unknown Finger");

    showMessage(
      "Access Denied",
      "Unknown Finger");

    errorBeep();

    delay(2000);

    showMessage(
      "Attendance",
      "Place Finger");

    return;
  }

  uint16_t id = finger.fingerID;

  Student* student =
    findStudent(id);

  if (student != NULL)
  {
    Serial.println();
    Serial.println("Attendance Marked");

    Serial.print("ID: ");
    Serial.println(id);

    Serial.print("Name: ");
    Serial.println(student->name);

    Serial.print("Student ID: ");
    Serial.println(student->studentID);

    showMessage(
      "Welcome",
      student->name);

    successBeep();

    delay(2000);

    showMessage(
      "Attendance",
      "Place Finger");
  }
  else
  {
    Serial.println(
      "Fingerprint found but no student record");

    showMessage(
      "ID Found",
      String(id));

    errorBeep();
  }
}

void setup()
{
  Serial.begin(115200);

  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);

  Wire.begin(OLED_SDA, OLED_SCL);

  if (!display.begin(
        SSD1306_SWITCHCAPVCC,
        0x3C))
  {
    while (1);
  }

  showMessage(
    "Attendify",
    "Starting...");

  FingerSerial.begin(
    57600,
    SERIAL_8N1,
    16,
    17);

  finger.begin(57600);

  if (!finger.verifyPassword())
  {
    showMessage(
      "Fingerprint",
      "NOT FOUND");

    while (1);
  }

  showMessage(
    "Attendify",
    "Ready");

  Serial.println();
  Serial.println("Attendify v0.1B");
  Serial.println("A = Attendance Mode");
  Serial.println("C = Count Fingerprints");
}

void loop()
{
  if (Serial.available())
  {
    String cmd =
      Serial.readStringUntil('\n');

    cmd.trim();

    if (cmd == "A")
    {
      attendanceMode = true;

      Serial.println(
        "Attendance Mode Enabled");

      showMessage(
        "Attendance",
        "Place Finger");
    }

    if (cmd == "C")
    {
      countFingerprints();
    }
  }

  if (attendanceMode)
  {
    recognizeFinger();
  }
}