import datetime

from project.server import db

from sqlalchemy import inspect


class Attachments(db.Model):

    __tablename__ = 'attachments'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fileName = db.Column(db.String(255), nullable=False)
    documentLink = db.Column(db.String(255), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)
    created_date = db.Column(db.DateTime, nullable=False)
    modified_date = db.Column(db.DateTime, nullable=True)

    def __init__(self, fileName , documentLink, question_id):
        self.fileName = fileName
        self.documentLink = documentLink
        self.question_id = question_id
        self.created_date = datetime.datetime.now()

    def __repr__(self):
        return '<Attachments %r>' % (self.fileName)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}