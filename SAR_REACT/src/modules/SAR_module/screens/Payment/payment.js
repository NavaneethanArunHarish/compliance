import React, { Component } from 'react';
import Header from '../../../../components/Header'
import SideBar from '../../../../components/SideBar';
import Footer from '../../../../components/Footer';
import Action from '../../../SAR_module/actions';
import PayPalButton from './PayPalButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StripeCheckout from 'react-stripe-checkout';
import { browserHistory } from 'react-router';
import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css'
import { PulseLoader } from 'react-spinners';
import { Checkbox, Radio, RadioGroup } from 'react-icheck';
import 'icheck/skins/all.css';

class paymentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            navBar: 'nav-md',
            paymentTable: [],
            currentUser: '',
            NumberOfUser: '',
            payAmout: '',
            minimum: 1,
            bindNumbers: '',
            loading: false,
            success: false,
            paymentType: 'Stripe',
            paypalPayment: false,
            stripePayment: true
        }
        this.handleNavBar = this.handleNavBar.bind(this);
        this.paymentPlans = this.paymentPlans.bind(this);
        this.getNumberOfUser = this.getNumberOfUser.bind(this);
        this.getNUmberOfLicence = this.getNUmberOfLicence.bind(this);
        this.getCurrentObj = this.getCurrentObj.bind(this);
        this.saveData = this.saveData.bind(this);
        this.licenseReponse = this.licenseReponse.bind(this);
        this.onToken = this.onToken.bind(this);
        this.AmountPaid = this.AmountPaid.bind(this);
        this.handlePaypalType = this.handlePaypalType.bind(this);
        this.handleStripeType = this.handleStripeType.bind(this);
    }
    onToken = (token) => {
        var object = {
            "id": token.id,
            "email": token.email,
            "amount": this.state.payAmout,
            "description": "Paid"
        }
        this.props.Action.AmountPaind(object, this.AmountPaid);
    }
    AmountPaid(data) {
        this.saveData()
    }

    getCurrentObj(value, index) {
        this.setState({
            payAmout: value.amount * 100,
            id: index
        })
    }
    getNUmberOfLicence(e, num) {
        for (var i = 0; i < (this.state.paymentTable).length; i++) {
            if (e.name === this.state.paymentTable[i].name) {
                var myData = { ...this.state.paymentTable }
                if ((parseInt(num.target.value) >= 100) && (parseInt(num.target.value) <= 499)) {
                    myData[i].amount = parseInt(num.target.value) * 15;
                } else if (parseInt(num.target.value) > 499) {
                    myData[i].amount = parseInt(num.target.value) * 10;
                } else if ((parseInt(num.target.value) > 0) && (parseInt(num.target.value) < 50)) {
                    myData[i].amount = 200;
                } else if ((parseInt(num.target.value) >= 50) && (parseInt(num.target.value) <= 100)) {
                    myData[i].amount = 500;
                }
                var currentData = Object.values(myData)
                this.setState({
                    paymentTable: currentData,
                    payAmout: e.amount * 100
                })
            }
        }
        this.setState({
            NumberOfUser: num.target.value
        })
    }
    componentWillMount() {
        var userId = JSON.parse(localStorage.getItem("user"));
        this.setState({
            currentUser: userId,
            loading: true
        })
        this.props.Action.getPaymentPlans(this.paymentPlans);
    }
    paymentPlans(data) {
        this.setState({
            paymentTable: data.data,
            loading: false,
            success: true
        })
    }
    handlePaypalType(e, value) {
        this.setState({
            paypalPayment: true,
            stripePayment: false,
            paymentType: value
        });
    }

    handleStripeType(e, value) {
        this.setState({
            stripePayment: true,
            paypalPayment: false,
            paymentType: value
        });
    }

    getNumberOfUser(e, index, num) {
        for (var i = 0; i < (this.state.paymentTable).length; i++) {
            if (e.name === this.state.paymentTable[i].name) {
                var myData = { ...this.state.paymentTable }
                if (parseInt(num.target.value) === 1) {
                    myData[i].amount = 200;
                } else if (parseInt(num.target.value) === 50) {
                    myData[i].amount = 500;
                } else if ((parseInt(num.target.value) >= 100) && (parseInt(num.target.value) <= 499)) {
                    myData[i].amount = 15;
                } else if (parseInt(num.target.value) > 499) {
                    myData[i].amount = 10;
                }
                var currentData = Object.values(myData)
                this.setState({
                    paymentTable: currentData,
                    payAmout: e.amount * 100
                })
            }
        }
    }
    handleNavBar(value) {
        this.setState({ navBar: value });
    }
    saveData() {
        var data = {
            "customer_id": this.state.currentUser.id,
            "customer_name": this.state.currentUser.name,
            "file": "",
            "license_type": "",
            "email": this.state.currentUser.email,
            "domain": "tesdomain",
            "no_of_users": parseInt(this.state.NumberOfUser),
            "no_of_modules": 2,
            "expary_date": "",
            "modification_time": "",
            "created_by": "test",
            "modified_by": "test"
        }
        this.props.Action.license(data, this.licenseReponse)
    }
    licenseReponse(data) {
        browserHistory.push('/sar/admin/dashboard');
    }
    render() {
        const { paymentTable, payAmout } = this.state
        return (
            <div>
                <div className={this.state.navBar}>
                    <div className="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
                        <div className="main_container">
                            <SideBar handleTab={this.handleTab} />
                            <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar} />
                            <div className="right_col" role="main">
                                <div className="">
                                    <div className="page-title">
                                        <div className="title_left">
                                            <h3>License Selection</h3>
                                        </div>
                                        {/* <div className="title_right">
                                            <div className="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Search for..." />
                                                    <span className="input-group-btn">
                                                        <button className="btn btn-default" type="button">Go!</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="x_panel">
                                                <div className="x_title">
                                                    <h2>License Selection </h2>
                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="x_content">
                                                    <div className="row">
                                                        <div className="col-md-9 col-md-offset-1">
                                                            <h4>Module Selection</h4>
                                                            <table className="table table-bordered licence-table" cellspacing="0">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Module</th>
                                                                        <th>select</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>UK DPA & EU GDPR AWARENESS & TRAINING </td>
                                                                        <td><div className="checkbox">
                                                                            <label>
                                                                                <Checkbox
                                                                                    checkboxClass="icheckbox_flat-green"
                                                                                    increaseArea="20%"
                                                                                />
                                                                            </label>
                                                                        </div></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>SUBJECT ACCESS REQUEST MANAGEMENT </td>
                                                                        <td><div className="checkbox">
                                                                            <label>
                                                                                <Checkbox
                                                                                    checkboxClass="icheckbox_flat-green"
                                                                                    increaseArea="20%"
                                                                                />
                                                                            </label>
                                                                        </div></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>DPIA / PIA ASSESSMENT </td>
                                                                        <td><div className="checkbox">
                                                                            <label>
                                                                                <Checkbox
                                                                                    checkboxClass="icheckbox_flat-green"
                                                                                    increaseArea="20%"
                                                                                />
                                                                            </label>
                                                                        </div></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <h4>License Selection</h4>

                                                            <table className="table table-bordered licence-table" cellspacing="0">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="col-md-2">Type of License</th>
                                                                        <th className="col-md-2">Number of Users</th>
                                                                        <th className="col-md-1">select</th>
                                                                        <th className="col-md-2">No of Licenses Required</th>
                                                                        <th className="col-md-2">Cost</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {paymentTable.map(function (obj, index) {
                                                                        return (<tr>
                                                                            <td>{obj.name}</td>
                                                                            <td>
                                                                                <select key={index} onChange={(e, index) => this.getNumberOfUser(obj, index, e)} style={{
                                                                                    paddingTop: '10px',
                                                                                    width: '150px',
                                                                                    paddingBottom: '3px'

                                                                                }}>
                                                                                    <option value="1">1-50</option>
                                                                                    <option value="50">50-100</option>
                                                                                    <option value="100">100-500</option>
                                                                                    <option value="500">500+</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <Radio
                                                                                    radioClass="iradio_flat-green"
                                                                                    increaseArea="20%"
                                                                                    value={this.state.id}
                                                                                    onChange={() => this.getCurrentObj(obj, index)}
                                                                                    name={index}
                                                                                    checked={this.state.id === index}
                                                                                />
                                                                            </td>
                                                                            <td><div className="col-md-12"> <input type="text" id="fullname" key={index} className="form-control" name="charities" required="" onChange={(e, index) => this.getNUmberOfLicence(obj, e)} /></div></td>
                                                                            <td className="lpricec"><span className="label label-success">{obj.amount}</span></td>
                                                                        </tr>)
                                                                    }.bind(this))}
                                                                </tbody>
                                                            </table><br />
                                                            {this.state.loading === true ? <div>
                                                                <center>
                                                                    <PulseLoader
                                                                        color={'#F15A25'}
                                                                        loading={this.state.loading}
                                                                    />
                                                                </center>
                                                            </div> : ''}
                                                            {paymentTable.length === 0 && this.state.success === true ? <center><p>No Records Found</p></center> : ''}
                                                            <br />
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <table className="table table-bordered licence-table" cellspacing="0">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Options</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><div className="checkbox">
                                                                                    <label>
                                                                                        <Checkbox
                                                                                            checkboxClass="icheckbox_flat-green"
                                                                                            increaseArea="20%"
                                                                                        />
                                                                                    </label> Cloud Based Access
                                                                                </div>  </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><div className="checkbox">
                                                                                    <label>
                                                                                        <Checkbox
                                                                                            checkboxClass="icheckbox_flat-green"
                                                                                            increaseArea="20%"
                                                                                        />
                                                                                    </label> Download Installer
                                                                                </div>  </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <table className="table table-bordered licence-table" cellspacing="0">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Payment Gateway</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><div className="checkbox">
                                                                                    <label>
                                                                                        {/* <input type="radio" value="Stripe"  /> */}
                                                                                        <Radio
                                                                                            radioClass="iradio_flat-green"
                                                                                            increaseArea="20%"
                                                                                            onChange={(e) => this.handleStripeType(e, 'Stripe')}
                                                                                            checked={this.state.stripePayment}
                                                                                        />
                                                                                    </label> Stripe
                                                                                </div>  </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><div className="checkbox">
                                                                                    <label>
                                                                                        {/* <input type="radio" value="Paypal"  /> */}
                                                                                        <Radio
                                                                                            radioClass="iradio_flat-green"
                                                                                            increaseArea="20%"
                                                                                            onChange={(e) => this.handlePaypalType(e, 'Paypal')}
                                                                                            checked={this.state.paypalPayment}
                                                                                        />
                                                                                    </label> Paypal
                                                                                </div>  </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            {this.state.paymentType === 'Stripe' && <div className="row">
                                                                <div className="col-md-12">
                                                                    <center><StripeCheckout token={this.onToken} amount={payAmout} stripeKey="pk_test_8GFMVG84f1x5PZOkP0jW4TFQ"><button className="btn btn-primary btn-lg btn-round">Buy Now</button> </StripeCheckout></center>
                                                                </div>
                                                            </div>}

                                                            {this.state.paymentType === 'Paypal' && <div className="row">
                                                                <div className="col-md-12">
                                                                    <center>
                                                                        <PayPalButton
                                                                            env='sandbox'
                                                                            sandboxID='AY4halocVi7klL0-ZZj8dmqD_dtA0OSLSMkjPE195Fz0JdB95-e8kNYmg3-GZt9eeEhdIwZyNyWcBE7Z'
                                                                            amount={10.00}
                                                                            currency='USD'
                                                                            commit={true}
                                                                        />
                                                                    </center>
                                                                </div>
                                                            </div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
    };
}
function mapDispatchToProps(dispatch) {
    return {
        Action: bindActionCreators(Action, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(paymentComponent);