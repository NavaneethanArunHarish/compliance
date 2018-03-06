import datetime

from project.server import db

from sqlalchemy import inspect


class Projects(db.Model):

    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    proj_id = db.Column(db.String(10), nullable=False)
    proj_name = db.Column(db.String(255), nullable=False)
    proj_desc = db.Column(db.String(9999), nullable=False)
    proj_status = db.Column(db.String(25), nullable=False)
    created_by = db.Column(db.Integer, nullable=False)
    modified_by = db.Column(db.Integer, nullable=True)
    created_date = db.Column(db.DateTime, nullable=False)
    modified_date = db.Column(db.DateTime, nullable=True)
    actions = db.relationship('Assessment', backref='projects', lazy=True)

    def __init__(self, proj_id, proj_name, proj_desc, proj_status, created_by):
        self.proj_id = proj_id
        self.proj_name = proj_name
        self.proj_desc = proj_desc
        self.proj_status = proj_status
        self.created_by = created_by
        self.created_date = datetime.datetime.now()

    def __repr__(self):
        return '<Projects %r>' % (self.proj_name)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}