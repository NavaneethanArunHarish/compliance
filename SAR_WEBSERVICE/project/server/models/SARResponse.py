"""
 * @author Dhinakar Panneer Selvam
 * Date Created: 01/21/2018
 * This class is doamin model for SARResponse and it is  used for send the SARResponse to the externalUser or Representative
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


class SARResponse(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    sarattachment = db.relationship('sar_attachment', lazy='dynamic', cascade='all,delete',
                                   backref=db.backref('sarresponse', lazy='joined'))
    sar_id = db.Column(db.Integer, db.ForeignKey('sar.id'), nullable=False)
    fromUser = db.Column(db.String(255))
    toUser = db.Column(db.String(255))
    responseText = db.Column(db.String(255))
    user_id = db.Column(db.Integer)
    user_name = db.Column(db.String(255))

    def __init__(self, data, sar_id=None):
        self.fromUser = data['fromUser']
        self.toUser = data['toUser']
        self.responseText = data['responseText']
        # self.user_name = data['user_name']
        # self.user_id = data['user_id']
        self.sar_id = sar_id
    #
    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
