from project.server import db
from sqlalchemy import inspect
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    registrationNumber = db.Column(db.String(255))
    companyName = db.Column(db.String(255))
    contactNo = db.Column(db.String(255))
    vatNumber = db.Column(db.String(255))
    primary_user = db.Column(db.String(255))
    secondary_user = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("Users", back_populates="organization")

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
