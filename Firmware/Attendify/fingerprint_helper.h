#ifndef FINGERPRINT_HELPER_H
#define FINGERPRINT_HELPER_H

#include <Arduino.h>
#include <Adafruit_Fingerprint.h>

extern HardwareSerial FingerSerial;
extern Adafruit_Fingerprint finger;

bool initFingerprint();

uint16_t getFingerprintCount();

bool deleteFingerprint(uint16_t id);

bool clearFingerprintDatabase();

int searchFingerprint();

int enrollFingerprint();

#endif