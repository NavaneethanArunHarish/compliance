import datetime

from project.server import db

from sqlalchemy import inspect


class SectionAssigned(db.Model):

    __tablename__ = 'sectionassigned'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    section_id = db.Column(db.Integer, nullable=False)
    assignedTo = db.Column(db.Integer, nullable=False)
    assgined_date = db.Column(db.DateTime, nullable=False)

    def __init__(self, section_id , assignedTo):
        self.section_id = section_id
        self.assignedTo = assignedTo
        self.assgined_date = datetime.datetime.now()

    def __repr__(self):
        return '<SectionAssigned %r>' % (self.name)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}