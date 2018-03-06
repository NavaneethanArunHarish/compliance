import datetime

from project.server import db
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Attachments(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fileName = db.Column(db.String(255))
    documentLink = db.Column(db.String(500))
    answer_id = db.Column(db.Integer, db.ForeignKey('answer.id'),
                          nullable=False)