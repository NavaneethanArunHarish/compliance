from flask import Blueprint, \
    request, Flask
from project.server.models.TicketInfo import TicketInfo
from project.server.wrapper import views as wrapper
import logging
from flask_jwt_simple import (
    JWTManager, jwt_required, create_jwt, get_jwt_identity, get_jwt)
import json


app = Flask(__name__, template_folder='template')
ticket_info = Blueprint('ticketinfo', __name__)


@ticket_info.route('/ticket_info/<int:sar_id>', methods=['GET'])
@jwt_required
def getInfoBySarId(sar_id):
    if request.method == 'GET':
        logging.info('get ticket info method')
        all_info = []
        logging.info('get ticket info db call')
        info = TicketInfo.query.filter_by(sar_id=sar_id).all()
        logging.info('get ticket info db success')
        for i in info:
            #all_info.append(i.to_dict())
            json = {
              "department":i.__dict__['department'].to_dict(),
              "sar":i.__dict__['sar'].to_dict(),
              "ticket":i.__dict__['tickets'].to_dict(),
              "user": i.__dict__['sar'].__dict__['user'].to_dict()
             }
            all_info.append(json)
        logging.info('get ticket info db Exiting')
        return wrapper.wrapper(all_info, "Getting all ticket info by sar id.", 200), 200
