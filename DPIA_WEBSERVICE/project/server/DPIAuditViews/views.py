# project/server/auth/views.py

import datetime

from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from project.server import bcrypt, db
from project.server.models.DPIAudit import DpiAudit
from flask_cors import CORS

dpiaudit_blueprint = Blueprint('Dpiaudit', __name__)
CORS(dpiaudit_blueprint)

class DPIAuditPOSTAPI(MethodView):
    def post(self):

        post_data = request.get_json()
        try:
            assObj = DpiAudit(
                question_id=post_data.get('question_id'),
                section_id=post_data.get('section_id'),
                owner_id=post_data.get('owner_id'),
                description=post_data.get('description')
            )
            db.session.add(assObj)
            db.session.commit()
            print(assObj.to_dict())
            responseObject = {
                "id":assObj.id,
                "question_id":assObj.question_id,
                "section_id":assObj.section_id,
                "description":assObj.owner_id,
                "owner_id":assObj.owner_id
            }
            return make_response(jsonify(responseObject)), 200
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject)), 401


class DPIAuditGETAPI(MethodView):
    def get(self):
        try:
            assessments = DpiAudit.query.all()
            assessmentArr = []
            for assessment in assessments:
                assessmentArr.append(assessment.to_dict())
            return jsonify(assessmentArr)
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject)), 401



@dpiaudit_blueprint.route('/dpiaudit/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def bucketlist_manipulation(id, **kwargs):
    gotData = DpiAudit.query.filter_by(id=id).first()

    if request.method == "DELETE":
        if(gotData):
            db.session.delete(gotData)
            db.session.commit()
            response = {
                "id":gotData.id,
                'message':"Removed successfully"
            }
            return make_response(jsonify(response)), 201
        else:
            return "Error while deleting"

    elif request.method == 'PUT':
        obj = request.get_json()
        if(obj):

            # gotData.active = obj.get('active')
            gotData.question_id = obj.get('question_id')
            gotData.section_id = obj.get('section_id')
            gotData.owner_id = obj.get('owner_id')
            gotData.description = obj.get('description')
            gotData.modified_date = datetime.datetime.now()

            db.session.add(gotData)
            db.session.commit()

            response = {
                "id":gotData.id,
                "question_id":gotData.question_id,
                "section_id":gotData.section_id,
                "owner_id":gotData.owner_id,
                "description":gotData.description,
                'message':"Updated successfully"
            }
            return make_response(jsonify(response)), 200
        else:
            return "Error while updating"
    else:
        if(gotData):
            response = {
                "id":gotData.id,
                "question_id":gotData.question_id,
                "section_id":gotData.section_id,
                "owner_id":gotData.owner_id,
                "description":gotData.description,
                'message': "Retrieved successfully"
            }
            return make_response(jsonify(response)), 200
        else:
            return "Error while fetching data"

# define the API resources


dpiaudit_post_view = DPIAuditPOSTAPI.as_view('dpiaudit_post_api')
dpiaudit_get_view = DPIAuditGETAPI.as_view('dpiaudit_get_api')

dpiaudit_blueprint.add_url_rule(
    '/dpiaudit',
    view_func=dpiaudit_post_view,
    methods=['POST']
)


dpiaudit_blueprint.add_url_rule(
    '/dpiaudit',
    view_func=dpiaudit_get_view,
    methods=['GET']
)
