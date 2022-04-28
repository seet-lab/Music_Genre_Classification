from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource
import joblib
import numpy as np
import xgboost
from xgboost import Booster

flask_app = Flask(__name__)
app = Api(app = flask_app)

name_space = app.namespace('prediction', description='Prediction APIs')

booster = Booster()
classifier = booster.load_model('features_classifier_ovr.joblib')

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response
	
	def post(self):
		try: 
			formData = request.json
			data = [val for val in formData.values()]
			prediction = classifier.predict(data)
			types = { 0: "Iris Setosa", 1: "Iris Versicolour ", 2: "Iris Virginica"}
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": "The type of iris plant is: " + types[prediction[0]]
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})
