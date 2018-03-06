import datetime

from project.server import db

from sqlalchemy import inspect


class AssessmentAssigned(db.Model):

    __tablename__ = 'assessmentassigned'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    assessment_id = db.Column(db.Integer, nullable=False)
    assignedTo = db.Column(db.Integer, nullable=False)
    assginedBy = db.Column(db.Integer, nullable=False)
    assgined_date = db.Column(db.DateTime, nullable=False)

    def __init__(self, assessment_id, assignedTo, assginedBy):
        self.assessment_id = assessment_id
        self.assignedTo = assignedTo
        self.assginedBy = assginedBy
        self.assgined_date = datetime.datetime.now()

    def __repr__(self):
        return '<AssessmentAssigned %r>' % (self.name)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}