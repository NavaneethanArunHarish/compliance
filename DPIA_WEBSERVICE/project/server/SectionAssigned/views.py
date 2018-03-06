# project/server/auth/views.py

import datetime

from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from project.server import bcrypt, db
from project.server.models.SectionAssigned import SectionAssigned
from flask_cors import CORS

sectionassigned_blueprint = Blueprint('sectionassigned', __name__)
CORS(sectionassigned_blueprint)


class SectionPOSTAPI(MethodView):
    def post(self):

        post_data = request.get_json()
        try:
            secObj = SectionAssigned(
                section_id=post_data.get('section_id'),
                assignedTo=post_data.get('assignedTo')
            )
            db.session.add(secObj)
            db.session.commit()
            print(secObj.to_dict())
            responseObject = {
                "id":secObj.id,
                "section_id":secObj.section_id,
                "assignedTo":secObj.assignedTo
            }
            return make_response(jsonify(responseObject)), 200
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject)), 401


class SectionGETAPI(MethodView):
    def get(self):
        try:
            assessments = SectionAssigned.query.all()
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



@sectionassigned_blueprint.route('/sectionassign/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def bucketlist_manipulation(id, **kwargs):
    gotData = SectionAssigned.query.filter_by(id=id).first()

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

    # elif request.method == 'PUT':
    #     obj = request.get_json()
    #     if(obj):
    #
    #         # gotData.active = obj.get('active')
    #
    #         gotData.assessment_id = obj.get('assessment_id')
    #         gotData.modified_date = datetime.datetime.now()
    #
    #         db.session.add(gotData)
    #         db.session.commit()
    #
    #         response = {
    #             "id":gotData.name,
    #             "owner_id":gotData.owner_id,
    #             "assessment_id":gotData.assessment_id,
    #             'message':"Updated successfully"
    #         }
    #         return make_response(jsonify(response)), 200
    #     else:
    #         return "Error while updating"
    # else:
    #     if(gotData):
    #         response = {
    #             "id":gotData.name,
    #             "assignedTo":gotData.assignedTo,
    #             "owner_id":gotData.owner_id,
    #             "assessment_id":gotData.assessment_id,
    #             'message': "Retrieved successfully"
    #         }
    #         return make_response(jsonify(response)), 200
    #     else:
    #         return "Error while fetching data"

# define the API resources


ass_post_view = SectionPOSTAPI.as_view('sec_post_api')
ass_get_view = SectionGETAPI.as_view('sec_get_api')

sectionassigned_blueprint.add_url_rule(
    '/sectionassign',
    view_func=ass_post_view,
    methods=['POST']
)

sectionassigned_blueprint.add_url_rule(
    '/sectionassign',
    view_func=ass_get_view,
    methods=['GET']
)
