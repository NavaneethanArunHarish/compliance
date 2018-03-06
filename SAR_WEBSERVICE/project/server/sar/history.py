# project/audit.py

import datetime

from project.server import db
from project.server.models.History import History


def insert_history(data):
    print("History data-->", data)
    history_data = History()
    history_data.sar_id = data.sar_id
    history_data.fieldName = data.fieldName
    history_data.oldValue = data.oldValue
    history_data.newValue = data.newValue
    history_data.modifiedBy = data.modifiedBy
    history_data.createdBy = data.createdBy
    history_data.creationTime = data.creationTime
    history_data.modificationTime = data.modificationTime
    db.session.add(history_data)
    db.session.commit()
