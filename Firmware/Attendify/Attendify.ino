#include "fingerprint_helper.h"
#include "display_helper.h"
#include "buzzer_helper.h"
enum Mode
{
    IDLE,
    ENROLLMENT,
    ATTENDANCE
};

Mode currentMode = IDLE;

void setup()
{
    Serial.begin(115200);

    initDisplay();
    initBuzzer();

    showMessage(
        "Attendify",
        "Starting...");

    if (!initFingerprint())
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
    Serial.println("Attendify v2.0");
}

void loop()
{
}