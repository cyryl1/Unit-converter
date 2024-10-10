from flask import Blueprint, request

temperature = Blueprint('temperature', __name__)

def celsius_to_fahrenheit(c):
    return c * 9/5 + 32

def celsius_to_kelvin(c):
    return c + 273.15

def fahrenheit_to_celsius(c):
    return (c - 32) * 5/9

def fahrenheit_to_kelvin(c):
    return (c - 32) * 5/9 + 273.15

def kelvin_to_celsius(k):
    return k - 273.15

def kelvin_to_fahrenheit(k):
    return (k -273.15) * 1.8 + 32


@temperature.route('/', methods=['POST'])
def temp_conversion():
    if request.method != "POST":
        return {"error": "Invalid request method"}, 400
    
    try:
        temp = float(request.json["quantity"])
        unitFrom = request.json["unitFrom"]
        unitTo = request.json["unitTo"]
    except (KeyError, ValueError):
        return {"error": "Invalid request data"}, 400
    
    if temp < 0:
        return {"error": "Temperature cannot be negative"}, 400
    
    conversion_factors = {
        "celsius": {
            "fahrenheit": celsius_to_fahrenheit,
            "kelvin": celsius_to_kelvin,
        },
        "fahrenheit": {
            "celsius": fahrenheit_to_celsius,
            "kelvin": fahrenheit_to_kelvin,
        },
        "kelvin": {
            "celsius": kelvin_to_celsius,
            "fahrenheit": kelvin_to_fahrenheit,
        },
    }

    try:
        conversion_factor = conversion_factors[unitFrom][unitTo]
    except KeyError:
        return {"error": "invalid unit conversion"}, 400
    
    result = conversion_factor(temp)
    
    return {"result": result}