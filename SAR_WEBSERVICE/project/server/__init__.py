# project/server/__init__.py
import logging
import os

from flask import Flask, render_template, jsonify
from flask_bcrypt import Bcrypt
from flask_bootstrap import Bootstrap
from flask_debugtoolbar import DebugToolbarExtension
from flask_jwt_extended import JWTManager
from flask_login import LoginManager, current_user
from flask_migrate import Migrate
from flask_permissions.core import Permissions
from flask_sqlalchemy import SQLAlchemy

# instantiate the extensions
login_manager = LoginManager()
bcrypt = Bcrypt()
toolbar = DebugToolbarExtension()
bootstrap = Bootstrap()
db = SQLAlchemy()
migrate = Migrate()


def create_app():

    # instantiate the app
    app = Flask(__name__)
    app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
    app.config['MAX_CONTENT_LENGTH'] = 1000000
    JWTManager(app)
    # babel = Babel(app)
    # set config
    app_settings = os.getenv(
        'APP_SETTINGS', 'project.server.config.TestingConfig')
    app.config.from_object(app_settings)
    # Configure logging
    handler = logging.FileHandler(app.config['LOGGING_LOCATION'])
    handler.setLevel(app.config['LOGGING_LEVEL'])
    formatter = logging.Formatter(app.config['LOGGING_FORMAT'])
    handler.setFormatter(formatter)
    app.logger.addHandler(handler)

    # set up extensions
    login_manager.init_app(app)
    Permissions(app, db, current_user)
    bcrypt.init_app(app)
    toolbar.init_app(app)
    bootstrap.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    # register blueprints
    from project.server.ticket.views import ticket_blueprint
    from project.server.main.views import main_blueprint
    from project.server.user.views import user_blueprint
    from project.server.sar.views import sar_blueprint
    from project.server.department.views import department_blueprint
    from project.server.payment.views import stripe_blueprint
    from project.server.license.views import license_blueprint
    from project.server.user_group import user_group_blueprint
    from project.server.ticket_info.views import ticket_info
    from project.server.moodle.views import moodle_blueprint
    from project.server.email_audit.views import mail_blueprint
    app.register_blueprint(moodle_blueprint)
    app.register_blueprint(ticket_blueprint)
    app.register_blueprint(main_blueprint)
    app.register_blueprint(user_blueprint)
    app.register_blueprint(sar_blueprint)
    app.register_blueprint(department_blueprint)
    app.register_blueprint(stripe_blueprint)
    app.register_blueprint(user_group_blueprint)
    app.register_blueprint(license_blueprint)
    app.register_blueprint(ticket_info)
    app.register_blueprint(mail_blueprint)
    from project.server.user_group import user_group_blueprint

    # flask login
    from project.server.models.Ticket import Ticket
    login_manager.login_view = 'ticket.login'
    login_manager.login_message_category = 'danger'

    @login_manager.user_loader
    def load_user(user_id):
        print("Inside user_loader-->", user_id)
        app.logger.info('user_loader: %s', user_id)
        test = Ticket.query.filter(Ticket.id == int(user_id)).first()
        type(test)
        return test

        return app

    # error handlers
    @app.errorhandler(401)
    def unauthorized_page(error):
        app.logger.error('Unauthorized: %s', error)
        return "You are not authorized to view this page.", 401

    @app.errorhandler(403)
    def forbidden_page(error):
        app.logger.error('Unauthorized: %s', error)
        return render_template('errors/403.html')

    @app.errorhandler(404)
    def page_not_found(error):
        app.logger.error('Page doesn"t exist: %s', error)
        return "Sorry. The requested page doesn't exist.", 404

    @app.errorhandler(500)
    def server_error_page(error):
        return "Sorry. Something went terribly wrong.", 500

    @app.errorhandler(413)
    def file_size_error(error):
        return jsonify({'error': 'File size exceeded.'}), 413

    return app
