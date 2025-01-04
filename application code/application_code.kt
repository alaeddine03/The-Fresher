import android.bluetooth.*
import android.bluetooth.le.ScanCallback
import android.bluetooth.le.ScanResult
import android.content.Context
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*
import org.json.JSONObject
import java.util.*


class MainActivity : AppCompatActivity() {
    private lateinit var bluetoothAdapter: BluetoothAdapter
    private var bluetoothGatt: BluetoothGatt? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialisation du Bluetooth Adapter
        val bluetoothManager = getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager
        bluetoothAdapter = bluetoothManager.adapter

        // Bouton pour démarrer le scan des périphériques BLE
        scanButton.setOnClickListener {
            bluetoothAdapter.bluetoothLeScanner.startScan(scanCallback)
        }
    }

    // Callback de scan BLE
    private val scanCallback = object : ScanCallback() {
        override fun onScanResult(callbackType: Int, result: ScanResult) {
            val device = result.device
            if (device.name == "freshnesschecker") { // Nom défini dans le code ESP32
                bluetoothAdapter.bluetoothLeScanner.stopScan(this)
                bluetoothGatt = device.connectGatt(this@MainActivity, false, gattCallback)
            }
        }
    }

    // Callback pour gérer les connexions BLE
    private val gattCallback = object : BluetoothGattCallback() {
        override fun onConnectionStateChange(gatt: BluetoothGatt, status: Int, newState: Int) {
            if (newState == BluetoothProfile.STATE_CONNECTED) {
                gatt.discoverServices() // Découverte des services disponibles
            }
        }

        override fun onServicesDiscovered(gatt: BluetoothGatt, status: Int) {
            if (status == BluetoothGatt.GATT_SUCCESS) {
                // Obtenir la caractéristique pour les notifications JSON
                val service = gatt.getService(UUID.fromString("12345678-1234-1234-1234-123456789abc"))
                val characteristic = service.getCharacteristic(UUID.fromString("abcd1234-5678-1234-5678-abcdef123456"))

                // Activer les notifications
                gatt.setCharacteristicNotification(characteristic, true)

                // Configurer le descripteur pour les notifications
                val descriptor = characteristic.getDescriptor(UUID.fromString("00002902-0000-1000-8000-00805f9b34fb"))
                descriptor.value = BluetoothGattDescriptor.ENABLE_NOTIFICATION_VALUE
                gatt.writeDescriptor(descriptor)
            }
        }

        override fun onCharacteristicChanged(gatt: BluetoothGatt, characteristic: BluetoothGattCharacteristic) {
            val jsonString = characteristic.getStringValue(0) // Lecture des données JSON
            runOnUiThread {
                // Analyse et affichage des données JSON
                try {
                    val jsonObject = JSONObject(jsonString)
                    val phpValue = jsonObject.getDouble("phpvalue")
                    val gazValue = jsonObject.getInt("gazvalue")
                    val humiditeValue = jsonObject.getInt("humiditevalue")

                    phpTextView.text = "pH: $phpValue"
                    gazTextView.text = "Gaz: $gazValue ppm"
                    humiditeTextView.text = "Humidité: $humiditeValue%"
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
    }
}