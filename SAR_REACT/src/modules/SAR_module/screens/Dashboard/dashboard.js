import React, { Component } from 'react';
import logo from '../../../../assests/images/Compliance-Compendium-Logo-Transparentx-1024x339.png';
import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import axios from 'axios';

//import * as LoginActions from '../../redux/actions/loginActions';

class Dashboard extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email:'',
        password:'',
        loginResponse:''
      }

      this.SARlogin = this.SARlogin.bind(this);
  }


  SARlogin() {
    console.log("login-----SAR------------>",this.state.email)
      var email=this.state.email
      var pwd =this.state.password
      {
        axios({
          method : 'POST',
          //url : "http://localhost:5000/user/login",
          url : "http://35.169.62.69:5000/user/login",
          data : {
            email: email,
            password:pwd
         },
       })
    .then(response => {
         var data = response.data;
         console.log("SAR response----------------------> ",data);
         this.setState({loginResponse:data})
         if(data.role == 'ADMINISTRATOR'){
          browserHistory.push({
            pathname: '/sar/admin/dashboard',
            state: { email: email }
          })
         }
       }).catch(error => {
         var data = error;
         console.log("error in login-----> ",data);
       });
 }

      //this.props.loginActions.userLogin(email, pwd, this.getLoginResponse);
  }

  

  componentWillMount() {
    console.log("props data--------------->", this.props);
    //this.setState({email:this.props.location.state.email})
    //this.setState({password:this.props.location.state.pwd})
    //this.setState({loginResponse:this.props.location.state.loginResponse})
  }



  render() {
    return (
      <div className="body">
        <div>
         <h2 style={{background:"white",fontSize:'55px'}}>Welcome to Dashboard</h2>

         <div style={{color:"white",marginLeft:"45.4%",marginTop:"15%"}}>
                    
          <h2 style={{fontSize:'20px',textDecoration:'underline',cursor: 'pointer'}} onClick={this.SARlogin}>Go to SAR</h2>
          
        </div>   

        <div style={{color:"white",marginLeft:"45%",marginTop:"5%"}}>
                    
          <form action="http://lms.compliancecompendium.co.uk/login/index.php" method="post" name="form" id="form">
           <p><input type="text" name="username" value={this.state.email} hidden /></p>
           <p><input type="password" name="password" value={this.state.password} hidden /></p>
           <input style={{background: 'none',border: 'none',color:'white',textDecoration:'underline',cursor: 'pointer',fontSize:'150%'}} 
            type="submit" name="Submit" value="Go to LMS" />
          </form>

        </div>   

        </div>
      </div>
    );
  }
}






export default Dashboard;
