import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import PopUpLogin from '../../../SAR_module/screens/LoginPage/PopUpLogin';

import Header from '../../../../components/Header';
import SideBar from '../../../../components/SideBar';
import Footer from '../../../../components/Footer';
import { PulseLoader } from 'react-spinners';

import { Pagination, Icon } from 'semantic-ui-react';
import SearchInput, { createFilter } from 'react-search-input';

import projectAction from '../../actions/dpiaAction/projectAction';

import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css';

class AddProject extends Component {
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
            previousUrl: ''
        }
        this.handleNavBar = this.handleNavBar.bind(this);
        this.handleNavBar = this.handleNavBar.bind(this);
        this.createProject = this.createProject.bind(this);
        this.validateName = this.validateName.bind(this);
        this.afterProjectCreated = this.afterProjectCreated.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
    }

    reloadPage() {
        window.location.reload();
    }

    componentWillMount() {
        var userId = localStorage.getItem("userId");
        if (userId == null) {
            var prevUrl = this.props.location.pathname;
            this.setState({ isLoggedIn: false, openPopUpLogin: true, previousUrl: prevUrl });
        } else {
            this.setState({ isLoggedIn: true });
        }
    }

    handleNavBar(value) {
        this.setState({ navBar: value })
    }

    createProject() {
        if (this.state.proj.proj_name !== '') {
            if (!this.validateName(this.state.proj.proj_name)) {
                this.setState({ DpiNameErr: " Enter the valid name. " });
            } else {
                this.setState({ DpiNameErr: '' });
            }
        }
        if ((this.state.proj.proj_name == '') && (this.state.proj.proj_id === '') && (this.state.proj.proj_desc === '')) {
            this.setState({ DpiNameErr: 'Enter The Name', DpiProjectIDErr: " Enter the project id.", DpiDesErr: 'Enter The Description' });
            // alert("Check for the Error's.0")
        } else if ((this.state.proj.proj_name !== '') && (this.state.proj.proj_id === '') && (this.state.proj.proj_desc === '')) {
            this.setState({ DpiProjectIDErr: " Enter the project id.", DpiDesErr: 'Enter The Description', DpiNameErr: '' });
            // alert("Check for the Error's.1")
        } else if ((this.state.proj.proj_id !== '') && (this.state.proj.proj_name === '') && (this.state.proj.proj_desc === '')) {
            this.setState({ DpiNameErr: 'Enter The Name', DpiDesErr: 'Enter The Description', DpiProjectIDErr: '' });
            // alert("Check for the Error's.2")
        } else if ((this.state.proj.proj_desc !== '') && (this.state.proj.proj_id === '') && (this.state.proj.proj_name === '')) {
            this.setState({ DpiProjectIDErr: " Enter the project id.", DpiNameErr: 'Enter The Name', DpiDesErr: '' });
            // alert("Check for the Error's.3")
        } else if ((this.state.proj.proj_name !== '') && (this.state.proj.proj_id !== '') && (this.state.proj.proj_desc === '')) {
            this.setState({ DpiDesErr: 'Enter The Description', DpiNameErr: '', DpiProjectIDErr: '' });
            // alert("Check for the Error's.4")
        } else if ((this.state.proj.proj_id !== '') && (this.state.proj.proj_desc !== '') && (this.state.proj.proj_name === '')) {
            this.setState({ DpiNameErr: 'Enter The Name', DpiProjectIDErr: '', DpiDesErr: '' });
            // alert("Check for the Error's.5")
        } else if ((this.state.proj.proj_id === '') && (this.state.proj.proj_name !== '') && (this.state.proj.proj_desc !== '')) {
            this.setState({ DpiProjectIDErr: " Enter the project id.", DpiNameErr: '', DpiDesErr: '' });
            // alert("Check for the Error's.6")
        } else {
            this.setState({ DpiNameErr: '', DpiProjectIDErr: '', DpiDesErr: '' });
            var data = {
                "proj_id": this.state.proj.proj_id,
                "proj_name": this.state.proj.proj_name,
                "proj_status": "Open",
                "proj_desc": this.state.proj.proj_desc,
                "created_by": Number(localStorage.getItem("userId"))
            }
            this.setState({ loading: true })
            this.props.projectAction.createProject(data, this.afterProjectCreated);
        }
    }

    afterProjectCreated(data) {
        this.setState({ loading: false })
        if (data.status === 200) {
            this.setState({
                proj: {
                    "proj_id": "",
                    "proj_name": "",
                    "proj_desc": ""
                },
                createdStatus: 'success'
            });
            setTimeout(function () { browserHistory.push('/dpia/Projects'); }, 1000);
        }
        if (data.status === undefined) {
            this.setState({
                createdStatus: 'error'
            });
        }
    }
    validateName(name) {
        var re = /^[ A-Za-z0-9_@./#&+-]*$/;
        return re.test(name);
    };

    handleChange(e) {
        var data = this.state.proj;

        if (e.target.name === "proj_id") {
            data.proj_id = e.target.value;
            this.setState({
                proj: data
            })
        }
        if (e.target.name === "proj_name") {
            data.proj_name = e.target.value;
            this.setState({
                proj: data
            })
        }
        if (e.target.name === "proj_desc") {
            data.proj_desc = e.target.value;
            this.setState({
                proj: data
            })
        }
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
                                            <h3>Add Project</h3>
                                        </div>
                                    </div>

                                    <div className="clearfix"></div>

                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="x_panel">
                                                <div className="x_title">
                                                    <h2>Add New Project</h2>

                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="x_content">
                                                    <br />

                                                    <div className="row">
                                                        <div className="col-md-6 col-md-offset-3">
                                                            {this.state.createdStatus === 'success' && <div className="alert alert-success alert-dismissible fade in" role="alert">
                                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                                </button>
                                                                <span>project added successfully</span>
                                                            </div>}
                                                            {this.state.createdStatus === 'error' && <div className="alert alert-danger alert-dismissible fade in" role="alert">
                                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                                </button>
                                                                <span>Error in project creation</span>
                                                            </div>}
                                                        </div>
                                                    </div>

                                                    <div className="form-horizontal form-label-left" >
                                                        <div className="form-group">
                                                            <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="pid">Project Number <span className="required">*</span>
                                                            </label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <input type="text" name="proj_id" id="first-name" value={this.state.proj.proj_id} onChange={(e) => this.handleChange(e)} required="required" className="form-control col-md-7 col-xs-12" />
                                                                <span style={{ color: 'red' }}>{this.state.DpiProjectIDErr}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="name">Name <span className="required">*</span>
                                                            </label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <input type="text" id="first-name" name="proj_name" value={this.state.proj.proj_name} onChange={(e) => this.handleChange(e)} required="required" className="form-control col-md-7 col-xs-12" />
                                                                <span style={{ color: 'red' }}>{this.state.DpiNameErr}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="description">Description <span className="required">*</span>
                                                            </label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <textarea id="description" name="proj_desc" value={this.state.proj.proj_desc} onChange={(e) => this.handleChange(e)} required="required" className="form-control" cols="30" rows="10" data-parsley-trigger="keyup" data-parsley-minlength="20" data-parsley-maxlength="500" data-parsley-minlength-message="Come on! You need to enter at least a 20 caracters long comment.." data-parsley-validation-threshold="10"></textarea>
                                                                <span style={{ color: 'red' }}>{this.state.DpiDesErr}</span>
                                                            </div>
                                                        </div>
                                                        <div className="ln_solid"></div>
                                                        <div className="form-group">
                                                            <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                                                <center><button onClick={this.createProject} className="btn btn-primary btn-round">Create</button></center><br />
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
        cereatedProject: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        projectAction: bindActionCreators(projectAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);