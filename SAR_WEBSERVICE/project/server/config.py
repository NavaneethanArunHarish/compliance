# project/server/config.py
import logging
import sqlalchemy
import os
basedir = os.path.abspath(os.path.dirname(__file__))
logging.basicConfig(filename='exampleSar.log', level=logging.INFO)
logging.getLogger('sqlalchemy.engine').setLevel(logging.ERROR)
engine = sqlalchemy.create_engine('postgresql://postgres:tang3456@mydb/bloodhound', echo=True)


class BaseConfig(object):
    """Base configuration."""
    SECRET_KEY = '1d94e52c-1c89-4515-b87a-f48cf3cb7f0b'
    SECURITY_PASSWORD_SALT = 'my-precious'
    DEBUG = False
    BCRYPT_LOG_ROUNDS = 13
    WTF_CSRF_ENABLED = True
    DEBUG_TB_ENABLED = False
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    LOGGING_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    LOGGING_LOCATION = 'cc-service.log'
    LOGGING_LEVEL = logging.DEBUG
    UPLOAD_FOLDER = '/opt/SAR_Ticket_Creation/uploaded_file'
    ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
    DEFAULT_COMPANY_NAME = " Compliance Compedium"
    SECURITY_TOKEN_MAX_AGE = 60 * 60
    SECURITY_CONFIRMABLE = False
    STRIPE_SECRET_KEY = 'sk_test_KB4Sp4oDTWwoFVs7nRCghq19'
    STRIPE_PUBLISHABLE_KEY = 'pk_test_8GFMVG84f1x5PZOkP0jW4TFQ'
    BASE_URL = 'ccstest.compliancecompendium.co.uk'
    SERVICE_URL = '35.169.62.69:5000'


class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_POOL_SIZE = 50
    SQLALCHEMY_MAX_OVERFLOW = 20
    SQLALCHEMY_DATABASE_URI = 'postgresql://bloodhound:bloodhound@mydb/bloodhound'.format(
        os.path.join(basedir, 'dev.db'))
    SQLALCHEMY_BINDS = {
        'moodle': 'mysql+pymysql://moodle:moodle@35.169.62.69:3306/moodle'
    }
    DEBUG_TB_ENABLED = True
    JWT_SECRET_KEY = 'another_super_awesome_secret_stuff_yo.'
    SECRET_KEY = 'not-so-super-secret'


class TestingConfig(BaseConfig):
    """Testing configuration."""
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:root@localhost/bloodhound'.format(
        os.path.join(basedir, 'dev.db'))
    SQLALCHEMY_POOL_SIZE = 50
    SQLALCHEMY_MAX_OVERFLOW = 20
    SQLALCHEMY_BINDS = {
         'moodle': 'mysql+pymysql://root:root@localhost:3306/moodle'
    }
    DEBUG_TB_ENABLED = True
    JWT_SECRET_KEY = 'another_super_awesome_secret_stuff_yo.'
    SECRET_KEY = 'not-so-super-secret'


class ProductionConfig(BaseConfig):
    """Production configuration."""
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_POOL_SIZE = 50
    SQLALCHEMY_MAX_OVERFLOW = 20
    SQLALCHEMY_DATABASE_URI = 'postgresql://bloodhound:bloodhound@mydb/bloodhound'.format(
        os.path.join(basedir, 'dev.db'))
    SQLALCHEMY_BINDS = {
        'moodle': 'mysql+pymysql://moodle:moodle@35.169.62.69:3306/moodle'
    }
    DEBUG_TB_ENABLED = True
    JWT_SECRET_KEY = 'another_super_awesome_secret_stuff_yo.'
    SECRET_KEY = 'not-so-super-secret'
