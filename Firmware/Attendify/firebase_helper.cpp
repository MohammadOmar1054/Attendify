#include "firebase_helper.h"

#include <WiFi.h>
#include <FirebaseESP32.h>

#define WIFI_SSID "Lunatics_iphone"
#define WIFI_PASSWORD "plsdontask"

#define FIREBASE_HOST "attendify-922e2-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH ""

FirebaseData fbdo;
FirebaseConfig config;
FirebaseAuth auth;

void initFirebase()
{
    Serial.println("Connecting WiFi...");

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println();
    Serial.println("WiFi Connected");

    config.database_url =
        "https://attendify-922e2-default-rtdb.asia-southeast1.firebasedatabase.app/";

    Firebase.begin(&config, &auth);

    Firebase.reconnectWiFi(true);

    Serial.println("Firebase Ready");
}

String getCommand()
{
    if (Firebase.getString(fbdo, "/command"))
    {
        return fbdo.stringData();
    }

    return "";
}
void clearCommand()
{
    Firebase.setString(fbdo, "/command", "");
}
void sendEnrollment(int fingerprintID)
{
    Firebase.setInt(
        fbdo,
        "/lastEnrollment/fingerprintID",
        fingerprintID);

    Firebase.setString(
        fbdo,
        "/lastEnrollment/status",
        "success");
}

void sendAttendance(int fingerprintID)
{
    Firebase.setInt(
        fbdo,
        "/lastAttendance/fingerprintID",
        fingerprintID);

    Firebase.setString(
        fbdo,
        "/lastAttendance/status",
        "present");
}