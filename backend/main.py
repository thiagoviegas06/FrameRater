from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        'message': 'Hello, World!',
        'status': 'success'
    }
    return jsonify(data)

@app.route('/')
def index():
    return "Welcome to the Flask API!"

if __name__ == '__main__':
    app.run(debug=True, port=3000)