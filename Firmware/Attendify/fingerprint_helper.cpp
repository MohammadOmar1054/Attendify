#include "fingerprint_helper.h"

HardwareSerial FingerSerial(2);
Adafruit_Fingerprint finger(&FingerSerial);

bool initFingerprint()
{
    FingerSerial.begin(57600, SERIAL_8N1, 16, 17);

    finger.begin(57600);

    return finger.verifyPassword();
}

uint16_t getFingerprintCount()
{
    finger.getTemplateCount();
    return finger.templateCount;
}

bool deleteFingerprint(uint16_t id)
{
    return (finger.deleteModel(id) == FINGERPRINT_OK);
}

bool clearFingerprintDatabase()
{
    return (finger.emptyDatabase() == FINGERPRINT_OK);
}

int searchFingerprint()
{
    int p = finger.getImage();

    if (p != FINGERPRINT_OK)
        return -1;

    p = finger.image2Tz();

    if (p != FINGERPRINT_OK)
        return -1;

    p = finger.fingerFastSearch();

    if (p != FINGERPRINT_OK)
        return -1;

    return finger.fingerID;
}

int enrollFingerprint()
{
    int nextID = getFingerprintCount() + 1;

    Serial.println("Place finger...");

    while (finger.getImage() != FINGERPRINT_OK);

    if (finger.image2Tz(1) != FINGERPRINT_OK)
        return -1;

    Serial.println("Remove finger");

    delay(2000);

    while (finger.getImage() != FINGERPRINT_NOFINGER);

    Serial.println("Place same finger again");

    while (finger.getImage() != FINGERPRINT_OK);

    if (finger.image2Tz(2) != FINGERPRINT_OK)
        return -1;

    if (finger.createModel() != FINGERPRINT_OK)
        return -1;

    if (finger.storeModel(nextID) != FINGERPRINT_OK)
        return -1;

    return nextID;
}