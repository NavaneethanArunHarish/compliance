# project/server/user/views.py
from flask import Blueprint, \
    request, make_response, jsonify, g, Flask, render_template
import sqlalchemy
from flask_jwt_extended import (
    create_access_token)
from flask_login import login_user
from flask_mail import Mail, Message
import datetime
from project.server import db
from project.server.models.License import License
import rsa
from base64 import b64encode, b64decode
from project.server.wrapper import views as wrapper
from project.server import email as send_mail
from project.server.email import send_email
from flask_jwt_simple import (
    JWTManager, jwt_required, create_jwt, get_jwt_identity, get_jwt)

app = Flask(__name__, template_folder='template')
# mail = Mail(app)


license_blueprint = Blueprint('license', __name__)


@license_blueprint.route('/license', methods=['POST', 'GET'])
@jwt_required
def create_license():
    if request.method == 'POST':
        json_data = request.json
        email = json_data['email']
        for_users_left = json_data['no_of_users']

        customer_id =str(json_data['customer_id'])
        no_of_users = str(json_data['no_of_users'])
        no_of_modules = str(json_data['no_of_modules'])
        domain = str(json_data['domain'])

        license_data = customer_id+","+no_of_modules+","+no_of_users+","+domain
        print("data")
        keysize = 2048
        (public, private) = rsa.newkeys(keysize)
        #encrypted = b64encode(rsa.encrypt(license_data, public))
        #decrypted = rsa.decrypt(b64decode(encrypted), private)
        signature = b64encode(rsa.sign(license_data, private, "SHA-512"))
        #verify = rsa.verify(license_data, b64decode(signature), public)
        privateKey = private.exportKey('PEM')
        publicKey = public.exportKey('PEM')
        users_left = for_users_left - 1

        expary_date = datetime.datetime.now()
        model_data= License(json_data, expary_date= expary_date,privateKey=privateKey,publicKey=publicKey,signature=signature,users_left=users_left)
        try:
            db.session.add(model_data)
            db.session.commit()
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            db.session.rollback()

        mail_tempate = render_template('license-Key.html',licenseKey=publicKey)
        send_email(email, "Yor License Key From Complaince!", mail_tempate)

        # password_reset__url = url_for('user.confirm_email', token=token, _external=True)
        #html = render_template('license-key.html', licenseKey=publicKey,
        #                      name="Some Username", company="Some Company name")
        #subject = "Your LicenseKey From Complaince!"
        #send_mail.send_email(email, subject, html)


        ret = {'res':'LicenseKey sent to Your Email' }
        return wrapper.wrapper(ret, None, 200), 200

    if request.method == 'GET':
        get_license = License.query.all()
        all_lics = []
        for license in get_license:
            all_lics.append(license.to_dict())
        return make_response(jsonify(all_lics)), 200


@license_blueprint.route('/license/<id>', methods=['GET', 'DELETE', 'PUT'])
@jwt_required
def get_license(id):
    update_license = License.query.filter_by(id=id).first()
    if request.method == 'GET':
        if update_license is not None:
            user_data = update_license.to_dict()
            return make_response(jsonify(user_data)), 200
        else:
            return make_response("department not found"), 204

    if request.method == 'PUT':
        try:
            up_department = request.json
            update_license.name = up_department['name']
            update_license.defaultAssignedEmailId = up_department['defaultAssignedEmailId']
            db.session.commit()
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            db.session.rollback()
        print(up_department)
        return "success"

    if request.method == 'DELETE':
        if update_license is not None:
            try:
                db.session.delete(update_license)
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            return make_response(jsonify("Successfully deleted")), 204
        else:
            return make_response("department not found"), 204

