import React, { Component } from 'react';
import logo from '../../../../assests/images/Compliance-Compendium-Logo-Transparentx-1024x339.png';
import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css'
import Action from '../../../SAR_module/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { PulseLoader } from 'react-spinners';


class RegisterOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compRegNo: '',
      compName: '',
      compcontactNo: '',
      compVATNo: '',
      primaryContactNo: '',
      primaryEmail: '',
      primaryFirstLine: '',
      primarySecondLine: '',
      primaryFName: '',
      primaryLName: '',
      primaryPostCode: '',
      secondaryContactNo: '',
      secondaryEmail: '',
      secondaryFirstLine: '',
      secondarySecondLine: '',
      secondaryFName: '',
      secondaryLName: '',
      secondaryPostCode: '',
      password: '',
      loading: false,
      state:'',
      country:''
    }
    this.companyRegisterNo = this.companyRegisterNo.bind(this);
    this.companyName = this.companyName.bind(this);
    this.companyContactNo = this.companyContactNo.bind(this);
    this.companyVATNo = this.companyVATNo.bind(this);
    this.primaryITAdminContactNo = this.primaryITAdminContactNo.bind(this);
    this.primaryITAdminEmail = this.primaryITAdminEmail.bind(this);
    this.primaryITAdminFirstline = this.primaryITAdminFirstline.bind(this);
    this.primaryITAdminFname = this.primaryITAdminFname.bind(this);
    this.primaryITAdminLname = this.primaryITAdminLname.bind(this);
    this.primaryITAdminPostCode = this.primaryITAdminPostCode.bind(this);
    this.primaryITAdminSecondline = this.primaryITAdminSecondline.bind(this);
    this.secondaryITAdminContactNo = this.secondaryITAdminContactNo.bind(this);
    this.secondaryITAdminEmail = this.secondaryITAdminEmail.bind(this);
    this.secondaryITAdminAddr1 = this.secondaryITAdminAddr1.bind(this);
    this.secondaryITAdminFName = this.secondaryITAdminFName.bind(this);
    this.secondaryITAdminLName = this.secondaryITAdminLName.bind(this);
    this.secondaryITAdminPostCode = this.secondaryITAdminPostCode.bind(this);
    this.secondaryITAdminAddr2 = this.secondaryITAdminAddr2.bind(this);
    this.register = this.register.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.signUpResponse = this.signUpResponse.bind(this);
    this.cancel = this.cancel.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validatePhone = this.validatePhone.bind(this);

  }

  companyRegisterNo(e) {
    this.setState({ compRegNo: e.target.value, compRegNoErr: '' })
  }

  companyName(e) {
    this.setState({ compName: e.target.value, compNameErr: '' })
  }

  companyContactNo(e) {
    this.setState({ compcontactNo: e.target.value, compPhoneErr: '' })
  }

  companyVATNo(e) {
    this.setState({ compVATNo: e.target.value, compVATNoErr: '' })
  }

  primaryITAdminContactNo(e) {
    this.setState({ primaryContactNo: e.target.value, phoneErr: '' })
  }

  primaryITAdminEmail(e) {
    this.setState({ primaryEmail: e.target.value, emailErr: '' })
  }

  primaryITAdminFirstline(e) {
    this.setState({ primaryFirstLine: e.target.value, PrimaryFirstErr: '' })
  }

  primaryITAdminSecondline(e) {
    this.setState({ primarySecondLine: e.target.value, PrimarySecondErr: '' })
  }

  primaryITAdminFname(e) {
    this.setState({ primaryFName: e.target.value, FnameErr: '' })
  }

  primaryITAdminLname(e) {
    this.setState({ primaryLName: e.target.value, LnameErr: '' })
  }

  primaryITAdminPostCode(e) {
    this.setState({ primaryPostCode: e.target.value, primaryPostErr: '' })
  }

  secondaryITAdminContactNo(e) {
    this.setState({ secondaryContactNo: e.target.value, phoneErrs: '' })
  }

  secondaryITAdminEmail(e) {
    this.setState({ secondaryEmail: e.target.value, emailErrs: '' })
  }

  secondaryITAdminAddr1(e) {
    this.setState({ secondaryFirstLine: e.target.value, secondaryFirstErr: '' })
  }

  secondaryITAdminAddr2(e) {
    this.setState({ secondarySecondLine: e.target.value, secondarySecondErr: '' })
  }

  secondaryITAdminFName(e) {
    this.setState({ secondaryFName: e.target.value, FnameErrs: '' })
  }

  secondaryITAdminLName(e) {
    this.setState({ secondaryLName: e.target.value, LnameErrs: '' })
  }

  secondaryITAdminPostCode(e) {
    this.setState({ secondaryPostCode: e.target.value, secondaryPostErr: '' })
  }

  handlePassword(e) {
    this.setState({ password: e.target.value, passErr: '' })
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

  register(e) {
    e.preventDefault();

    if (this.state.primaryEmail == '') {
      this.setState({ emailErr: " Enter the Email." });
    } else if (!this.validateEmail(this.state.primaryEmail)) {
      this.setState({ emailErr: " Enter the valid Email." });
    } else {
      this.setState({ emailErr: '' });
    }

    if (this.state.password == '') {
      this.setState({ passErr: " Enter the Password." });
    } else {
      this.setState({ passErr: '' });
    }

    if (this.state.primaryFName === '') {
      this.setState({ FnameErr: ' Enter the First Name. ' });
    } else if (!this.validateName(this.state.primaryFName)) {
      this.setState({ FnameErr: " Enter the valid First name. " });
    } else {
      this.setState({ FnameErr: '' });
    }

    if (this.state.primaryLName === '') {
      this.setState({ LnameErr: ' Enter the Last Name. ' });
    } else if (!this.validateName(this.state.primaryLName)) {
      this.setState({ LnameErr: " Enter the valid Last name. " });
    } else {
      this.setState({ LnameErr: '' });
    }

    if (this.state.primaryContactNo === '') {
      this.setState({ phoneErr: ' Enter the Contact Number. ' });
    } else if (!this.validatePhone(this.state.primaryContactNo)) {
      this.setState({ phoneErr: " Enter the valid Contact Number. " });
    } else {
      this.setState({ phoneErr: '' });
    }

    if (this.state.secondaryEmail == '') {
      this.setState({ emailErrs: " Enter the Email." });
    } else if (!this.validateEmail(this.state.secondaryEmail)) {
      this.setState({ emailErrs: " Enter the valid Email." });
    } else {
      this.setState({ emailErrs: '' });
    }

    if (this.state.secondaryFName === '') {
      this.setState({ FnameErrs: ' Enter the First Name. ' });
    } else if (!this.validateName(this.state.secondaryFName)) {
      this.setState({ FnameErrs: " Enter the valid First name. " });
    } else {
      this.setState({ FnameErrs: '' });
    }

    if (this.state.secondaryLName === '') {
      this.setState({ LnameErrs: ' Enter the Last Name. ' });
    } else if (!this.validateName(this.state.secondaryLName)) {
      this.setState({ LnameErrs: " Enter the valid Last name. " });
    } else {
      this.setState({ LnameErrs: '' });
    }

    if (this.state.secondaryContactNo === '') {
      this.setState({ phoneErrs: ' Enter the Contact Number. ' });
    } else if (!this.validatePhone(this.state.secondaryContactNo)) {
      this.setState({ phoneErrs: " Enter the valid Contact Number. " });
    } else {
      this.setState({ phoneErrs: '' });
    }

    if (this.state.compRegNo == '') {
      this.setState({ compRegNoErr: " Enter the Register No." });
    } else {
      this.setState({ compRegNoErr: '' });
    }

    if (this.state.compName == '') {
      this.setState({ compNameErr: " Enter the Company Name." });
    } else {
      this.setState({ compNameErr: '' });
    }

    if (this.state.compcontactNo == '') {
      this.setState({ compPhoneErr: " Enter the Phone no." });
    } else {
      this.setState({ compPhoneErr: '' });
    }

    if (this.state.compVATNo == '') {
      this.setState({ compVATNoErr: " Enter the VAT no." });
    } else {
      this.setState({ compVATNoErr: '' });
    }

    if (this.state.primaryFirstLine == '') {
      this.setState({ PrimaryFirstErr: " Enter the First Line." });
    } else {
      this.setState({ PrimaryFirstErr: '' });
    }

    if (this.state.primarySecondLine == '') {
      this.setState({ PrimarySecondErr: " Enter the Second Line." });
    } else {
      this.setState({ PrimarySecondErr: '' });
    }

    if (this.state.secondaryFirstLine == '') {
      this.setState({ secondaryFirstErr: " Enter the First Line." });
    } else {
      this.setState({ secondaryFirstErr: '' });
    }

    if (this.state.secondarySecondLine == '') {
      this.setState({ secondarySecondErr: " Enter the Second Line." });
    } else {
      this.setState({ secondarySecondErr: '' });
    }

    if (this.state.secondaryPostCode == '') {
      this.setState({ secondaryPostErr: " Enter the Postal Code." });
    } else {
      this.setState({ secondaryPostErr: '' });
    }

    if (this.state.primaryPostCode == '') {
      this.setState({ primaryPostErr: " Enter the Postal Code." });
    } else {
      this.setState({ primaryPostErr: '' });
    }

    if ((this.validateEmail(this.state.primaryEmail)) &&
      this.state.password !== '' &&
      (this.validateName(this.state.primaryFName)) &&
      (this.validatePhone(this.state.primaryContactNo)) &&
      this.state.primaryFirstLine !== '' &&
      this.state.primarySecondLine !== '' &&
      this.state.primaryPostCode !== '' &&
      (this.validateEmail(this.state.secondaryEmail)) &&
      (this.validateName(this.state.secondaryFName)) &&
      (this.validatePhone(this.state.secondaryContactNo)) &&
      this.state.secondaryFirstLine !== '' &&
      this.state.secondarySecondLine !== '' &&
      this.state.secondaryPostCode !== '') {

      var obj = {
        "primary": {
          "name": this.state.primaryFName,
          "email": this.state.primaryEmail,
          "password": this.state.password,
          "user_type": "",
          "created_by": "",
          "modified_by": "",
          "phone": this.state.primaryContactNo,
          "address": {
            "addressline1": this.state.primaryFirstLine,
            "addressline2": this.state.primarySecondLine,
            "pincode": this.state.primaryPostCode,
            "city": this.state.secondaryFirstLine,
            "created_by": "",
            "modified_by": "",
            "state":this.state.state,
            "country":this.state.country
          }
        },
        "organization": {
          "companyName": this.state.compName,
          "contactNo": this.state.compcontactNo,
          "registrationNumber": this.state.compRegNo,
          "vatNumber": this.state.compVATNo
        },
        "secondary": {
          "name": this.state.secondaryFName,
          "email": this.state.secondaryEmail,
          "password": this.state.password,
          "user_type": "",
          "created_by": "",
          "modified_by": "",
          "phone": this.state.secondaryContactNo,
          "address": {
            "addressline1": this.state.secondaryFirstLine,
            "addressline2": this.state.secondarySecondLine,
            "pincode": this.state.secondaryPostCode,
            "city": this.state.secondaryFirstLine,
            "created_by": "",
            "modified_by": "",
            "state":this.state.state,
            "country":this.state.country
          }
        }
      }


      this.setState({ loading: true })
      this.props.Action.signUp(obj, this.signUpResponse)
    } else {
      alert("Enter missing fields.");
    }

  }

  signUpResponse(data) {
    this.setState({ loading: false })
  }

  cancel() {
    browserHistory.push('/');
  }

  render() {
    return (
      <div class="register_wrapper">
        <div class="animate form ">
          <div class="login_head"><a href={'/'}><img src={logo} alt="" width="240" /></a></div>
          <section class="reg_content">

            <form id="register-form" data-parsley-validate>
              <h1>Welcome to Compliance Compendium - Registration</h1>
              <div class="row">

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="first">Companies House Registration Number<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="first" required="" onChange={this.companyRegisterNo} value={this.state.compRegNo} />
                    <span style={{ color: 'red' }}>{this.state.compRegNoErr}</span>
                  </div>
                </div>


                <div class="col-md-6">
                  <div class="form-group">
                    <label for="last">Company Name<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="last" required="" onChange={this.companyName} value={this.state.compName} />
                    <span style={{ color: 'red' }}>{this.state.compNameErr}</span>
                  </div>
                </div>

              </div>
              <div class="row">

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="first">Company Contact Number<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="first" required="" onChange={this.companyContactNo} value={this.state.compcontactNo} />
                    <span style={{ color: 'red' }}>{this.state.compPhoneErr}</span>
                  </div>
                </div>


                <div class="col-md-6">
                  <div class="form-group">
                    <label for="last">Company VAT Number<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="last" required="" onChange={this.companyVATNo} value={this.state.compVATNo} />
                    <span style={{ color: 'red' }}>{this.state.compVATNoErr}</span>
                  </div>
                </div>

              </div>
              <div class="row">

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="first">Primary IT Administrators<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="First Name" id="first" required="" onChange={this.primaryITAdminFname} value={this.state.primaryFName} />
                    <span style={{ color: 'red' }}>{this.state.FnameErr}</span>
                  </div>
                </div>


                <div class="col-md-6">
                  <div class="form-group">
                    <label for="last"> </label>
                    <input type="text" class="form-control" placeholder="Last Name" id="last" required="" onChange={this.primaryITAdminLname} value={this.state.primaryLName} />
                    <span style={{ color: 'red' }}>{this.state.LnameErr}</span>
                  </div>
                </div>

              </div>
              <div class="row">

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="paddress">Primary IT Administrators Office Address<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="1st Line" id="first" required="" onChange={this.primaryITAdminFirstline} value={this.state.primaryFirstLine} />
                    <span style={{ color: 'red' }}>{this.state.PrimaryFirstErr}</span>
                  </div>
                </div>


                <div class="col-md-6">
                  <div class="form-group">
                    <label for="last">  </label>
                    <input type="text" class="form-control" placeholder="2nd Line" id="last" required="" onChange={this.primaryITAdminSecondline} value={this.state.primarySecondLine} />
                    <span style={{ color: 'red' }}>{this.state.PrimarySecondErr}</span>
                  </div>
                </div>

              </div>
              <div class="row">

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="paddress">Postcode<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="first" required="" onChange={this.primaryITAdminPostCode} value={this.state.primaryPostCode} />
                    <span style={{ color: 'red' }}>{this.state.primaryPostErr}</span>
                  </div>
                </div>


                <div class="col-md-6">
                  <div class="form-group">
                    <label for="last"> Contact Number<span class="text-danger">*</span> </label>
                    <input type="text" class="form-control" placeholder="" id="last" required="" onChange={this.primaryITAdminContactNo} value={this.state.primaryContactNo} />
                    <span style={{ color: 'red' }}>{this.state.phoneErr}</span>
                  </div>
                </div>

              </div>
              <div class="row">

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="paddress">E-mail Address<span class="text-danger">*</span></label>
                    <input type="email" class="form-control" placeholder="" id="first" required="" onChange={this.primaryITAdminEmail} value={this.state.primaryEmail} />
                    <span style={{ color: 'red' }}>{this.state.emailErr}</span>
                  </div>
                </div>

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="paddress">Password<span class="text-danger">*</span></label>
                    <input type="password" class="form-control" placeholder="" id="password" required="" onChange={this.handlePassword} value={this.state.password} />
                    <span style={{ color: 'red' }}>{this.state.passErr}</span>
                  </div>
                </div>


              </div>
              <div class="row">

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="first">Secondary IT Administrators<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="First Name" id="first" required="" onChange={this.secondaryITAdminFName} value={this.state.secondaryFName} />
                    <span style={{ color: 'red' }}>{this.state.FnameErrs}</span>
                  </div>
                </div>


                <div class="col-md-6">
                  <div class="form-group">
                    <label for="last">  </label>
                    <input type="text" class="form-control" placeholder="Last Name" id="last" required="" onChange={this.secondaryITAdminLName} value={this.state.secondaryLName} />
                    <span style={{ color: 'red' }}>{this.state.LnameErrs}</span>
                  </div>
                </div>

              </div>
              <div class="row">

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="paddress">Secondary IT Administrators Office Address<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="1st Line" id="first" required="" onChange={this.secondaryITAdminAddr1} value={this.state.secondaryFirstLine} />
                    <span style={{ color: 'red' }}>{this.state.secondaryFirstErr}</span>
                  </div>
                </div>


                <div class="col-md-6">
                  <div class="form-group">
                    <label for="last">  </label>
                    <input type="text" class="form-control" placeholder="2nd Line" id="last" required="" onChange={this.secondaryITAdminAddr2} value={this.state.secondarySecondLine} />
                    <span style={{ color: 'red' }}>{this.state.secondarySecondErr}</span>
                  </div>
                </div>

              </div>
              <div class="row">

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="paddress">Postcode<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="first" required="" onChange={this.secondaryITAdminPostCode} value={this.state.secondaryPostCode} />
                    <span style={{ color: 'red' }}>{this.state.secondaryPostErr}</span>
                  </div>
                </div>


                <div class="col-md-6">
                  <div class="form-group">
                    <label for="last"> Contact Number <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="last" required="" onChange={this.secondaryITAdminContactNo} value={this.state.secondaryContactNo} />
                    <span style={{ color: 'red' }}>{this.state.phoneErrs}</span>
                  </div>
                </div>

              </div>
              <div class="row">

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="paddress">E-mail Address<span class="text-danger">*</span></label>
                    <input type="email" class="form-control" placeholder="" id="first" required="" onChange={this.secondaryITAdminEmail} value={this.state.secondaryEmail} />
                    <span style={{ color: 'red' }}>{this.state.emailErrs}</span>
                  </div>
                </div>


              </div>
              <div>
                <button class="btn btn-orange" onClick={this.register}>Next</button>
                {this.state.loading === true ? <div>
                  <center>
                    <PulseLoader
                      color={'#F15A25'}
                      loading={this.state.loading}
                    />
                  </center>
                </div> : ''}
                <button class="btn btn-orange" onClick={this.cancel}>Cancel</button>
              </div>

              <div class="clearfix"></div>


            </form>
          </section>

        </div>


      </div>

    );
  }
}


function mapStateToProps(state, props) {
  return {
    registerSuccess: state.login.registerSuccess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Action: bindActionCreators(Action, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterOne);
//export default RegisterOne;
