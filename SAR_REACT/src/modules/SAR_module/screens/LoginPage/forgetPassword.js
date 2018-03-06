import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css'
import logo from '../../../../assests/images/Compliance-Compendium-Logo-Transparentx-1024x339.png';
import Action from '../../../SAR_module/actions';

class ForgetPasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email:'',
          emailErr:''
        }
        this.forgetPassword = this.forgetPassword.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.passwordResponse = this.passwordResponse.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    componentWillMount() {

    }

    forgetPassword(e) {
      e.preventDefault();
      if (this.state.email == '') {
        this.setState({ emailErr: " Enter the Email." });
      } else if (!this.validateEmail(this.state.email)) {
        this.setState({ emailErr: " Enter the valid Email." });
      } else {
        this.setState({ emailErr: '' });
      }
      if(this.validateEmail(this.state.email)) {
        this.props.Action.forgetPassword(this.state.email, this.passwordResponse)
      }
    }

    handleEmail(e) {
      this.setState({ email: e.target.value, emailErr:'' })
    }

    passwordResponse(data) {
      alert("Check your mail to reset the password");
    }

    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };


    render() {
        return (
            <div>
               <div className="login_wrapper">
               <div className="animate form login_form">
                 <div class="login_head"><a href={'/'}><img src={logo} alt="" width="240"/></a></div>
                 <section class="login_content">
                   
                   <form>
                     <h1>Forgot Password</h1>
                     <div>
                       <input type="text" class="form-control" placeholder="Email" required="" value={this.state.email} onChange={this.handleEmail}/>
                       <span style={{ color: 'red' }}>{this.state.emailErr}</span>
                     </div>
                     {/* <p>OR</p>
                     <div>
                       <input type="text" class="form-control" placeholder="Invoice Number" />
                     </div> */}
                    
                     <div>
                       <button class="btn btn-orange" onClick={this.forgetPassword}>Resend access details </button>
              
                      
                     </div>
       
                     <div class="clearfix"></div>
       
                     
                   </form>
                 </section>
        
               </div>
       
         
             </div>

                </div>

                );
    }
}

function mapStateToProps(state, props) {
    return {
      forgetPasswordSuccess: state.login.forgetPasswordSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        Action: bindActionCreators(Action, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordComponent);






