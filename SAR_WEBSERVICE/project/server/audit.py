# project/audit.py

import datetime

from project.server import db
from project.server.models.Audit import Audit


def insert_audit(data):
    print("AUdit data-->", data)
    audit_data = Audit()
    audit_data.info = data.info
    audit_data.action = data.action
    audit_data.module = data.module
    audit_data.modifiedBy = data.modifiedBy
    audit_data.createdBy = data.createdBy
    audit_data.creationTime = data.creationTime
    audit_data.modificationTime = data.modificationTime
    db.session.add(audit_data)
    db.session.commit()
