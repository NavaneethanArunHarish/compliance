# project/server/auth/views.py

import datetime

from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from project.server import bcrypt, db
from project.server.models.AssessmentAssigned import AssessmentAssigned
from flask_cors import CORS

assessmentassigned_blueprint = Blueprint('assessmentassigned', __name__)
CORS(assessmentassigned_blueprint)


class SectionPOSTAPI(MethodView):
    def post(self):

        post_data = request.get_json()
        try:
            gotData = AssessmentAssigned.query.filter_by(assessment_id=post_data.get('assessment_id')).first()
            if (gotData):
                gotData.assessment_id = post_data.get('assessment_id')
                gotData.assignedTo = post_data.get('assignedTo')
                gotData.assginedBy = post_data.get('assginedBy')
                gotData.modified_date = datetime.datetime.now()

                db.session.add(gotData)
                db.session.commit()

                responseObject = {
                    "id":gotData.id,
                    "assignedTo":gotData.assignedTo,
                    "assginedBy":gotData.assginedBy,
                    "assessment_id":gotData.assessment_id
                }
                return make_response(jsonify(responseObject)), 200
            else:
                secObj = AssessmentAssigned(
                    assessment_id=post_data.get('assessment_id'),
                    assignedTo=post_data.get('assignedTo'),
                    assginedBy=post_data.get('assginedBy')
                )
                db.session.add(secObj)
                db.session.commit()
                print(secObj.to_dict())
                responseObject = {
                    "assessment_id":secObj.assessment_id,
                    "assignedTo":secObj.assignedTo,
                    "assginedBy":secObj.assginedBy
                }
                return make_response(jsonify(responseObject)), 200
        except Exception as e:
            print(e)
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject)), 401


class SectionGETAPI(MethodView):
    def get(self):
        try:
            assessments = AssessmentAssigned.query.all()
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

@assessmentassigned_blueprint.route('/getassigned', methods=['GET'])
def section_manipulation(**kwargs):
    assid = request.args.get("assid")
    try:
        assessments = AssessmentAssigned.query.filter_by(assessment_id=assid).all()
        assessmentArr = []
        for assessment in assessments:
            assessmentArr.append(assessment.to_dict())
        return jsonify(assessmentArr)
    except Exception as e:
        print(e)
        responseObject = {
            'status': 'fail',
            'message': 'Some error occurred. Please try again.'
        }
        return make_response(jsonify(responseObject)), 401

@assessmentassigned_blueprint.route('/assignassmt/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def bucketlist_manipulation(id, **kwargs):
    gotData = AssessmentAssigned.query.filter_by(id=id).first()

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


@assessmentassigned_blueprint.route('/getassignedbyass/<int:assginedBy>', methods=['GET', 'DELETE'])
def assby_manipulation(assginedBy, **kwargs):
    gotData = AssessmentAssigned.query.filter_by(assginedBy=assginedBy).first()

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
    else:
        try:
            assessments = AssessmentAssigned.query.filter_by(assginedBy=assginedBy).all()
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


@assessmentassigned_blueprint.route('/getassignedtoass/<int:assignedTo>', methods=['GET', 'DELETE'])
def assignedto_manipulation(assignedTo, **kwargs):
    gotData = AssessmentAssigned.query.filter_by(assignedTo=assignedTo).first()

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
    else:
        try:
            assessments = AssessmentAssigned.query.filter_by(assignedTo=assignedTo).all()
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

# define the API resources


ass_post_view = SectionPOSTAPI.as_view('sec_post_api')
ass_get_view = SectionGETAPI.as_view('sec_get_api')

assessmentassigned_blueprint.add_url_rule(
    '/assignassmt',
    view_func=ass_post_view,
    methods=['POST']
)

assessmentassigned_blueprint.add_url_rule(
    '/assignassmt',
    view_func=ass_get_view,
    methods=['GET']
)
