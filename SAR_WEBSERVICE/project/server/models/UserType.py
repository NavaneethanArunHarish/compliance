"""
 * @author Dhinakar Panneer Selvam
 * Date Created: 01/21/2018
 """

import enum


class UserType(enum.Enum):
    EXTERNAL = "External user"
    REP = "Representative"
    ADMIN = "Administrator"
    CC = "ComplianceTeamMember"
    DPO = "DPO"