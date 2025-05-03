from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Timer(db.Model):
    __tablename__ = "timer"
    id = db.Column(db.Integer, primary_key=True)
    set_time = db.Column(db.DateTime, nullable=False)
    break_time = db.Column(db.DateTime, nullable=False)
    long_break_time = db.Column(db.DateTime, nullable=False)
