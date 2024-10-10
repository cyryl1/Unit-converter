from flask import Blueprint, request

length = Blueprint('length', __name__)

@length.route('/', methods=['POST'])
def length_conversion():
    if request.method == 'POST':

        try:
            length = float(request.json['quantity'])
            unitFrom = request.json['unitFrom']
            unitTo = request.json['unitTo']
        except (KeyError, ValueError):
            return {'error': 'Invalid input data'}, 400
        # if length is None or not isinstance(length, (int, float)):
        #     return {'error': 'Length must be a number'}, 400
        
        if length < 0:
            return {'error': 'Length cannot be negative'}, 400
        
        conversion_factors = {
            "millimeter": {
                "centimeter": 0.1,
                "meter": 0.001,
                "kilometer": 0.000001,
                "mile": 0.000000621371,
                "inches": 0.0393701,
                "foot": 0.00328084,
                "yard": 0.00109361,
            },
            "centimeter": {
                "millimeter": 10,
                "meter": 0.01,
                "kilometer": 0.00001,
                "mile": 0.00000621371,
                "inches": 0.393701,
                "foot": 0.0328084,
                "yard": 0.0109361,
            },
            "meter": {
                "millimeter": 1000,
                "centimeter": 100,
                "kilometer": 0.001,
                "mile": 0.000621371,
                "inches": 39.3701,
                "foot": 3.28084,
                "yard": 1.09361,
            },
            "kilometer": {
                "millimeter": 1000000,
                "centimeter": 100000,
                "meter": 1000,
                "mile": 0.621371,
                "inches": 39370.1,
                "foot": 3280.84,
                "yard": 1093.61,
            },
            "mile": {
                "millimeter": 1609340,
                "centimeter": 160934,
                "meter": 1609.34,
                "kilometer": 1.60934,
                "inches": 63360,
                "foot": 5280,
                "yard": 1760,
            },
            "inches": {
                "millimeter": 25.4,
                "centimeter": 2.54,
                "meter": 0.0254,
                "kilometer": 0.0000254,
                "mile": 0.0000157828,
                "foot": 0.0833333,
                "yard": 0.0277778,
            },
            "foot": {
                "millimeter": 304.8,
                "centimeter": 30.48,
                "meter": 0.3048,
                "kilometer": 0.0003048,
                "mile": 0.000189394,
                "inches": 12,
                "yard": 0.333333,
            },
            "yard": {
                "millimeter": 914.4,
                "centimeter": 91.44,
                "meter": 0.9144,
                "kilometer": 0.0009144,
                "mile": 0.000568182,
                "inches": 36,
                "foot": 3,
            }
        }

        try:
            conversion_factor = conversion_factors[unitFrom][unitTo]
        except KeyError:
            return {'error': 'Invalid unit conversion'}, 400
        if length > 1000 and unitFrom == 'meter':
            return "length cannot be greater than 1000 meter"
        result = length * conversion_factor
        return {'result': result}
    else:
        return {'error': 'Invalid request method'}, 400
        