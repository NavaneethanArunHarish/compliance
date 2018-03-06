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

import assessmentAction from '../../actions/dpiaAction/assessmentAction';
import projectAction from '../../actions/dpiaAction/projectAction';
import SarAction from '../../../SAR_module/actions';

import '../../../../assests/css/custom.css'
import '../../../../assests/css/custom.min.css';

import '../../../../assests/css/sortable.css';


class DpiaCTLDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'nav-md',
            allAssess: [],
            allAssignedTask: [],
            assignedTask: [],
            escalationCount: {},
            isLoggedIn: false,
            openPopUpLogin: false,
            previousUrl: '',
            allCTUser: [],
            allProjects:[]
        }
        this.handleNavBar = this.handleNavBar.bind(this);
        this.allAssessment = this.allAssessment.bind(this);
        this.allAssignedAss = this.allAssignedAss.bind(this);
        this.editQuestions = this.editQuestions.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
        this.getAllProjects = this.getAllProjects.bind(this);
        this.getallUserResponse = this.getallUserResponse.bind(this);
        this.checkProjectName = this.checkProjectName.bind(this);
        this.checkUserName = this.checkUserName.bind(this);
    }

    reloadPage() {
        window.location.reload();
    }
    editQuestions(obj, e) {
        browserHistory.push({
            pathname: '/dpia/clcheckquestion',
            state: {
                id: obj.id
            }
        })
    }
    componentWillMount() {
        var userId = localStorage.getItem("userId");
        if (userId == null) {
            var prevUrl = this.props.location.pathname;
            this.setState({ isLoggedIn: false, openPopUpLogin: true, previousUrl: prevUrl });
        } else {
            this.setState({ isLoggedIn: true });
            this.props.assessmentAction.getAssignedBy(localStorage.getItem("userId"), this.allAssignedAss);
            this.props.projectAction.getAllProject(this.getAllProjects);
            this.props.SarAction.getallUser(this.getallUserResponse);
        }
    }

    handleNavBar(value) {
        this.setState({ navBar: value })
    }

    allAssignedAss(data) {
        this.setState({
            assignedTask: data.data
        });
        this.props.assessmentAction.getAllAssessment(this.allAssessment);
    }

    getallUserResponse = (data) => {
        if (data.status === 200) {
            this.setState({
                allCTUser: data.data.data
            })
        }
    }

    getAllProjects(data) {
        this.setState({
            allProjects: data.data
        })
    }

    checkUserName = (id) => {

        // var data = this.state.allCTUser;
        for (var i = 0; i < this.state.allCTUser.length; i++) {
            if (Number(this.state.allCTUser[i].id) === Number(id) ) {
                return this.state.allCTUser[i].name
            }
        }
    }

    checkProjectName(id) {
        for (var i = 0; i < this.state.allProjects.length; i++) {
            if (Number(this.state.allProjects[i].id) === id) {
                return this.state.allProjects[i].proj_name
            }
        }
    }

    allAssessment(data) {
        var allTask = [];
        allTask = data.data;
        var assignedTask = this.state.assignedTask
        var allAssignedTask1 = [];
        for (var i = 0; i < assignedTask.length; i++) {
            for (var j = 0; j < allTask.length; j++) {
                if (assignedTask[i].assessment_id === allTask[j].id) {
                    allAssignedTask1.push({
                        "ass_name": allTask[j].name,
                        "proj_id": allTask[j].project_id,
                        "assign_by": assignedTask[i].assginedBy,
                        "due_date": assignedTask[i].assgined_date,
                        "id": allTask[j].id
                    })
                }
            }
        }
        this.setState({
            allAssignedTask: allAssignedTask1
        });
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
                                    <div className="clearfix"></div>

                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <div className="x_panel">

                                                <div className="x_content">

                                                    <div className="container flowchart_cls">
                                                        <div className="col-md-3">
                                                        </div>
                                                        <div className="col-md-3 blue_cls">
                                                            <h2 className="header_class">20</h2>
                                                            <p className="header_class">IN PROGRESS</p>
                                                        </div>
                                                        <div className="col-md-3 org_cls">
                                                            <h2 className="header_class">6</h2>
                                                            <p className="header_class">UNDER REVIEW</p>
                                                        </div>
                                                        <div className="col-md-3">
                                                        </div>
                                                    </div>

                                                    <div className="container">
                                                        <div className="col-md-3">
                                                        </div>
                                                        <div className="col-md-3 skyblue_cls">
                                                            <h2 className="header_class">2</h2>
                                                            <p className="header_class">MORE INFO NEEDED</p>
                                                        </div>
                                                        <div className="col-md-3 yellow_cls">
                                                            <h2 className="header_class">3</h2>
                                                            <p className="header_class">RISK TRACKING</p>
                                                        </div>
                                                        <div className="col-md-3">
                                                        </div>
                                                    </div>

                                                    <div className="container">
                                                        <div className="col-md-3">
                                                        </div>
                                                        <div className="col-md-3 grey_cls">
                                                            <h2 className="header_class">6</h2>
                                                            <p className="header_class">IN MITIGATION</p>
                                                        </div>
                                                        <div className="col-md-3 green_cls">
                                                            <h2 className="header_class">4</h2>
                                                            <p className="header_class">COMPLETED</p>
                                                        </div>
                                                        <div className="col-md-3">
                                                        </div>
                                                    </div>

                                                    <div className="container">
                                                        <div className="col-md-3">
                                                        </div>
                                                        <div className="col-md-6 dark_cls">
                                                            <h2 className="header_class">41</h2>
                                                            <p className="header_class">ALL PROJECTS</p>
                                                        </div>
                                                        <div className="col-md-3">
                                                        </div>
                                                    </div>



                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <div className="x_panel">
                                                <div className="x_title">
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <h2>Project Status Viewer</h2>

                                                        </div>
                                                        <div className="col-md-4">
                                                            <select className="form-control input-sm">
                                                                <option>--Select--</option>
                                                                <option>Week</option>
                                                                <option>Month</option>
                                                                <option>Quarter</option>
                                                                <option>Year</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="x_content">
                                                    <div id="canvas-holder" style={{ width: "570px" }}>
                                                        <canvas id="chart-area" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                    <div className="clearfix"></div>

                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="x_panel">

                                                <div className="x_content">

                                                    <div className="filter-box">
                                                    </div>


                                                    <p className="lead">Assigned DPIA/PIA</p>
                                                    <div id="datatable_wrapper" >
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <table id="datatable" className="table table-striped table-bordered dataTable no-footer" width="100%" cellSpacing="0" role="grid" style={{ width: "100%" }}>
                                                                    <thead>
                                                                        <tr role="row">
                                                                            <th>Assessment Name</th>
                                                                            <th className="sorting_asc" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Project Name: activate to sort column descending" style={{ width: "226px" }}>Project Name</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Assigned by: activate to sort column ascending" style={{ width: "449px" }}>Assigned by</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Due Date: activate to sort column ascending" style={{ width: "168px" }}>Due Date</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Action: activate to sort column ascending" style={{ width: "133px" }}>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.allAssignedTask.map((obj, index) => {
                                                                            return (
                                                                                <tr key={index}>
                                                                                    <td>{obj.ass_name}</td>
                                                                                    <td>{this.checkProjectName(obj.proj_id)}</td>
                                                                                    <td>{this.checkUserName(obj.assign_by)}</td>
                                                                                    <td>{obj.due_date}</td>
                                                                                    <td className="text-center"> <a className="btn btn-default sar-action" onClick={(e) => this.editQuestions(obj, e)} data-toggle="tooltip" data-placement="bottom" title="Edit Assessment" data-original-title="Edit"><em className="fa fa-pencil"></em></a> </td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="x_panel">

                                                <div className="x_content">

                                                    <div className="filter-box">

                                                    </div>


                                                    <p className="lead">Completed DPIA/PIA</p>
                                                    <div id="datatable_wrapper" >
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <table id="datatable" className="table table-striped table-bordered dataTable no-footer" width="100%" cellSpacing="0" role="grid" style={{ width: "100%" }}>
                                                                    <thead>
                                                                        <tr role="row">
                                                                            <th className="sorting_asc" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Project Name: activate to sort column descending" style={{ width: "226px" }}>Assessment Name</th>
                                                                            <th className="sorting_asc" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Project Name: activate to sort column descending" style={{ width: "226px" }}>Project Name</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Assigned by: activate to sort column ascending" style={{ width: "449px" }}>Assigned by</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Due Date: activate to sort column ascending" style={{ width: "168px" }}>Due Date</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Action: activate to sort column ascending" style={{ width: "133px" }}>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {/* {this.state.allAssignedTask.map((obj, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{obj.ass_name}</td>
                                                                                <td>{obj.proj_id}</td>
                                                                                <td>{obj.assign_by}</td>
                                                                                <td>{obj.due_date}</td>
                                                                                <td className="text-center"> <a className="btn btn-default sar-action" href={"/dpia/answerQuestions"} data-toggle="tooltip" data-placement="bottom" title="Edit Assessment" data-original-title="Edit"><em className="fa fa-pencil"></em></a> </td>
                                                                            </tr>
                                                                        );
                                                                    })} */}
                                                                    </tbody>
                                                                </table></div></div></div>






                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="x_panel">

                                                <div className="x_content">

                                                    <div className="filter-box">

                                                    </div>


                                                    <p className="lead">Managed DPIA/PIA</p>
                                                    <div id="datatable_wrapper" >
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <table id="datatable" className="table table-striped table-bordered dataTable no-footer" width="100%" cellSpacing="0" role="grid" style={{ width: "100%" }}>
                                                                    <thead>
                                                                        <tr role="row">
                                                                            <th className="sorting_asc" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Project Name: activate to sort column descending" style={{ width: "226px" }}>Assessment Name</th>
                                                                            <th className="sorting_asc" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Project Name: activate to sort column descending" style={{ width: "226px" }}>Project Name</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Assigned by: activate to sort column ascending" style={{ width: "449px" }}>Assigned by</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Due Date: activate to sort column ascending" style={{ width: "168px" }}>Due Date</th>
                                                                            <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Action: activate to sort column ascending" style={{ width: "133px" }}>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {/* {this.state.allAssignedTask.map((obj, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{obj.ass_name}</td>
                                                                                <td>{obj.proj_id}</td>
                                                                                <td>{obj.assign_by}</td>
                                                                                <td>{obj.due_date}</td>
                                                                                <td className="text-center"> <a className="btn btn-default sar-action" href={"/dpia/answerQuestions"} data-toggle="tooltip" data-placement="bottom" title="Edit Assessment" data-original-title="Edit"><em className="fa fa-pencil"></em></a> </td>
                                                                            </tr>
                                                                        );
                                                                    })} */}
                                                                    </tbody>
                                                                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(DpiaCTLDashboard);