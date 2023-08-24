from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
from bson.json_util import dumps
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/SystemDB"
mongo = PyMongo(app)

@app.route('/production', methods=['GET'])
def get_production():
    data = mongo.db.Production.find()
    return dumps(data)  # Converts BSON to JSON

@app.route('/current', methods=['GET'])
def get_current():
    data = mongo.db.Current.find()
    return dumps(data)  # Converts BSON to JSON

@app.route('/market', methods=['GET'])
def get_market():
    data = mongo.db.Market.find()
    return dumps(data)  # Converts BSON to JSON

@app.route('/payment', methods=['GET'])
def get_pyment():
    data = mongo.db.Payment.find()
    return dumps(data)  # Converts BSON to JSON

@app.route('/demand', methods=['GET'])
def get_demand():
    data = mongo.db.Demand.find()
    return dumps(data)  # Converts BSON to JSON

@app.route('/marketdemand', methods=['GET'])
def get_marketdemand():
    data = mongo.db.MarketDemand.find()
    return dumps(data)  # Converts BSON to JSON

@app.route('/employee', methods=['GET'])
def get_employee():
    data = mongo.db.Employee.find()
    return dumps(data)  # Converts BSON to JSON

@app.route("/")
def main(): 
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)




