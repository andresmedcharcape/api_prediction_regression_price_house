# -*- coding: utf-8 -*-
"""
Created on Tue Sep  6 23:35:23 2022

@author: Charcape
"""

# Importing libraries
import pandas as pd

# Variables
HOUSING = "data/housing.csv"

## load data housing ##
def load_housing():
    df = pd.read_csv(HOUSING)
    df.columns = ["CRIM","ZN","INDUS","CHAS","NOX","RM","AGE","DIS","RAD","TAX","PTRATIO","B","LSTAT","MEDV"]
    df = pre_processing(df)
    return df

## pre procesing data ##
def pre_processing(df):
    df = df.dropna()
    df = df[~df.duplicated()]
    return df

