from flask import Blueprint, request

weight = Blueprint('weight', __name__)

@weight.route('/', methods=['POST'])
def weight_conversion():
    if request.method != "POST":
        return {"error": "Invalid request method"}, 405
    try:
        weight = float(request.json["quantity"])
        unitFrom = request.json["unitFrom"]
        unitTo = request.json["unitTo"]
    except (KeyError, ValueError):
        return {"error": "Missing or invalid input"}, 400
    
    if weight < 0:
        return {"error": "Weight cannot be negative"}, 400
    
    conversion_factors = {
        "milligram": {
            "gram": 0.001,
            "kilogram": 0.000001,
            "ounce": 0.000035274,
            "pound": 0.00000220462,
        },
        "gram": {
            "milligram": 1000,
            "kilogram": 0.001,
            "ounce": 0.035274,
            "pound": 0.00220462,
        },
        "kilogram": {
            "milligram": 1000000,
            "gram": 1000,
            "ounce": 35.274,
            "pound": 2.20462,
        },
        "ounce": {
            "milligram": 28349.5,
            "gram": 28.3495,
            "kilogram": 0.0283495,
            "pound": 0.0625,
        },
        "pound": {
            "milligram": 453592,
            "gram": 453.592,
            "kilogram": 0.453592,
            "ounce": 16,
        },
    }

    try:
        conversion_factor = conversion_factors[unitFrom][unitTo]
    except KeyError:
        return {"error": "Invalid unit conversion"}, 400
    
    
    result = weight * conversion_factor
    
    return {"result": result}