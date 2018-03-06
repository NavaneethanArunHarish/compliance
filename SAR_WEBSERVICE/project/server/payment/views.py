
from flask import Flask, render_template, request, current_app, Blueprint, make_response, jsonify
from project.server.models.PaymentPlans import PaymentPlans
from flask_jwt_simple import (
    JWTManager, jwt_required, create_jwt, get_jwt_identity, get_jwt)
import stripe
import sqlalchemy
from project.server import db

app = Flask(__name__, template_folder='template')
stripe_blueprint = Blueprint('stripe', __name__)


@stripe_blueprint.route('/stripe')
@jwt_required
def index():
    stripe.api_key = current_app.config['STRIPE_SECRET_KEY']
    plan = PaymentPlans.query.first()
    amount = plan.amount
    return render_template('index.html', key=current_app.config['STRIPE_PUBLISHABLE_KEY'], amount=amount)


@stripe_blueprint.route('/charge', methods=['POST'])
@jwt_required
def charge():
    stripe.api_key = current_app.config['STRIPE_SECRET_KEY']
    data = request.json
    plan = PaymentPlans.query.first()
    print("Selected plan-->", plan.name)

    # Amount in cents
    amount = plan.amount

    customer = stripe.Customer.create(
        email=data['email'],
        source=data['id'],
        key=current_app.config['STRIPE_PUBLISHABLE_KEY']
    )

    charge = stripe.Charge.create(
        customer=customer.id,
        amount=data['amount'],
        currency='usd',
        description=data['description']
    )

    return jsonify(charge)


@stripe_blueprint.route('/payment_plans', methods=['POST', 'GET'])
@jwt_required
def create_payment():
    if request.method == 'POST':
        json_data = request.json

        model_data= PaymentPlans(json_data)
        try:
            db.session.add(model_data)
            db.session.commit()
        except (sqlalchemy.exc.SQLAlchemyError, sqlalchemy.exc.DBAPIError) as e:
            db.session.rollback()
        return "Success", 201

    if request.method == 'GET':
        get_departments = PaymentPlans.query.all()
        all_depts = []
        for departments in get_departments:
            all_depts.append(departments.to_dict())
        return make_response(jsonify(all_depts)), 200