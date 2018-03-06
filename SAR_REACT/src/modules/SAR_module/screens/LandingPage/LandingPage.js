import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import PopUpLogin from '../../../SAR_module/screens/LoginPage/PopUpLogin';
import $ from 'jquery';

import Header from '../../../../components/Header';
import SideBar from '../../../../components/SideBar';
import Footer from '../../../../components/Footer';
import { PulseLoader } from 'react-spinners';

import Img1 from '../../../../assests/images/DPIAPIAManagementR13.jpg';
import Img2 from '../../../../assests/images/DPIAPIAManagementR15.jpg';
import Img3 from '../../../../assests/images/DPIAPIAManagementR16.jpg';
import Img4 from '../../../../assests/images/DPIAPIAManagementR14.jpg';
import Img5 from '../../../../assests/images/DPIAPIAManagementR11.jpg';
import Img6 from '../../../../assests/images/DPIAPIAManagementR12.jpg';
import Img7 from '../../../../assests/images/DPIAPIAManagementR17.jpg';
import cclogo from '../../../../assests/images/Compliance-Compendium-Logo-Transparentx-1024x339.png';
import axios, { post } from 'axios';
import { BaseUrl } from '../../../../serviceUrl/serviceUrl'

import { Pagination, Icon } from 'semantic-ui-react';
import SearchInput, { createFilter } from 'react-search-input';

import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css';

var angleStart = -360;
var userType
class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'nav-md',
            DpiNameErr: '',
            proj: {
                "proj_id": "",
                "proj_name": "",
                "proj_desc": ""
            },
            createdStatus: '',
            loading: false,
            isLoggedIn: false,
            openPopUpLogin: false,
            previousUrl: '',
            email: '',
            password: ''
        }
        this.handleNavBar = this.handleNavBar.bind(this);
        this.goToLMS = this.goToLMS.bind(this);
        //  this.reloadPage = this.reloadPage.bind(this);
    }

    // reloadPage() {
    //     window.location.reload();
    // }

    componentWillMount() {
        userType = localStorage.getItem("userType");
        var userId = localStorage.getItem("userId");
        if (userId == null) {
            var prevUrl = this.props.location.pathname;
            this.setState({ isLoggedIn: false, openPopUpLogin: true, previousUrl: prevUrl });
        } else {
            this.setState({ isLoggedIn: true });
        }
        this.setState({ email: this.props.location.state.email })
        this.setState({ password: this.props.location.state.password })
        console.log("username------------lms--->", this.props)

        setTimeout(() => { this.toggleOptions('.selector') }, 100);
    }

    toggleOptions = (s) => {
        $(s).toggleClass('open');
        var li = $(s).find('li');
        var deg = $(s).hasClass('half') ? 180 / (li.length - 1) : 360 / li.length;
        for (var i = 0; i < li.length; i++) {
            var d = $(s).hasClass('half') ? (i * deg) - 90 : i * deg;
            $(s).hasClass('open') ? this.rotate(li[i], d) : this.rotate(li[i], angleStart);
        }
    }

    handleLogoClick = () => {
        this.toggleOptions($('.selector button').parent());
    }

    rotate = (li, d) => {
        $({ d: angleStart }).animate({ d: d }, {
            step: function (now) {
                $(li)
                    .css({ transform: 'rotate(' + now + 'deg)' })
                    .find('label')
                    .css({ transform: 'rotate(' + (-now) + 'deg)' });
            }, duration: 0
        });
    }

    handleNavBar(value) {
        this.setState({ navBar: value })
    }
    goToSAR = () => {
        let getData = localStorage.getItem("data");
        var data = JSON.parse(getData);
        if (data.data.role === 'Administrator') {
            browserHistory.push('/sar/admin/dashboard');
        } else if (data.data.role === 'External User') {
            browserHistory.push('/sar/Exuser/SAR-dashboard');
        } else if (data.data.role === 'Representative') {
            browserHistory.push('/sar/reps/SAR-dashboard');
        } else if (data.data.role === 'ComplainceTeamLeader') {
            browserHistory.push('/sar/leader/SAR-dashboard');
        } else if (data.data.role === 'ComplainceTeamMember') {
            browserHistory.push('/sar/member/SAR-dashboard');
        }
    }

    goToLMS() {
        
        $("form").submit();
    }

    goToDPIA = () => {
        if ((localStorage.getItem("userType") !== "Representative") && (localStorage.getItem("userType") !== "External User"))
            browserHistory.push('/dpia/' + localStorage.getItem("userType") + "/dashboard")
    }

    render() {
        return (
            <div className={this.state.navBar}>
                {this.state.isLoggedIn ?
                    <div className="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
                        <div className="main_container">
                            <SideBar />
                            <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar} />
                            <div className="right_col" role="main">
                                <div className="row">
                                    <h2 align="center">Welcome to Compliance Compendium - Application Overview</h2>
                                    <div className='circlesel'>
                                        <div className='selector'>
                                            <ul>
                                                <li>
                                                    <input id='c1' type='checkbox' />
                                                    <label for='c1'><img src={Img1} alt="" onClick={this.goToSAR} width="90" /></label>
                                                </li>
                                                <li>
                                                    <input id='c2' type='checkbox' />
                                                    {userType === "Administrator" || userType === "ComplainceTeamLeader" || userType === "ComplainceTeamMember" ? <label for='c2'><img src={Img5} onClick={this.goToDPIA} alt="" width="90" /></label> : <label for='c3'></label>}
                                                </li>
                                                <li>
                                                    <input id='c3' type='checkbox' />
                                                    {userType === "Administrator" || userType === "ComplainceTeamLeader" || userType === "ComplainceTeamMember" ?<label for='c3'> <img src={Img2} onClick={this.goToLMS} alt="" width="90" /></label> : <label for='c3'></label>}
                                                    <form action={BaseUrl.LMSUrl} method="post" name="form" id="form">
                                                        <p><input type="text" name="username" value={this.state.email} hidden /></p>
                                                        <p><input type="password" name="password" value={this.state.password} hidden /></p>
                                                        <input style={{ background: 'none', border: 'none' }}
                                                            type="submit" name="Submit" />
                                                    </form>
                                                </li>
                                                <li>
                                                    <input id='c4' type='checkbox' />
                                                    <label for='c4'> </label>
                                                </li>
                                                <li>
                                                    <input id='c5' type='checkbox' />
                                                    <label for='c5'> </label>
                                                </li>
                                                <li>
                                                    <input id='c6' type='checkbox' />
                                                    <label for='c6'> </label>
                                                </li>
                                                <li>
                                                    <input id='c7' type='checkbox' />
                                                    <label for='c7'> </label>
                                                </li>
                                                <li>
                                                    <input id='c8' type='checkbox' />
                                                    <label for='c8'> </label>
                                                </li>
                                            </ul>
                                            <button onClick={this.handleLogoClick}> <img src={cclogo} alt="" width="160" /></button>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <Footer />
                        </div>
                    </div>
                    :
                    <div>
                        <PopUpLogin prvUrl={this.state.previousUrl} redirectAferSuccess={this.reloadPage} />
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        // cereatedProject: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // projectAction: bindActionCreators(projectAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);