from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
from models import db, Timer

app = Flask(__name__)
CORS(app)

# 設定ファイル読み込み
app.config.from_object(Config)
# dbとflaskの接続
db.init_app(app)

with app.app_context():
    db.create_all()


# GET: 最新のタイマー設定を返す
@app.route("/api/timer", methods=["GET"])
def get_timer():
    timer = Timer.query.order_by(Timer.id.desc()).first()
    if timer:
        return jsonify(
            {
                "set_time": timer.set_time,
                "break_time": timer.break_time,
                "long_break_time": timer.long_break_time,
            }
        )
    else:
        # デフォルト値返す
        return jsonify({"set_time": 0.04, "break_time": 0.05, "long_break_time": 0.07})


# POST: タイマー設定を保存
@app.route("/api/timer", methods=["POST"])
def post_timer():
    data = request.get_json()
    set_time = data.get("set_time", 25)
    break_time = data.get("break_time", 5)
    long_break_time = data.get("long_break_time", 25)

    new_timer = Timer(
        set_time=set_time, break_time=break_time, long_break_time=long_break_time
    )
    db.session.add(new_timer)
    db.session.commit()

    return jsonify({"message": "保存しました"}), 201


if __name__ == "__main__":
    app.run(debug=True)
