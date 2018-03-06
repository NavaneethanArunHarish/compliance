# project/server/auth/views.py

import datetime

from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from project.server import bcrypt, db
from project.server.models.Answer import Answer
from flask_cors import CORS

answer_blueprint = Blueprint('answer', __name__)
CORS(answer_blueprint)


class AnswerPOSTAPI(MethodView):
    def post(self):

        post_data = request.get_json()
        try:
            assessments = Answer.query.filter_by(question_id=post_data.get('question_id')).first()
            if(assessments):
                assessments.comments = post_data.get('comments')
                assessments.answer_sel = post_data.get('answer_sel')
                db.session.add(assessments)
                db.session.commit()
                return make_response(jsonify(assessments)), 200
            else:
                assObj = Answer(
                    question_id=post_data.get('question_id'),
                    section_id=post_data.get('section_id'),
                    comments=post_data.get('comments'),
                    answer_sel=post_data.get('answer_sel')
                )
                db.session.add(assObj)
                db.session.commit()
                print(assObj.to_dict())
                responseObject = {
                        "question_id":assObj.question_id,
                        "section_id":assObj.section_id,
                        "comments":assObj.comments,
                        "answer_sel":assObj.answer_sel
                }
                return make_response(jsonify(responseObject)), 200
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject)), 401


class AnswerGETAPI(MethodView):
    def get(self):
        try:
            assessments = Answer.query.all()
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

@answer_blueprint.route('/answer_pro', methods=['GET'])
def assess_manipulation(**kwargs):
    qid = request.args.get("qid")
    print (qid)
    try:
        assessments = Answer.query.filter_by(question_id=qid).all()
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
# @answer_blueprint.route('/answer_pro', method=['GET'])
# def answer_manipulation(**kwargs):
#     qid = request.args.get("qid")
#     try:
#         answers = Answer.query.filter_by(question_id = qid).all()
#         answerArr = []
#         for answer in answers:
#             answerArr.append(answer.to_dict())
#             return jsonify(answerArr)
#     except Exception as e:
#         responseObject ={
#             'status': 'fail',
#             'message': 'Some error occurred. Please try again.'
#         }
#         return make_response(jsonify(responseObject)), 401

@answer_blueprint.route('/answer/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def bucketlist_manipulation(id, **kwargs):
    gotData = Answer.query.filter_by(id=id).first()

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
            print("===-=-=-=->Obj",obj)
            # gotData.active = obj.get('active')
            gotData.question_id = obj.get('question_id')
            gotData.section_id = obj.get('section_id')
            gotData.comments = obj.get('comments')
            gotData.answer_sel = obj.get('answer_sel')
            gotData.modified_date = datetime.datetime.now()

            db.session.add(gotData)
            db.session.commit()

            response = {
                "id":gotData.id,
                "question_id":gotData.question_id,
                "section_id":gotData.section_id,
                "comments":gotData.comments,
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
                "comments":gotData.comments,
                'message': "Retrieved successfully"
            }
            return make_response(jsonify(response)), 200
        else:
            return "Error while fetching data"

# define the API resources


ans_post_view = AnswerPOSTAPI.as_view('ans_post_api')
ass_get_view = AnswerGETAPI.as_view('ass_get_api')

answer_blueprint.add_url_rule(
    '/answer',
    view_func=ans_post_view,
    methods=['POST']
)


answer_blueprint.add_url_rule(
    '/answer',
    view_func=ass_get_view,
    methods=['GET']
)
