# project/server/main/views.py


from flask import render_template, Blueprint


main_blueprint = Blueprint('main', __name__,)


@main_blueprint.route('/')
def home():
    return "a"


@main_blueprint.route("/about/")
def about():
    return "b"
