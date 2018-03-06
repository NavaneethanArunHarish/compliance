"""
 * @author Tharani Rajan
 * Date Created: 02/11/2018
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


class License(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    customer_name =db.Column(db.String(255))
    file = db.Column(db.String(10000))
    publicKey = db.Column(db.String(10000))
    privateKey = db.Column(db.String(10000))
    signature = db.Column(db.String(10000))
    license_type = db.Column(db.String(255))
    email = db.Column(db.String(255))
    domain = db.Column(db.String(255))
    no_of_users = db.Column(db.Integer)
    users_left = db.Column(db.Integer)
    no_of_modules = db.Column(db.Integer)
    expary_date = db.Column(db.DateTime)
    creation_time = db.Column(db.DateTime, default=datetime.datetime.now())
    modification_time = db.Column(db.DateTime, default=datetime.datetime.now())
    created_by = db.Column(db.String(255))
    modified_by = db.Column(db.String(255))

    def __init__(self, data,expary_date,publicKey,privateKey,signature,users_left):
        self.customer_id = data['customer_id']
        self.customer_name = data['customer_name']
        #self.file = file
        self.publicKey = publicKey
        self.privateKey = privateKey
        self.signature = signature
        self.license_type = data['license_type']
        self.email = data['email']
        self.domain = data['domain']
        self.no_of_users = data['no_of_users']
        self.users_left = users_left
        self.no_of_modules = data['no_of_modules']
        self.expary_date = expary_date
        #self.creation_time = data['creation_time']
        #self.modification_time = data['modification_time']
        self.created_by = data['created_by']
        self.modified_by = data['modified_by']

    def __repr__(self):
        return '<License %r>' % (self.customer_name)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

