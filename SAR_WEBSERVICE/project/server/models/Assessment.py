from project.server import db
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Assessment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    type = db.Column(db.String(255))
    owner_id = db.Column(db.Integer, db.ForeignKey('owner.id'), nullable=False)
    section = db.relationship('Section', backref='assessment', lazy=True)
