# project/server/user/views.py
from flask import Blueprint, \
    request, make_response, jsonify, Flask

from project.server import db
from project.server.models.UserGroup import UserGroup

from project.server.models.Department import Department


from flask_jwt_simple import (
    JWTManager, jwt_required, create_jwt, get_jwt_identity, get_jwt
)

app = Flask(__name__, template_folder='template')


user_group_blueprint = Blueprint('user_group', __name__)


@user_group_blueprint.route('/user_group', methods=['POST', 'GET'])
@jwt_required
def create_user_group():
    if request.method == 'POST':
        json_data = request.json

        model_data= UserGroup(json_data)
        db.session.add(model_data)
        db.session.commit()
        return "Success", 201

    if request.method == 'GET':
        get_user_group = UserGroup.query.all()
        all_depts = []
        for user_group in get_user_group:
            all_depts.append(user_group.to_dict())
        return make_response(jsonify(all_depts)), 200


@user_group_blueprint.route('/department/test', methods=['POST', 'GET'])
@jwt_required
def create_department():
    jwt_data = get_jwt()
    print("jwt_data------------->", jwt_data)
    if jwt_data['identity'] != 'Group1':
        return jsonify(msg="Permission denied"), 403
    if request.method == 'POST':
        json_data = request.json

        model_data= Department(json_data)
        db.session.add(model_data)
        db.session.commit()
        return "Success", 201


@user_group_blueprint.route('/user_group/<id>', methods=['GET', 'DELETE', 'PUT'])
@jwt_required
def get_user_group(id):
    update_department = UserGroup.query.filter_by(id=id).first()
    if request.method == 'GET':
        if update_department is not None:
            user_data = update_department.to_dict()
            return make_response(jsonify(user_data)), 200
        else:
            return make_response("department not found"), 204

    if request.method == 'PUT':
        up_department = request.json
        update_department.name = up_department['name']
        update_department.defaultAssignedEmailId = up_department['defaultAssignedEmailId']
        db.session.commit()
        print(up_department)
        return "success"

    if request.method == 'DELETE':
        if update_department is not None:
            db.session.delete(update_department)
            db.session.commit()
            return make_response(jsonify("Successfully deleted")), 204
        else:
            return make_response("department not found"), 204

