from flask import Blueprint, \
    request, make_response, jsonify, Flask

from project.server import db

from project.server.models.User import Users
from project.server.models.Address import Address
from project.server.models.Sar import Sar

from project.server.models.Department import Department
from project.server.models.SARResponse import SARResponse
from project.server.models.sar_attachment import sar_attachment
from project.server.models.Ticket import Ticket
from project.server.models.TicketInfo import TicketInfo

#from datetime import datetime

import datetime

user_group = None
user_id = None


def get_sar_service(user_group,user_id):

        if user_group=='Group1':
            print("----------->admin")
            get_sar = Sar.query.all()
            all_sar = []
            for sar in get_sar:
                for tic in sar.ticketinfo.all():
                    for dep in tic.department.all():
                        print("Inside address--->", dep.name)
                all_sar.append(sar.to_dict())
            return all_sar

        if user_group == 'Group2':
            delay = datetime.datetime.now() + datetime.timedelta(days=30)
            print("inside--inservice----------->External",delay)
            get_sar = Sar.query.filter(Sar.user_id==user_id,Sar.completionTime <= delay)
            all_sar = []
            for sar in get_sar:
                for tic in sar.ticketinfo.all():
                    for dep in tic.department.all():
                        print("Inside address--->", dep.name)
                all_sar.append(sar.to_dict())
            return all_sar

        if user_group == 'Group2':

            get_sar = Sar.query.filter(Sar.user_id == user_id)
            all_sar = []
            for sar in get_sar:
                for tic in sar.ticketinfo.all():
                    for dep in tic.department.all():
                        print("Inside address--->", dep.name)
                all_sar.append(sar.to_dict())
            return all_sar


        if user_group == 'Group3':

            get_sar = Sar.query.filter(Sar.assignedTo == user_id)
            all_sar = []
            for sar in get_sar:
                for tic in sar.ticketinfo.all():
                    for dep in tic.department.all():
                        print("Inside address--->", dep.name)
                all_sar.append(sar.to_dict())
            return all_sar

        if user_group == 'Group3':

            get_sar = Sar.query.filter(Sar.assignedTo == user_id)
            all_sar = []
            for sar in get_sar:
                for tic in sar.ticketinfo.all():
                    for dep in tic.department.all():
                        print("Inside address--->", dep.name)
                all_sar.append(sar.to_dict())
            return all_sar

        if user_group == 'Group1':

            get_sar = Sar.query.filter(Sar.user_id == user_id)
            all_sar = []
            for sar in get_sar:
                for tic in sar.ticketinfo.all():
                    for dep in tic.department.all():
                        print("Inside address--->", dep.name)
                all_sar.append(sar.to_dict())
            return all_sar
