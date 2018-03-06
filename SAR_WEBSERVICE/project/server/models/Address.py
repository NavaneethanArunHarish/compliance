"""
 * @author Dhinakar Panneer Selvam
 * Date Created: 01/21/2018
 * This class is doamin model for Address of User in system
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


class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    addressline1 = db.Column(db.String(255))
    addressline2 = db.Column(db.String(255))
    city = db.Column(db.String(120))
    state = db.Column(db.String(120))
    country= db.Column(db.String(120))
    pincode = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    #user = db.relationship("User",  back_populates="address")
    creation_time = db.Column(db.DateTime, nullable=False)
    modification_time = db.Column(db.DateTime, default=datetime.datetime.now())
    created_by = db.Column(db.String(255))
    modified_by = db.Column(db.String(255))

    def __init__(self, data):
        self.addressline1 = data["addressline1"]
        self.addressline2 = data["addressline2"]
        self.pincode = data["pincode"]
        self.state = data["state"]
        self.country = data["country"]
        self.city = data["city"]
        self.creation_time = datetime.datetime.now()
        # self.modification_time = data["modification_time"]
        self.created_by = data["created_by"]
        self.modified_by = data["modified_by"]

    def __repr__(self):
        return '<Address %r>' % (self.addressline1)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
