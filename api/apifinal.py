from flask import Flask, request, jsonify
import pickle
import traceback
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Load the trained model
try:
    with open("model.pkl", "rb") as f:
        model = pickle.load(f)
except FileNotFoundError:
    print("Error: model.pkl not found. Please train and save your model first.")
    exit()

# Store the means and stds for normalization in the api
means = {'pH': 6.642071, 'Water': 90.549055, 'Gas_Concentration': 11.041951}
stds = {'pH': 2.297184, 'Water': 9.382843, 'Gas_Concentration': 3.476629}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        required_fields = ["item", "pH", "Water", "Gas_Concentration"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        try:
            pH = float(data["pH"])
            Water = float(data["Water"])
            Gas_Concentration = float(data["Gas_Concentration"])
        except ValueError:
            return jsonify({"error": "Invalid input: pH, Water, and Gas_Concentration must be numbers"}), 400

        # Normalize the input features
        pH = (pH - means['pH']) / stds['pH']
        Water = (Water - means['Water']) / stds['Water']
        Gas_Concentration = (Gas_Concentration - means['Gas_Concentration']) / stds['Gas_Concentration']

        item = data["item"].lower()

        X_input = [pH, Water, Gas_Concentration]
        item_features = {
            "apple": 0, "bananas": 0, "beets": 0, "broccoli": 0, "carrots": 0,
            "grapes": 0, "lemons": 0, "lettuce": 0, "oranges": 0, "peaches": 0,
            "potatoes": 0, "radish": 0, "tomatoes": 0, "watermelon": 0
        }
        if item in item_features:
            item_features[item] = 1
        else:
            return jsonify({"error": "Invalid item provided."}), 400

        X_input.extend(list(item_features.values()))
        X_input = np.array(X_input).reshape(1, -1)

        try:
            probabilities = model.predict_proba(X_input)
            probability_of_class_1 = probabilities[0][1]

        except ValueError as ve:
            print(f"ValueError during prediction: {ve}")
            traceback.print_exc()
            return jsonify({"error": f"ValueError during prediction: {ve}"}), 500
        except Exception as e:
            print(f"General exception during prediction: {e}")
            traceback.print_exc()
            return jsonify({"error": "An error occurred during prediction. Check server logs."}), 500

        freshness_score = int(probability_of_class_1 * 100)
        freshness = f"{freshness_score}%"

        if freshness_score > 50:
            message = "This item is good"
        else:
            message = "This item might not be fresh"

        response = {
            "item": data["item"],
            "freshness": freshness,
            "message": message
        }

        return jsonify(response), 200

    except Exception as e:
        print(f"Outer exception: {e}")
        traceback.print_exc()
        return jsonify({"error": "An error occurred during request processing. Check server logs."}), 500

if __name__ == '__main__':
    app.run(debug=True)