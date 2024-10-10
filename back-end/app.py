from flask import Flask
from flask_cors import CORS
from length import length
from weight import weight
from temperature import temperature

app = Flask(__name__)
CORS(app)

app.register_blueprint(length, url_prefix='/length')
app.register_blueprint(weight, url_prefix='/weight')
app.register_blueprint(temperature, url_prefix='/temperature')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
