from project.server import db
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Section(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    owner_id = db.Column(db.Integer)
    assignedTo = db.Column(db.String(255))
    assessment_id = db.Column(db.Integer, db.ForeignKey('assessment.id'), nullable=False)
