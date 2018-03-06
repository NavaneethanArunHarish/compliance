"""
 * @author Dhinakar Panneer Selvam
 * Date Created: 01/21/2018
 * This class is doamin model for User
 """


import datetime

from project.server import db, bcrypt
from flask import current_app

from sqlalchemy import inspect
from sqlalchemy.dialects.mysql import BIGINT
from sqlalchemy.ext.declarative import declarative_base
from project.server.models.UserGroup import UserGroup

from enum import Enum
import json


#class UserType(Enum):
#    EXTERNALUSER = "External User"
#    REPRESENTATIVE = "Representative"
#    ADMINISTRATOR = "Administrator"
#    COMPLIANCETEAMLEADER = "ComplainceTeamLeader"
#    COMPLIANCETEAMMEMBER="ComplainceTeamMember"
#    DPO="DPO"

class UserType():
    EXTERNALUSER = "External User"
    REPRESENTATIVE = "Representative"
    ADMINISTRATOR = "Administrator"
    COMPLIANCETEAMLEADER = "ComplainceTeamLeader"
    COMPLIANCETEAMMEMBER="ComplainceTeamMember"
    DPO="DPO"


Base = declarative_base()


class Users(db.Model):

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone = db.Column(db.String(1000), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    user_type = db.Column(db.String(255))
    user_group = db.Column(db.String(255))
    address = db.relationship('Address', lazy='dynamic', cascade='all,delete', innerjoin=True,
                              backref=db.backref('user', lazy='joined'))
    sar = db.relationship('Sar', lazy='dynamic', cascade='all,delete', innerjoin=True, foreign_keys='Sar.user_id',
                              backref=db.backref('user', lazy='joined'))
    sar_assignedTo = db.relationship('Sar', lazy='dynamic', cascade='all,delete', innerjoin=True, foreign_keys='Sar.assignedTo',
                          backref=db.backref('assignedTO', lazy='joined'))
    creation_time = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())
    modification_time = db.Column(db.DateTime, default=datetime.datetime.now())
    created_by = db.Column(db.String(255))
    modified_by = db.Column(db.String(255))
    confirmed = db.Column(db.Boolean, nullable=False, default=False)
    confirmed_on = db.Column(db.DateTime, nullable=True)
    token = db.Column(db.String(255), nullable=True)
    password_reset_token = db.Column(db.String, nullable=True)
    organization = db.relationship("Organization", backref="users")


    def __init__(self, data, confirmed, confirmed_on=None, token=None,user_type=None,user_group=None):
        self.name = data["name"]
        self.email = data["email"]
        self.password = bcrypt.generate_password_hash(
            data["password"], current_app.config.get('BCRYPT_LOG_ROUNDS')
        ).decode('utf-8')
        self.user_type = user_type
        self.user_group = user_group
        self.phone = data["phone"]
        self.creation_time = datetime.datetime.now()
        # self.modification_time = data["modification_time"]
        self.created_by = data["created_by"]
        self.modified_by = data["modified_by"]
        self.confirmed = confirmed
        self.confirmed_on = confirmed_on
        self.token = token

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id

    def __repr__(self):
        return '<users {0}>'.format(self.email)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
