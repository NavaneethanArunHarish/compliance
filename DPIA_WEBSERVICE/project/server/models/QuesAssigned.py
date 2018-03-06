import datetime

from project.server import db

from sqlalchemy import inspect


class QuesAssigned(db.Model):

    __tablename__ = 'questionassigned'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_id = db.Column(db.Integer, nullable=False)
    assignedTo = db.Column(db.Integer, nullable=False)
    assignedBy = db.Column(db.Integer, nullable=False)
    section_id = db.Column(db.Integer, nullable=False)
    assessment_id = db.Column(db.Integer, nullable=False)
    question_label = db.Column(db.String(255), nullable=True)
    assgined_date = db.Column(db.DateTime, nullable=False)

    def __init__(self, question_id , assignedTo, assignedBy, section_id, assessment_id):
        self.question_id = question_id
        self.assignedTo = assignedTo
        self.assignedBy = assignedBy
        self.section_id = section_id
        self.assessment_id = assessment_id
        self.assgined_date = datetime.datetime.now()

    def __repr__(self):
        return '<QuesAssigned({id!r}{question_id!r}{assignedTo!r}{assignedBy!r}{section_id!r}{assessment_id!r})>'.format(id=self.id, question_id=self.question_id, assignedTo=self.assignedTo, section_id=self.section_id, assignedBy=self.assignedBy, assessment_id=self.assessment_id)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}