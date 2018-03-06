from project.server import db
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Owner(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    assessment = db.relationship('Assessment', backref='owner', lazy=True)
