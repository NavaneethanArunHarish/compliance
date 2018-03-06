# project/server/user/views.py
from flask import Blueprint, \
    request, make_response, jsonify, g, Flask, render_template
import sqlalchemy
from flask_jwt_extended import (
    create_access_token)
from flask_login import login_user
from flask_mail import Mail, Message

from project.server import db
from project.server.models.MdlUser import MdlUser

app = Flask(__name__, template_folder='template')
# mail = Mail(app)


moodle_blueprint = Blueprint('moodle', __name__)


@moodle_blueprint.route('/moodle', methods=['POST', 'GET'])
def create_moodle():
    if request.method == 'POST':
        json_data = request.json
        print("moodle data------------->",json_data)
        country =json_data["country"][:2]
        print("country data------------->", country)
        #model_data= MdlUser(json_data)
        #db.session.add(model_data)
        #db.session.commit()
        return "Success", 201

    if request.method == 'GET':
        get_moodle = MdlUser.query.all()
        all_depts = []
        for moodle in get_moodle:
            all_depts.append(moodle.to_dict())
        return make_response(jsonify(all_depts)), 200


@moodle_blueprint.route('/moodle/<id>', methods=['GET', 'DELETE', 'PUT'])
def get_moodle(id):
    update_department = MdlUser.query.filter_by(id=id).first()
    if request.method == 'GET':
        if update_department is not None:
            user_data = update_department.to_dict()
            return make_response(jsonify(user_data)), 200
        else:
            return make_response("department not found"), 204

    if request.method == 'PUT':
        try:
            up_department = request.json
            update_department.name = up_department['name']
            update_department.defaultAssignedEmailId = up_department['defaultAssignedEmailId']
            db.session.commit()
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            db.session.rollback()
        print(up_department)
        return "success"

    if request.method == 'DELETE':
        if update_department is not None:
            try:
                db.session.delete(update_department)
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            return make_response(jsonify("Successfully deleted")), 204
        else:
            return make_response("department not found"), 204

