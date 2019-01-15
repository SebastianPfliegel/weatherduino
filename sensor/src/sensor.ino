#include <DHT.h>

#define DATA_PIN 9
#define DHT_TYPE DHT22

DHT dhtsensor(DATA_PIN, DHT_TYPE);

void setup()
{
    Serial.begin(9600);

    dhtsensor.begin();
}

void loop()
{
    delay(2000);

    float humidity = dhtsensor.readHumidity();
    float temperature = dhtsensor.readTemperature();

    if(!isnan(humidity) && !isnan(temperature))
    {
        Serial.print("{\"temperature\":");
        Serial.print(temperature);
        Serial.print(",\"humidity\":");
        Serial.print(humidity);
        Serial.println("}");
    }
    else
    {
        Serial.println("{}");
    }
}