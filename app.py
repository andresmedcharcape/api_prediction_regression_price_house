# -*- coding: utf-8 -*-
"""
Created on Tue Sep  6 23:09:40 2022

@author: Charcape
"""

# Importing libraries
from flask import Flask, jsonify, request, redirect, render_template
from flask_cors import CORS
from models.load_models import LINEAR_REGRESSION,RIDGE_REGRESSION,load_model

# Define api
app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app,resources={r"/api/*":{"origins":"*"}})

# Routes
@app.route('/', methods=["GET"])
def index():
    return render_template("index.html")


@app.route('/api/regression/v1', methods=["GET"])
def test():
    response = {
        "status": 'success',
        "message": 'Bienvenido al api de Detección de Movimiento de BBVA'
    }
    return response,200

# Predict price of ridge regression
@app.route('/api/regression/v1/predict/price', methods=["POST"])
def predict():
    try:
        CRIM = request.json['CRIM']
        ZN = request.json['ZN']
        INDUS = request.json['INDUS']
        CHAS = request.json['CHAS']
        NOX = request.json['NOX']
        RM = request.json['RM']
        AGE = request.json['RM']
        DIS = request.json['DIS']
        RAD = request.json['RAD']
        TAX = request.json['TAX']
        PTRATIO = request.json['PTRATIO']
        B = request.json['B']
        LSTAT = request.json['LSTAT']
      
      
        model_ridge = load_model(RIDGE_REGRESSION)
        model_lineal = load_model(LINEAR_REGRESSION)
        data = [CRIM,ZN,INDUS,CHAS,NOX,RM,AGE,DIS,RAD,TAX,PTRATIO,B,LSTAT]
        
        yhat_ridge = model_ridge.predict([data])
        yhat_lineal = model_lineal.predict([data])
       
        response = {
            "status": 'success',
            "price of predict lineal regression": str(yhat_lineal[0]),
            "price of predict ridge regression": str(yhat_ridge[0]),
            "message": 'Prediccion de Precio Generada'
        }
        return response,200
    
    except Exception as e:
        print(e)
        response = {
            "status": 'error',
            "message": 'Error del Servidor 500'
        }
        return response,500
 


# Run model
if __name__ == "__main__":
    app.run()