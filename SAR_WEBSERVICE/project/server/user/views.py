import uuid
from datetime import datetime
import sqlalchemy
import logging
from flask import Blueprint, \
    request, make_response, jsonify, Flask, url_for, render_template,  current_app

from project.server import db, bcrypt
from project.server.wrapper import views as wrapper
from project.server import email as send_mail
from project.server.sar.views import sendMail
from project.server.user.UserJson import to_json
from project.server.models.Department import Department
from project.server.models.TicketInfo import TicketInfo

from project.server.models.User import Users, UserType
from project.server.models.Address import Address
from project.server.models.UserGroup import GroupName
from project.server.models.Organization import Organization

from project.server.models.License import License

from flask_jwt_simple import (
    JWTManager, jwt_required, create_jwt, get_jwt_identity, get_jwt
)
from datetime import datetime
from project.server.models.MdlUser import MdlUser

from project.server.config import BaseConfig


app = Flask(__name__, template_folder='template')
user_blueprint = Blueprint('user', __name__)

jwt = JWTManager(app)

user_type=None
user_group=None


@jwt.jwt_data_loader
def add_claims_to_access_token(identity):
    """Explicitly set identity and claims for jwt."""

    now = datetime.utcnow()
    return {
        'exp': now + current_app.config['JWT_EXPIRES'],
        'iat': now,
        'nbf': now,
        'sub': identity,
    }


@user_blueprint.route('/user/login', methods=['POST'])
def login():
    """View function for login view."""
    logging.info('usre login start')

    params = request.get_json()
    email = params.get('email', None)
    password = params.get('password', None)
    client_ip = params.get('client_ip', None)
    logging.info('usre login start db call')
    user = Users.query.filter_by(email=email).first()
    logging.info('usre login start db call success')
    if not user:
        return wrapper.wrapper(None, "User not found.", 200), 200
    if user:
        if user.confirmed is True:
            logging.info('usre login start validation user call')
            compare = bcrypt.check_password_hash(user.password, password)
            # TODO Check from DB here
            if compare is False:
                return wrapper.wrapper(None, "Bad email or password", 201), 201
            else:
                user_type = user.user_type
                user_group = user.user_group
                # sesson = User_Session.query.filter_by(user_id=user.id).first()

                # if sesson is not None:
                #   return wrapper.wrapper(None, "Already Loged In To Ip:" + sesson.client_ip, 201), 201

                # else:
                #   model_session = User_Session(client_ip=client_ip, user_id=user.id, user_name=user.name, user_type=user.user_type,
                #                          status='LogedIn')

                # db.session.add(model_session)
                # db.session.commit()
                # user_type = user.user_type
                # user_group = user.user_group

                ret = {'jwt': create_jwt(identity=user_group), 'role': user_type, 'user_id': user.id,
                       'exp': datetime.utcnow() + current_app.config['JWT_EXPIRES']}
                return wrapper.wrapper(ret, None, 200), 200
        else:
            logging.info('usre login success')
            return wrapper.wrapper(None, "Email not validated. Please validate and try again.", 200), 200

    if not email:
        return wrapper.wrapper(None, "Missing email parameter", 201),201
    if not password:
        return wrapper.wrapper(None, "Missing password parameter", 201),201




@user_blueprint.route('/user/logout/<user_id>', methods=['POST'])
def logout(user_id):
    #sesson = User_Session.query.filter_by(user_id=user_id).first()

    #if sesson is not None:
    #    db.session.delete(sesson)
    #    db.session.commit()
        logging.info('logout entry and exit')
        return wrapper.wrapper(None, "Session Successfully deleted", 201),201


@user_blueprint.route('/user/external_user/create/test', methods=['POST', 'GET'])
def create_user_external_user_test():
    json_data = request.json
    token = uuid.uuid4()

    created_by = json_data["created_by"]
    logging.info('create external user carete and db call')
    license_data = License.query.filter_by(created_by=created_by).first()
    logging.info('create external user carete and db call success')
        
    if license_data is not None:

        if license_data.users_left is not 0:
            user_count = license_data.users_left - 1

            update_license = license_data
            license_data.users_left = user_count
            try:
                db.session.add(update_license)
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()

            user_type = UserType.EXTERNALUSER
            user_group = GroupName.GROUP2
            model_user = Users(json_data, confirmed=False, token=token, user_type=user_type, user_group=user_group)
            addr = Address(json_data['address'])
            model_user.address.append(addr)
            try:
                db.session.add(model_user)
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()

            confirm_url = url_for('user.confirm_email', token=token, _external=True)
            html = render_template('verification-email.html', confirm_url=confirm_url,
                                       name=json_data['name'], company=current_app.config['DEFAULT_COMPANY_NAME'],licenseKey = license_data.publicKey )
            subject = "Please confirm your email"
            sendMail(subject, json_data['email'], html)
            # send_mail.send_email(json_data['email'], subject, html)
            logging.info('create external user exiting')
            return wrapper.wrapper(None, "External user created successfully And Key Sent To The User", 200), 200

        else:
            logging.info('create external user exiting')
            return wrapper.wrapper(None, "Your User Count Exceeded!", 201), 201

    else:
        logging.info('create external user exiting')
        return wrapper.wrapper(None, "You dont have License Yet!", 201), 201


@user_blueprint.route('/user/external_user/create', methods=['POST', 'GET'])
def create_user_external_user():
    if request.method == 'POST':
        logging.info('create external user post and db call')
        json_data = request.json
        token = uuid.uuid4()

        user_type = UserType.EXTERNALUSER
        user_group = GroupName.GROUP2
        model_user = Users(json_data, confirmed=False, token=token,user_type=user_type,user_group=user_group)
        logging.info('create external user post and db call success')
        addr = Address(json_data['address'])
        # sar = Sar(json_data['sar'])
        # model_user.sar.append(sar)
        model_user.address.append(addr)
        db.session.add(model_user)
        try:
            try:
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            confirm_url = url_for('user.confirm_email', token=token, _external=True)
            html = render_template('verification-email.html', confirm_url=confirm_url,
                                   name=json_data['name'], company=current_app.config['DEFAULT_COMPANY_NAME'])
            subject = "Please confirm your email"
            sendMail(subject, json_data['email'], html)
            # send_mail.send_email(json_data['email'], subject, html)


            moodle_user={
                "auth": "manual", "confirmed": 1, "policyagreed": 0, "deleted": 0, "suspended": 0, "mnethostid": 1,
                "username":json_data['email'],
                "password": model_user.password,"firstname": json_data['name'],"lastname": json_data['name'], "email": json_data['email'],
                "emailstop": 0,"city": json_data['address']['city'], "country": json_data['address']['country'][:2],
                "lang": "en","calendartype": "gregorian",   "timezone": "99", "picture": 0,"descriptionformat": 1,"mailformat": 1,
                "maildigest": 0, "maildisplay": 1,"autosubscribe": 0,"trackforums": 0,"timecreated": 0,"trustbitmask": 0
                }
            logging.info('create external user added db data')
            model_data = MdlUser(moodle_user)
            try:
                db.session.add(model_data)
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()

            logging.info('create external user post exiting')
            return wrapper.wrapper(None, "External user created successfully", 201), 201
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            app.logger.error('External user create')
            logging.info('create external user post exiting')
            return wrapper.wrapper(None, e.message, 500), 500

    if request.method == 'GET':
        get_users = Users.query.all()
        all_users = []

        for user in get_users:
            for i in user.address.all():
                print("pincode-->", i.pincode)
            all_users.append(user)
        logging.info('create external user post exiting')
        return wrapper.wrapper(to_json(all_users), "Getting all users", 200) #(data,msg,status_code)


@user_blueprint.route('/user/representative/create', methods=['POST', 'GET'])
@jwt_required
def create_user_representative():
    if request.method == 'POST':
        json_data = request.json
        logging.info('create representative user post ')
        token = uuid.uuid4()
        user_type = UserType.REPRESENTATIVE
        user_group = GroupName.GROUP2
        model_user = Users(json_data, confirmed=False, token=token,user_type=user_type,user_group=user_group)
        addr = Address(json_data['address'])
        # sar = Sar(json_data['sar'])
        # model_user.sar.append(sar)
        model_user.address.append(addr)
        db.session.add(model_user)
        try:
            try:
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            confirm_url = url_for('user.confirm_email', token=token, _external=True)
            html = render_template('verification-email.html', confirm_url=confirm_url,
                                   name=json_data['name'], company=current_app.config['DEFAULT_COMPANY_NAME'])
            subject = "Please confirm your email"
            sendMail(subject, json_data['email'], html)
            # send_mail.send_email(json_data['email'], subject, html)
            logging.info('create representative user post exiting')
            return wrapper.wrapper(None, "Representative user created successfully", 201), 201
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('create representative user post exiting')
            return wrapper.wrapper(None, e.message, 500), 500

    if request.method == 'GET':
        logging.info('create representative user post and db call')
        get_users = Users.query.all()
        logging.info('create representative user post and db call success')
        all_users = []

        for user in get_users:
            for i in user.address.all():
                print("pincode-->", i.pincode)
            all_users.append(user.to_dict())
        logging.info('create representative user post exiting')
        return wrapper.wrapper(all_users,None,200),200


@user_blueprint.route('/user/administrator/create', methods=['POST', 'GET'])
def create_user_administrator():
    if request.method == 'POST':
        logging.info('create admin post statry')
        json_data = request.json
        token = uuid.uuid4()
        user_type = UserType.ADMINISTRATOR
        user_group =GroupName.GROUP1
        model_user = Users(json_data['primary'], confirmed=False, token=token,user_type=user_type,user_group=user_group)
        addr = Address(json_data['primary']['address'])
        # sar = Sar(json_data['sar'])
        # model_user.sar.append(sar)
        model_user.address.append(addr)
        org_data = json_data['organization']

        # Organization data
        org = Organization()
        org.companyName = org_data['companyName']
        org.contactNo = org_data['contactNo']
        org.registrationNumber = org_data['registrationNumber']
        org.vatNumber = org_data['vatNumber']
        org.primary_user = json_data['primary']['email']
        org.secondary_user = json_data['secondary']['email']
        model_user.organization.append(org)
        db.session.add(model_user)
        try:
            try:
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()

            # Secondary User
            sec_user = Users(json_data['secondary'], confirmed=False, token=token, user_type=user_type,
                               user_group=user_group)
            addr = Address(json_data['secondary']['address'])
            # sar = Sar(json_data['sar'])
            # model_user.sar.append(sar)
            sec_user.address.append(addr)
            try:
                db.session.add(sec_user)
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            confirm_url = url_for('user.confirm_email', token=token, _external=True)
            html = render_template('verification-email.html', confirm_url=confirm_url,
                                   name=json_data['primary']['name'], company=current_app.config['DEFAULT_COMPANY_NAME'])
            subject = "Please confirm your email"
            sendMail(subject, json_data['primary']['email'], html)
            # send_mail.send_email(json_data['email'], subject, html)

            moodle_user = {
                "auth": "manual", "confirmed": 1, "policyagreed": 0, "deleted": 0, "suspended": 0, "mnethostid": 1,
                "username": json_data['primary']['email'],
                "password": model_user.password, "firstname": json_data['primary']['name'], "lastname": 'User',
                "email": json_data['primary']['email'],
                "emailstop": 0, "city": json_data['primary']['address']['city'] , "country": json_data['primary']['address']['country'][:2],
                "lang": "en", "calendartype": "gregorian", "timezone": "99", "picture": 0, "descriptionformat": 1,
                "mailformat": 1,
                "maildigest": 0, "maildisplay": 1, "autosubscribe": 0, "trackforums": 0, "timecreated": 0,
                "trustbitmask": 0
            }
            logging.info('create external user added db data')
            model_data = MdlUser(moodle_user)
            try:
                db.session.add(model_data)
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            logging.info('create admin post exiting')
            return wrapper.wrapper(None, "Administrator user created successfully", 201), 201
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('create admin post exiting')
            return wrapper.wrapper(None, e.message, 500), 500

    if request.method == 'GET':
        logging.info('create admin get and db call')
        get_users = Users.query.all()
        logging.info('create admin get and db call success')
        all_users = []

        for user in get_users:
            for i in user.address.all():
                print("pincode-->", i.pincode)
            all_users.append(user)
        logging.info('create admin get and exiting')
        return wrapper.wrapper(to_json(all_users), "Getting all users", 200) #(data,msg,status_code)


@user_blueprint.route('/user/compliance_team_member/create', methods=['POST', 'GET'])
@jwt_required
def create_user_ComplianceTeamMemeber():
    if request.method == 'POST':
        json_data = request.json
        logging.info('create team member start')
        token = uuid.uuid4()
        user_type = UserType.COMPLIANCETEAMMEMBER
        user_group = GroupName.GROUP3
        model_user = Users(json_data, confirmed=False, token=token,user_type=user_type,user_group=user_group)
        addr = Address(json_data['address'])
        # sar = Sar(json_data['sar'])
        # model_user.sar.append(sar)
        model_user.address.append(addr)
        db.session.add(model_user)
        try:
            try:
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            confirm_url = url_for('user.confirm_email', token=token, _external=True)
            html = render_template('verification-email.html', confirm_url=confirm_url,
                                   name=json_data['name'], company=current_app.config['DEFAULT_COMPANY_NAME'])
            subject = "Please confirm your email"
            sendMail(subject, json_data['email'], html)
            # send_mail.send_email(json_data['email'], subject, html)
            logging.info('create team member exiting')
            return wrapper.wrapper(None, "CTMember user created successfully", 201), 201
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('create team member exiting')
            return wrapper.wrapper(None, e.message, 500), 500

    if request.method == 'GET':
        logging.info('create team member get and db call')
        get_users = Users.query.all()
        logging.info('create team member get and db call success')
        all_users = []

        for user in get_users:
            for i in user.address.all():
                print("pincode-->", i.pincode)
            all_users.append(user.to_dict())
        logging.info('create team member exiting')
        return wrapper.wrapper(all_users,None,200),200


@user_blueprint.route('/user/compliance_team_leader/create', methods=['POST', 'GET'])
@jwt_required
def create_user_ComplianceTeamLeader():
    if request.method == 'POST':
        json_data = request.json
        logging.info('create team leader create start')
        token = uuid.uuid4()
        user_type = UserType.COMPLIANCETEAMLEADER
        user_group = GroupName.GROUP3
        model_user = Users(json_data, confirmed=False, token=token,user_type=user_type,user_group=user_group)
        addr = Address(json_data['address'])
        # sar = Sar(json_data['sar'])
        # model_user.sar.append(sar)
        model_user.address.append(addr)
        db.session.add(model_user)
        try:
            try:
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            confirm_url = url_for('user.confirm_email', token=token, _external=True)
            html = render_template('verification-email.html', confirm_url=confirm_url,
                                   name=json_data['name'], company=current_app.config['DEFAULT_COMPANY_NAME'])
            subject = "Please confirm your email"
            sendMail(subject, json_data['email'], html)
            # send_mail.send_email(json_data['email'], subject, html)
            logging.info('create team leader create  exiting')
            return wrapper.wrapper(None, "CTL user created successfully", 201), 201
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('create team leader create  exiting')
            return wrapper.wrapper(None, e.message, 500), 500

    if request.method == 'GET':
        logging.info('create team leader create and db call')
        get_users = Users.query.all()
        logging.info('create team leader create and db call success')
        all_users = []

        for user in get_users:
            for i in user.address.all():
                print("pincode-->", i.pincode)
            all_users.append(user.to_dict())
        logging.info('create team leader create exiting')
        return wrapper.wrapper(all_users,None,200),200


@user_blueprint.route('/user/dpo/create', methods=['POST', 'GET'])
@jwt_required
def create_user_dpo():
    if request.method == 'POST':
        json_data = request.json
        logging.info('create dpo start')
        token = uuid.uuid4()
        user_type = UserType.DPO
        user_group = GroupName.GROUP1
        model_user = Users(json_data, confirmed=False, token=token,user_type=user_type,user_group=user_group)
        addr = Address(json_data['address'])
        # sar = Sar(json_data['sar'])
        # model_user.sar.append(sar)
        model_user.address.append(addr)
        db.session.add(model_user)
        try:
            try:
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            confirm_url = url_for('user.confirm_email', token=token, _external=True)
            html = render_template('verification-email.html', confirm_url=confirm_url, name=json_data['name'],
                                   company=current_app.config['DEFAULT_COMPANY_NAME'])
            subject = "Please confirm your email"
            sendMail(subject, json_data['email'], html)
            # send_mail.send_email(json_data['email'], subject, html)
            logging.info('create dpo exiting')
            return wrapper.wrapper(None, "DPO created successfully", 201), 201
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('create dpo exiting')
            return wrapper.wrapper(None, e.message, 500), 500

    if request.method == 'GET':
        logging.info('create dpo start and db call')
        get_users = Users.query.all()
        logging.info('create dpo start and db call success')
        all_users = []

        for user in get_users:
            for i in user.address.all():
                print("pincode-->", i.pincode)
            all_users.append(user.to_dict())
        logging.info('create dpo start exiting')
        return wrapper.wrapper(all_users,None,200),200


@user_blueprint.route('/user/get_all/team_lead', methods=['GET'])
@jwt_required
def get_all_team_lead():
    if request.method == 'GET':
        logging.info('get all team leader and db call')
        get_users = Users.query.filter(Users.user_type==UserType.COMPLIANCETEAMLEADER)
        logging.info('get all team leader and db call success')
        print("all user-->", get_users)
        all_users = []

        for user in get_users:
            for i in user.address.all():
                print("pincode-->", i.pincode)
            all_users.append(user.to_dict())
        logging.info('get all team leader exiting')
        return wrapper.wrapper(all_users,None,200),200


@user_blueprint.route('/user/get_all/team_member', methods=['GET'])
@jwt_required
def get_all_team_member():
    if request.method == 'GET':
        logging.info('get all team member start and db call')
        get_users = Users.query.filter(Users.user_type==UserType.COMPLIANCETEAMMEMBER)
        logging.info('get all team member start and db call success')
        print("all user-->", get_users)
        all_users = []

        for user in get_users:
            for i in user.address.all():
                print("pincode-->", i.pincode)
            all_users.append(user.to_dict())
        logging.info('get all team member start exiting')
        return wrapper.wrapper(all_users,None,200),200


@user_blueprint.route('/user/<int:id>', methods=['GET'])
@jwt_required
def get_user(id):
    logging.info('get user by id start and db call')
    user = Users.query.filter_by(id=id).first()
    logging.info('get user by id start and db call success')
    if user is not None:
        logging.info('get user by id exiting')
        return wrapper.wrapper(to_json(user), "Get user by id.", 200), 200
    else:
        logging.info('get user by id exiting')
        return wrapper.wrapper(None, "User not found", 201), 201


@user_blueprint.route('/user/<id>', methods=['DELETE', 'PUT'])
@jwt_required
def get_department(id):
    logging.info('get user by id db call')
    user = Users.query.filter_by(id=id).first()
    address = Address.query.filter_by(user_id=id).first()
    logging.info('get user by id db call success')
    if request.method == 'PUT':
        logging.info('get user by id put method')
        if user is not None:
            update_user = request.get_json()
            user.name = update_user['name']
            user.email = update_user['email']
            user.phone = update_user['phone']
            user.user_type = update_user['user_type']
            try:
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            address.addressline1 = update_user['address']['addressline1']
            address.addressline2 = update_user['address']['addressline2']
            address.pincode = update_user['address']['pincode']
            address.city = update_user['address']['city']
            address.country = update_user['address']['country']
            address.state = update_user['address']['state']
            try:
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            print(update_user)
            logging.info('get user by id exiting')
            return wrapper.wrapper(None,"success updated  user data",201),201
        else:
            logging.info('get user by id exiting')
            return wrapper.wrapper(None, "User not found", 201), 201

    if request.method == 'DELETE':
        logging.info('delete user by id start')
        if user is not None:
            try:
                db.session.delete(user)
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            logging.info('delete user by id exiting')
            return make_response(jsonify("Successfully deleted")), 204
        else:
            logging.info('delete user by id exiting')
            return make_response("User not found"), 204


@user_blueprint.route('/update/user_type/<int:user_id>', methods=['DELETE', 'PUT'])
def update_user_type(user_id):
    logging.info('update user type by id db call')
    user = Users.query.filter_by(id=user_id).first()
    logging.info('update user type by id db call success')
    if request.method == 'PUT':
        logging.info('update user type by put method')
        if user is not None:
            update_user = request.get_json()
            print("user---type:",update_user['user_type'])
            user.user_type = update_user['user_type']
            try:
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            logging.info('update user type by put method exiting')
            return wrapper.wrapper(None,"success updated  user data",201),201
        else:
            logging.info('update user type by put method exiting')
            return wrapper.wrapper(None, "User not found", 201), 201



@user_blueprint.route('/user/<string:name>', methods=['GET', 'DELETE', 'PUT'])
def get_userby_name(name):
    logging.info('user name db call')
    user = Users.query.filter_by(name=name).first()
    logging.info('user name db call success')
    if user is not None:
        logging.info('user name exiting')
        return wrapper.wrapper(to_json(user), "Get user by id.", 200), 200
    else:
        logging.info('user name exiting')
        return wrapper.wrapper(None, "User not found", 201), 201

    if request.method == 'PUT':
        logging.info('user name put menthod')
        update_user = request.get_json()
        user.name = update_user['name']
        user.email = update_user['email']
        user.phone = update_user['phone']
        user.user_type = update_user['user_type']
        try:
            db.session.commit()
            print(update_user)
            logging.info('user name put menthod exiting')
            return wrapper.wrapper(None, "success updated  user data", 201), 201
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('user name put menthod exiting')
            db.session.rollback()
            return wrapper.wrapper(None, e.message, 500), 500


@user_blueprint.route('/confirm/<token>')
def confirm_email(token):
    logging.info('confirm token db call')
    user = Users.query.filter_by(token=token).first()
    logging.info('confirm token db call success')
    if user:
        user.confirmed = True
        user.confirmed_on = datetime.now()
        user.token = None
        try:
            db.session.commit()
            print("Get user by token", user.email)
            return render_template('sar-Response.html', SAR_response='Email confirmed successfully!')
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('confirm token exiting')
            db.session.rollback()
            return wrapper.wrapper(None, e.message, 500), 500
    else:
        logging.info('confirm token exiting')
        return render_template('sar-Response.html', SAR_response='User not found!')


@user_blueprint.route('/forgot/<email>', methods=['GET', 'POST'])
def forgot(email):
    logging.info('forget password db call')
    user = Users.query.filter_by(email=email).first()
    logging.info('forget password db call success')

    if user:
        token = uuid.uuid4()
        user.password_reset_token = token
        try:
            try:
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            password_reset__url = url_for('user.forgot_new', token=token, _external=True)
            html = render_template('change-password1.html', password_reset__url="http://"+BaseConfig.BASE_URL+"/forgot/new/" + str(token),
                                   name=user.name, company=user.name)
            subject = "Password reset"
            sendMail(subject, email, html)
            # send_mail.send_email(email, subject, html)
            print("valid user")
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('forget password exiting')
            return wrapper.wrapper(None, e.message, 500), 500
        logging.info('forget password exiting')
        return wrapper.wrapper(None,"Sent email with reset link", 200), 200
    else:
        logging.info('forget password exiting')
        return wrapper.wrapper(None,"Email id not registered with us",201),201


@user_blueprint.route('/forgot/new/<token>', methods=['GET', 'POST'])
def forgot_new(token):
    reset_data = request.json
    logging.info('forget token db call')
    user = Users.query.filter_by(password_reset_token=token).first()
    logging.info('forget token db call success')

    if user is not None:
        user.password = bcrypt.generate_password_hash(reset_data['password'])
        user.password_reset_token = None
        try:
            db.session.commit()
            logging.info('forget token exiting')
            return render_template('sar-Response.html', SAR_response='Password successfully changed.')
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            logging.info('forget token exiting')
            db.session.rollback()
            return wrapper.wrapper(None, e.message, 500), 500
    else:
        logging.info('forget token exiting')
        return render_template('sar-Response.html', SAR_response='Password change was unsuccessful.')


@user_blueprint.route('/user/type/<user_type>', methods=['GET'])
@jwt_required
def get_by_type(user_type):
    if request.method == 'GET':
        all_users = []
        logging.info('get user type call and db call')
        user = Users.query.filter_by(user_type=user_type).all()
        logging.info('get user type call and db call success')
        for u in user:
            all_users.append(u.to_dict())
        logging.info('get user type call exiting')
        return wrapper.wrapper(all_users, "Getting user by type", 200), 200


@user_blueprint.route('/users/page/<int:page>/<int:count>', methods=['GET'])
@jwt_required
def get_sar_by_page_count(page, count):
    per_page = count
    if request.method == 'GET':
        logging.info('get users/page/<int:page> start and db call')
        get_users = Users.query.filter_by(user_type='ComplainceTeamMember').paginate(page, per_page, False, 20)
        logging.info('get users/page/<int:page> start and db call success')
        # print("get_sar----->",get_sar.items)
        # print("Type--->", type(get_sar.items))
        all_users = []
        for sar in get_users.items:
            all_users.append(sar.to_dict())

        pagination_data = {
            'has_next': get_users.has_next,
            'pages': get_users.pages,
            'has_prev': get_users.has_prev,
            'total': get_users.total,
            'page': get_users.page,
            'next_num': get_users.next_num,
            'users': all_users
        }
        logging.info('get users/page/<int:page> exiting')
        return wrapper.wrapper(pagination_data, "Getting all CTM users.", 200)
