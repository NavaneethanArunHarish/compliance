import datetime

from project.server import db

from sqlalchemy import inspect


class Section(db.Model):
    __tablename__ = 'section'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, nullable=False)
    parentSectionId = db.Column(db.Integer, nullable=True)
    assessment_id = db.Column(db.Integer, db.ForeignKey('assessment.id'), nullable=False)
    created_date = db.Column(db.DateTime, nullable=False)
    modified_date = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(255), nullable=True)

    quesRelation = db.relationship('Question', backref='section', lazy=True)
    sectionsdpi = db.relationship('DpiAudit', backref='section', lazy=True)

    def __init__(self, name , owner_id, parentSectionId, assessment_id):
        self.name = name
        self.owner_id = owner_id
        self.parentSectionId = parentSectionId
        self.assessment_id = assessment_id
        self.created_date = datetime.datetime.now()

    def __repr__(self):
        return '<Section %r>' % (self.name)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}