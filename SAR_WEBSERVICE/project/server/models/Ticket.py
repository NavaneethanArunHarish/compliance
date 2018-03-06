
"""
 * @author Dhinakar Panneer Selvam
 * Date Created: 01/21/2018
 * This class is doamin model for Ticket and it is used for cc team to taken care of SARRequest
 """


import datetime

from project.server import db, bcrypt
from flask import current_app

from sqlalchemy import inspect
from sqlalchemy.dialects.mysql import BIGINT
from sqlalchemy.ext.declarative import declarative_base

import json


Base = declarative_base()


class Ticket(db.Model):
    # an email field and a password field
    uid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    type = db.Column(db.String(120))
    time = db.Column(BIGINT)
    changetime = db.Column(BIGINT)
    component = db.Column(db.String(100))
    severity = db.Column(db.String(120))
    priority = db.Column(db.String(120))
    owner = db.Column(db.String(120))
    reporter = db.Column(db.String(120))
    cc = db.Column(db.String(120))
    version = db.Column(db.String(120))
    milestone = db.Column(db.String(120))
    status = db.Column(db.String(120))
    resolution = db.Column(db.String(120))
    summary = db.Column(db.String(120))
    description = db.Column(db.String(120))
    keywords = db.Column(db.String(120))
    product = db.Column(db.String(120))
    id = db.Column(db.Integer)
    sar_id = db.Column(db.Integer, db.ForeignKey('sar.id'))
    created_time = db.Column(db.DateTime, default=datetime.datetime.now())
    modified_time = db.Column(db.DateTime, default=None)
    ticketinfo2 = db.relationship('TicketInfo', lazy='dynamic',
                                  backref=db.backref('tickets', lazy='joined'))
    #ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.uid'), nullable=False)

    def __init__(self, data, id, sar_id=None):
        self.type = data["type"]
        # self.updated_on = data["updated_on"]
        self.component = data["component"]
        self.severity = data["severity"]
        self.priority = data["priority"]
        self.owner = data["owner"]
        self.reporter = data["reporter"]
        self.cc = data["cc"]
        self.version = data["version"]
        self.milestone = data["milestone"]
        self.status = data["status"]
        self.resolution = data["resolution"]
        self.summary = data["summary"]
        self.description = data["description"]
        self.keywords = data["keywords"]
        self.product = data["product"]
        # self.modified_time = data["modified_time"]
        self.id = id
        self.sar_id = sar_id

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
