# project/server/user/views.py
from flask import Blueprint, \
    request, make_response, jsonify,current_app, g, Flask, render_template
import sqlalchemy
from flask_jwt_extended import (
    create_access_token)
from flask_login import login_user
from flask_mail import Mail, Message

from project.server import db
from project.server.models.MailAudit import MailAudit
from flask_jwt_simple import (
    JWTManager, jwt_required, create_jwt, get_jwt_identity, get_jwt)

app = Flask(__name__, template_folder='template')
# mail = Mail(app)


mail_blueprint = Blueprint('email', __name__)


@mail_blueprint.route('/send_email/assessment', methods=['POST', 'GET'])
#@jwt_required
def send_email_assessement():
    print("Entering method")
    if request.method == 'POST':
        json_data = request.json
        print("Mail method")

        mail_tempate = render_template('send_assessment.html', name=json_data['to_name'],
                                       company=current_app.config['DEFAULT_COMPANY_NAME'],
                                       )
        sendMail("Assessment Assigned To You", json_data['to_email'], mail_tempate)

        return "Success", 200

    if request.method == 'GET':
        get_data = MailAudit.query.all()
        all_depts = []
        for mails in get_data:
            all_depts.append(mails.to_dict())
        print("Exiting method")
        return make_response(jsonify(all_depts)), 200


def sendMail(subject, receiverMail, content):
    mail_audit = MailAudit()
    mail_audit.email_content = content
    mail_audit.status = "yet_to_send"
    mail_audit.receiver_mail = receiverMail
    mail_audit.sender_mail = "compliancec2k18@gmail.com"
    mail_audit.subject = subject
    try:
        db.session.add(mail_audit)
        db.session.commit()
    except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
        db.session.rollback()