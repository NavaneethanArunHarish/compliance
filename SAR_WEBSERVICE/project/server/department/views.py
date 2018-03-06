# project/server/user/views.py
from flask import Blueprint, \
    request, make_response, jsonify, g, Flask, render_template
import sqlalchemy
from flask_jwt_extended import (
    create_access_token)
from flask_login import login_user
from flask_mail import Mail, Message

from project.server import db
from project.server.models.Department import Department
from flask_jwt_simple import (
    JWTManager, jwt_required, create_jwt, get_jwt_identity, get_jwt)

app = Flask(__name__, template_folder='template')
# mail = Mail(app)


department_blueprint = Blueprint('department', __name__)


@department_blueprint.route('/department', methods=['POST', 'GET'])
@jwt_required
def create_department():
    print("Entering method")
    if request.method == 'POST':
        json_data = request.json

        model_data= Department(json_data)
        try:
            db.session.add(model_data)
            db.session.commit()
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            db.session.rollback()
        print("Exiting method")
        return "Success", 201

    if request.method == 'GET':
        get_departments = Department.query.all()
        all_depts = []
        for departments in get_departments:
            all_depts.append(departments.to_dict())
        print("Exiting method")
        return make_response(jsonify(all_depts)), 200


@department_blueprint.route('/department/<id>', methods=['GET', 'DELETE', 'PUT'])
@jwt_required
def get_department(id):
    print("Entering method")
    update_department = Department.query.filter_by(id=id).first()
    if request.method == 'GET':
        if update_department is not None:
            user_data = update_department.to_dict()
            print("Exiting method")
            return make_response(jsonify(user_data)), 200
        else:
            print("Exiting method")
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
        print("Exiting method")
        return "success"

    if request.method == 'DELETE':
        if update_department is not None:
            try:
                db.session.delete(update_department)
                db.session.commit()
            except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
                db.session.rollback()
            print("Exiting method")
            return make_response(jsonify("Successfully deleted")), 204
        else:
            print("Exiting method")
            return make_response("department not found"), 204

