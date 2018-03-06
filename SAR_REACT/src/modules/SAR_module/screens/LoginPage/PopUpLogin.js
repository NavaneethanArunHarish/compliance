import React, { Component } from 'react';
import logo from '../../../../assests/images/Compliance-Compendium-Logo-Transparentx-1024x339.png';
import '../../../../assests/css/custom.css';

import '../../../../assests/css/custom.min.css';
// import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
import LoginAction from '../../actions';
import { PulseLoader } from 'react-spinners';
import Action from '../../actions';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginResponse: '',
      modalIsOpen: false,
      loading: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.login = this.login.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.signUp = this.signUp.bind(this);
    this.forgetPassword = this.forgetPassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
     this.userResponse = this.userResponse.bind(this);
  }


  openModal(e) {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value, emailErr: '' });

  }

  handlePwdChange(event) {
    this.setState({ password: event.target.value, passErr: '' });
  }

  signUp() {
    browserHistory.push('/register');
  }

  forgetPassword() {
    browserHistory.push('/forgetPassword');
  }

  login(e) {

    e.preventDefault();
    let email = this.state.email;
    let pwd = this.state.password;

    if (email == '') {
      this.setState({ emailErr: ' Enter the Email.' });
    } else if (!this.validateEmail(email)) {
      this.setState({ emailErr: ' Enter the valid Email.' });
    } else {
      this.setState({ emailErr: '' });
    }

    if (pwd == '') {
      this.setState({ passErr: ' Enter the Password.' });
    } else {
      this.setState({ passErr: '' });
    }
    if (this.validateEmail(email) && pwd !== '') {
      this.setState({ loading: true });
      this.props.LoginAction.register(email, pwd);
    }
  }

  componentWillMount() {
    console.log('props data--------------->', this.props);
  }

  userResponse(response) {
    var user = response.data.data;
    var userObj = JSON.stringify(user);
    localStorage.setItem("user", userObj);
    this.setState({ loading: false });
    let email = this.state.email;
    let pwd = this.state.password;
    let getData  = localStorage.getItem("data");
    var data = JSON.parse(getData);
    const prvUrl = this.props.prvUrl;
    if (data.data.role === 'Administrator') {
              browserHistory.push({
                pathname: prvUrl,
                state: { email, pwd, loginResponse: data },
              });
              this.props.redirectAferSuccess();
            } else if (data.data.role === 'External User') {
              browserHistory.push({
                pathname: prvUrl,
                state: { email, pwd, data },
              });
              this.props.redirectAferSuccess();
            } else if (data.data.role === 'Representative') {
              browserHistory.push({
                pathname: prvUrl,
                state: { email, pwd, data },
              });
              this.props.redirectAferSuccess();
            } else if (data.data.role === 'ComplainceTeamLeader') {
              browserHistory.push({
                pathname: prvUrl,
                state: { email, pwd, data },
              });
              this.props.redirectAferSuccess();
            } else if (data.data.role === 'ComplainceTeamMember') {
              browserHistory.push({
                pathname: prvUrl,
                state: { email, pwd, data },
              });
              this.props.redirectAferSuccess();
            }
  }

  componentWillReceiveProps(next) {

    let value = next.registerSuccess;
    if (value !== undefined) {
      
      if (Object.keys(value).length !== 0) {
        if (value.success.message !== null) {
          alert(value.success.message);
        } else {
          let data = value;
          if (data) {
            var successCode = data.success.code;
            let message = data.success.message;
          }
          let email = this.state.email;
          let pwd = this.state.password;
          if (successCode === '201' || successCode === 201) {
            browserHistory.push('/');
          } else if (successCode === '200' || successCode === 200) {
            this.setState({ loginResponse: data });
            localStorage.setItem('userType', data.data.role);
            localStorage.setItem('userId', data.data.user_id);
            localStorage.setItem('data', JSON.stringify(data));
            this.props.Action.getUserById(data.data.user_id, this.userResponse);
          } else {

          }
        }
      }
    }
  }



  render() {
    return (
      <div>
        <div className="body">
          <div className="login_wrapper">
            <div className="animate form login_form">
              <div className="login_head"><img src={logo} alt="" width="240" /></div>
              <section className="login_content">

                <form>
                  <div style={{
 display: 'block', fontSize: '2em', marginTop: '0.67em', marginBottom: '0.67em' 
}}>You have to Login First !!</div>
                  <div>
                    <input type="text" className="form-control" placeholder="Email" onChange={this.handleEmailChange} required="" />
                    <span style={{ color: 'red' }}>{this.state.emailErr}</span>
                  </div>{this.state.emailErr !== '' ? <br /> : ''}
                  <div>
                    <input type="password" className="form-control" placeholder="Password" onChange={this.handlePwdChange} required="" />
                    <span style={{ color: 'red' }}>{this.state.passErr}</span>
                  </div>{this.state.passErr !== '' ? <br /> : ''}
                  {/* <div>
                    <input type="text" className="form-control" placeholder="Authentication Key" required="" />
                  </div> */}
                  {/*  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div className="g-recaptcha" data-sitekey="6LeJxEAUAAAAAHeddGGKHBqR4FpGXskR3aTzi0HP"></div>

    </div> */}
                  <div>
                    <button className="btn btn-orange" onClick={this.login} >Login</button>
                    {this.state.loading === true ? <div>
                      <center>
                        <PulseLoader
                          color="#F15A25"
                          loading={this.state.loading}
                        />
                      </center>
                                                   </div> : ''}
                    {/* <button className="btn btn-orange" onClick={this.openModal} >Login</button>
                    <Modal
                      isOpen={this.state.modalIsOpen}
                      // onAfterOpen={this.afterOpenModal}
                      onRequestClose={this.closeModal}
                      //style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <button onClick={this.closeModal}>close</button>
                    </Modal> */}
                  </div>
                  <div className="clearfix" />
                </form>
                <div style={{textAlign:'center'}}>
              <a onClick={this.forgetPassword}>Forgot Password?</a>
              </div>
              </section>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    signUpSuccess: state.login.signupSuccess,
    registerSuccess: state.login.registerSuccess,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    LoginAction: bindActionCreators(LoginAction, dispatch),
    Action: bindActionCreators(Action, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);



// export default Login;
