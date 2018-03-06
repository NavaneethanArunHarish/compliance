import React, { Component } from 'react';
// import Header from '../../components/Header';
// import SideBar from '../../components/SideBar';
// import Footer from '../../components/Footer';
// import '../../css/custom.css'
// import '../../css/all.css'
// import '../../css/custom.min.css'
import '../../../../../../assests/css/custom.css'

import '../../../../../../assests/css/custom.min.css'
import Action from '../../../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { PulseLoader } from 'react-spinners';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            addr1: '',
            addr2: '',
            city: '',
            country: '',
            email: '',
            password: '',
            phone: '',
            pincode: '',
            loading: false,
            editFlow: false,
            state: ''
        }
        this.handleAddr1 = this.handleAddr1.bind(this);
        this.handleAddr2 = this.handleAddr2.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handleCountry = this.handleCountry.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handlePinCode = this.handlePinCode.bind(this);
        this.submit = this.submit.bind(this);
        this.signUpResponse = this.signUpResponse.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validatePhone = this.validatePhone.bind(this);
        this.editFunction = this.editFunction.bind(this);
    }

    selectCountry(val) {
        this.setState({ country: val });
    }

    selectRegion(val) {
        this.setState({ state: val });
    }

    handleAddr1(e) {
        this.setState({ addr1: e.target.value, addr1Err: '' })
    }

    handleAddr2(e) {
        this.setState({ addr2: e.target.value, addr2Err: '' })
    }

    handleCity(e) {
        this.setState({ city: e.target.value, cityErr: '' })
    } 

    handleCountry(e) {
        this.setState({ country: e.target.value })
    }

    handleEmail(e) {
        this.setState({ email: e.target.value, emailErr: '' })
    }

    handleFirstName(e) {
        this.setState({ firstName: e.target.value, nameErr: '' })
    }

    handlePassword(e) {
        this.setState({ password: e.target.value, passErr: '' })
    }

    handlePhone(e) {
        this.setState({ phone: e.target.value, phoneErr: '' })
    }

    handlePinCode(e) {
        this.setState({ pincode: e.target.value, pincodeErr: '' })
    }

    signUpResponse(data) {
        this.setState({ loading: false })
        if (data.data !== undefined) {
            if (data.data.success) {
                this.props.handleTab();
            }
        } else {
            this.setState({ emailErr: "Email or name already exists." });
            this.setState({ nameErr: "Email or name already exists." });
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    validateName(name) {
        var re = /^[ A-Za-z0-9_@./#&+-]*$/;
        return re.test(name);
    };

    validatePhone(phone) {
        var re = /^\d{10}$/;
        return re.test(phone);
    };

    submit(e) {
        e.preventDefault();

        if (this.state.email == '') {
            this.setState({ emailErr: " Enter the Email." });
        } else if (!this.validateEmail(this.state.email)) {
            this.setState({ emailErr: " Enter the valid Email." });
        } else {
            this.setState({ emailErr: '' });
        }

        if (this.state.password == '') {
            this.setState({ passErr: " Enter the Password." });
        } else if (this.state.password.length <= 7) {
            this.setState({ passErr: " Password must be 8 Character." });
        } else {
            this.setState({ passErr: '' });
        }

        if (this.state.firstName === '') {
            this.setState({ nameErr: ' Enter the Name. ' });
        } else if (!this.validateName(this.state.firstName)) {
            this.setState({ nameErr: " Enter the valid name. " });
        } else {
            this.setState({ nameErr: '' });
        }

        if (this.state.phone === '') {
            this.setState({ phoneErr: ' Enter the Contact Number. ' });
        } else if (!this.validatePhone(this.state.phone)) {
            this.setState({ phoneErr: " Enter the valid Contact Number. " });
        } else {
            this.setState({ phoneErr: '' });
        }

        if (this.state.addr1 == '') {
            this.setState({ addr1Err: " Enter the Address." });
        } else {
            this.setState({ addr1Err: '' });
        }

        if (this.state.addr2 == '') {
            this.setState({ addr2Err: " Enter the Address." });
        } else {
            this.setState({ addr2Err: '' });
        }

        if (this.state.city == '') {
            this.setState({ cityErr: " Enter the City." });
        } else {
            this.setState({ cityErr: '' });
        }

        if (this.state.pincode == '') {
            this.setState({ pincodeErr: " Enter the PinCode." });
        } else {
            this.setState({ pincodeErr: '' });
        }

        if ((this.validateEmail(this.state.email)) && (this.state.password.length > 7) && (this.validateName(this.state.firstName))) {
            var obj = {
                "email": this.state.email,
                "password": this.state.password,
                "name": this.state.firstName,
                "phone": this.state.phone,
                "address": {
                    "addressline1": this.state.addr1,
                    "addressline2": this.state.addr2,
                    "pincode": this.state.pincode,
                    "city": this.state.city,
                    "created_by": "",
                    "modified_by": "",
                    "country": this.state.country,
                    "state": this.state.state
                },
                "created_by": "",
                "modified_by": ""
            }
            this.setState({ loading: true })
            this.props.Action.exUser(obj, this.signUpResponse)
        }
    }

    componentWillMount() {

        if (Object.keys(this.props.editData).length !== 0) {
            this.setState({
                firstName: this.props.editData.name,
                addr1: this.props.editData.address.addressline1,
                addr2: this.props.editData.address.addressline2,
                city: this.props.editData.address.city,
                email: this.props.editData.email,
                phone: this.props.editData.phone,
                pincode: this.props.editData.address.pincode,
                id: this.props.editData.id,
                editFlow: true
            })
        } else {
            this.setState({
                firstName: '',
                addr1: '',
                addr2: '',
                city: '',
                email: '',
                phone: '',
                pincode: '',
                editFlow: false
            })
        }
    }

    editFunction(e) {
        e.preventDefault();
        var userType = localStorage.getItem("userType");
        if (this.state.email == '') {
            this.setState({ emailErr: " Enter the Email." });
        } else if (!this.validateEmail(this.state.email)) {
            this.setState({ emailErr: " Enter the valid Email." });
        } else {
            this.setState({ emailErr: '' });
        }

        if (this.state.password == '') {
            this.setState({ passErr: " Enter the Password." });
        } else {
            this.setState({ passErr: '' });
        }

        if (this.state.firstName === '') {
            this.setState({ nameErr: ' Enter the Name. ' });
        } else if (!this.validateName(this.state.firstName)) {
            this.setState({ nameErr: " Enter the valid name. " });
        } else {
            this.setState({ nameErr: '' });
        }


        if ((this.validateEmail(this.state.email)) && this.state.password !== '' && (this.validateName(this.state.firstName))) {
            var obj = {
                "email": this.state.email,
                "password": this.state.password,
                "name": this.state.firstName,
                "phone": this.state.phone,
                "user_type": userType,
                "address": {
                    "addressline1": this.state.addr1,
                    "addressline2": this.state.addr2,
                    "pincode": this.state.pincode,
                    "city": this.state.city,
                    "created_by": "",
                    "modified_by": "",
                    "country": this.state.country,
                    "state": this.state.state
                },
                "created_by": "",
                "modified_by": ""
            }
            this.setState({ loading: true })
            this.props.Action.editUser(obj, this.state.id, this.signUpResponse)
        }
    }

    render() {
        const { country, state } = this.state;
        return (
            <div className="col-xs-10">
                <div className="tab-content">
                    <div className="tab-pane active" id="add-user">
                        {this.state.editFlow === false ? <p className="lead">Add a new user</p> :
                            <p className="lead">Edit user</p>}

                        <form autoComplete="off" action="http://35.169.62.69/user/editadvanced.php" method="post" acceptCharset="utf-8" id="mform1" className="mform">



                            <fieldset className="clearfix collapsible" id="id_moodle">
                                <legend className="ftoggler" id="yui_3_17_2_1_1516103009728_756"><a href="#" className="fheader" role="button" aria-controls="id_moodle" aria-expanded="true" id="yui_3_17_2_1_1516103009728_49">General</a></legend>
                                <div className="fcontainer clearfix" id="yui_3_17_2_1_1516103009728_370">
                                    <div className="form-group row  fitem   ">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">
                                                <abbr className="initialism text-danger" title="Required"><i className="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required" aria-label="Required"></i></abbr>


                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_firstname">
                                                Name
                                            </label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="text">
                                            <input type="text" className="form-control " name="firstname" id="id_firstname" value={this.state.firstName} size="30" maxLength="100" onChange={this.handleFirstName} />
                                            <span style={{ color: 'red' }}>{this.state.nameErr}</span>
                                            <div className="form-control-feedback" id="id_error_firstname" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row  fitem   ">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">
                                                <abbr className="initialism text-danger" title="Required"><i className="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required" aria-label="Required"></i></abbr>


                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_email">
                                                Email address
                                            </label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="text">
                                            <input type="text" className="form-control " name="email" id="id_email" value={this.state.email} size="30" maxLength="100" onChange={this.handleEmail} />
                                            <span style={{ color: 'red' }}>{this.state.emailErr}</span>
                                            <div className="form-control-feedback" id="id_error_email" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row  fitem   ">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">
                                                <abbr className="initialism text-danger" title="Required"><i className="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required" aria-label="Required"></i></abbr>


                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_email">
                                                Password
                                            </label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="text">
                                            <input type="password" className="form-control " name="password" id="id_password" value={this.state.password} size="30" maxLength="100" onChange={this.handlePassword} />
                                            <span style={{ color: 'red' }}>{this.state.passErr}</span>
                                            <div className="form-control-feedback" id="id_error_email" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row  fitem   ">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">

                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_maildisplay">
                                                Phone
                                            </label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="select">
                                            <input type="text" className="form-control " name="phone" id="id_phone" value={this.state.phone} size="30" maxLength="20" onChange={this.handlePhone} />
                                            <div className="form-control-feedback" id="id_error_maildisplay" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row  fitem   ">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">

                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_maildisplay">
                                                Address Line1
                                            </label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="select">
                                            <textarea name="address1" className="form-control" cols="30" rows="4" value={this.state.addr1} onChange={this.handleAddr1}></textarea>

                                            <div className="form-control-feedback" id="id_error_maildisplay" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row  fitem   ">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">

                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_maildisplay">
                                                Address Line2
                                            </label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="select">
                                            <textarea name="address2" className="form-control" cols="30" rows="4" value={this.state.addr2} onChange={this.handleAddr2}></textarea>

                                            <div className="form-control-feedback" id="id_error_maildisplay" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row  fitem   ">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">
                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_city">
                                                City/town
                                            </label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="text">
                                            <input type="text" className="form-control " name="city" id="id_city" size="21" maxLength="120" value={this.state.city} onChange={this.handleCity} />

                                            <div className="form-control-feedback" id="id_error_city" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row  fitem   ">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">
                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_city">
                                                Pincode
                                            </label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="text">
                                            <input type="text" className="form-control " name="pincode" id="id_pincode" value={this.state.pincode} size="21" maxLength="120" onChange={this.handlePinCode} />

                                            <div className="form-control-feedback" id="id_error_city" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div>


                                    <div className="form-group row  fitem   ">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">
                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_country">
                                                Select a country
                                            </label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="select">
                                            <CountryDropdown classes ="form-control"
                                                value={country}
                                                onChange={(val) => this.selectCountry(val)} />
                                            <div className="form-control-feedback" id="id_error_country" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row  fitem   ">
                                        <div className="col-md-3">
                                            <span className="pull-right text-nowrap">
                                            </span>
                                            <label className="col-form-label d-inline " htmlFor="id_city">
                                                Select a state
                                                </label>
                                        </div>
                                        <div className="col-md-9 form-inline felement" data-fieldtype="text">
                                            <RegionDropdown classes ="form-control"
                                                country={country}
                                                value={state}
                                                onChange={(val) => this.selectRegion(val)} />
                                            <div className="form-control-feedback" id="id_error_city" style={{ display: "none" }}>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </fieldset>


                            <div className="form-group row  fitem femptylabel  ">
                                <div className="col-md-3">
                                    <span className="pull-right text-nowrap">



                                    </span>
                                    <label className="col-form-label d-inline " htmlFor="id_submitbutton">

                                    </label>
                                </div>
                                <center>
                                    {this.state.editFlow === false ? <div className="col-md-9 form-inline felement" data-fieldtype="submit">
                                        <input type="submit" className="btn btn-primary" name="submitbutton" id="id_submitbutton" value="Create user" onClick={this.submit} style={{ marginRight: '200px' }} />
                                        <div className="form-control-feedback" id="id_error_submitbutton" style={{ display: "none" }}>

                                        </div>
                                    </div> :

                                        <div className="col-md-9 form-inline felement" data-fieldtype="submit">
                                            <input type="submit" className="btn btn-primary" name="editbutton" id="id_editbutton" value="Update user" onClick={this.editFunction} style={{ marginRight: '200px' }} />
                                            <div className="form-control-feedback" id="id_error_editbutton" style={{ display: "none" }}>

                                            </div>
                                        </div>}

                                    <br /><br />
                                </center>
                                {this.state.loading === true ? <div>
                                    <center>
                                        <PulseLoader
                                            color={'#F15A25'}
                                            loading={this.state.loading}
                                        />
                                    </center>
                                </div> : ''}
                            </div>
                            <div className="fdescription required">There are required fields in this form marked <i className="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required field" aria-label="Required field"></i>.</div>
                        </form>

                    </div>
                </div>
            </div>
        )

    }
}


function mapStateToProps(state, props) {
    return {
        externalUserSuccess: state.login.externalUserSuccess,
        editUserSuccess: state.login.editUserSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        Action: bindActionCreators(Action, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
