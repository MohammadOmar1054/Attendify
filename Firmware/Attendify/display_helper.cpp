#include "display_helper.h"

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    &Wire,
    -1);

void initDisplay()
{
    Wire.begin(21, 22);

    display.begin(
        SSD1306_SWITCHCAPVCC,
        0x3C);

    display.clearDisplay();
    display.display();
}

void showMessage(
    const String& line1,
    const String& line2)
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