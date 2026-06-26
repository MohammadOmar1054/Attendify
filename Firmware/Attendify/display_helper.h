#ifndef DISPLAY_HELPER_H
#define DISPLAY_HELPER_H

#include <Arduino.h>

void initDisplay();

void showMessage(
    const String& line1,
    const String& line2 = "");

#endif