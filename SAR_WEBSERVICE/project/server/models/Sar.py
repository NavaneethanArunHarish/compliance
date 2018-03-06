"""
 * @author Dhinakar Panneer Selvam
 * Date Created: 01/21/2018

 * This class is doamin model for Sar request
 """

import datetime

from project.server import db, bcrypt
from flask import current_app

from sqlalchemy import inspect
from sqlalchemy.dialects.mysql import BIGINT
from sqlalchemy.ext.declarative import declarative_base

import enum
import json
from project.server.models.User import Users



Base = declarative_base()


class SAR_STATUS():
    OPEN = "Open"
    ACTIVE = "Active"
    INPROGRESS = "InProgress"
    CLOSED = "Closed"
    REOPENED="ReOpened"
    ESCALATED="Escalated"


class Sar(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    assignedTo = db.Column(db.Integer, db.ForeignKey(Users.id), nullable=False)
    otherInfo = db.Column(db.String(255))
    sarDescription = db.Column(db.String(255))
    externalUser = db.Column(db.String(255))
    representative = db.Column(db.String(255))
    user_confirmed = db.Column(db.String(255))
    rep_confirmed = db.Column(db.String(255))
    priority = db.Column(db.String(255))
    completionTime = db.Column(db.DateTime)
    #completionTime = db.Column(db.String(255))
    status = db.Column(db.String(255))
    ticketinfo = db.relationship('TicketInfo', lazy='dynamic',
                                 backref=db.backref('sar', lazy='joined'))
    ticket = db.relationship('Ticket', lazy='dynamic', cascade='all,delete', innerjoin=True,primaryjoin="Sar.id == Ticket.sar_id",
                              backref=db.backref('sar', lazy='joined'))
    sar_response = db.relationship('SARResponse', lazy='dynamic', cascade='all,delete',
                                   backref=db.backref('sar', lazy='joined'))
    user_id = db.Column(db.Integer, db.ForeignKey(Users.id), nullable=False)
    creation_time = db.Column(db.DateTime, nullable=False)
    modification_time = db.Column(db.DateTime, default=datetime.datetime.now())
    created_by = db.Column(db.String(255))
    modified_by = db.Column(db.String(255))
    isEscalated = db.Column(db.Boolean)

    assigned_user = db.relationship('Users', foreign_keys='Sar.assignedTo')
    created_user = db.relationship('Users', foreign_keys='Sar.user_id')

    def __init__(self, data, user_id=None):
        self.assignedTo = data['assignedTo']
        self.otherInfo = data['otherInfo']
        self.sarDescription = data['sarDescription']
        self.externalUser = data['externalUser']
        self.representative = data['representative']
        self.completionTime = datetime.datetime.now()
        self.status = data['status']
        self.creation_time = datetime.datetime.now()
        # self.modification_time = data["modification_time"]
        self.created_by = data["created_by"]
        self.modified_by = data["modified_by"]
        self.isEscalated = data['isEscalated']
        self.priority = data['priority']
        self.user_id = data['user_id']

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
