import datetime

from project.server import db

from sqlalchemy import inspect


class Assessment(db.Model):
    __tablename__ = 'assessment'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    assignedTo = db.Column(db.String(255), nullable=True)
    ass_desc = db.Column(db.String(9999), nullable=False)
    ass_status = db.Column(db.String(15), nullable=False)
    template = db.Column(db.Boolean, nullable=False)
    owner_id = db.Column(db.Integer, nullable=True)
    template_id = db.Column(db.Integer, nullable=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=True)
    created_date = db.Column(db.DateTime, nullable=False)
    modified_date = db.Column(db.DateTime, nullable=True)
    sending_mail =db.Column(db.Boolean, default=False)
    sActions = db.relationship('Section', backref='assessment', lazy=True)

    def __init__(self, name, ass_desc, ass_status, template, owner_id, template_id, project_id):
        self.name = name
        self.ass_desc = ass_desc
        self.ass_status = ass_status
        self.template = template
        self.owner_id = owner_id
        self.template_id = template_id
        self.project_id = project_id
        self.type = 'template'
        self.created_date = datetime.datetime.now()

    def __repr__(self):
        return '<Assessment %r>' % (self.name)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}