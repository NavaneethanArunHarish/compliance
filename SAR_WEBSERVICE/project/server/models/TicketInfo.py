"""
 * @author Dhinakar Panneer Selvam
 * Date Created: 01/21/2018
 * This class is doamin model for TicketInfo and it is used to support the Ticket
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


class TicketInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ticket = db.Column(db.Integer, db.ForeignKey('ticket.uid'), nullable=False)
    #department = db.relationship('Department', backref='ticketinfo', lazy=True)
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'), nullable=False)
    sar_id = db.Column(db.Integer, db.ForeignKey('sar.id'), nullable=False)

    def __init__(self, data,id):
        self.ticket = data["ticket"]
        self.department_id = data["department_id"]
        self.sar_id = data["sar_id"]
        self.id = id

    def __repr__(self):
        return '<TicketInfo %r>' % (self.ticket)

    def to_dict(self):
        print ('Ticket dict.. ticektinfo')
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}



