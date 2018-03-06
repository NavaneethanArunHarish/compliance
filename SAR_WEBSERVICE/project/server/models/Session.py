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



Base = declarative_base()


class User_Session(db.Model):

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, unique=True)
    user_name = db.Column(db.String(255), nullable=False)
    user_type = db.Column(db.String(255))
    client_ip = db.Column(db.String(255), nullable=False)
    #user_group = db.Column(db.String(255))
    session_id =db.Column(db.String(255))
    status = db.Column(db.String(255))
    loged_time = db.Column(db.DateTime, nullable=False)
    modification_time = db.Column(db.DateTime, default=datetime.datetime.now())
    created_by = db.Column(db.String(255))
    modified_by = db.Column(db.String(255))

    def __init__(self, client_ip, user_id, user_name,user_type,status):
        self.user_id = user_id
        self.user_name = user_name
        self.user_type = user_type
        self.client_ip = client_ip
        #self.user_group = user_group
        #self.session_id = data["session_id"]
        self.status = status
        self.loged_time = datetime.datetime.now()
        # self.modification_time = data["modification_time"]
        #self.created_by = data["created_by"]
        #self.modified_by = data["modified_by"]

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id

    def __repr__(self):
        return '<User_Session {0}>'.format(self.name)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
