# project/server/auth/views.py

import datetime

from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from project.server import bcrypt, db
from project.server.models.QuesAssigned import QuesAssigned
from project.server.models.Question import Question
from flask_cors import CORS

quesassigned_blueprint = Blueprint('questionassigned', __name__)
CORS(quesassigned_blueprint)


class SectionPOSTAPI(MethodView):
    def post(self):

        post_data = request.get_json()
        try:
            secObj = QuesAssigned(
                question_id=post_data.get('question_id'),
                assignedTo=post_data.get('assignedTo'),
                assignedBy=post_data.get('assignedBy'),
                section_id=post_data.get('section_id'),
                assessment_id=post_data.get('assessment_id')
            )
            db.session.add(secObj)
            db.session.commit()
            print(secObj.to_dict())
            responseObject = {
                "id":secObj.id,
                "question_id":secObj.question_id,
                "assignedTo":secObj.assignedTo,
                "assignedBy":secObj.assignedBy,
                "section_id":secObj.section_id,
                "assessment_id":secObj.assessment_id
            }
            return make_response(jsonify(responseObject)), 200
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': e
            }
            return make_response(jsonify(responseObject)), 500


@quesassigned_blueprint.route('/qassigned', methods=['GET'])
def assigned_manipulation(**kwargs):
    uid = request.args.get("uid")
    try:
        assignedData = QuesAssigned.query.filter_by(assignedTo=uid).all()

        assessmentArr = []
        for section in assignedData:
            details = Question.query.filter_by(id=section.question_id).first();

            print("-assisend table-->> ", section)
            print("--question table->> ", details)
            status = 'none'
            checkStatus = []
            # print("status------quesStatus-------->> ", quesStatus.count(True))
            # json = {
            #     "question_id": section['question_id'],
            #     "assignedTo": section['assignedTo'],
            #     "assignedBy": section['assignedBy'],
            #     "section_id": section['section_id'],
            #     "assessment_id": section['assessment_id'],
            #     "question_label": details['question_label']
            # }

            section.question_label = details.question_label


            assessmentArr.append(section.to_dict())
        return jsonify(assessmentArr)
    except Exception as e:
        print(e)
        responseObject = {
            'status': 'fail',
            'message': e
        }
        return make_response(jsonify(responseObject)), 500


class SectionGETAPI(MethodView):
    def get(self):
        try:
            assessments = QuesAssigned.query.all()
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


@quesassigned_blueprint.route('/quesassigned/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def bucketlist_manipulation(id, **kwargs):
    gotData = QuesAssigned.query.filter_by(id=id).first()

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
    #         gotData.question_id = obj.get('question_id')
    #         gotData.assignedTo = obj.get('assignedTo')
    #         gotData.modified_date = datetime.datetime.now()
    #
    #         db.session.add(gotData)
    #         db.session.commit()
    #
    #         response = {
    #             "id":gotData.name,
    #             "question_id":gotData.question_id,
    #             "assignedTo":gotData.assignedTo,
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

quesassigned_blueprint.add_url_rule(
    '/quesassigned',
    view_func=ass_post_view,
    methods=['POST']
)

quesassigned_blueprint.add_url_rule(
    '/quesassigned',
    view_func=ass_get_view,
    methods=['GET']
)
