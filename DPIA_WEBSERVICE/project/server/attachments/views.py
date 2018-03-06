# project/server/auth/views.py

import datetime
import os
from flask import Blueprint, request, make_response, jsonify, current_app, send_from_directory
from flask.views import MethodView

from project.server import bcrypt, db
from project.server.models.Attachments import Attachments
from flask_cors import CORS
from werkzeug.utils import secure_filename

attachments_blueprint = Blueprint('attachments', __name__)
CORS(attachments_blueprint)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']


class AttachmentsPOSTAPI(MethodView):
    def post(self):

        post_data = request.get_json()
        try:
            assObj = Attachments(
                fileName=post_data.get('fileName'),
                documentLink=post_data.get('documentLink'),
                answer_id=post_data.get('answer_id')
            )
            db.session.add(assObj)
            db.session.commit()
            print(assObj.to_dict())
            responseObject = {
                    "fileName":assObj.fileName,
                    "documentLink":assObj.documentLink,
                    "answer_id":assObj.answer_id
            }
            return make_response(jsonify(responseObject)), 200
        except Exception as e:
            print(e)
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            return make_response(jsonify(responseObject)), 401

@attachments_blueprint.route('/add/attachment', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No File found", 500
    else:
        question_id = request.form['question_id']
        uploaded_files = request.files.getlist("file")
        for docs in uploaded_files:
            if docs and allowed_file(docs.filename):
                filename = secure_filename(docs.filename)
                url_for_file = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                docs.save(url_for_file)
                uploadFile = Attachments(docs.filename, url_for_file, question_id)
                db.session.add(uploadFile)
                db.session.commit()
        return "File uploaded successfully!", 200

@attachments_blueprint.route('/attachment/download/<path:filename>', methods=['GET'])
# @jwt_required
def download(filename):
    # logging.info('sar download Method start')
    uploads = os.path.join(current_app.root_path, current_app.config['UPLOAD_FOLDER'])
    # logging.info('sar download Method Exiting')
    return send_from_directory(directory=uploads, filename=filename)


class AttachmentsGETAPI(MethodView):
    def get(self):
        try:
            assessments = Attachments.query.all()
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

@attachments_blueprint.route('/attachment_pro', methods=['GET'])
def assess_manipulation(**kwargs):
    qid = request.args.get("qid")
    print (qid)
    try:
        assessments = Attachments.query.filter_by(question_id=qid).all()
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
@attachments_blueprint.route('/attachment/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def bucketlist_manipulation(id, **kwargs):
    gotData = Attachments.query.filter_by(id=id).first()

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
            gotData.fileName = obj.get('fileName')
            gotData.documentLink = obj.get('documentLink')
            gotData.fileName = obj.get('fileName')
            gotData.modified_date = datetime.datetime.now()

            db.session.add(gotData)
            db.session.commit()

            response = {
                "id":gotData.id,
                "fileName":gotData.fileName,
                "documentLink":gotData.documentLink,
                "answer_id":gotData.answer_id,
                'message':"Updated successfully"
            }
            return make_response(jsonify(response)), 200
        else:
            return "Error while updating"
    else:
        if(gotData):
            response = {
                "id":gotData.id,
                "fileName":gotData.fileName,
                "documentLink":gotData.documentLink,
                "answer_id":gotData.answer_id,
                'message': "Retrieved successfully"
            }
            return make_response(jsonify(response)), 200
        else:
            return "Error while fetching data"

# define the API resources

att_post_view = AttachmentsPOSTAPI.as_view('att_post_api')
ass_get_view = AttachmentsGETAPI.as_view('ass_get_api')

attachments_blueprint.add_url_rule(
    '/attachment',
    view_func=att_post_view,
    methods=['POST']
)


attachments_blueprint.add_url_rule(
    '/attachment',
    view_func=ass_get_view,
    methods=['GET']
)
