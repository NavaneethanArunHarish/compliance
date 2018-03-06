"""
 * @author Tharani Rajan
 * Date Created: 01/21/2018
 * This class is doamin model for Department and it is used for indicating the User's department in system
 """


import datetime

from project.server import db, bcrypt
from flask import current_app

from sqlalchemy import inspect
from sqlalchemy.dialects.mysql import BIGINT
from sqlalchemy.ext.declarative import declarative_base

import enum
import json


Base = declarative_base()


class Department(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    defaultAssignedEmailId = db.Column(db.String(255))
    ticketinfo = db.relationship('TicketInfo', lazy='dynamic',
                                 backref=db.backref('department', lazy='joined'))
    #tic ketinfo_id = db.Column(db.Integer, db.ForeignKey('ticket_info.id'), nullable=True)

    # ticketinfo = relationship("TicketInfo", uselist=False, back_populates="department")

    def __init__(self, data):
        self.name = data['name']
        self.defaultAssignedEmailId = data['defaultAssignedEmailId']

    def __repr__(self):
        return '<Department %r>' % (self.name)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

