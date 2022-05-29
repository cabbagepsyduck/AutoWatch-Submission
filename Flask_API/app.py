from flask import Flask, request
from flask_cors import CORS, cross_origin

import os
import json
import pickle
import numpy as np
from scipy import stats

app = Flask(__name__)

cors = CORS(app)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

# Loading car recommendation Model

car_price_model = pickle.load(
    open("./models/lm_rfe8.pkl", "rb")
)




def convert(o):
    if isinstance(o, np.generic):
        return o.item()
    raise TypeError


# def crop_prediction(input_data):
#     prediction_data = {
#         "xgb_model_prediction": crop_label_dict[
#             crop_xgb_pipeline.predict(input_data)[0]
#         ],
#         "xgb_model_probability": max(crop_xgb_pipeline.predict_proba(input_data)[0])
#         * 100,
#         "rf_model_prediction": crop_label_dict[crop_rf_pipeline.predict(input_data)[0]],
#         "rf_model_probability": max(crop_rf_pipeline.predict_proba(input_data)[0])
#         * 100,
#         "knn_model_prediction": crop_label_dict[
#             crop_knn_pipeline.predict(input_data)[0]
#         ],
#         "knn_model_probability": max(crop_knn_pipeline.predict_proba(input_data)[0])
#         * 100,
#     }

#     all_predictions = [
#             prediction_data["xgb_model_prediction"],
#             prediction_data["rf_model_prediction"],
#             prediction_data["knn_model_prediction"],
#         ]

#     all_probs = [
#             prediction_data["xgb_model_probability"],
#             prediction_data["rf_model_probability"],
#             prediction_data["knn_model_probability"],
#         ]

#     if len(set(all_predictions)) == len(all_predictions):
#         prediction_data["final_prediction"] = all_predictions[all_probs.index(max(all_probs))]
#     else:
#         prediction_data["final_prediction"] = stats.mode(all_predictions)[0][0]

#     return prediction_data

# def price_prediction(input_data):
#     prediction_data = {
#         "prediction_1":
# #     }

# def fertilizer_prediction(input_data):
#     prediction_data = {
#         "xgb_model_prediction": fertilizer_label_dict[
#             fertilizer_xgb_pipeline.predict(input_data)[0]
#         ],
#         "xgb_model_probability": max(
#             fertilizer_xgb_pipeline.predict_proba(input_data)[0]
#         )
#         * 100,
#         "rf_model_prediction": fertilizer_label_dict[
#             fertilizer_rf_pipeline.predict(input_data)[0]
#         ],
#         "rf_model_probability": max(fertilizer_rf_pipeline.predict_proba(input_data)[0])
#         * 100,
#         "svm_model_prediction": fertilizer_label_dict[
#             fertilizer_svm_pipeline.predict(input_data)[0]
#         ],
#         "svm_model_probability": max(
#             fertilizer_svm_pipeline.predict_proba(input_data)[0]
#         )
#         * 100,
#     }

#     all_predictions = [
#             prediction_data["xgb_model_prediction"],
#             prediction_data["rf_model_prediction"],
#             prediction_data["svm_model_prediction"],
#         ]

#     all_probs = [
#             prediction_data["xgb_model_probability"],
#             prediction_data["rf_model_probability"],
#             prediction_data["svm_model_probability"],
#         ]

#     if len(set(all_predictions)) == len(all_predictions):
#         prediction_data["final_prediction"] = all_predictions[all_probs.index(max(all_probs))]
#     else:
#         prediction_data["final_prediction"] = stats.mode(all_predictions)[0][0]

#     return prediction_data


# @app.route("/predict_crop", methods=["GET", "POST"])
# def predictcrop():
#     try:
#         if request.method == "POST":
#             form_values = request.form.to_dict()
#             column_names = ["horsepower", "P", "K", "temperature", "humidity", "ph", "rainfall"]
#             input_data = np.asarray([float(form_values[i].strip()) for i in column_names]).reshape(
#                 1, -1
#             )
#             prediction_data = crop_prediction(input_data)
#             json_obj = json.dumps(prediction_data, default=convert)
#             return json_obj
#     except:
#         return json.dumps({"error":"Please Enter Valid Data"}, default=convert)

@app.route("/predict_price", methods=["GET", "POST"])
def predict_price():
    try:
        if request.method == "POST":
            form_values = request.form.to_dict()
            column_names = [
                "horsepower",
                "carwidth",
                "category",
                "carbody",
                "enginetype"

            ]

            # for key in form_values:
            #     form_values[key] = form_values[key].strip()

            if form_values["category"] == 'Premium Range':
                form_values["category"] = 1
            else:
                form_values["category"] = 0


            if form_values["enginetype"] == 'Dual overhead cam engine (DOHC)':
                form_values["enginetype"] = 1
            else:
                form_values["enginetype"] = 0
            
            if form_values["carbody"] == 'Hatchback':
                form_values["carbody"] = 1
            else:
                form_values["carbody"] = 0

            form_values["carbodysedan"] = 0
            form_values["carbodywagon"] = 0

            if form_values["carbodysedan"] == 'Sedan':
                form_values["carbodysedan"] = 1
            else:
                form_values["carbodysedan"] = 0
            
                        
            if form_values["carbodywagon"] == 'Wagon':
                form_values["carbodywagon"] = 1
            else:
                form_values["carbodywagon"] = 0

            ##$ Carprice = 0.2440 +  0.3599  \times  horsepower  + 0.3652  \times  carwidth +  1.2895 \times Carscategorytopnotchcars  - 0.4859 \times carbodyhatchback  - 1.4450 \times enginetypedohcv - 0.3518 \times carbodysedan - 0.4023 \times carbodywagon $

            input_data = np.asarray([float(form_values[i]) for i in form_values.keys()]).reshape(
                1, -1
            )
            input_data = np.insert(input_data, 0, 1)
            # prediction_data = car_price_model.predict(input_data)[0]
            predicted = {
                "final_prediction" : car_price_model.predict(input_data)[0]
            }
            # prediction_data = price_prediction(input_data)
            json_obj = json.dumps(predicted, default=convert)
            return json_obj
    except:
        return json.dumps({"error":"Please Enter Valid Data"}, default=convert)
                
# @app.route("/predict_fertilizer", methods=["GET", "POST"])
# def predictfertilizer():
#     try:
#         if request.method == "POST":
#             form_values = request.form.to_dict()
#             column_names = [
#                 "Temparature",
#                 "Humidity",
#                 "Moisture",
#                 "soil_type",
#                 "crop_type",
#                 "Nitrogen",
#                 "Potassium",
#                 "Phosphorous",
#             ]

#             for key in form_values:
#                 form_values[key] = form_values[key].strip()

#             form_values["soil_type"] = soil_label_dict[form_values["soil_type"]]
#             form_values["crop_type"] = crop_label_name_dict[form_values["crop_type"]]
#             input_data = np.asarray([float(form_values[i]) for i in column_names]).reshape(
#                 1, -1
#             )
#             prediction_data = fertilizer_prediction(input_data)
#             json_obj = json.dumps(prediction_data, default=convert)
#             return json_obj
#     except:
#         return json.dumps({"error":"Please Enter Valid Data"}, default=convert)


if __name__ == "__main__":
    app.run(debug=True)
