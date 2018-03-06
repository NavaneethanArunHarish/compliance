# project/server/auth/views.py

import datetime
import sqlalchemy
from sqlalchemy import or_, and_
from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView
from project.server.models.AssessmentAssigned import AssessmentAssigned
from project.server import bcrypt, db
from project.server.models.Assessment import Assessment
from flask_cors import CORS

assessment_blueprint = Blueprint('assessment', __name__)
CORS(assessment_blueprint)

class AssessmentPOSTAPI(MethodView):
    def post(self):

        post_data = request.get_json()
        try:
            assObj = Assessment(
                name=post_data.get('name'),
                template=post_data.get('template'),
                owner_id=post_data.get('owner_id'),
                project_id=post_data.get('project_id'),
                ass_desc=post_data.get('ass_desc'),
                ass_status=post_data.get('ass_status'),
                template_id=post_data.get('template_id')
            )
            db.session.add(assObj)
            db.session.commit()
            print(assObj.to_dict())
            responseObject = {
                "id":assObj.id,
                "template": assObj.template,
                "name":assObj.name,
                "project_id":assObj.project_id,
                "ass_status":assObj.ass_status,
                "ass_desc":assObj.ass_desc,
                "sending_mail":assObj.sending_mail,
            }
            return make_response(jsonify(responseObject)), 200
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject)), 401


class AssessmentGETAPI(MethodView):
    def get(self):
        try:
            assessments = Assessment.query.all()
            assessmentArr = []
            gotDatasArr = []
            for assessment in assessments:
                gotDatas = AssessmentAssigned.query.filter_by(assessment_id=assessment.id).first()
                if(gotDatas):
                    assessment.assignedTo = gotDatas.assignedTo
                assessmentArr.append(assessment.to_dict())
            return jsonify(assessmentArr)
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject)), 401

@assessment_blueprint.route('/assessment/page/<int:page>', methods=['GET'])
def get_sar_by_page(page):
    print("testing------------------->>>>>>>>>>>>>>>>>>>.",page)
    per_page = 10
    if request.method == 'GET':
        # get_sar = Section.query.paginate(page, per_page, False, 20)
        all_sections = []
        section_page = Assessment.query.paginate(page, per_page, False)
        for page_item in section_page.items:
            all_sections.append(page_item.to_dict())

        pagination_data = {
             'has_next': section_page.has_next,
             'pages': section_page.pages,
             'has_prev': section_page.has_prev,
             'total': section_page.total,
             'page': section_page.page,
             'next_num': section_page.next_num,
             'section': all_sections
        }
        return make_response(jsonify(pagination_data)), 200

@assessment_blueprint.route('/assessment_pro', methods=['GET'])
def assess_manipulation(**kwargs):
    pid = request.args.get("pid")
    print (pid)
    try:
        assessments = Assessment.query.filter_by(project_id=pid).all()
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

@assessment_blueprint.route('/searchtemplate', methods=['GET'])
def search_assess(**kwargs):
    tname = request.args.get("tname")
    tdesc = request.args.get("tdesc")
    # print (pid)
    try:
        # assessments = Assessment.query.filter_by(template=tempval).all()
        assessmentArr = []

        if tname == '' and tdesc == '':
            print("1")
            assessments= Assessment.query.filter(Assessment.template == True).all()
            for assessment in assessments:
                assessmentArr.append(assessment.to_dict())
            return jsonify(assessmentArr)

        elif tname != '' and tdesc != '':
            print("2")
            assessments = Assessment.query.filter(
                and_(Assessment.name.contains(tname), Assessment.ass_desc.contains(tdesc), Assessment.template == True))
            for assessment in assessments:
                assessmentArr.append(assessment.to_dict())
            return jsonify(assessmentArr)

        elif tname == '' or tdesc != '':
            print("3")
            assessments = Assessment.query.filter(
                and_(Assessment.ass_desc.contains(tdesc), Assessment.template == True))
            for assessment in assessments:
                assessmentArr.append(assessment.to_dict())
            return jsonify(assessmentArr)

        elif tname != '' or tdesc == '':
            print("4")
            assessments = Assessment.query.filter(
                and_(Assessment.name.contains(tname), Assessment.template == True))
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


@assessment_blueprint.route('/assessment/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def bucketlist_manipulation(id, **kwargs):
    gotData = Assessment.query.filter_by(id=id).first()

    if request.method == "DELETE":
        if(gotData):
            db.session.delete(gotData)
            db.session.commit()
            response = {
                "id":gotData.id,
                "template": gotData.template,
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
            gotData.ass_desc = obj.get('ass_desc')
            gotData.template = obj.get('template')
            gotData.ass_status = obj.get('ass_status')
            gotData.sending_mail = obj.get('sending_mail'),
            gotData.modified_date = datetime.datetime.now()

            db.session.add(gotData)
            db.session.commit()

            response = {
                "id":gotData.id,
                "name":gotData.name,
                "ass_desc":gotData.ass_desc,
                "template": gotData.template,
                "sending_mail":gotData.sending_mail,
                'message':"Updated successfully"
            }
            return make_response(jsonify(response)), 200
        else:
            return "Error while updating"
    else:
        if(gotData):
            response = {
                "id": gotData.id,
                "name": gotData.name,
                "ass_desc": gotData.ass_desc,
                "project_id": gotData.project_id,
                "ass_status": gotData.ass_status,
                "template": gotData.template,
                "sending_mail": gotData.sending_mail,
                'message': "Retrieved successfully"
            }
            return make_response(jsonify(response)), 200
        else:
            return "Error while fetching data"

# define the API resources


ass_post_view = AssessmentPOSTAPI.as_view('ass_post_api')
ass_get_view = AssessmentGETAPI.as_view('ass_get_api')

assessment_blueprint.add_url_rule(
    '/assessment',
    view_func=ass_post_view,
    methods=['POST']
)

assessment_blueprint.add_url_rule(
    '/assessment',
    view_func=ass_get_view,
    methods=['GET']
)
