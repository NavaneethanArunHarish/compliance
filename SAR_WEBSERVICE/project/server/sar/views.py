"""
 * @author Saravanakumar Krishnan
 * Date Created: 01/22/2018
 * This class is used for SAR servie implementations
 """

import os
import uuid
import logging
import sqlalchemy
from sqlalchemy import or_, and_
from flask import Blueprint, \
    request, make_response, jsonify, Flask, render_template, current_app, send_from_directory, url_for

from project.server import db
from project.server.models.Address import Address
from project.server import email as send_mail
from project.server.models.MailAudit import MailAudit

from project.server.models.User import Users , UserType
from project.server.models.Audit import Audit
from project.server import audit as audit_table
from project.server.models.Sar import Sar, SAR_STATUS
from project.server.models.UserGroup import GroupName
from project.server.models.sar_escalation import Sar_escalation
from project.server.wrapper import views as wrapper

from project.server.models.SARResponse import SARResponse
from project.server.models.sar_attachment import sar_attachment
from project.server.models.Ticket import Ticket
from project.server.models.TicketInfo import TicketInfo
from werkzeug.utils import secure_filename
from flask_sqlalchemy import Pagination

from project.server.config import BaseConfig


from project.server.models.History import History
from project.server.sar import history as history_table

from project.server.email import send_email

from project.server.sar.service import get_sar_service

import datetime

from flask_jwt_simple import (
    JWTManager, jwt_required, create_jwt, get_jwt_identity, get_jwt
)

app = Flask(__name__, template_folder='template')
sar_blueprint = Blueprint('sar', __name__)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']


@sar_blueprint.route('/sar', methods=['POST', 'GET'])
#@jwt_required
def create_sar():
    if request.method == 'POST':
        logging.info('Sar post method')
        json_data = request.json
        sar = Sar(json_data)
        sar.modification_time = datetime.datetime.now()
        sar.status = SAR_STATUS.OPEN
        sar_res = SARResponse(json_data['sar_response'])
        attachment = json_data['sar_response']['sar_attachment']
        sar_att = sar_attachment(attachment['fileName'], attachment['sarresponse_id'])
        sar_res.sarattachment.append(sar_att)
        sar.sar_response.append(sar_res)
        sar.user_id = json_data['user_id']
        # Storing data in audit table
        log_audit("Create SAR", "Create SAR", "SAR", sar.user_id, datetime.datetime.now(), None, None)

        tic = Ticket.query.all()
        id = None
        if tic:
            id = tic[-1].id + 1
        else:
            id = 1

        #create_ticket = Ticket(json_data['ticket'], id)
        #db.session.add(create_ticket)
        #db.session.commit()
        try:
            db.session.add(sar)
            db.session.commit()
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            db.session.rollback()
        ticket_id = None
        ticketArr = json_data['ticket']
        for item in ticketArr:
            create_ticket = Ticket(item, id, sar.id)
            try:
                db.session.add(create_ticket)
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            ticket_id = create_ticket.id
        user = Users.query.filter_by(id=sar.user_id).first()
        mail_tempate = render_template('notification.html', name=user.name, company=current_app.config['DEFAULT_COMPANY_NAME'],
                                       ticketID=create_ticket.id, status='Open')
        sendMail("SAR Request accepted", user.email, mail_tempate)
        # send_email(user.email, "SAR Request accepted", mail_tempate)
        logging.info('Sar post method Exiting')
        data = {
            'sar_id': sar.id
        }
        return wrapper.wrapper(data, "SAR Created successfully.", 201)

    if request.method == 'GET':
        logging.info('Sar get method start')
        try:
            get_sar = Sar.query.all()
            all_sar = []
            for sar in get_sar:
                # for tic in sar.ticketinfo.all():
                #     for dep in tic.department.all():
                #         print("Inside address--->", dep.name)
                all_sar.append(sar.to_dict())
            logging.info('Sar get method Exiting')
            return wrapper.wrapper(all_sar, "Getting all SAR", 200)
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            return wrapper.wrapper(None, e.message, 500), 500



@sar_blueprint.route('/sar/search', methods=['POST'])
@jwt_required
def advance_search_sar():

    if request.method == 'POST':
        logging.info('Sar Search Post Method start')

        data = request.json

        status = data['status']
        priority = data['priority']
        assignedTo = data['assignedTo']
        isEscalated = data['isEscalated']


        if status !='' and priority !='' and assignedTo !=0 and isEscalated != '':
            if isEscalated == 'Yes':
                get_sar = Sar.query.filter(and_(Sar.status == status, Sar.priority == priority, Sar.assignedTo == assignedTo,Sar.isEscalated == True))
            else:
                get_sar = Sar.query.filter(and_(Sar.status == status, Sar.priority == priority, Sar.assignedTo == assignedTo,Sar.isEscalated == False))


        elif status != '' and priority != '' and assignedTo ==0 and isEscalated == '' :
            get_sar = Sar.query.filter(and_(Sar.status == status, Sar.priority == priority))

        elif status != '' and assignedTo !=0 and priority == '' and isEscalated == '':
            get_sar = Sar.query.filter(and_(Sar.status == status, Sar.assignedTo == assignedTo))

        elif status != '' and isEscalated != ''and assignedTo ==0 and priority == '':
            if isEscalated == 'Yes':
                get_sar = Sar.query.filter(and_(Sar.status == status, Sar.isEscalated == True))
            else:
                get_sar = Sar.query.filter(and_(Sar.status == status, Sar.isEscalated == False))


        elif priority != '' and assignedTo !=0 and status == '' and isEscalated == '':
            get_sar = Sar.query.filter(and_(Sar.priority == priority, Sar.assignedTo == assignedTo))

        elif priority != '' and isEscalated != '' and assignedTo ==0 and status == '':
            if isEscalated == 'Yes':
                get_sar = Sar.query.filter(and_(Sar.priority == priority, Sar.isEscalated == True))
            else:
                get_sar = Sar.query.filter(and_(Sar.priority == priority, Sar.isEscalated == False))

        elif assignedTo !=0 and isEscalated != '' and priority == '' and status == '' :
            if isEscalated == 'Yes':
                get_sar = Sar.query.filter(and_(Sar.assignedTo == assignedTo, Sar.isEscalated == True))
            else:
                get_sar = Sar.query.filter(and_(Sar.assignedTo == assignedTo, Sar.isEscalated == False))


        elif status != '' and priority != '' and assignedTo != 0 and isEscalated == '':
            get_sar = Sar.query.filter(
                and_(Sar.status == status, Sar.priority == priority, Sar.assignedTo == assignedTo))

        elif status != '' and priority != '' and isEscalated != '' and assignedTo == 0:
            if isEscalated == 'Yes':
                get_sar = Sar.query.filter(and_(Sar.status == status,Sar.priority == priority, Sar.isEscalated == True))
            else:
                get_sar = Sar.query.filter(and_(Sar.status == status,Sar.priority == priority, Sar.isEscalated == False))


        elif priority != '' and assignedTo != 0 and isEscalated != '' and status == '':
            if isEscalated == 'Yes':
                get_sar = Sar.query.filter(and_(Sar.priority == priority,Sar.assignedTo == assignedTo, Sar.isEscalated == True))
            else:
                get_sar = Sar.query.filter(and_(Sar.priority == priority,Sar.assignedTo == assignedTo, Sar.isEscalated == False))

        else:
            if isEscalated != '':
                if isEscalated == 'Yes':
                    get_sar = Sar.query.filter_by(isEscalated=True).all()
                else:
                    get_sar = Sar.query.filter_by(isEscalated=False).all()
            elif status != '':
                get_sar = Sar.query.filter_by(status=status).all()
            elif priority != '':
                get_sar = Sar.query.filter_by(priority=priority).all()
            else:
                get_sar = Sar.query.filter_by(assignedTo=assignedTo).all()



        all_sar = []
        for sar in get_sar:
            json = {
                "sar": sar.to_dict(),
                'user': sar.__dict__['user'].to_dict(),
                'assignedTO': sar.__dict__['assignedTO'].to_dict()
            }
            all_sar.append(json)

        pagination_data = {
            'has_next': False,
            'pages': 1,
            'has_prev': False,
            'total': 0,
            'page': 1,
            'next_num': None,
            'sar': all_sar
        }
        logging.info('Sar Search Post Method Exiting')

        return wrapper.wrapper(pagination_data, "Getting all SAR", 200)


@sar_blueprint.route('/sar/create', methods=['POST'])
#@jwt_required
def create_sar_alone():
    if request.method == 'POST':
        logging.info('Sar create Post Method start')

        data = request.json

        token = uuid.uuid4()

        user_name = data['user']['name']
        user_email = data['user']['email']
        representative = data['representative']['name']
        rep_email = data['representative']['email']

        user_exist = Users.query.filter_by(name=user_name).first()
        email_exist = Users.query.filter_by(email=user_email).first()
        rep_exist = Users.query.filter_by(name=representative).first()
        rep_email_exist = Users.query.filter_by(email=rep_email).first()

        logging.info('Sar create Post Method Exiting')

        if user_exist or email_exist is not None:
            return wrapper.wrapper('response', "User Already Exist.", 500), 500

        elif rep_exist or rep_email_exist is not None:
            return wrapper.wrapper('response', "Representative Already Exist.", 500), 500

        else:
            try:
                if representative != "":
                    logging.info('Sar create Post Method none representative start')
                    # For user
                    user_type = UserType.EXTERNALUSER
                    user_group = GroupName.GROUP2
                    model_user = Users(data['user'], confirmed=False, token=token, user_type=user_type,
                                       user_group=user_group)
                    addr = Address(data['user']['address'])
                    model_user.address.append(addr)
                    try:
                        db.session.add(model_user)
                        db.session.commit()
                    except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                        db.session.rollback()
                    # login_url = 'http://localhost:3000'

                    # For representative
                    token_rep = uuid.uuid4()
                    user_type = UserType.REPRESENTATIVE
                    rep = Users(data['representative'], confirmed=False, token=token_rep, user_type=user_type,
                                user_group=user_group)
                    rep_addr = Address(data['representative']['address'])
                    rep.address.append(rep_addr)
                    try:
                        db.session.add(rep)
                        db.session.commit()
                    except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                        db.session.rollback()

                    sar_details = {
                        'otherInfo': data['otherInfo'],
                        'info_requested': data['info_requested'],
                        'externalUser': data['user']['name'],
                        'representative': data['representative']['name'],
                        'assignedTo': 1,
                        'sarDescription': data['info_requested'],
                        'status': SAR_STATUS.OPEN,
                        'created_by': None,
                        'modified_by': None,
                        'isEscalated': False,
                        'priority': 'Medium',
                        'user_id': model_user.id
                    }
                    sar = Sar(sar_details)
                    try:
                        db.session.add(sar)
                        db.session.commit()
                    except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                        db.session.rollback()
                    sar_id = str(sar.id)
                    activate_url_user = 'http://'+BaseConfig.SERVICE_URL+'/sar/active/user/' + sar_id
                    activate_url_rep = 'http://'+BaseConfig.SERVICE_URL+'/sar/active/representative/' + sar_id
                    # activate_url_user = 'http://localhost:5000/sar/active/user/' + sar_id
                    # activate_url_rep = 'http://localhost:5000/sar/active/representative/' + sar_id

                    confirm_url = url_for('user.confirm_email', token=token, _external=True)
                    html = render_template('sar-Active.html', confirm_url=confirm_url, name=data['user']['name'],
                                           activate_url=activate_url_user, company=current_app.config['DEFAULT_COMPANY_NAME'])
                    subject = "Please confirm your email"
                    sendMail(subject, data['user']['email'], html)
                    # send_mail.send_email(data['user']['email'], subject, html)

                    confirm_url = url_for('user.confirm_email', token=token_rep, _external=True)
                    html = render_template('sar-Active.html', confirm_url=confirm_url, name=data['representative']['name'],
                                           activate_url=activate_url_rep, company=current_app.config['DEFAULT_COMPANY_NAME'])
                    subject = "Please confirm your email"
                    sendMail(subject, data['representative']['email'], html)
                    # send_mail.send_email(data['representative']['email'], subject, html)

                    data = {
                        'sar_id': sar.id
                    }
                    logging.info('Sar create Post Method none representative Exiting')

                    return wrapper.wrapper(data, "SAR Created successfully.", 201), 201
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                return wrapper.wrapper(None, e.message, 500), 500

            else:
                try:
                    logging.info('Sar create Post Method representative start')
                    # For user
                    token_user = uuid.uuid4()
                    user_type = UserType.EXTERNALUSER
                    user_group = GroupName.GROUP2
                    model_user = Users(data['user'], confirmed=False, token=token_user, user_type=user_type,
                                       user_group=user_group)
                    addr = Address(data['user']['address'])
                    model_user.address.append(addr)
                    try:
                        db.session.add(model_user)
                        db.session.commit()
                    except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                        db.session.rollback()

                    sar_details = {
                        'otherInfo': data['otherInfo'],
                        'info_requested': data['info_requested'],
                        'externalUser': data['user']['name'],
                        'representative': data['representative']['name'],
                        'assignedTo': 1,
                        'sarDescription': data['info_requested'],
                        'status': SAR_STATUS.OPEN,
                        'created_by': None,
                        'modified_by': None,
                        'isEscalated': False,
                        'priority': 'Medium',
                        'user_id': model_user.id
                    }
                    sar = Sar(sar_details)
                    try:
                        db.session.add(sar)
                        db.session.commit()
                    except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                        db.session.rollback()
                    sar_id = str(sar.id)
                    activate_url_user = 'http://'+BaseConfig.SERVICE_URL+'/sar/active/user/' + sar_id
                    # activate_url_user = 'http://localhost:5000/sar/active/user/' + sar_id

                    confirm_url = url_for('user.confirm_email', token=token_user, _external=True)
                    html = render_template('sar-Active.html', confirm_url=confirm_url, name=data['user']['name'],
                                           activate_url=activate_url_user, company=current_app.config['DEFAULT_COMPANY_NAME'])
                    subject = "Please confirm your email"
                    sendMail(subject, data['user']['email'], html)
                    # send_mail.send_email(data['user']['email'], subject, html)

                    data = {
                        'sar_id': sar.id
                    }
                    logging.info('Sar create Post Method representative Exiting')
                    return wrapper.wrapper(data, "SAR Created successfully.", 201), 201
                except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                    logging.info('Sar create Post Method representative Exiting')
                    return wrapper.wrapper(None, e.message, 500), 500




@sar_blueprint.route('/sar/create/new/<user_id>', methods=['POST'])
#@jwt_required
def create_new_sar(user_id):
    logging.info('create new sar Post Method start')
    data = request.json

    user = Users.query.filter_by(id=user_id).first()
    sar_details = {
        'otherInfo': data['otherInfo'],
        'info_requested': data['info_requested'],
        'externalUser': user.name,
        'representative': data['representative']['name'],
        'assignedTo': 1,
        'sarDescription': data['info_requested'],
        'status': SAR_STATUS.OPEN,
        'created_by': None,
        'modified_by': None,
        'isEscalated': False,
        'priority': 'Medium',
        'user_id': user_id
    }
    sar = Sar(sar_details)
    try:
        db.session.add(sar)
        db.session.commit()
    except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
        db.session.rollback()
    sar_id = str(sar.id)
    activate_url_user = 'http://' + BaseConfig.SERVICE_URL + '/sar/active/user/' + sar_id
    # activate_url_user = 'http://localhost:5000/sar/active/user/' + sar_id
    html = render_template('sar-Active.html', name=user.name,
                           activate_url=activate_url_user, company=current_app.config['DEFAULT_COMPANY_NAME'])
    subject = "Please Activate your SAR"
    sendMail(subject, user.email, html)
    # send_mail.send_email(data['user']['email'], subject, html)

    data = {
        'sar_id': sar.id
    }
    logging.info('create new sar Post Method Exiting')
    return wrapper.wrapper(data, "SAR Created successfully.", 201), 201



@sar_blueprint.route('/sar/getall/<user_id>', methods=['GET'])
@jwt_required
# @jwt_required
def get_all_sar(user_id):
    logging.info('get all sar Method start')
    jwt_data = get_jwt()
    user_group = jwt_data['identity']
    #user_type = request.headers.get('user_type')
    if not user_group:
        logging.info('get all sar Method Exiting')
        return wrapper.wrapper("No data", "Invalid user", 200)
    else:
        data = get_sar_service(user_group,user_id)
        logging.info('get all sar Method Exiting')
        return wrapper.wrapper(jsonify(data), "Getting all sar by user id.", 200)


@sar_blueprint.route('/sar/<int:id>', methods=['GET', 'PUT'])
@jwt_required
def get_sar(id):
    jwt_data = get_jwt()
    # if jwt_data['identity'] != 'Group1':
    #     return jsonify(msg="Permission denied"), 403
    sar = Sar.query.filter_by(id=id).first()

    if request.method == 'GET':
        logging.info('get sar Method start')
        if sar is not None:
            #sar_data = []
            sar_data = {
                "sar": sar.to_dict(),
                'assignedTO': sar.__dict__['assignedTO'].to_dict()
            }
            #sar_data.append(json)
            logging.info('get sar Method Exiting')
            return wrapper.wrapper(sar_data, "Get sar by id.", 200)
        else:
            logging.info('get sar Method Exiting')
            return wrapper.wrapper("No data", "SAR not found.", 200)

    if request.method == 'PUT':
        logging.info('put sar Method start')
        update_sar = request.json
        sar.assignedTo = update_sar['assignedTo']
        sar.otherInfo = update_sar['otherInfo']
        sar.sarDescription = update_sar['sarDescription']
        sar.externalUser = update_sar['externalUser']
        sar.representative = update_sar['representative']
        sar.status = update_sar['status']
        sar.modification_time = datetime.datetime.now()
        try:
            db.session.commit()

            # Storing data in audit table
            log_audit("Update SAR", "Update SAR", "SAR", None, None, sar.user_id, datetime.datetime.now())

            logging.info('put sar Method Exiting')
            return wrapper.wrapper("Update SAR", "SAR updated successfully.", 200)
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('put sar Method Exiting')
            db.session.rollback()
            return wrapper.wrapper(None, e.message, 500), 500


@sar_blueprint.route('/sar/activate/<int:id>', methods=['GET', 'PUT'])
#@jwt_required
def activate_sar(id):
    data = request.json
    if request.method == 'PUT':
        logging.info('put sar activate Method start')
        sar = Sar.query.filter_by(id=id).first()
        user = Users.query.filter_by(id=data['user_id']).first()
        sar.status = data['status']
        sar.modification_time = datetime.datetime.now()
        try:
            db.session.commit()
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            db.session.rollback()
        # Storing data in audit table
        log_audit("Activate SAR", "Activate SAR", "SAR", sar.user_id, datetime.datetime.now(), user.name, None)
        # storing data in history table
        log_history(sar.id, "status", "Open", "Active", sar.user_id, datetime.datetime.now(), user.name, None)
        link = current_app.config['BASE_URL'] + 'sar/' + str(sar.id)
        mail_tempate = render_template('sar-acceptance.html', name=user.name, company=current_app.config['DEFAULT_COMPANY_NAME'],
                                       ticketID=sar.id, status='Active', link=link)
        # send_email(user.email, "SAR Request accepted", mail_tempate)
        sendMail("SAR Request accepted", user.email, mail_tempate)
        logging.info('put sar activate Method Exiting')
        return wrapper.wrapper("SAR Activate", "SAR Request accepted successfully.", 200)


@sar_blueprint.route('/sar/reject/<int:id>', methods=['GET', 'PUT'])
@jwt_required
def reject_sar(id):
    data = request.json
    if request.method == 'PUT':
        logging.info('put sar reject Method start')
        sar = Sar.query.filter_by(id=id).first()
        userId = sar.user_id
        user = Users.query.filter_by(id=userId).first()
        sar.status = data['status']
        sar.modification_time = datetime.datetime.now()
        try:
            db.session.commit()

            # Storing data in audit table
            log_audit("Reject SAR", "Reject SAR", "SAR", sar.user_id, datetime.datetime.now(), None, None)
            # storing data in history table
            log_history(sar.id, "status", "Open", "Reject", sar.user_id, datetime.datetime.now(), user.name, None)

            mail_tempate = render_template('rejection-of-sar.html', name=user.name, company=current_app.config['DEFAULT_COMPANY_NAME'],
                                           ticketID=sar.id)
            sendMail("SAR Request rejected", user.email, mail_tempate)
            # send_email(user.email, "SAR Request rejected", mail_tempate)
            logging.info('put sar reject Method Exiting')
            return wrapper.wrapper("SAR Reject", "SAR Request rejected.", 200)
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('put sar reject Method Exiting')
            db.session.rollback()
            return wrapper.wrapper(None, e.message, 500), 500


@sar_blueprint.route('/sar/assign/<int:id>', methods=['GET', 'PUT'])
@jwt_required
def assign_sar(id):
    data = request.json
    if request.method == 'PUT':
        logging.info('put sar assign Method start')
        sar = Sar.query.filter_by(id=id).first()
        user = Users.query.filter_by(id=sar.user_id).first()
        # storing data in history table
        log_history(sar.id, "assignedTo", sar.assignedTo, data['assignedTo'], sar.user_id, datetime.datetime.now(),user.name, None)

        sar.assignedTo = data['assignedTo']
        sar.status=SAR_STATUS.INPROGRESS
        sar.modification_time = datetime.datetime.now()
        try:
            db.session.commit()

            # Storing data in audit table
            log_audit("Assign SAR", "Assign SAR", "SAR", sar.user_id, datetime.datetime.now(), None, None)
            now = datetime.datetime.now()
            date = now.date()
            user = Users.query.filter_by(id=sar.assignedTo).first()
            mail_tempate = render_template('sar-notification.html', name=user.name, status='Open',
                                           company=current_app.config['DEFAULT_COMPANY_NAME'], ticketID=sar.id, date=date)
            sendMail("SAR Assign", user.email, mail_tempate)
            # send_email(user.email, "SAR Assigned to you", mail_tempate)
            logging.info('put sar assign Method Exiting')
            return wrapper.wrapper("SAR Assign", "SAR Request assigned successfully.", 200)
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('put sar assign Method Exiting')
            db.session.rollback()
            return wrapper.wrapper(None, e.message, 500), 500


@sar_blueprint.route('/sar/tickets/<int:sar_id>', methods=['POST'])
@jwt_required
def generate_sub_tickets(sar_id):
    logging.info('post sar ticket Method start')
    data = request.json
    dep = data['departments']

    for d in dep:
        tic_all = Ticket.query.all()
        id = None
        if tic_all:
            id = tic_all[-1].id + 1
        else:
            id = 1
        ticket = Ticket(data['ticket'], id, sar_id)
        try:
            db.session.add(ticket)
            db.session.commit()
            data = {
                'ticket':id,
                'sar_id':sar_id,
                'department_id': d['id']
            }
            ticket_info = TicketInfo(data)
            try:
                db.session.add(ticket_info)
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()

            sar = Sar.query.filter_by(id=sar_id).first()
            user = Users.query.filter_by(id=sar.user_id).first()
            # Storing data in audit table
            log_audit("Ticket created against SAR", "Ticket created against SAR", "SAR", sar.user_id,
                      datetime.datetime.now(), None, None)
            now = datetime.datetime.now()
            date = now.date()
            mail_tempate = render_template('sar-notification.html', name=user.name, status='Open',
                                           company=current_app.config['DEFAULT_COMPANY_NAME'], ticketID=ticket.id, date=date)
            sendMail("SAR Assigned to you", d['defaultAssignedEmailId'], mail_tempate)
            # send_email(d['defaultAssignedEmailId'], "SAR Assigned to you", mail_tempate)
            logging.info('post sar ticket Method Exiting')
            return wrapper.wrapper("Creating tickets", "Tickets created successfully.", 200)
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('post sar ticket Method Exiting')
            db.session.rollback()
            return wrapper.wrapper(None, e.message, 500), 500


@sar_blueprint.route('/sar/close/<int:id>', methods=['GET', 'PUT'])
@jwt_required
def complete_sar(id):
    data = request.json
    dep = data['departments']

    if request.method == 'PUT':
        logging.info('put sar ticket Method start')
        sar = Sar.query.filter_by(id=id).first()
        sar.status = SAR_STATUS.CLOSED
        sar.completionTime = datetime.datetime.now()
        sar.modification_time = datetime.datetime.now()
        user = Users.query.filter_by(id=sar.user_id).first()
        try:
            db.session.commit()

            # Storing data in audit table
            log_audit("Complete SAR", "Complete SAR", "SAR", sar.user_id,
                      datetime.datetime.now(), None, None)

            # storing data in history table
            log_history(sar.id, "status", "Active", "Closed", sar.user_id, datetime.datetime.now(), user.name, None)

            member_id = sar.assignedTo
            user = Users.query.filter_by(id=member_id).first()
            now = datetime.datetime.now()
            date = now.date()
            mail_tempate = render_template('closure-of-sar.html', name=user.name, status=sar.status,
                            company=current_app.config['DEFAULT_COMPANY_NAME'], ticketID=sar.id, date=date, priority=sar.priority)
            sendMail("Your SAR closed successfully", user.email, mail_tempate)
            # send_email(user_email, "Your SAR closed successfully", mail_tempate)
            #
            mail_tempate = render_template('sar-notification.html')
            sendMail("SAR closed successfully", dep['defaultAssignedEmailId'], mail_tempate)
            # send_email(dep['defaultAssignedEmailId'], "SAR closed successfully", mail_tempate)
            logging.info('put sar ticket Method Exiting')
            return wrapper.wrapper("SAR Complete", "SAR closed successfully.", 200)
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('put sar ticket Method Exiting')
            db.session.rollback()
            return wrapper.wrapper(None, e.message, 500), 500


@sar_blueprint.route('/sar/active/user/<int:id>', methods=['GET'])
#@jwt_required
def active_sar_user(id):
    logging.info('get sar active user Method start')
    sar = Sar.query.filter_by(id=id).first()
    user = Users.query.filter_by(id=sar.user_id).first()

    if sar is not None:
        if sar.representative == 'None':
            sar.status = SAR_STATUS.ACTIVE
            sar.user_confirmed = 'Y'
            try:
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            # Storing data in audit table
            log_audit("Open SAR", "Active SAR", "SAR", sar.user_id,
                      datetime.datetime.now(), None, None)
            # storing data in history table
            log_history(sar.id, "status", "Open", "Active", sar.user_id, datetime.datetime.now(), user.name, None)
            logging.info('get sar active user Method Exiting')
            return render_template('sar-Response.html',SAR_response='SAR Activated Sucessfully!')
        else:
            if sar.rep_confirmed == 'Y':
                sar.status = SAR_STATUS.ACTIVE
                sar.user_confirmed = 'Y'
                try:
                    db.session.commit()
                except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                    db.session.rollback()
                # Storing data in audit table
                log_audit("Open SAR", "Active SAR", "SAR", sar.user_id,
                          datetime.datetime.now(), None, None)
                # storing data in history table
                log_history(sar.id, "status", "Open", "Active", sar.user_id, datetime.datetime.now(), user.name, None)
                logging.info('get sar active user Method Exiting')
                return render_template('sar-Response.html',SAR_response='SAR Activated Sucessfully!')
            else:
                sar.user_confirmed = 'Y'
                try:
                    db.session.commit()
                except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                    db.session.rollback()
                logging.info('get sar active user Method Exiting')
                return render_template('sar-Response.html',SAR_response='SAR Activated Sucessfully!')

    else:
        logging.info('get sar active user Method Exiting')
        return render_template('sar-Response.html',SAR_response='You Have No SAR YET!')


@sar_blueprint.route('/sar/active/representative/<int:id>', methods=['GET'])
#@jwt_required
def active_sar_rep(id):
    logging.info('get sar active representative Method start')
    sar = Sar.query.filter_by(id=id).first()
    user=Users.query.filter_by(id=sar.user_id).first()
    SAR_Reponse = None
    if sar is not None:
        if sar.user_confirmed == 'Y':

            sar.status = SAR_STATUS.ACTIVE
            sar.rep_confirmed = 'Y'
            try:
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            # Storing data in audit table
            log_audit("Open SAR", "Active SAR", "SAR", sar.user_id,
                      datetime.datetime.now(), None, None)
            # storing data in history table
            log_history(sar.id, "status", "Open", "Active", sar.user_id, datetime.datetime.now(), user.name, None)
            logging.info('get sar active representative Method Exiting')
            return render_template('sar-Response.html', SAR_response='SAR Activated Sucessfully!')
        else:
            sar.rep_confirmed = 'Y'
            try:
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            logging.info('get sar active representative Method Exiting')
            return render_template('sar-Response.html', SAR_response='SAR Activated Sucessfully!')

    else:
        logging.info('get sar active representative Method Exiting')
        return render_template('sar-Response.html',SAR_response='You Have No SAR YET!')


@sar_blueprint.route('/sar/reopen/<int:id>', methods=['PUT'])
@jwt_required
def reopen_sar(id):
    logging.info('get sar reopen Method start')
    data=request.json
    delay = datetime.datetime.now() + datetime.timedelta(days=30)
    sar = Sar.query.filter_by(id=id).first()
    user = Users.query.filter_by(id=sar.user_id).first()

    if sar.completionTime <= delay:
        sar.status = SAR_STATUS.REOPENED
        sar.modification_time = datetime.datetime.now()
        try:
            db.session.commit()
            # Storing data in audit table
            log_audit("Reopen SAR", "Reopen SAR", "SAR", sar.user_id,
                      datetime.datetime.now(), None, None)
            # storing data in history table
            log_history(sar.id, "status", "Closed", "ReOpened", sar.user_id, datetime.datetime.now(), user.name, None)
            logging.info('get sar reopen Method Exiting')
            return wrapper.wrapper("SAR Reopen", "SAR Reopned successfully.", 200)
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('get sar reopen Method Exiting')
            db.session.rollback()
            return wrapper.wrapper(None, e.message, 500), 500
    else:
        logging.info('get sar reopen Method Exiting')
        return wrapper.wrapper("Expired", "Your SAR expired.", 200)


@sar_blueprint.route('/sar/history/<int:sar_id>', methods=['GET'])
@jwt_required
def get_sarHistory_sar_id(sar_id):
    logging.info('get sar history Method start')
    if request.method == 'GET':
        get_sar = History.query.filter_by(sar_id=sar_id).all()
        all_sar = []
        for sar in get_sar:
            all_sar.append(sar.to_dict())
        logging.info('get sar history Method Exiting')
        return wrapper.wrapper(all_sar, "Getting all SAR_History", 200)

@sar_blueprint.route('/sar/upload', methods=['GET', 'POST'])
# @jwt_required
def upload_file():

    if request.method == 'POST':
        logging.info('post sar Upload Method start')
        # check if the post request has the file part
        if 'file' not in request.files:
            # flash('No file part')
            return "No file part"
        # file = request.files['file']
        fromUser = request.form['user']
        # toUser = request.form['rep']
        sar_id = request.form['sar_id']
        responsetext = request.form['responsetext']
        data = {
            'fromUser': fromUser,
            'toUser': None,
            'responseText': responsetext
        }
        uploaded_files = request.files.getlist("file")
        for docs in uploaded_files:
            # file_size = os.stat(docs).st_size
            if docs.filename == '':
                print('No selected file')
                # return "No selected file"
            if docs and allowed_file(docs.filename):
                filename = secure_filename(docs.filename)
                url_for_file = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                docs.save(url_for_file)
                size = os.stat(url_for_file).st_size
                response = SARResponse(data, sar_id)
                uploadFile = sar_attachment(docs.filename, url_for_file)
                response.sarattachment.append(uploadFile)
                try:
                    db.session.add(response)
                    db.session.commit()
                except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                    db.session.rollback()
    logging.info('post sar Upload Method Exiting')
    return wrapper.wrapper("SAR Attachment", "File uploaded successfully.", 200), 200

@sar_blueprint.route('/sar/escalate/<int:sar_id>', methods=['GET', 'PUT'])
@jwt_required
def escalate_sar(id):
    data = request.json
    if request.method == 'PUT':
        logging.info('put sar escalate Method start')
        sar = Sar.query.filter_by(id=id).first()
        userId = sar.user_id
        user = Users.query.filter_by(id=userId).first()
        sar.isEscalated = data['isEscalated']
        sar.modification_time = datetime.datetime.now()
        try:
            db.session.commit()
            # Storing data in audit table
            log_audit("Escalate SAR", "Escalate SAR", "SAR", sar.user_id,
                      datetime.datetime.now(), None, None)

            # storing data in history table
            log_history(sar.id, "status", "Active", "Escalated", sar.user_id, datetime.datetime.now(), user.name, None)
            link = current_app.config['BASE_URL'] + 'sar/' + str(sar.id)
            mail_tempate = render_template('sar-escalation.html', name=user.name, company=current_app.config['DEFAULT_COMPANY_NAME'],
                                           ticketID=sar.id, link=link, priority=sar.priority, status='Escalated')
            sendMail("SAR escalated", user.email, mail_tempate)
            # send_email(user.email, "SAR escalated", mail_tempate)
            logging.info('put sar escalate Method exiting')
            return wrapper.wrapper("SAR Escalated", "Your SAR is escalated.", 200)
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('put sar escalate Method exiting')
            db.session.rollback()
            return wrapper.wrapper(None, e.message, 500), 500


@sar_blueprint.route('/sar/escalate-down/<int:id>', methods=['GET', 'PUT'])
@jwt_required
def escalate_down_sar(id):
    data = request.json
    if request.method == 'PUT':
        logging.info('put sar escalate-down Method start')
        sar = Sar.query.filter_by(id=id).first()
        userId = sar.user_id
        user = Users.query.filter_by(id=userId).first()
        sar.isEscalated = data['isEscalated']
        sar.modification_time = datetime.datetime.now()
        try:
            db.session.commit()
            link = current_app.config['BASE_URL'] + 'sar/' + str(sar.id)
            mail_tempate = render_template('sar-escalation.html', name=user.name, company=current_app.config['DEFAULT_COMPANY_NAME'],
                                           ticketID=sar.id, link=link, status='Escalated Down')
            sendMail("SAR escalated", user.email, mail_tempate)
            # send_email(user.email, "SAR escalated", mail_tempate)
            logging.info('put sar escalate-down Method exiting')
            return wrapper.wrapper("SAR Escalated down", "Your SAR escalated down successfully.", 200)
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('put sar escalate-down Method exiting')
            return wrapper.wrapper(None, e.message, 500), 500


@sar_blueprint.route('/sar/download/<path:filename>', methods=['GET', 'POST'])
# @jwt_required
def download(filename):
    logging.info('sar download Method start')
    uploads = os.path.join(current_app.root_path, current_app.config['UPLOAD_FOLDER'])
    logging.info('sar download Method Exiting')
    return send_from_directory(directory=uploads, filename=filename)


@sar_blueprint.route('/sar/get_by_status/<int:user_id>', methods=['GET'])
@jwt_required
def get_sar_by_status(user_id):
    logging.info('get sar get_by_status Method')
    filtered_sar = Sar.query.filter_by(status='Active').filter_by(user_id=user_id).all()
    if filtered_sar:
        all_sar = []
        for sar in filtered_sar:
            # for tic in sar.ticketinfo.all():
            #     for dep in tic.department.all():
            #         print("Inside address--->", dep.name)
            all_sar.append(sar.to_dict())
            logging.info('get sar get_by_status Method Exiting')
        return wrapper.wrapper(jsonify(all_sar), "Get SAR by status and user.", 200)
    else:
        logging.info('get sar get_by_status Method Exiting')
        return wrapper.wrapper("SAR not found.", "No SAR found for the user.", 200)


@sar_blueprint.route('/sar/page/<int:page>', methods=['GET'])
@jwt_required
def get_sar_by_page(page):
    per_page = 10
    if request.method == 'GET':
        logging.info('get sar page Method')
        get_sar = Sar.query.paginate(page, per_page, False, 20)
        # print("get_sar----->",get_sar.items)
        # print("Type--->", type(get_sar.items))
        all_sar = []
        for sar in get_sar.items:
            json = {
                "sar": sar.to_dict(),
                'user': sar.__dict__['user'].to_dict(),
                'assignedTO': sar.__dict__['assignedTO'].to_dict()
            }
            all_sar.append(json)

        pagination_data = {
            'has_next': get_sar.has_next,
            'pages': get_sar.pages,
            'has_prev': get_sar.has_prev,
            'total': get_sar.total,
            'page': get_sar.page,
            'next_num': get_sar.next_num,
            'sar': all_sar
        }
        logging.info('get sar page Method Exiting')
        return wrapper.wrapper(pagination_data, "Getting all SAR", 200)


@sar_blueprint.route('/sar/page_count/<int:page>/<int:count>', methods=['GET'])
@jwt_required
def get_sar_by_page_count(page,count):
    per_page = count
    if request.method == 'GET':
        logging.info('get sar page_count Method')
        get_sar = Sar.query.paginate(page, per_page, False, 20)
        # print("get_sar----->",get_sar.items)
        # print("Type--->", type(get_sar.items))
        all_sar = []
        for sar in get_sar.items:
            json = {
                "sar" :sar.to_dict(),
                'user': sar.__dict__['user'].to_dict(),
                'assignedTO': sar.__dict__['assignedTO'].to_dict()
            }
            all_sar.append(json)
        pagination_data = {
            'has_next': get_sar.has_next,
            'pages': get_sar.pages,
            'has_prev': get_sar.has_prev,
            'total': get_sar.total,
            'page': get_sar.page,
            'next_num': get_sar.next_num,
            'sar': all_sar

        }
        logging.info('get sar page_count Method Exiting')
        return wrapper.wrapper(pagination_data, "Getting all SAR", 200)

@sar_blueprint.route('/sarbyuser/page_count/<int:user_id>/<int:page>/<int:count>', methods=['GET'])
@jwt_required
def get_sarbyuser_page_count(page,count,user_id):
    logging.info('get sar user by page_count Method')
    per_page = count
    if request.method == 'GET':
        # get_sar = Sar.query.paginate(page, per_page, False, 20)
        get_sar = Sar.query.filter_by(user_id = user_id).paginate(page,per_page, False, 20)
        all_sar = []
        for sar in get_sar.items:
            json = {
                "sar": sar.to_dict(),
                'user': sar.__dict__['user'].to_dict(),
                'assignedTO': sar.__dict__['assignedTO'].to_dict()
            }
            all_sar.append(json)
        pagination_data = {
            'has_next': get_sar.has_next,
            'pages': get_sar.pages,
            'has_prev': get_sar.has_prev,
            'total': get_sar.total,
            'page': get_sar.page,
            'next_num': get_sar.next_num,
            'sar': all_sar

        }
        logging.info('Exiting get sar user by page_count Method')
        return wrapper.wrapper(pagination_data, "Getting all SAR by UserId", 200)



@sar_blueprint.route('/sarbyAssign/page_count/<int:assignedTo>/<int:page>/<int:count>', methods=['GET'])
@jwt_required
def get_sarbyAssign_page_count(page,count,assignedTo):
    logging.info('get sar user by page_count Method')
    per_page = count
    if request.method == 'GET':
        # get_sar = Sar.query.paginate(page, per_page, False, 20)
        get_sar = Sar.query.filter_by(assignedTo = assignedTo).paginate(page,per_page, False, 20)
        all_sar = []
        for sar in get_sar.items:
            json = {
                "sar": sar.to_dict(),
                'user': sar.__dict__['user'].to_dict(),
                'assignedTO': sar.__dict__['assignedTO'].to_dict()
            }
            all_sar.append(json)
        pagination_data = {
            'has_next': get_sar.has_next,
            'pages': get_sar.pages,
            'has_prev': get_sar.has_prev,
            'total': get_sar.total,
            'page': get_sar.page,
            'next_num': get_sar.next_num,
            'sar': all_sar

        }
        logging.info('Exiting get sar user by page_count Method')
        return wrapper.wrapper(pagination_data, "Getting all SAR by assignedTO", 200)


@sar_blueprint.route('/repressar/page_count/<string:representative>/<int:page>/<int:count>', methods=['GET'])
@jwt_required
def get_sarforrepres_page_count(page,count,representative):
    logging.info('get repressar user by page_count Method')
    per_page = count
    if request.method == 'GET':
        # get_sar = Sar.query.paginate(page, per_page, False, 20)
        get_sar = Sar.query.filter_by(representative = representative).paginate(page,per_page, False, 20)
        all_sar = []
        for sar in get_sar.items:
            json = {
                "sar": sar.to_dict(),
                'user': sar.__dict__['user'].to_dict(),
                'assignedTO': sar.__dict__['assignedTO'].to_dict()
            }
            all_sar.append(json)
        pagination_data = {
            'has_next': get_sar.has_next,
            'pages': get_sar.pages,
            'has_prev': get_sar.has_prev,
            'total': get_sar.total,
            'page': get_sar.page,
            'next_num': get_sar.next_num,
            'sar': all_sar

        }
        logging.info('Exiting get repressar user by page_count Method')
        return wrapper.wrapper(pagination_data, "Getting all SAR by UserId", 200)


@sar_blueprint.route('/exusersar/page_count/<string:externalUser>/<int:page>/<int:count>', methods=['GET'])
@jwt_required
def get_sarforexuser_page_count(page,count,externalUser):
    logging.info('get exusersar user by page_count Method')
    per_page = count
    if request.method == 'GET':
        # get_sar = Sar.query.paginate(page, per_page, False, 20)
        get_sar = Sar.query.filter_by(externalUser = externalUser).paginate(page,per_page, False, 20)
        all_sar = []
        for sar in get_sar.items:
            json = {
                "sar": sar.to_dict(),
                'user': sar.__dict__['user'].to_dict(),
                'assignedTO': sar.__dict__['assignedTO'].to_dict()
            }
            all_sar.append(json)
        pagination_data = {
            'has_next': get_sar.has_next,
            'pages': get_sar.pages,
            'has_prev': get_sar.has_prev,
            'total': get_sar.total,
            'page': get_sar.page,
            'next_num': get_sar.next_num,
            'sar': all_sar

        }
        logging.info('Exiting get exusersar user by page_count Method')
        return wrapper.wrapper(pagination_data, "Getting all SAR by UserId", 200)
		
		
@sar_blueprint.route('/sar/response/<int:sar_id>', methods=['GET'])
@jwt_required
def get_response_by_sarid(sar_id):
    logging.info('get sar response Method')
    if request.method == 'GET':
        all_response = []
        att = None
        try:
            response = SARResponse.query.filter_by(sar_id=sar_id).all()
            for r in response:
                print("the data id ---->",r.id)
                attachment = sar_attachment.query.filter_by(sarresponse_id=r.id).all()
                if len(attachment) >= 1:
                   for i in attachment:
                      print("the data ----->",i.to_dict())
                      att = {
                        'fileName': i.fileName,
                        'sarresponse_id': i.sarresponse_id,
                        'id': i.id,
                        'documentLink': i.documentLink
                      }
                else:
                    att = {
                        'fileName': None,
                        'sarresponse_id': None,
                        'id': None,
                        'documentLink': None
                    }

                res = {
                    'fromUser': r.fromUser,
                    'toUser': r.toUser,
                    'sar_id': r.sar_id,
                    'id': r.id,
                    'responseText': r.responseText,
                    'user_id': r.user_id,
                    'user_name': r.user_name,
                    'sar_attachment': att
                }
                all_response.append(res)
                att = {
                    'fileName': None,
                    'sarresponse_id': None,
                    'id': None,
                    'documentLink': None
                }
            logging.info('Exiting get sar response Method')
            return wrapper.wrapper(all_response, "Getting SAR Response by sar id.", 200), 200
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('Exiting get sar response Method')
            return wrapper.wrapper(None, e.message, 500), 500


@sar_blueprint.route('/sar/user/<int:user_id>', methods=['GET'])
@jwt_required
def get_sar_by_userid(user_id):
    logging.info('get sar user Method')
    if request.method == 'GET':
        get_sar = Sar.query.filter_by(user_id=user_id).all()
        all_sar = []
        for sar in get_sar:
            all_sar.append(sar.to_dict())
            logging.info('Exiting get sar user Method')
        return wrapper.wrapper(all_sar, "Getting all SAR", 200)


@sar_blueprint.route('/sar/rep/<string:name>', methods=['GET'])
@jwt_required
def get_sar_by_rep(name):
    logging.info('get sar rep user Method')
    if request.method == 'GET':
        get_sar = Sar.query.filter_by(representative=name).all()
        all_sar = []
        for sar in get_sar:
            all_sar.append(sar.to_dict())
        logging.info('Exiting get sar rep user Method')
        return wrapper.wrapper(all_sar, "Getting all SAR by representative.", 200)


@sar_blueprint.route('/sar/user/<int:assignedTo>', methods=['GET'])
@jwt_required
def get_sar_by_assignedTo(assignedTo):
    logging.info('get sar assignedTo user Method')
    if request.method == 'GET':
        get_sar = Sar.query.filter_by(assignedTo=assignedTo).all()
        all_sar = []
        for sar in get_sar:
            all_sar.append(sar.to_dict())
        logging.info('Exiting get sar assignedTo user Method')
        return wrapper.wrapper(all_sar, "Getting all SAR", 200)


@sar_blueprint.route('/sar/priority/<int:sar_id>', methods=['POST'])
@jwt_required
def change_priority(sar_id):
    logging.info('get sar priority user Method')
    data = request.json
    try:
        sar = Sar.query.filter_by(id=sar_id).first()
        user = Users.query.filter_by(id=sar.user_id).first()
        log_history(sar.id, "Priority", sar.priority, data['priority'], sar.user_id, datetime.datetime.now(), user.name,None)
        sar.priority = data['priority']
        sar.modification_time = datetime.datetime.now()
        try:
            db.session.commit()
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            db.session.rollback()
        logging.info('Exiting get sar priority user Method')
        return wrapper.wrapper(sar.to_dict(), "Priority changed successfully.", 200)
    except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('Exiting get sar priority user Method')
            return wrapper.wrapper(None, e.message, 500), 500
    logging.info('Exiting get sar priority user Method')
    return wrapper.wrapper(None, "Some error occured.", 500), 500


@sar_blueprint.route('/sar/escalate', methods=['GET'])
@jwt_required
def sar_getall_escalation():
    logging.info('get sar escalate Method')
    if request.method == 'GET':
        try:
            get_esc = Sar_escalation.query.all()
            all_esc = []

            copy_of_data = []
            the_right_to_information =[]
            lenght_data_was_held = []
            right_to_rectification = []
            right_to_erasure = []
            right_to_restrict_processing = []
            right_to_object = []
            right_not_to_be_evaluated = []
            the_right_to_bring_class_actions = []
            the_right_of_subject_acess = []

            for esc in get_esc:
                one = esc.escalation_data == "copy_of_data"
                copy_of_data.append(one)
                two = esc.escalation_data == "the_right_to_information"
                the_right_to_information.append(two)
                three = esc.escalation_data == "lenght_data_was_held"
                lenght_data_was_held.append(three)
                four = esc.escalation_data == "right_to_rectification"
                right_to_rectification.append(four)
                five = esc.escalation_data == "right_to_erasure"
                right_to_erasure.append(five)
                six = esc.escalation_data == "right_to_restrict_processing"
                right_to_restrict_processing.append(six)
                seven = esc.escalation_data == "right_to_object"
                right_to_object.append(seven)
                eight = esc.escalation_data == "right_not_to_be_evaluated"
                right_not_to_be_evaluated.append(eight)
                nine = esc.escalation_data == "the_right_to_bring_class_actions"
                the_right_to_bring_class_actions.append(nine)
                ten = esc.escalation_data == "the_right_of_subject_acess"
                the_right_of_subject_acess.append(ten)

            charJson={
                "copy_of_data" : copy_of_data.count(True),
                "the_right_to_information" : the_right_to_information.count(True),
                "lenght_data_was_held" : lenght_data_was_held.count(True),
                "right_to_rectification" : right_to_rectification.count(True),
                "right_to_erasure" : right_to_erasure.count(True),
                "right_to_restrict_processing" : right_to_restrict_processing.count(True),
                "right_to_object" : right_to_object.count(True),
                "right_not_to_be_evaluated" : right_not_to_be_evaluated.count(True),
                "the_right_to_bring_class_actions" : the_right_to_bring_class_actions.count(True),
                "the_right_of_subject_acess" : the_right_of_subject_acess.count(True)
             }
            logging.info('Exiting get sar escalate Method')
            return wrapper.wrapper(charJson, "Getting all SAR Escalation", 200)
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('Exiting get sar escalate Method')
            return wrapper.wrapper(None, e.message, 500), 500



@sar_blueprint.route('/sar/response/<int:sar_id>', methods=['POST'])
@jwt_required
def post_user_response(sar_id):
    logging.info('post sar response Method')
    data = request.json
    print("the data --->",data)
    try:
        sar_response = SARResponse(data,sar_id)
        # sar_response.responseText = data['responseText']
        # sar_response.user_id = data['user_id']
        # sar_response.user_name = data['user_name']
        try:
            db.session.add(sar_response)
            db.session.commit()
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            db.session.rollback()
        logging.info('Exiting post sar response Method')
        return wrapper.wrapper(sar_response.to_dict(), "Response Sent successfully", 200)
    except (sqlalchemy.exc.SQLAlchemyError,sqlalchemy.exc.DBAPIError) as e:
            logging.info('Exiting post sar response Method')
            return wrapper.wrapper(None, "some error occurred",500), 500


@sar_blueprint.route('/sar/escalate/<int:sar_id>', methods = ['POST'])
@jwt_required
def sar_escalation(sar_id):
    logging.info('post sar escalate Method')
    data = request.json
    escalation = SARResponse.query.filter_by(sar_id = sar_id).first()
    sar = Sar.query.filter_by(id=sar_id).first()
    sar.isEscalated = True
    try:
        db.session.add(sar)
        db.session.commit()
    except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
        db.session.rollback()
    for i in data['data']:
        escalation = Sar_escalation()
        escalation.escalation_data = i['escalation_data']
        escalation.sar_id = sar_id
        escalation.user_id = i['user_id']
        escalation.justify = i['justify']
        try:
            db.session.add(escalation)
            db.session.commit()
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            db.session.rollback()
    logging.info('Exiting post sar escalate Method')
    return wrapper.wrapper("Success" ,"Successfully filed",200)


@sar_blueprint.route('/')
def root():
    return render_template('main.html')


def log_audit(action, info, module, createBy, createTime, modifiy, modifyTime):
    # Storing data in audit table
    auditData = Audit()
    auditData.action = action
    auditData.info = info
    auditData.module = module
    auditData.modifiedBy = modifiy
    auditData.creationTime = createTime
    auditData.createdBy = createBy
    auditData.modificationTime = modifyTime
    audit_table.insert_audit(auditData)


def log_history(sar_id, fieldName, oldValue, newValue,createBy, createTime, modifiy, modifyTime):
    # Storing data in history table
    historyData = History()
    historyData.sar_id = sar_id
    historyData.fieldName = fieldName
    historyData.oldValue = oldValue
    historyData.newValue = newValue
    historyData.modifiedBy = modifiy
    historyData.creationTime = createTime
    historyData.createdBy = createBy
    historyData.modificationTime = modifyTime
    history_table.insert_history(historyData)


def sendMail(subject, receiverMail, content):
    mail_audit = MailAudit()
    mail_audit.email_content = content.encode('utf-8').strip()
    mail_audit.status = "yet_to_send"
    mail_audit.receiver_mail = receiverMail
    mail_audit.sender_mail = "compliancec2k18@gmail.com"
    mail_audit.subject = subject
    try:
        db.session.add(mail_audit)
        db.session.commit()
    except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
        db.session.rollback()