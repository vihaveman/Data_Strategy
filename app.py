from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
from bson.json_util import dumps
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/StockData"
mongo = PyMongo(app)

@app.route('/stockinfo', methods=['GET'])
def get_stockinfo():
    data = mongo.db.StockInfo.find()
    return dumps(data)  # Converts BSON to JSON

@app.route('/openclose', methods=['GET'])
def get_openclose():
    data = mongo.db.OpenClose.find()
    return dumps(data)  # Converts BSON to JSON

@app.route('/highlow', methods=['GET'])
def get_highlow():
    data = mongo.db.HighLow.find()
    return dumps(data)  # Converts BSON to JSON

@app.route('/volume', methods=['GET'])
def get_volume():
    data = mongo.db.Volume.find()
    return dumps(data)  # Converts BSON to JSON

@app.route('/tradinginfo', methods=['GET'])
def get_tradinginfo():
    data = mongo.db.TradingInfo.find()
    return dumps(data)  # Converts BSON to JSON

@app.route("/")
def main(): 
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)




