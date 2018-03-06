# project/server/__init__.py


import os

from flask import Flask, render_template
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_debugtoolbar import DebugToolbarExtension
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


# instantiate the extensions
login_manager = LoginManager()
bcrypt = Bcrypt()
# toolbar = DebugToolbarExtension()
bootstrap = Bootstrap()
db = SQLAlchemy()
migrate = Migrate()


def create_app(script_info=None):

    # instantiate the app
    app = Flask(
        __name__,
        # template_folder='../client/templates',
        static_folder='../client/static'
    )

    # set config
    app_settings = os.getenv(
        'APP_SETTINGS', 'project.server.config.DevelopmentConfig')
    app.config.from_object(app_settings)

    # set up extensions
    # login_manager.init_app(app)
    bcrypt.init_app(app)
    # toolbar.init_app(app)
    bootstrap.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    # register blueprints
    from project.server.main.views import main_blueprint
    from project.server.projects.views import projects_blueprint
    from project.server.assessment.views import assessment_blueprint
    from project.server.section.views import section_blueprint
    from project.server.question.views import question_blueprint
    from project.server.answer.views import answer_blueprint
    from project.server.attachments.views import attachments_blueprint
    from project.server.action.views import action_blueprint
    from project.server.DPIAuditViews.views import dpiaudit_blueprint
    from project.server.QuesAssigned.views import quesassigned_blueprint
    from project.server.SectionAssigned.views import sectionassigned_blueprint
    from project.server.assignassessment.views import assessmentassigned_blueprint
    app.register_blueprint(main_blueprint)
    app.register_blueprint(projects_blueprint)
    app.register_blueprint(assessment_blueprint)
    app.register_blueprint(section_blueprint)
    app.register_blueprint(question_blueprint)
    app.register_blueprint(answer_blueprint)
    app.register_blueprint(attachments_blueprint)
    app.register_blueprint(action_blueprint)
    app.register_blueprint(dpiaudit_blueprint)
    app.register_blueprint(quesassigned_blueprint)
    app.register_blueprint(sectionassigned_blueprint)
    app.register_blueprint(assessmentassigned_blueprint)


    # error handlers
    @app.errorhandler(401)
    def unauthorized_page(error):
        return "a", 401

    @app.errorhandler(403)
    def forbidden_page(error):
        return "a", 403

    @app.errorhandler(404)
    def page_not_found(error):
        return "a", 404

    @app.errorhandler(500)
    def server_error_page(error):
        return "a", 500

    # shell context for flask cli
    app.shell_context_processor({'app': app, 'db': db})

    return app
