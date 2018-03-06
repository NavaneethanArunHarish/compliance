"""
 * @author Saravanakumar Krishnan
 * Date Created: 02/02/2018
 * This class is doamin model for SARAttachment and it is used to send SAR response along with Attachments
 """


from project.server import db
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_type = db.Column(db.String(255))
    question_label = db.Column(db.String(255))
    action_status = db.Column(db.String(255))
    comments = db.Column(db.String(255))
    riskWeightageStatus = db.Column(db.String(255))
    assignedTo = db.Column(db.String(255))
    owner = db.Column(db.String(255))
    actions = db.relationship('Action', backref='question', lazy=True)
    answer_id = db.Column(db.Integer, db.ForeignKey('answer.id'))
    # define relationship
    answer = db.relationship('Answer', backref='question')
