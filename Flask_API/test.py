import pickle
import numpy as np

form_values = {
    "horsepower" : '100',
    "carwidth" : '100',
    "category" : 'Medium Range',
    "carbody" : 'Hatchback',
    "enginetype" : 'Dual overhead cam engine (DOHC)'
}

car_price_model = pickle.load(
    open("./models/lm_rfe8.pkl", "rb")
)
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


input_data = np.asarray([float(form_values[i]) for i in form_values.keys()]).reshape(
    1, -1
)
input_data = np.insert(input_data, 0, 1)
print(input_data)
# prediction_data = car_price_model.predict(input_data)[0]
predicted = {
    "final_prediction" : car_price_model.predict(input_data)[0]
}
print(predicted)