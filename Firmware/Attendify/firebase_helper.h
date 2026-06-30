#ifndef FIREBASE_HELPER_H
#define FIREBASE_HELPER_H

#include <Arduino.h>

void initFirebase();
String getCommand();
void clearCommand();
void sendEnrollment(int id);
void sendAttendance(int id);

#endif