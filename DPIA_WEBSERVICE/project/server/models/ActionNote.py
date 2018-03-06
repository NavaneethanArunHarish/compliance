import datetime

from project.server import db

from sqlalchemy import inspect


class ActionNote(db.Model):

    __tablename__ = 'action_note'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)
    owner_id = db.Column(db.Integer , nullable=False)
    type = db.Column(db.String(255), nullable=False)
    notes = db.Column(db.String(999), nullable=False)
    created_date = db.Column(db.DateTime, nullable=False)
    modified_date = db.Column(db.DateTime, nullable=True)

    def __init__(self, data):
        self.question_id = data['question_id']
        self.owner_id = data['owner_id']
        self.type = data['type']
        self.notes = data['notes']
        self.created_date = datetime.datetime.now()

    def __repr__(self):
        return '<ActionNote %r>' % (self.owner_id)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}