import React, { Component } from 'react';
// import Header from '../../../components/Header';
// import SideBar from '../../../components/SideBar';
// import Footer from '../../../components/Footer';

import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css'
import logo from '../../../../assests/images/Compliance-Compendium-Logo-Transparentx-1024x339.png';
import { browserHistory } from 'react-router';

export default class EmailVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
      this.loginNavigate = this.loginNavigate.bind(this);

    }
    loginNavigate(){
        browserHistory.push('/')
    }
    render() {
        return (
            <div className="right_col" role="main">
                <div className="">
                    <div className="page-title">
                        <div className="title_left">
                        <div className=""><img src={logo} alt="" width="240" /></div>
                        </div>


                    </div>

                    <div className="clearfix"></div>

                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="x_panel">
                                <div className="x_title">
                                    <h2>Email Verification</h2>

                                    <div className="clearfix"></div>
                                </div>
                                <div className="x_content">

                                    <h3 className="text-success text-center">Success</h3>


                                    <p className="text-success text-center">Congratulations! You have successfully confirmed your email.</p>



                                </div>
                                <div style={{textAlign :"center"}}>
                                <a className="backtologin" onClick={this.loginNavigate} >
                                <span >
                                Login
                                </span>
                                 </a>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}

