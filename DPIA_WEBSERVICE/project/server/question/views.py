# project/server/auth/views.py

import datetime

from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from project.server import bcrypt, db
from project.server.models.Question import Question
from flask_cors import CORS

question_blueprint = Blueprint('question', __name__)
CORS(question_blueprint)


class QuestionPOSTAPI(MethodView):
    def post(self):

        post_data = request.get_json()
        print (post_data)
        try:
            quesObj = Question(
                question_type=post_data.get('question_type'),
                question_label=post_data.get('question_label'),
                section_id=post_data.get('section_id'),
                action_status=post_data.get('action_status'),
                owner_id=post_data.get('owner_id'),
                comments=post_data.get('comments'),
                isAnswered = False,
                risk_weightage_status=post_data.get('risk_weightage_status')
            )
            db.session.add(quesObj)
            db.session.commit()
            print(quesObj.to_dict())
            responseObject = {
                "id":quesObj.id,
                "question_type":quesObj.question_type,
                "question_label": quesObj.question_label,
                "section_id": quesObj.section_id,
                "action_status": quesObj.action_status,
                "owner_id":quesObj.owner_id,
                "comments": quesObj.comments,
                "risk_weightage_status": quesObj.risk_weightage_status
            }

            return make_response(jsonify(responseObject)), 200
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject)), 401


class QuestionGETAPI(MethodView):
    def get(self):
        try:
            assessments = Question.query.all()
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
@question_blueprint.route('/question/page/<int:page>', methods=['GET'])
def question_page(page):
    per_page = 10
    if request.method == 'GET':
        all_sections = []
        section_page = Question.query.paginate(page, per_page, False)
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

@question_blueprint.route('/question_pro', methods=['GET'])
def section_manipulation(**kwargs):
    sid = request.args.get("sid")
    try:
        assessments = Question.query.filter_by(section_id=sid).all()
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

@question_blueprint.route('/question/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def bucketlist_manipulation(id, **kwargs):
    gotData = Question.query.filter_by(id=id).first()

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
            gotData.question_type = obj.get('question_type')
            gotData.question_label = obj.get('question_label')
            gotData.section_id = obj.get('section_id')
            gotData.action_status = obj.get('action_status')
            gotData.comments = obj.get('comments')
            gotData.isAnswered = obj.get('isAnswered')
            gotData.risk_weightage_status = obj.get('risk_weightage_status')
            gotData.modified_date = datetime.datetime.now()

            db.session.add(gotData)
            db.session.commit()

            response = {
                "id":gotData.id,
                "question_type":gotData.question_type,
                "question_label": gotData.question_label,
                "section_id": gotData.section_id,
                "action_status": gotData.action_status,
                "owner_id":gotData.owner_id,
                "comments": gotData.comments,
                "isAnswered": gotData.isAnswered,
                "risk_weightage_status": gotData.risk_weightage_status,
                'message':"Updated successfully"
            }
            return make_response(jsonify(response)), 200
        else:
            return "Error while updating"
    else:
        if(gotData):
            response = {
                "id":gotData.id,
                "question_type":gotData.question_type,
                "question_label": gotData.question_label,
                "section_id": gotData.section_id,
                "action_status": gotData.action_status,
                "owner_id":gotData.owner_id,
                "comments": gotData.comments,
                "isAnswered": gotData.isAnswered,
                "risk_weightage_status": gotData.risk_weightage_status,
                'message': "Retrieved successfully"
            }
            return make_response(jsonify(response)), 200
        else:
            return "Error while fetching data"

# define the API resources


ques_post_view = QuestionPOSTAPI.as_view('ques_post_api')
ques_get_view = QuestionGETAPI.as_view('ques_get_api')

question_blueprint.add_url_rule(
    '/question',
    view_func=ques_post_view,
    methods=['POST']
)

question_blueprint.add_url_rule(
    '/question',
    view_func=ques_get_view,
    methods=['GET']
)
