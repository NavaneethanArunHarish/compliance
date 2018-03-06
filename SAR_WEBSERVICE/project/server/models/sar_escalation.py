from project.server import db
from sqlalchemy import inspect
from sqlalchemy.dialects.mysql import BIGINT
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Sar_escalation(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer)
    escalation_data = db.Column(db.String(255))
    sar_id = db.Column(db.Integer, db.ForeignKey('sar.id'), nullable=False)
    justify = db.Column(db.String(255))

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}