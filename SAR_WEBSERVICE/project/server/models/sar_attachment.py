"""
 * @author Dhinakar Panneer Selvam
 * Date Created: 01/21/2018
 * This class is doamin model for SARAttachment and it is used to send SAR response along with Attachments
 """


from project.server import db
from sqlalchemy import inspect
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class sar_attachment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    sarresponse_id = db.Column(db.Integer, db.ForeignKey('sar_response.id'), nullable=False)
    documentLink = db.Column(db.String(255))
    fileName = db.Column(db.String(255))

    def __init__(self, fileName, link=None):
        self.fileName = fileName
        self.documentLink = link

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
