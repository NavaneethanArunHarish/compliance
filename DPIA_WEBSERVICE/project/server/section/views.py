# project/server/auth/views.py

import datetime

from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from project.server import bcrypt, db
from project.server.models.Section import Section
from project.server.models.Question import Question
from flask_cors import CORS
from flask_sqlalchemy import Pagination
section_blueprint = Blueprint('section', __name__)
CORS(section_blueprint)


class SectionPOSTAPI(MethodView):
    def post(self):
        print(request.get_json())
        post_data = request.get_json()
        try:
            for i in post_data:
                secObj = Section(
                    name=i.get('name'),
                    owner_id=i.get('owner_id'),
                    parentSectionId=i.get('parentSectionId'),
                    assessment_id=i.get('assessment_id')
                )
                db.session.add(secObj)
                db.session.commit()
                print(secObj.to_dict())

            responseObject = {
                "id":secObj.id,
                "name":secObj.name,
                "owner_id":secObj.owner_id,
                "parentSectionId":secObj.parentSectionId,
                "assessment_id":secObj.assessment_id
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
            assessments = Section.query.all()
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

@section_blueprint.route('/section_pro', methods=['GET'])
def section_manipulation(**kwargs):
    assid = request.args.get("assid")
    try:
        sections = Section.query.filter_by(assessment_id=assid).all()
        assessmentArr = []
        for section in sections:
            quesStatus = Question.query.filter_by(section_id=section.id).all();
            status = 'none'
            checkStatus = []
            # print("status------quesStatus-------->> ", quesStatus.count(True))
            for ques in quesStatus:
                if ques.isAnswered:
                    checkStatus.append(ques.isAnswered)

            if len(checkStatus) == len(quesStatus):
                status = 'full'

            elif 0 < len(checkStatus) < len(quesStatus):
                status = 'partial'

            section.status=status

            assessmentArr.append(section.to_dict())
        return jsonify(assessmentArr)
    except Exception as e:
        print(e)
        responseObject = {
            'status': 'fail',
            'message': 'Some error occurred. Please try again.'
        }
        return make_response(jsonify(responseObject)), 401

@section_blueprint.route('/section/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def bucketlist_manipulation(id, **kwargs):
    gotData = Section.query.filter_by(id=id).first()

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

            gotData.name = obj.get('name')
            gotData.owner_id = obj.get('owner_id')
            gotData.parentSectionId = obj.get('parentSectionId')
            gotData.assessment_id = obj.get('assessment_id')
            gotData.modified_date = datetime.datetime.now()

            db.session.add(gotData)
            db.session.commit()

            response = {
                "id":gotData.id,
                "name":gotData.name,
                "owner_id":gotData.owner_id,
                "parentSectionId":gotData.parentSectionId,
                "assessment_id":gotData.assessment_id,
                'message':"Updated successfully"
            }
            return make_response(jsonify(response)), 200
        else:
            return "Error while updating"
    else:
        if(gotData):
            response = {
                "id":gotData.id,
                "owner_id":gotData.owner_id,
                "parentSectionId":gotData.parentSectionId,
                "assessment_id":gotData.assessment_id,
                'message': "Retrieved successfully"
            }
            return make_response(jsonify(response)), 200
        else:
            return "Error while fetching data"

# define the API resources


ass_post_view = SectionPOSTAPI.as_view('sec_post_api')
ass_get_view = SectionGETAPI.as_view('sec_get_api')

section_blueprint.add_url_rule(
    '/section',
    view_func=ass_post_view,
    methods=['POST']
)

section_blueprint.add_url_rule(
    '/section',
    view_func=ass_get_view,
    methods=['GET']
)
