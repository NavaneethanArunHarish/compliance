"""
 * @author Saravanakumar Krishnan
 * Date Created: 02/01/2018
 * This class is doamin model for Address of User in system
 """


from project.server import db

from sqlalchemy import inspect
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class PaymentPlans(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    amount = db.Column(db.Integer)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
