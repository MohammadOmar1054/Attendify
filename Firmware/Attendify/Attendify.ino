#include "fingerprint_helper.h"
#include "display_helper.h"
#include "buzzer_helper.h"

bool resetArmed = false;

void showReady()
{
    showMessage("Attendify", "Ready");
}

void setup()
{
    Serial.begin(115200);

    initDisplay();
    initBuzzer();

    showMessage("Attendify", "Starting...");

    if (!initFingerprint())
    {
        showMessage("Fingerprint", "NOT FOUND");

        while (1);
    }

    showReady();

    Serial.println();
    Serial.println("===== Attendify v2.0 =====");
    Serial.println("Commands:");
    Serial.println("E          -> Enroll");
    Serial.println("A          -> Attendance");
    Serial.println("C          -> Count");
    Serial.println("DELETE X   -> Delete Fingerprint");
    Serial.println("RESET      -> Arm Reset");
    Serial.println("CONFIRM    -> Execute Reset");
    Serial.println("INFO       -> System Info");
    Serial.println();
}

void handleAttendance()
{
    showMessage("Attendance", "Place Finger");

    Serial.println("Waiting for fingerprint...");

    int id = searchFingerprint();

    if (id > 0)
    {
        Serial.print("Recognized ID: ");
        Serial.println(id);

        showMessage("Recognized", "ID: " + String(id));

        successBeep();

        delay(2000);
    }
    else
    {
        Serial.println("Unknown Finger");

        showMessage("Unknown", "Finger");

        errorBeep();

        delay(2000);
    }

    showReady();
}

void handleEnrollment()
{
    showMessage("Enrollment", "Place Finger");

    Serial.println("Checking for duplicate fingerprint...");

    int existingID = searchFingerprint();

    if (existingID > 0)
    {
        Serial.print("Fingerprint already exists. ID = ");
        Serial.println(existingID);

        showMessage("Already Exists", "ID: " + String(existingID));

        errorBeep();

        delay(2500);

        showReady();
        return;
    }

    int freeID = findFirstFreeID();

    if (freeID < 1)
    {
        Serial.println("No free fingerprint slots");

        showMessage("Database", "Full");

        errorBeep();

        delay(2000);

        showReady();
        return;
    }

    Serial.print("Using ID: ");
    Serial.println(freeID);

    showMessage("Enrollment", "Place Finger");

    int enrolledID = enrollFingerprint(freeID);

    if (enrolledID > 0)
    {
        Serial.print("Enrollment Success. ID = ");
        Serial.println(enrolledID);

        showMessage("Enroll Success", "ID: " + String(enrolledID));

        successBeep();
    }
    else
    {
        Serial.println("Enrollment Failed");

        showMessage("Enrollment", "Failed");

        errorBeep();
    }

    delay(2500);

    showReady();
}

void handleCount()
{
    uint16_t count = getFingerprintCount();

    Serial.print("Stored Fingerprints: ");
    Serial.println(count);

    showMessage("Stored Prints", String(count));

    delay(2000);

    showReady();
}

void handleInfo()
{
    uint16_t count = getFingerprintCount();

    Serial.println("===== SYSTEM INFO =====");
    Serial.print("Templates: ");
    Serial.println(count);

    showMessage("Templates", String(count));

    delay(2000);

    showReady();
}

void handleDelete(String cmd)
{
    int spacePos = cmd.indexOf(' ');

    if (spacePos == -1)
    {
        Serial.println("Usage: DELETE <id>");
        return;
    }

    int id = cmd.substring(spacePos + 1).toInt();

    if (deleteFingerprint(id))
    {
        Serial.print("Deleted ID ");
        Serial.println(id);

        showMessage("Deleted", "ID: " + String(id));

        successBeep();
    }
    else
    {
        Serial.println("Delete Failed");

        showMessage("Delete", "Failed");

        errorBeep();
    }

    delay(2000);

    showReady();
}

void loop()
{
    if (!Serial.available())
        return;

    String cmd = Serial.readStringUntil('\n');

    cmd.trim();

    cmd.toUpperCase();

    if (cmd == "E")
    {
        handleEnrollment();
    }
    else if (cmd == "A")
    {
        handleAttendance();
    }
    else if (cmd == "C")
    {
        handleCount();
    }
    else if (cmd == "INFO")
    {
        handleInfo();
    }
    else if (cmd.startsWith("DELETE"))
    {
        handleDelete(cmd);
    }
    else if (cmd == "RESET")
    {
        resetArmed = true;

        Serial.println("WARNING!");
        Serial.println("Type CONFIRM to erase all fingerprints.");

        showMessage("WARNING!", "Type CONFIRM");
    }
    else if (cmd == "CONFIRM" && resetArmed)
    {
        if (clearFingerprintDatabase())
        {
            Serial.println("Database Cleared");

            showMessage("Database", "Cleared");

            successBeep();
        }
        else
        {
            Serial.println("Reset Failed");

            showMessage("Reset", "Failed");

            errorBeep();
        }

        resetArmed = false;

        delay(2000);

        showReady();
    }
}