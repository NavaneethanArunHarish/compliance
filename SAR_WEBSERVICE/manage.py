# manage.py


import unittest
import coverage

from flask import Flask
from flask_login import current_user
from flask_permissions.core import Permissions
from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand
from flask_cors import CORS, cross_origin

from project.server import create_app, db

from flask_jwt_simple import (
    JWTManager, jwt_required, create_jwt, get_jwt_identity, get_jwt
)

# code coverage
COV = coverage.coverage(
    branch=True,
    include='project/*',
    omit=[
        'project/tests/*',
        'project/server/config.py',
        'project/server/*/__init__.py'
    ]
)
COV.start()
app1 = Flask(__name__)
perms = Permissions(app1, db, current_user)
app = create_app()
jwt = JWTManager(app)
CORS(app, max_age=600)

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command("runserver",Server(
     use_debugger = True,
     use_reloader = True,
     threaded=True,
     host = '0.0.0.0')
)

# migrations
manager.add_command('db', MigrateCommand)


@manager.command
def test():
    """Runs the unit tests without test coverage."""
    tests = unittest.TestLoader().discover('project/tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1


@manager.command
def cov():
    """Runs the unit tests with coverage."""
    tests = unittest.TestLoader().discover('project/tests')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        COV.html_report()
        COV.erase()
        return 0
    return 1


@manager.command
def create_db():
    """Creates the db tables."""
    db.create_all()


@manager.command
def drop_db():
    """Drops the db tables."""
    db.drop_all()


# @manager.command
# def create_admin():
#     """Creates the admin user."""
#     db.session.add(user(email='ad@min.com', password='admin', admin=True))
#     db.session.commit()


@manager.command
def create_data():
    """Creates sample data."""
    pass


if __name__ == '__main__':
    manager.run()
