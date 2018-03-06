import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import PopUpLogin from '../../../SAR_module/screens/LoginPage/PopUpLogin';
import Header from '../../../../components/Header';
import SideBar from '../../../../components/SideBar';
import Footer from '../../../../components/Footer';

import { Pagination, Icon } from 'semantic-ui-react';
import SearchInput, { createFilter } from 'react-search-input';
import { PulseLoader } from 'react-spinners';

import assessmentAction from '../../actions/dpiaAction/assessmentAction';
import projectAction from '../../actions/dpiaAction/projectAction';
import SarAction from '../../../SAR_module/actions';

import '../../../../assests/css/custom.css'
import '../../../../assests/css/custom.min.css';

class Assessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'nav-md',
            allAssess: [],
            allProjects:[],
            loading: false,
            isLoggedIn:false,
            openPopUpLogin:false,
            previousUrl:'',
            allCTUser: []
        }
        this.handleNavBar = this.handleNavBar.bind(this);
        this.getAllProjects = this.getAllProjects.bind(this);
        this.allAssessment = this.allAssessment.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
  }

  reloadPage() {
        window.location.reload();
    }

    componentWillMount() {
      var userId = localStorage.getItem("userId");
      if(userId == null) {
        console.log('need to login');
            var prevUrl = this.props.location.pathname;
            console.log('prev url ',prevUrl);
            this.setState({isLoggedIn:false,openPopUpLogin:true,previousUrl:prevUrl});
      }else{
       this.setState({isLoggedIn:true });
        this.setState({ loading: true })
        this.props.assessmentAction.getAllAssessment(this.allAssessment);
        this.props.projectAction.getAllProject(this.getAllProjects);
        this.props.SarAction.getUserByType("ComplainceTeamMember", this.getallUserResponse);
      }
    }
    getallUserResponse = (data) => {
        if(data.status === 200) {
            this.setState({
                allCTUser: data.data.data
            })
        }
    }

    checkUserName = (id) => {
        var data = this.state.allCTUser;
        for(var i=0; i<data.length;i++){
            if(data[i].id === id) {
                return data[i].name
            }
        }
    }

    getAllProjects(data){
        this.setState({
            allProjects: data.data
        })
    }

    checkProjectName(id){
        for(var i=0; i<this.state.allProjects.length; i++) {
            if(Number(this.state.allProjects[i].id) === id){
                return this.state.allProjects[i].proj_name
            }
        }
    }

    handleNavBar(value) {
        this.setState({ navBar: value })
    }

    allAssessment(data) {
        this.setState({ loading: false })
        if (data.status === 200) {
            this.setState({
                allAssess: data.data
            });
            if (this.state.allAssess.length > 0) {
                $(document).ready(function () {
                    $('#datatable').DataTable();
                });
            }
        }
    }

    editAssmt = (e, obj) => {
        browserHistory.push({
           pathname: '/dpia/editAssessment',
           state: {
               id: obj.id
           }
        })
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
                            <div className="">
                                <div className="page-title">
                                    <div className="title_left">
                                        <h3>DPIA PIA</h3>
                                    </div>

                                </div>

                                <div className="clearfix"></div>

                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <div className="x_panel">
                                            <div className="x_title">
                                                <p className="lead">Browse List of assessments</p>

                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="x_content">

                                                {this.state.allAssess.length > 0 ? <table id="datatable" className="table table-striped table-bordered" width="100%" cellspacing="0">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Description</th>
                                                            <th>Creation Date</th>
                                                            <th>Project</th>
                                                            <th>Assigned To</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.allAssess.map((obj, index) => {
                                                            return (
                                                                <tr>
                                                                    <td>{obj.name}</td>
                                                                    <td>{obj.ass_desc}</td>
                                                                    <td>{obj.created_date}</td>
                                                                    <td>{this.checkProjectName(obj.project_id)}</td>
                                                                    <td>{this.checkUserName(obj.assignedTo)}</td>
                                                                    <td><span class="label label-success">{obj.ass_status}</span></td>
                                                                    <td className="text-center"> <a className="btn btn-default sar-action" onClick={(e) => this.editAssmt(e, obj)} data-toggle="tooltip" data-placement="bottom" title="Edit Assessment" data-original-title="Edit"><em className="fa fa-pencil"></em></a> </td>
                                                                </tr>
                                                            );
                                                        }, this)}
                                                    </tbody>
                                                </table> : <table id="datatable" className="table table-striped table-bordered" width="100%" cellspacing="0">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Description</th>
                                                                <th>Creation Date</th>
                                                                <th>Project</th>
                                                                <th>Assigned To</th>
                                                                <th>Status</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>}
                                            </div>
                                            {this.state.loading === true ? <div>
                                                <center>
                                                    <PulseLoader
                                                        color={'#F15A25'}
                                                        loading={this.state.loading}
                                                    />
                                                </center>
                                            </div> : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        // getSarSuccess: state.sar.sarSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        assessmentAction: bindActionCreators(assessmentAction, dispatch),
        projectAction: bindActionCreators(projectAction, dispatch),
        SarAction: bindActionCreators(SarAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assessment);