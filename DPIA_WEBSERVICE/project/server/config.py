# project/server/config.py
import logging
import os
basedir = os.path.abspath(os.path.dirname(__file__))


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
    ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','zip'])
    SECURITY_TOKEN_MAX_AGE = 60 * 60
    SECURITY_CONFIRMABLE = False
    STRIPE_SECRET_KEY = 'sk_test_KB4Sp4oDTWwoFVs7nRCghq19'
    STRIPE_PUBLISHABLE_KEY = 'pk_test_8GFMVG84f1x5PZOkP0jW4TFQ'


class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:root@localhost/bloodhound'.format(
       os.path.join(basedir, 'dev.db'))
    #SQLALCHEMY_DATABASE_URI = 'postgresql://bloodhound:bloodhound@35.169.62.69/bloodhound'.format(
     #   os.path.join(basedir, 'dev.db'))
    SQLALCHEMY_POOL_SIZE = 50
    SQLALCHEMY_MAX_OVERFLOW = 20
    DEBUG_TB_ENABLED = True
    JWT_SECRET_KEY = 'another_super_awesome_secret_stuff_yo.'
    SECRET_KEY = 'not-so-super-secret'


class TestingConfig(BaseConfig):
    """Testing configuration."""
    DEBUG = True
    TESTING = True
    BCRYPT_LOG_ROUNDS = 4
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:root@localhost/bloodhound'
    #SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:tang3456@35.169.62.69/bloodhound'
    SQLALCHEMY_POOL_SIZE = 50
    SQLALCHEMY_MAX_OVERFLOW = 20
    DEBUG_TB_ENABLED = False
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    JWT_SECRET_KEY = 'another_super_awesome_secret_stuff_yo.'
    SECRET_KEY = 'not-so-super-secret'


class ProductionConfig(BaseConfig):
    """Production configuration."""
    SECRET_KEY = 'my_precious'
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:root@localhost/bloodhound'
    #SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:tang3456@35.169.62.69/bloodhound'
    SQLALCHEMY_POOL_SIZE = 50
    SQLALCHEMY_MAX_OVERFLOW = 20
    DEBUG_TB_ENABLED = False
    JWT_SECRET_KEY = 'another_super_awesome_secret_stuff_yo.'
    SECRET_KEY = 'not-so-super-secret'