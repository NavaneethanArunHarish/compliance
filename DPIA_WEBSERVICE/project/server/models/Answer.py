import datetime

from project.server import db

from sqlalchemy import inspect


class Answer(db.Model):

    __tablename__ = 'answer'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'), nullable=False)
    answer_sel = db.Column(db.String(255), nullable=True)
    comments = db.Column(db.String(255), nullable=False)
    created_date = db.Column(db.DateTime, nullable=False)
    modified_date = db.Column(db.DateTime, nullable=True)

    # attachment = db.relationship('Attachments', backref='answer', lazy=True)

    def __init__(self, question_id , section_id, answer_sel, comments):
        self.question_id = question_id
        self.section_id = section_id
        self.answer_sel = answer_sel
        self.comments = comments
        self.created_date = datetime.datetime.now()

    def __repr__(self):
        return '<Answer %r>' % (self.comments)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}