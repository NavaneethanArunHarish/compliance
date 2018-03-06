# project/server/auth/views.py

import datetime

from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from project.server import bcrypt, db
from project.server.models.ActionNote import ActionNote
from flask_cors import CORS

action_blueprint = Blueprint('action_note', __name__)
CORS(action_blueprint)



@action_blueprint.route('/action', methods=['POST', 'GET'])
def create_action():
    print("Entering method")
    if request.method == 'POST':
        json_data = request.json
        print("data method-------->",json_data)
        model_data= ActionNote(json_data)
        db.session.add(model_data)
        db.session.commit()
        return make_response("added success"), 200

    if request.method == 'GET':
        get_ActionNote = ActionNote.query.all()
        all_Action = []
        for actionNote in get_ActionNote:
            all_Action.append(actionNote.to_dict())
        print("Exiting method")
        return make_response(jsonify(all_Action)), 200

@action_blueprint.route('/action_pro', methods=['GET'])
def section_manipulation(**kwargs):
    qid = request.args.get("qid")
    try:
        assessments = ActionNote.query.filter_by(question_id=qid).all()
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

@action_blueprint.route('/action_pro/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def bucket_manipulation(id, **kwargs):
    gotData = ActionNote.query.filter_by(id=id).first()
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
            print("objecData,",obj)
            # gotData.active = obj.get('active')
            gotData.owner_id = obj.get('owner_id')
            gotData.section_id = obj.get('section_id')
            gotData.question_id = obj.get('question_id')
            gotData.modified_date = datetime.datetime.now()
            print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>",gotData)
            db.session.add(gotData)
            db.session.commit()
            response = {
                "id":gotData.id,
                "question_id": gotData.question_id,
                "owner_id": gotData.owner_id,
                "type": gotData.type,
                'message':"Updated successfully"
            }
            return make_response(jsonify(response)), 200
        else:
            return "Error while updating"
    else:
        if(gotData):
            print(gotData)
            response = {
                "id":gotData.id,
                "question_id": gotData.question_id,
                "owner_id": gotData.owner_id,
                "type": gotData.type,
                'message': "Retrieved successfully"
            }
            return make_response(jsonify(response)), 200
        else:
            return "Error while fetching data"

# define the API resources


#act_post_view = ActionPOSTAPI.as_view('act_post_api')
#act_get_view = ActionGETAPI.as_view('act_get_api')

#action_blueprint.add_url_rule(
#    '/action',
#    view_func=act_post_view,
#    methods=['POST']
#)


#action_blueprint.add_url_rule(
#    '/action',
#    view_func=act_get_view,
#    methods=['GET']
#)

