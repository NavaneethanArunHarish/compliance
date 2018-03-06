import datetime

from project.server import db

from sqlalchemy import inspect


class DpiAudit(db.Model):

    __tablename__ = 'Dpiaudit'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.String(255), nullable=False)
    created_date = db.Column(db.DateTime, nullable=False)
    modified_date = db.Column(db.DateTime, nullable=True)

    def __init__(self, question_id , section_id, owner_id, description):
        self.question_id = question_id
        self.section_id = section_id
        self.owner_id = owner_id
        self.description = description
        self.created_date = datetime.datetime.now()

    def __repr__(self):
        return '<Action %r>' % (self.owner_id)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}