#include "buzzer_helper.h"

#define BUZZER_PIN 4

void initBuzzer()
{
    pinMode(BUZZER_PIN, OUTPUT);
    digitalWrite(BUZZER_PIN, LOW);
}

void successBeep()
{
    digitalWrite(BUZZER_PIN, HIGH);
    delay(200);
    digitalWrite(BUZZER_PIN, LOW);
}

void errorBeep()
{
    for (int i = 0; i < 2; i++)
    {
        digitalWrite(BUZZER_PIN, HIGH);
        delay(100);

        digitalWrite(BUZZER_PIN, LOW);
        delay(100);
    }
}