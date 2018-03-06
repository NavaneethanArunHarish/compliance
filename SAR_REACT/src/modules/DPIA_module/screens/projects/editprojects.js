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

class EditProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'nav-md',
            DpiNameErr: '',
            editProj: {
                "proj_id": "",
                "proj_name": "",
                "proj_desc": ""
            },
            updatedStatus: '',
            loading: false,
            isLoggedIn: false,
            openPopUpLogin: false,
            previousUrl: ''
        }
        this.handleNavBar = this.handleNavBar.bind(this);
        this.handleProjectDesc = this.handleProjectDesc.bind(this);
        this.handleProjectName = this.handleProjectName.bind(this);
        this.afterGetIdRes = this.afterGetIdRes.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.afterUpdateRes = this.afterUpdateRes.bind(this);
    }

    handleNavBar(value) {
        this.setState({ navBar: value })
    }

    componentWillMount() {
        this.props.projectAction.getProjectById(this.props.location.state.id, this.afterGetIdRes);
    }

    afterGetIdRes(data) {
        var obj = {
            "proj_id": data.data.proj_id,
            "proj_name": data.data.proj_name,
            "proj_desc": data.data.proj_desc
        }
        this.setState({
            editProj: obj
        })
    }

    handleProjectID = (e) => {
        var data = this.state.editProj;
        data.proj_id = e.target.value;
        this.setState({ editProj: data })
    }

    handleProjectDesc(e) {
        var data = this.state.editProj;
        data.proj_desc = e.target.value;
        this.setState({ editProj: data })
    }

    handleProjectName(e) {
        var data = this.state.editProj;
        data.proj_name = e.target.value;
        this.setState({ editProj: data })
    }

    updateProject() {
        this.props.projectAction.updateProject(this.props.location.state.id, this.state.editProj, this.afterUpdateRes);
    }

    afterUpdateRes(value) {
        if (value.status === 200) {
            this.setState({
                updatedStatus: 'success',
                editProj: {
                    "proj_id": "",
                    "proj_name": "",
                    "proj_desc": ""
                }
            });
            setTimeout(function () { browserHistory.push('/dpia/Projects'); }, 1000);
        }
        if (value.status === undefined) {
            this.setState({
                updatedStatus: 'error'
            });
        }

    }
    render() {
        return (
            <div className={this.state.navBar}>
                <div className="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
                    <div className="main_container">
                        <SideBar />
                        <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar} />
                        <div className="right_col" role="main">
                            <div className="">
                                <div className="page-title">
                                    <div className="title_left">
                                        <h3>Edit Project</h3>
                                    </div>
                                </div>

                                <div className="clearfix"></div>

                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <div className="x_panel">
                                            <div className="x_title">
                                                <h2>Edit Project</h2>

                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="x_content">
                                                <br />

                                                <div className="row">
                                                    <div className="col-md-6 col-md-offset-3">
                                                        {this.state.updatedStatus === 'success' && <div className="alert alert-success alert-dismissible fade in" role="alert">
                                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                            </button>
                                                            <span>Project updated successfully</span>
                                                        </div>}
                                                        {this.state.updatedStatus === 'error' && <div className="alert alert-danger alert-dismissible fade in" role="alert">
                                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                            </button>
                                                            <span>Error in Project update</span>
                                                        </div>}
                                                    </div>
                                                </div>

                                                <div id="demo-form2" data-parsley-validate="" className="form-horizontal form-label-left" >
                                                    <div className="form-group">
                                                        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="name">Name <span className="required">*</span>
                                                        </label>
                                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                                            <input type="text" id="first-name" required="required" className="form-control col-md-7 col-xs-12" value={this.state.editProj.proj_id} onChange={this.handleProjectID} />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="name">Name <span className="required">*</span>
                                                        </label>
                                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                                            <input type="text" id="first-name" required="required" className="form-control col-md-7 col-xs-12" value={this.state.editProj.proj_name} onChange={this.handleProjectName} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="description">Description <span className="required">*</span>
                                                        </label>
                                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                                            <textarea id="description" value={this.state.editProj.proj_desc} onChange={this.handleProjectDesc.bind(this)} required="required" className="form-control" name="description" cols="30" rows="10" data-parsley-trigger="keyup" data-parsley-minlength="20" data-parsley-maxlength="500" data-parsley-minlength-message="Come on! You need to enter at least a 20 caracters long comment.." data-parsley-validation-threshold="10" />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">

                                                            <button type="submit" className="btn btn-primary btn-round" onClick={this.updateProject}>Update</button>
                                                        </div>
                                                    </div>
                                                    <div className="ln_solid"></div>

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


            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        projectAction: bindActionCreators(projectAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);