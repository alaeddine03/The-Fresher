#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

// BLE Service and Characteristic UUIDs
#define SERVICE_UUID "12345678-1234-1234-1234-1234567890ab"
#define PH_CHARACTERISTIC_UUID "12345678-1234-1234-1234-1234567890ac"
#define WATER_CHARACTERISTIC_UUID "12345678-1234-1234-1234-1234567890ad"
#define GAS_CHARACTERISTIC_UUID "12345678-1234-1234-1234-1234567890ae"

// Sensor pins
const int PH_SENSOR_PIN = 34;
const int WATER_SENSOR_PIN = 35;
const int GAS_SENSOR_PIN = 32;

// BLE server and characteristics
BLEServer *bleServer = nullptr;
BLECharacteristic *phCharacteristic = nullptr;
BLECharacteristic *waterCharacteristic = nullptr;
BLECharacteristic *gasCharacteristic = nullptr;

// Function to simulate sensor readings
float readPHSensor() {
  return 3.0 + random(0, 600) / 100.0; // Simulate pH between 3.0 and 9.0
}

float readWaterSensor() {
  return random(0, 101); // Simulate water content percentage (0-100%)
}

float readGasSensor() {
  return random(0, 1001); // Simulate gas concentration (PPM)
}

// BLE callback for client connection
class ServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer *server) {
    Serial.println("Client connected.");
  }

  void onDisconnect(BLEServer *server) {
    Serial.println("Client disconnected.");
    server->startAdvertising(); // Restart advertising after disconnection
  }
};

void setup() {
  Serial.begin(115200);
  Serial.println("Starting BLE setup...");

  // Seed random number generator
  randomSeed(analogRead(0));

  // Initialize BLE
  BLEDevice::init("FruitFreshnessDetector");
  bleServer = BLEDevice::createServer();
  bleServer->setCallbacks(new ServerCallbacks());

  // Create BLE Service
  BLEService *service = bleServer->createService(SERVICE_UUID);

  // Create BLE Characteristics
  phCharacteristic = service->createCharacteristic(
      PH_CHARACTERISTIC_UUID,
      BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY);
  waterCharacteristic = service->createCharacteristic(
      WATER_CHARACTERISTIC_UUID,
      BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY);
  gasCharacteristic = service->createCharacteristic(
      GAS_CHARACTERISTIC_UUID,
      BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY);

  // Add BLE2902 descriptors for notifications
  phCharacteristic->addDescriptor(new BLE2902());
  waterCharacteristic->addDescriptor(new BLE2902());
  gasCharacteristic->addDescriptor(new BLE2902());

  // Start BLE service
  service->start();

  // Start advertising
  bleServer->getAdvertising()->start();
  Serial.println("BLE advertising started.");
}

void loop() {
  // Read sensor values
  float phValue = readPHSensor();
  float waterValue = readWaterSensor();
  float gasValue = readGasSensor();

  // Update BLE characteristics
  phCharacteristic->setValue(String(phValue, 2).c_str());
  waterCharacteristic->setValue(String(waterValue, 1).c_str());
  gasCharacteristic->setValue(String(gasValue, 1).c_str());

  // Notify connected client with new values
  phCharacteristic->notify();
  waterCharacteristic->notify();
  gasCharacteristic->notify();

  // Log sensor values to Serial
  Serial.printf("pH: %.2f, Water: %.1f%%, Gas: %.1f PPM\n", phValue, waterValue, gasValue);

  // Wait before next reading
  delay(2000);
}