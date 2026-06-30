#include "firebase_helper.h"

#include <WiFi.h>
#include <FirebaseESP32.h>

#define WIFI_SSID "Lunatics_iphone"
#define WIFI_PASSWORD "plsdontask"

#define FIREBASE_HOST "attendify-922e2-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "TK2TcTfEQElkHhAINNXZGM9Ne30GoQcoSyGt7Yyr"

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

config.signer.tokens.legacy_token = FIREBASE_AUTH;

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
    bool ok1 = Firebase.setInt(
        fbdo,
        "/lastEnrollment/fingerprintID",
        fingerprintID);

    bool ok2 = Firebase.setString(
        fbdo,
        "/lastEnrollment/status",
        "success");

    Serial.print("Enrollment ID Write = ");
    Serial.println(ok1);

    Serial.print("Enrollment Status Write = ");
    Serial.println(ok2);

    if (!ok1)
        Serial.println(fbdo.errorReason());

    if (!ok2)
        Serial.println(fbdo.errorReason());
}
void sendAttendance(int fingerprintID)
{
    bool ok1 = Firebase.setInt(
        fbdo,
        "/lastAttendance/fingerprintID",
        fingerprintID);

    bool ok2 = Firebase.setString(
        fbdo,
        "/lastAttendance/status",
        "present");

    Serial.print("Attendance ID Write = ");
    Serial.println(ok1);

    Serial.print("Attendance Status Write = ");
    Serial.println(ok2);

    if (!ok1)
        Serial.println(fbdo.errorReason());

    if (!ok2)
        Serial.println(fbdo.errorReason());
}