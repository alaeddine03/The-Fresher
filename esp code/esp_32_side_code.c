#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

// Définition des UUIDs
#define SERVICE_UUID        "12345678-1234-1234-1234-123456789abc"
#define CHARACTERISTIC_UUID "abcd1234-5678-1234-5678-abcdef123456"

// Broches des capteurs
#define PH_SENSOR_PIN       34 // GPIO pour le capteur de pH
#define HUMIDITY_SENSOR_PIN 35 // GPIO pour le capteur d'humidité
#define GAS_SENSOR_PIN      36 // GPIO pour le capteur de gaz

// Objets BLE
BLEServer* pServer;
BLECharacteristic* pCharacteristic;
bool deviceConnected = false; // Statut de connexion BLE

// Gestion des connexions BLE
class MyServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    deviceConnected = true;
  }

  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
  }
};

void setup() {
  // Initialisation série pour débogage
  Serial.begin(115200);
  Serial.println("Initialisation BLE...");

  // Initialisation BLE
  BLEDevice::init("freshnesschecker");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Création du service BLE
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Création de la caractéristique BLE
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY);
  pCharacteristic->addDescriptor(new BLE2902());

  // Démarrage du service
  pService->start();

  // Mise en publicité BLE
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->start();
  Serial.println("freshnesschecker prêt et en mode publicité.");
}

void loop() {
  if (deviceConnected) {
    // Lecture des valeurs des capteurs
    float phValue = analogRead(PH_SENSOR_PIN) * (14.0 / 4095.0);  // Conversion en échelle de 0 à 14
    int humidityValue = map(analogRead(HUMIDITY_SENSOR_PIN), 0, 4095, 0, 100); // Conversion en pourcentage
    int gasValue = map(analogRead(GAS_SENSOR_PIN), 0, 4095, 0, 500); // Conversion en ppm simulé

    // Construction du JSON
    String jsonData = "{";
    jsonData += "\"phpvalue\": " + String(phValue, 2) + ",";
    jsonData += "\"gazvalue\": " + String(gasValue) + ",";
    jsonData += "\"humiditevalue\": " + String(humidityValue);
    jsonData += "}";

    // Affichage pour le débogage
    Serial.println(jsonData);

    // Mise à jour de la caractéristique BLE
    pCharacteristic->setValue(jsonData.c_str());
    pCharacteristic->notify(); // Envoi des données au périphérique connecté

    delay(1000); // Intervalle d'une seconde
  }
}