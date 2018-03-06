
from project.server import db
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Action(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    section_id = db.Column(db.Integer)
    owner_id = db.Column(db.Integer)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'),
                            nullable=False)
    additional_info = db.relationship('AdditionalInformation', backref='action', lazy=True)
