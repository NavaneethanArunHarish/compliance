import datetime

from project.server import db
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    comments = db.Column(db.String(255))
    question_id = db.Column(db.Integer)
    section_id = db.Column(db.Integer)
    attachments = db.relationship('Attachments', backref='answer', lazy=True)