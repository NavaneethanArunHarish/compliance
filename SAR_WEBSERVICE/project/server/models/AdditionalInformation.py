import datetime

from project.server import db
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class AdditionalInformation(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    type = db.Column(db.String(255))
    requester = db.Column(db.String(255))
    responder = db.Column(db.String(255))
    request_date = db.Column(db.DateTime, default=datetime.datetime.now())
    action_id = db.Column(db.Integer, db.ForeignKey('action.id'),
                          nullable=False)