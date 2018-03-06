from project.server import db
from sqlalchemy import inspect
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class MdlUser(db.Model):
    __bind_key__ = 'moodle'
    __tablename__ = 'mdl_user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    auth = db.Column(db.String(20))
    confirmed = db.Column(db.Integer)
    policyagreed = db.Column(db.Integer)
    deleted = db.Column(db.Integer)
    suspended = db.Column(db.Integer)
    mnethostid = db.Column(db.Integer)
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))
    firstname = db.Column(db.String(255))
    lastname = db.Column(db.String(255))
    email = db.Column(db.String(255))
    emailstop = db.Column(db.Integer)
    city = db.Column(db.String(255))
    country = db.Column(db.String(255))
    lang = db.Column(db.String(255))
    calendartype = db.Column(db.String(255))
    timezone = db.Column(db.String(255))
    picture = db.Column(db.Integer)
    descriptionformat = db.Column(db.Integer)
    mailformat = db.Column(db.Integer)
    maildigest = db.Column(db.Integer)
    maildisplay = db.Column(db.Integer)
    autosubscribe = db.Column(db.Integer)
    trackforums = db.Column(db.Integer)
    timecreated = db.Column(db.Integer)
    trustbitmask = db.Column(db.Integer)

    def __init__(self, data):
        self.auth =  data["auth"]
        self.confirmed =  data["confirmed"]
        self.policyagreed =  data["policyagreed"]
        self.deleted =  data["deleted"]
        self.suspended =  data["suspended"]
        self.mnethostid =  data["mnethostid"]
        self.username =  data["username"]
        self.password =  data["password"]
        self.firstname =  data["firstname"]
        self.lastname =  data["lastname"]
        self.email =  data["email"]
        self.emailstop =  data["emailstop"]
        self.city =  data["city"]
        self.country =  data["country"]
        self.lang =  data["lang"]
        self.calendartype =  data["calendartype"]
        self.timezone =  data["timezone"]
        self.picture =  data["picture"]
        self.descriptionformat =  data["descriptionformat"]
        self.mailformat =  data["mailformat"]
        self.maildigest =  data["maildigest"]
        self.maildisplay =  data["maildisplay"]
        self.autosubscribe =  data["autosubscribe"]
        self.trackforums =  data["trackforums"]
        self.timecreated =  data["timecreated"]
        self.trustbitmask =  data["trustbitmask"]

    def __repr__(self):
        return '<MdlUser %r>' % (self.username)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}









