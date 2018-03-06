from project.server import db
from sqlalchemy import inspect
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class MailAudit(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email_content = db.Column(db.String(50000))
    receiver_mail = db.Column(db.String(255))
    sender_mail = db.Column(db.String(255))
    status = db.Column(db.String(255))
    subject = db.Column(db.String(255))

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
