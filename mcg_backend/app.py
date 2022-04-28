from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from flask_restplus import Api, Resource
import joblib
import numpy as np
from musicnn.extractor import extractor
import classify
import sys

app = Flask(__name__)
app.config['CORS_HEADERS'] = "Content-Type"
cors = CORS(app, resources={"/*": {"origins": "*"}}, supports_credentials=True)

@app.route("/prediction", methods=["POST"])
@cross_origin(supports_credentials=True)
def prediction():
	try: 
		print(request, file=sys.stdout)
		formData = request.files['file']
		formData.save("./file.wav")

		prediction = classify.classify_audio("./file.wav", "features_classifier.pkl")
		response = jsonify({
			"statusCode": 200,
			"status": "Prediction made",
			"result": prediction
			})
		return response
	except Exception as error:
		return jsonify({
			"statusCode": 500,
			"status": "Could not make prediction",
			"error": str(error)
		})

app.run(host="127.0.0.1", port="5000", debug=True)
