#include <WiFi.h>

const char* ssid = "Lunatics_iphone";
const char* password = "plsdontask";

void setup()
{
  Serial.begin(115200);

  Serial.println();
  Serial.println("=================================");
  Serial.println("ATTENDIFY WIFI TEST");
  Serial.println("=================================");

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");

  int attempts = 0;

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");

    attempts++;

    if (attempts > 60)
    {
      Serial.println();
      Serial.println("FAILED TO CONNECT");
      Serial.println("Check hotspot name/password");
      return;
    }
  }

  Serial.println();
  Serial.println("=================================");
  Serial.println("WIFI CONNECTED!");
  Serial.println("=================================");

  Serial.print("SSID: ");
  Serial.println(ssid);

  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  Serial.print("Signal Strength (RSSI): ");
  Serial.print(WiFi.RSSI());
  Serial.println(" dBm");
}

void loop()
{
  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("WiFi Lost! Reconnecting...");
    WiFi.reconnect();

    while (WiFi.status() != WL_CONNECTED)
    {
      delay(500);
      Serial.print(".");
    }

    Serial.println();
    Serial.println("Reconnected!");
  }

  delay(5000);
}