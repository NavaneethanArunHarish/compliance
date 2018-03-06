import datetime

from project.server import db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import inspect


Base = declarative_base()


class Audit(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    action = db.Column(db.String(255))
    module = db.Column(db.String(255))
    info = db.Column(db.String(255))
    createdBy = db.Column(db.String(255))
    modifiedBy = db.Column(db.String(255))
    creationTime = db.Column(db.DateTime)
    modificationTime = db.Column(db.DateTime)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
