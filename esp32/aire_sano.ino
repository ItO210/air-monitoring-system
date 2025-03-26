#include <DHT.h>
#include <MQ135.h>
#include <WiFi.h>
#include <HTTPClient.h>;
#include <ArduinoJson.h>;

#define DHTPIN 4
#define DHTTYPE DHT11
#define pin_motor 33
#define pin_mq135 34

#define WIFI_NETWORK ""
#define WIFI_PASSWORD ""
#define SERVER_NAME ""

#define WIFI_TIMEOUT_MS 60000

char jsonOutput[128];

DHT dht(DHTPIN, DHTTYPE);
MQ135 gasSensor = MQ135(pin_mq135);

HTTPClient client;
  
void connectToWiFi(){
  Serial.print("Connecting to WiFi");
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_NETWORK, WIFI_PASSWORD);

  unsigned long startAttemptTime = millis();

  while(WiFi.status() != WL_CONNECTED & millis() - startAttemptTime < WIFI_TIMEOUT_MS){
    Serial.print(".");
    delay(100);
  }

  if(WiFi.status() != WL_CONNECTED){
    Serial.println("Failed!");
  } else{
    Serial.print("Connected!");
    Serial.println(WiFi.localIP());
  }
}

void setup() {
  
  Serial.begin(9600);
  pinMode(pin_motor, OUTPUT);
  pinMode(pin_mq135, INPUT);
  dht.begin();
  connectToWiFi();
  client.begin(SERVER_NAME);
  client.addHeader("Content-Type", "application/json");
  delay(1000); 

}

void loop() {
  float air_quality = analogRead(pin_mq135);
  //float air_quality = gasSensor.getPPM();
  float humedad = dht.readHumidity();
  float temperatura = dht.readTemperature();
  Serial.println(air_quality);
  const size_t CAPACITY = JSON_OBJECT_SIZE(3);
  StaticJsonDocument<CAPACITY> doc;

  JsonObject object = doc.to<JsonObject>();
  object["temperature"] = temperatura;
  object["humidity"] = humedad;
  object["airQuality"] = air_quality;

  serializeJson(doc, jsonOutput);
  
  int httpCode = client.POST(String(jsonOutput));
  
  if(httpCode > 0){
    String payload = client.getString();
    Serial.println("\nStatuscode: " + String(httpCode));
    Serial.println(jsonOutput);
    Serial.println(payload);
  }
  else{
    Serial.println("Error on HTTP request");
    String payload = client.getString();
    Serial.println("\nStatuscode: " + String(httpCode));
    Serial.println(jsonOutput);
    Serial.println(payload);
  }
  
  if (temperatura > 28){
    digitalWrite(pin_motor, HIGH);
  }
  else if (humedad > 80){
    digitalWrite(pin_motor, HIGH);
  }
  else if (air_quality > 800){
    digitalWrite(pin_motor, HIGH);
  }
  else{
    digitalWrite(pin_motor, LOW);
  }

  //delay(300000);
  //delay(30000);
  delay(5000);
}
