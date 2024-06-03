from flask import Flask, jsonify, request, session, redirect, url_for
from model import db, User
from flask_bcrypt import Bcrypt #pip install flask-bcrypt = https://pypi.org/project/Flask-Bcrypt/
from flask_cors import CORS, cross_origin    
from flask import Flask, render_template

app = Flask(__name__)


app.config['SECRET_KEY'] = 'cairocoders-ednalan'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True


bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
db.init_app(app)

with app.app_context():
    db.create_all()

mqtt_data = {}

@app.route("/signup", methods=['POST'])
def signup():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None


    if user_exists:
        return jsonify({"error":"Email already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id":new_user.id,
        'email':new_user.email,
    })

@app.route("/login", methods=['POST'])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error":"Unauthorized Access"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error":"Unauthorized"}), 401
    
    
    return jsonify({
        "id":user.id,
        'email':user.email,
    })

# @app.route('/update_data', methods=['POST'])
# def update_data():
#     global mqtt_data
#     data = request.json
#     mqtt_data = data
#     return 'Data updated successfully'

# @app.route('/get_data', methods=['GET'])
# def get_data():
#     global mqtt_data
#     # 获取数据
#     data = mqtt_data.copy()
#     # 清空 mqtt_data
#     mqtt_data = {}
#     return jsonify(data)

# @app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico')



if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=8081)
