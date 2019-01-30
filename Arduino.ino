#include <ArduinoJson.h>

String command = "";
char endMarker = '%';

int device = PIN_OF_YOUR_DEVICE; //pin of your device

int devicetype_id = YOUR_DEVICETYPE_ID; //id of your gladys devicetype

void setup() {
  Serial.begin(9600);
  pinMode(device, OUTPUT);
}

void loop() {}

void devicetypeNewValue (int code) {
   if ( code == 1) {
      digitalWrite(device, HIGH);
     } 
    else if (code == 0) {
      digitalWrite(device, LOW);
     }
}

void executeFunction(String json_data) {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json_received = jsonBuffer.parseObject(json_data);

  if ( json_received["deviceType"] == int(devicetype_id) ) {
    devicetypeNewValue(json_received["value"]);
  } 
}

void serialEvent() {
    
    char last_readed_char = Serial.read();
    if ( last_readed_char == endMarker ) {
      executeFunction(command);
      command = "";
    } else {
      command += last_readed_char;
    }
}
