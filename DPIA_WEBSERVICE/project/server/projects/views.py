# project/server/auth/views.py

import datetime

from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from project.server import bcrypt, db
from project.server.models.Projects import Projects
from flask_cors import CORS

projects_blueprint = Blueprint('projects', __name__)
CORS(projects_blueprint)


class ProjectsPOSTAPI(MethodView):
    def post(self):
        post_data = request.get_json()
        print (post_data)
        try:
            proj = Projects(
                proj_id=post_data.get('proj_id'),
                proj_name=post_data.get('proj_name'),
                proj_desc=post_data.get('proj_desc'),
                proj_status=post_data.get('proj_status'),
                created_by=post_data.get('created_by')
            )
            db.session.add(proj)
            db.session.commit()
            print(proj.to_dict())
            responseObject = {
                "id":proj.id,
                "proj_id":proj.proj_id,
                "proj_name":proj.proj_name,
                "proj_desc":proj.proj_desc,
                "proj_status": proj.proj_status,
                "created_by":proj.created_by
            }
            return make_response(jsonify(responseObject)), 200
        except Exception as e:
            print (e)
            responseObject = {
                'status': 'fail',
                'message': e
            }
            return make_response(jsonify(responseObject)), 500


class ProjectsGETAPI(MethodView):
    def get(self):
        try:
            projects = Projects.query.all()
            projArr = []
            for project in projects:
                projArr.append(project.to_dict())
            return jsonify(projArr)
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': e
            }
            return make_response(jsonify(responseObject)), 500

@projects_blueprint.route('/getprojectbyuser', methods=['GET'])
def assess_manipulation(**kwargs):
    uid = request.args.get("uid")
    print (uid)
    try:
        assessments = Projects.query.filter_by(created_by=uid).all()
        assessmentArr = []
        for assessment in assessments:
            assessmentArr.append(assessment.to_dict())
        return jsonify(assessmentArr)
    except Exception as e:
        responseObject = {
            'status': 'fail',
            'message': e
        }
        return make_response(jsonify(responseObject)), 500

@projects_blueprint.route('/projects/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def bucketlist_manipulation(id, **kwargs):
    gotData = Projects.query.filter_by(id=id).first()

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
            # proj_id = post_data.get('proj_id')
            gotData.proj_id = obj.get('proj_id')
            gotData.proj_name = obj.get('proj_name')
            gotData.proj_desc = obj.get('proj_desc')
            # gotData.modified_by = obj.get('modified_by')
            gotData.modified_date = datetime.datetime.now()

            db.session.add(gotData)
            db.session.commit()

            response = {
                    "id":gotData.id,
                    "proj_name":gotData.proj_name,
                    'message':"Updated successfully"
                }
            return make_response(jsonify(response)), 200
        else:
            return "Error while updating"
    else:
        if(gotData):
            response = {
                "id": gotData.id,
                "proj_id": gotData.proj_id,
                "proj_name": gotData.proj_name,
                "proj_desc": gotData.proj_desc,
                "proj_status":gotData.proj_status,
                'message': "Retrieved successfully"
            }
            return make_response(jsonify(response)), 200
        else:
            return "Error while fetching data"

# define the API resources


project_post_view = ProjectsPOSTAPI.as_view('proj_post_api')
project_get_view = ProjectsGETAPI.as_view('proj_get_api')

projects_blueprint.add_url_rule(
    '/projects',
    view_func=project_post_view,
    methods=['POST']
)

projects_blueprint.add_url_rule(
    '/projects',
    view_func=project_get_view,
    methods=['GET']
)
