"""
 * @author Tharani Rajan
 * Date Created: 01/31/2018
 * This class is doamin model for Department and it is used for indicating the User's department in system
 """


import datetime

from project.server import db, bcrypt
from flask import current_app

from sqlalchemy import inspect
from sqlalchemy.dialects.mysql import BIGINT
from sqlalchemy.ext.declarative import declarative_base

from enum import Enum
import json


Base = declarative_base()

class GroupName():
    GROUP1 = "Group1"
    GROUP2 = "Group2"
    GROUP3 = "Group3"

#Group1: ADMINISTRATOR, DPO
#Group2:  EXTERNALUSER,REPRESENTATIVE
#Group3:  COMPLIANCETEAMLEADER,COMPLIANCETEAMMEMBER


class UserGroup(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    members = db.Column((db.String(255)))

    def __init__(self, data):
        self.name = data['name']
        self.members = data['members']

    def __repr__(self):
        return '<UserGroup %r>' % (self.name)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

