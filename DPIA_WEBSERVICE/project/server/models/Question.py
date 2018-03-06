import datetime

from project.server import db

from sqlalchemy import inspect


class Question(db.Model):
    __tablename__ = 'question'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_type = db.Column(db.String(255), nullable=False)
    question_label = db.Column(db.String(255), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'), nullable=True)
    action_status = db.Column(db.String(255), nullable=True)
    owner_id = db.Column(db.Integer, nullable=False)
    isAnswered = db.Column(db.Boolean, nullable=False)
    comments = db.Column(db.String(255), nullable=True)
    risk_weightage_status = db.Column(db.String(255), nullable=True)
    created_date = db.Column(db.DateTime, nullable=False)
    modified_date = db.Column(db.DateTime, nullable=True)

    answer = db.relationship('Answer', uselist=False, backref="question")
    actionss = db.relationship('ActionNote', backref='question', lazy=True)
    DpiAuditQ = db.relationship('DpiAudit', backref='question', lazy=True)
    attachment = db.relationship('Attachments', backref='question', lazy=True)

    def __init__(self, question_type , question_label, section_id, action_status,
                 owner_id, isAnswered, comments, risk_weightage_status):
        self.question_type = question_type
        self.question_label = question_label
        self.section_id = section_id
        self.action_status = action_status
        self.owner_id = owner_id
        self.isAnswered = isAnswered
        self.comments = comments
        self.risk_weightage_status = risk_weightage_status
        self.created_date = datetime.datetime.now()

    def __repr__(self):
        return '<Question %r>' % (self.question_type)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}