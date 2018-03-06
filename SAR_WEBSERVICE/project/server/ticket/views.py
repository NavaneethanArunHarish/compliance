# project/server/user/views.py
import datetime
import logging
import sqlalchemy
from flask import Blueprint, \
    request, make_response, jsonify, g, Flask, render_template ,current_app
from flask_jwt_extended import (
    create_access_token)
from flask_jwt_simple import (
    JWTManager, jwt_required, create_jwt, get_jwt_identity, get_jwt)
from flask_login import login_user
from flask_mail import Mail, Message
from project.server.sar.views import sendMail

from project.server.models.Sar import Sar

from project.server import db
from project.server.models.Ticket import Ticket
from project.server.models.TicketInfo import  TicketInfo
from project.server.sar.views import log_audit
from project.server.email import send_email
from project.server.models.User import Users

from project.server.wrapper import views as wrapper

app = Flask(__name__, template_folder='template')

ticket_blueprint = Blueprint('ticket', __name__)


@ticket_blueprint.route('/ticket', methods=['POST', 'GET'])
@jwt_required
def create_ticket():
    if request.method == 'POST':
        logging.info('post ticket method start')
        json_data = request.json
        logging.info('get ticket call db')
        tic = Ticket.query.all()
        a = []
        for t in tic:
            a.append(t.uid)
        maxuid = max(a)
        logging.info('get ticket db response')
        json_data['created_time'] = datetime.datetime.now()
        id = None
        if tic:
            id = maxuid + 1
        else:
            id = 1
        model_user = Ticket(json_data, id, json_data['sar_id'])

        try:
            db.session.add(model_user)
            db.session.commit()
            logged_user = 1
            # Storing data in audit table
            log_audit("Create Ticket", "Create Ticket", "SAR", logged_user, datetime.datetime.now(), None, None)
            data = {
                'ticket_id': model_user.id
            }
            logging.info('get ticket success exiting')
            return wrapper.wrapper(data, "Success", 201), 201
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.error('get ticket success exiting')
            db.session.rollback()
            return wrapper.wrapper(None, e.message, 500), 500

    if request.method == 'GET':
        logging.info('get ticket and db method start')
        get_users = Ticket.query.all()
        logging.info('get ticket and db call success')
        all_users = []
        for user in get_users:
            all_users.append(user.to_dict())
        logging.info('get ticket and Exiting')
        return wrapper.wrapper(all_users,None,200),200


@ticket_blueprint.route('/ticket-info', methods=['POST', 'GET'])
@jwt_required
def create_ticket_info():
    print("Entering method")
    if request.method == 'POST':
        logging.info('post ticket info and start')
        json_data = request.json
        logging.info('post ticket info db call')
        tic = TicketInfo.query.all()
        logging.info('post ticket info db response')
        a = []
        for t in tic:
            a.append(t.id)
        maxuid = max(a)
        id = None
        if tic:
            id = maxuid + 1
        else:
            id = 1
        model_user = TicketInfo(json_data, id)
       # model_user = TicketInfo(json_data)
        try:
            db.session.add(model_user)
            db.session.commit()
            logged_user = 1

            # Storing data in audit table
            log_audit("Create Ticket", "Create Ticket", "SAR", logged_user, datetime.datetime.now(), None, None)
            #print("ticket info ---->",)
            logging.info('post ticket info Exiting')
            return wrapper.wrapper(None, "Success", 201), 201
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.error('post ticket info Exiting')
            db.session.rollback()
            return wrapper.wrapper(None, e.message, 500), 500

    if request.method == 'GET':
        logging.info('get ticket info and db call')
        get_users = TicketInfo.query.all()
        logging.info('get ticket info and db call success')
        all_users = []
        for user in get_users:
            all_users.append(user.to_dict())
        logging.info('get ticket info Exiting')
        return wrapper.wrapper(all_users,None,200),200


@ticket_blueprint.route('/auth', methods=['POST'])
@jwt_required
def auth_user():
    logging.info('auth post info start')
    json_data = request.json
    email = json_data["email"]
    user = Ticket.query.filter_by(email=email).first()
    g.current_user = user
    login_user(user)
    if user is not None:
        # Identity can be any data that is json serializable
        access_token = create_access_token(identity=user.id)
        logging.info('auth post info Exit')
        return jsonify(access_token=access_token), 200
    else:
        logging.info('auth post info Exit')
        return wrapper.wrapper(None,"user not found",204), 204


@ticket_blueprint.route('/ticket/<int:id>', methods=['GET', 'DELETE', 'PUT'])
@jwt_required
def get_ticket(id):

    update_ticket = Ticket.query.filter_by(id=id).first()
    if request.method == 'GET':
        logging.info('get ticket start')
        if update_ticket is not None:
            user_data = update_ticket.to_dict()
            logging.info('get ticket start Exiting')
            return wrapper.wrapper(user_data,None,200), 200
        else:
            logging.info('get ticket start Exiting')
            return wrapper.wrapper(None,"user not found",204), 204

    if request.method == 'PUT':
        logging.info('put ticket start')
        up_ticket = request.get_json()
        update_ticket.summary = up_ticket['summary']
        update_ticket.description = up_ticket['description']
        update_ticket.type = up_ticket['type']
        update_ticket.component = up_ticket['component']
        update_ticket.severity = up_ticket['severity']
        update_ticket.priority = up_ticket['priority']
        update_ticket.owner = up_ticket['owner']
        update_ticket.reporter = up_ticket['reporter']
        update_ticket.cc = up_ticket['cc']
        update_ticket.version = up_ticket['version']
        update_ticket.milestone = up_ticket['milestone']
        update_ticket.status = up_ticket['status']
        update_ticket.resolution = up_ticket['resolution']
        update_ticket.keywords = up_ticket['keywords']
        update_ticket.product = up_ticket['product']
        update_ticket.modified_time = datetime.datetime.now()
        # db.session.add(user)
        try:
            db.session.commit()
            logged_user = 1

            # Storing data in audit table
            logging.info('put ticket start db call')
            log_audit("Update Ticket", "Update Ticket", "SAR", None, None, logged_user, datetime.datetime.now())
            logging.info('put ticket start Exiting')
            return wrapper.wrapper(None, "Success", 201), 201
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('put ticket start Exiting')
            db.session.rollback()
            return wrapper.wrapper(None, e.message, 500), 500


@ticket_blueprint.route('/ticket-info/<int:id>', methods=['GET'])
@jwt_required
def get_ticket_info(id):
    logging.info('put ticket-info db call start')
    update_ticket_info = TicketInfo.query.filter_by(id=id).first()
    logging.info('put ticket-info db success')
    if request.method == 'GET':
        logging.info('put ticket-info start')
        if update_ticket_info is not None:
            user_data = update_ticket_info.to_dict()
            logging.info('put ticket-info Exiting')
            return wrapper.wrapper(user_data,None,200), 200
        else:
            logging.info('put ticket-info Exiting')
            return wrapper.wrapper(None,"user not found",204), 204


@ticket_blueprint.route('/ticket/assign/<int:id>', methods=['GET', 'PUT'])
@jwt_required
def assign_ticket(id):
    data = request.json
    if request.method == 'PUT':
        logging.info('put ticket/assign/ and db call')
        ticket = Ticket.query.filter_by(id=id).first()
        logging.info('put db success')
        ticket.owner = data['owner']
        ticket.modified_time = datetime.datetime.now()
        #ticket.status='active'
        try:
            try:
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()

            user = Users.query.filter_by(name=ticket.owner).first()
            now = datetime.datetime.now()
            date = now.date()
            # Storing data in audit table
            log_audit("Assign Ticket", "Assign Ticket", "SAR", user.id, datetime.datetime.now(), None, None)

            mail_tempate = render_template('sar-notification.html', name=user.name, status=ticket.status,
                                           company=current_app.config['DEFAULT_COMPANY_NAME'], ticketID=ticket.id, date=date, priority=ticket.priority)
            sendMail("Ticket Assigned to you", user.email, mail_tempate)
            # send_email(user.email, "Ticket Assigned to you", mail_tempate)
            logging.info('put ticket/assign/ exit')
            return wrapper.wrapper(None, "Ticket assigned successfully", 201), 201
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('put ticket/assign/ exit')
            return wrapper.wrapper(None, e.message, 500), 500


@ticket_blueprint.route('/tickets/by_sar/<int:sar_id>', methods=['GET'])
@jwt_required
def get_tickets_sarid(sar_id):
    logging.info('put tickets/by_sar start and db call')
    get_tickets = Ticket.query.filter(Ticket.sar_id == sar_id)
    logging.info('put and db call success')
    all_ticket = []
    for ticket in get_tickets:
        # for tic in sar.ticketinfo.all():
        #     for dep in tic.department.all():
        #         print("Inside address--->", dep.name)
        all_ticket.append(ticket.to_dict())
    logging.info('put and exiting')
    return wrapper.wrapper(all_ticket,None,200), 200


@ticket_blueprint.route('/ticket/reject/<int:id>', methods=['PUT'])
@jwt_required
def reject_ticket(id):
    logging.info('put and ticket/reject/ and db call')
    update_ticket = Ticket.query.filter_by(id=id).first()
    logging.info('put and  and db success')
    if request.method == 'PUT':
        if update_ticket is not None:
            up_ticket = request.json
            update_ticket.status = up_ticket['status']
            update_ticket.description = up_ticket['description']
            update_ticket.modified_time = datetime.datetime.now()
            try:
                try:
                    db.session.commit()
                except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                    db.session.rollback()
                logged_user = 1
                sar = Sar.query.filter_by(id=update_ticket.sar_id).first()
                user = Users.query.filter_by(id=sar.user_id).first()
                # Storing data in audit table
                log_audit("Reject Ticket", "Reject Ticket", "SAR", logged_user, datetime.datetime.now(), None, None)

                mail_tempate = render_template('rejection-of-sar.html', name=user.name, company=current_app.config['DEFAULT_COMPANY_NAME'],
                                           ticketID=id, priority=update_ticket.priority)
                sendMail("Ticket Rejected", user.email, mail_tempate)
                # send_email(user.email, "SAR Rejected", mail_tempate)
                logging.info('put and exiting')
                return wrapper.wrapper(None, "Ticket successfully assigned.", 201), 201
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                logging.info('put and exiting')
                return wrapper.wrapper(None, e.message, 500), 500
        else:
            logging.info('put and exiting')
            return wrapper.wrapper(None,"Ticket not found.",201),201


@ticket_blueprint.route('/ticket/accept/<int:id>', methods=['PUT'])
@jwt_required
def progress_ticket(id):
    logging.info('put /ticket/accept and db call')
    update_ticket = Ticket.query.filter_by(id=id).first()
    logging.info('put /ticket/accept and db call success')
    if request.method == 'PUT':
        if update_ticket is not None:
            up_ticket = request.json
            update_ticket.status = up_ticket['status']
            update_ticket.modified_time = datetime.datetime.now()
            try:
                try:
                    db.session.commit()
                except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                    db.session.rollback()
                logged_user = 1

                # Storing data in audit table
                log_audit("Accept Ticket", "Accept Ticket", "SAR", logged_user, datetime.datetime.now(), None, None)

                sar = Sar.query.filter_by(id=update_ticket.sar_id).first()
                user = Users.query.filter_by(id=sar.user_id).first()

                mail_tempate = render_template('sar-acceptance.html', name=user.name, company=current_app.config['DEFAULT_COMPANY_NAME'],
                                       ticketID=id, status='Accepted')
                sendMail("Ticket successfully assigned.", user.email, mail_tempate)
                # send_email(user.email, "Your SAR accepted.", mail_tempate)
                logging.info('put /ticket/accept exiting')
                return wrapper.wrapper(None, "Ticket successfully assigned.", 201), 201
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                logging.info('put /ticket/accept exiting')
                db.session.rollback()
                return wrapper.wrapper(None, e.message, 500), 500
        else:
            logging.info('put /ticket/accept exiting')
            return wrapper.wrapper(None,"Ticket not found.",201),201
