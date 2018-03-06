from project.server import db
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class TicketAttachments(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # ticket_id = db.Column(db.Integer, db.ForeignKey('sar_response.id'), nullable=False)
    documentLink = db.Column(db.String(255))
    fileName = db.Column(db.String(255))

    def __init__(self, fileName, id, link=None):
        self.ticket_id = id
        self.fileName = fileName
        self.documentLink = link
