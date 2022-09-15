# -*- coding: utf-8 -*-
"""
Created on Tue Sep  6 23:48:15 2022

@author: Charcape
"""

# Importing libraries
from joblib import dump
from joblib import load
import pandas as pd
import numpy as np
from statsmodels.stats.outliers_influence import variance_inflation_factor

from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import RepeatedKFold
from sklearn.linear_model import Ridge, RidgeCV
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# Variables
LINEAR_REGRESSION = "models/linear_regression.joblib"
RIDGE_REGRESSION = "models/ridge_regression.joblib"


## load model ##
def load_model(path_model):
    model = load(path_model)
    return model

## save model ##
def save_model(model,path_model):
    dump(model,path_model) 
    
## detection multiline correlation of dataframe
def detection_multiline_correlation(df,output): 
   X = df.drop([output],axis=1)
   vif_data = pd.DataFrame() 
   vif_data["feature"] = X.columns 
   vif_data["VIF"] = [variance_inflation_factor(X.values, i) 
                             for i in range(len(X.columns))] 
   return vif_data

## split data of dataframe ##
def split_data(df,test_size,random_state):
    X = df.iloc[:,:-1].values
    y = df.iloc[:,-1].values
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size, random_state)
    return X_train, X_test, y_train, y_test

## linear regression model ##
def linearRegression(X_train, X_test, y_train, y_test, path_model):
    model_linear_regression = LinearRegression()
    model_linear_regression.fit(X_train,y_train)
    dump(model_linear_regression,path_model) 
    
## ridge regresion model ##
def ridgeRegression(X_train, X_test, y_train, y_test, path_model):
    ridge_cv= RepeatedKFold(n_splits=10, n_repeats=5, random_state=1)
    model_ridge_regression = RidgeCV(alphas=np.arange(0, 1, 0.01),cv=ridge_cv, scoring='neg_mean_absolute_error')
    model_ridge_regression.fit(X_train,y_train)
    dump(model_ridge_regression,path_model) 

## Evaluation model - MAE ##
def mae_model(model,X_test,y_test,ridge_cv=0):
    yhat = model.predict(X_test)
    scores_model = cross_val_score(model, X_test, y_test, scoring='neg_mean_absolute_error', cv=ridge_cv, n_jobs=-1)
    value_mae = (np.mean(np.absolute(scores_model)))
    return value_mae

## Evaluation model - RMSE  ##
def rmse_model(model,X_test,y_test,ridge_cv=0):
    yhat = model.predict(X_test)
    value_rmse =  mean_squared_error(y_test,yhat, squared=False)
    return value_rmse
    

