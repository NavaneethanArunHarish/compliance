import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Select from 'react-select';
import PopUpLogin from '../../../SAR_module/screens/LoginPage/PopUpLogin';

import Header from '../../../../components/Header';
import SideBar from '../../../../components/SideBar';
import Footer from '../../../../components/Footer';

import { Pagination, Icon } from 'semantic-ui-react';
import SearchInput, { createFilter } from 'react-search-input';
import { PulseLoader } from 'react-spinners';

import assessmentAction from '../../actions/dpiaAction/assessmentAction';
import projectAction from '../../actions/dpiaAction/projectAction';

import 'react-select/dist/react-select.css';
import '../../../../assests/css/custom.css'
import '../../../../assests/css/custom.min.css';

class AddAssessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'nav-md',
            project_id: '',
            projectName: '',
            assessment: {
                name: '',
                template: false,
                ass_desc: '',
                template_id: null
            },
            createdStatus: '',
            allProjects: [],
            projectOption: [],
            selectedOption: {},
            loading: false,
            isLoggedIn: false,
            openPopUpLogin: false,
            previousUrl: ''
        }
        this.handleNavBar = this.handleNavBar.bind(this);
        this.createAssessment = this.createAssessment.bind(this);
        this.afterAssCreated = this.afterAssCreated.bind(this);
        this.getAllProjects = this.getAllProjects.bind(this);
        this.validateName = this.validateName.bind(this);
        this.handleTemplateChange = this.handleTemplateChange.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
    }

    reloadPage() {
        window.location.reload();
    }

    componentWillMount() {
        var userId = localStorage.getItem("userId");
        if (userId == null) {
            console.log('need to login');
            var prevUrl = this.props.location.pathname;
            console.log('prev url ', prevUrl);
            this.setState({ isLoggedIn: false, openPopUpLogin: true, previousUrl: prevUrl });
        } else {
            this.setState({ isLoggedIn: true });
            this.props.projectAction.getAllProject(this.getAllProjects);
        }
    }

    getAllProjects(data) {
        if (data.status === 200) {
            var totalProject = data.data;
            var projectOption = [];
            for (var i = 0; i < totalProject.length; i++) {
                projectOption.push({
                    "value": totalProject[i].id,
                    "label": totalProject[i].proj_name
                })
            }
            this.setState({
                projectOption: projectOption,
                allProjects: totalProject
            });
        }
    }


    handleNavBar(value) {
        this.setState({ navBar: value })
    }

    handleChange(e) {
        var data = this.state.assessment;

        if (e.target.name === "name") {
            data.name = e.target.value;
            this.setState({
                assessment: data
            })
        }
        if (e.target.name === "ass_desc") {
            data.ass_desc = e.target.value;
            this.setState({
                assessment: data
            })
        }
    }

    createAssessment() {
        if (this.state.assessment.name !== '') {
            if (!this.validateName(this.state.assessment.name)) {
                this.setState({ AssNameErr: " Enter the valid name. " });
            } else {
                this.setState({ AssNameErr: '' });
            }
        }
        if ((this.state.assessment.name === '') && (this.state.selectedOption.value === undefined) && (this.state.assessment.ass_desc === '')) {
            this.setState({ AssNameErr: 'Enter The Name', AssProjectErr: " Please select the project.", AssDesErr: 'Enter The Description' });
            // alert("Check for the Error's.0")
        } else if ((this.state.assessment.name !== '') && (this.state.selectedOption.value === undefined) && (this.state.assessment.ass_desc === '')) {
            this.setState({ AssNameErr: '', AssProjectErr: " Please select the project.", AssDesErr: 'Enter The Description' });
            // alert("Check for the Error's.1")
        } else if ((this.state.selectedOption.value !== undefined) && (this.state.assessment.name === '') && (this.state.assessment.ass_desc === '')) {
            this.setState({ AssNameErr: 'Enter The Name', AssDesErr: 'Enter The Description', AssProjectErr: '' });
            // alert("Check for the Error's.2")
        } else if ((this.state.assessment.ass_desc !== '') && (this.state.selectedOption.value === undefined) && (this.state.assessment.name === '')) {
            this.setState({ AssProjectErr: " Please select the project.", AssNameErr: 'Enter The Name', AssDesErr: '' });
            // alert("Check for the Error's.3")
        } else if ((this.state.assessment.ass_desc !== '') && (this.state.selectedOption.value !== undefined) && (this.state.assessment.name === '')) {
            this.setState({ AssNameErr: 'Enter The Name', AssProjectErr: '', AssDesErr: '' });
            // alert("Check for the Error's.4")
        } else if ((this.state.assessment.ass_desc !== '') && (this.state.assessment.name !== '') && (this.state.selectedOption.value === undefined)) {
            this.setState({ AssProjectErr: " Please select the project.", AssNameErr: '', AssDesErr: '' });
            // alert("Check for the Error's.5")
        } else if ((this.state.assessment.ass_desc === '') && (this.state.assessment.name !== '') && (this.state.selectedOption.value !== undefined)) {
            this.setState({ AssDesErr: 'Enter The Description', AssProjectErr: '', AssNameErr: '' });
            // alert("Check for the Error's.6")
        } else {
            if (this.validateName(this.state.assessment.name)) {
                this.setState({ AssDesErr: '', AssProjectErr: '', AssNameErr: '' });
                var data = {
                    "name": this.state.assessment.name,
                    "template": this.state.assessment.template,
                    "ass_status": 'new',
                    "project_id": this.state.selectedOption.value,
                    "ass_desc": this.state.assessment.ass_desc,
                    "template_id": null
                }
                this.setState({ loading: true })
                this.props.assessmentAction.createAssessment(data, this.afterAssCreated);
            } else {
                this.setState({ AssDesErr: '', AssProjectErr: '' });
               // alert("Check for the Error's.")
            }
        }
    }

    handleTemplateChange(e) {
        var data = this.state.assessment;
        data.template = !data.template;
        this.setState({
            assessment: data
        })
    }

    handleProjectChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log('Selected:', selectedOption);
    }

    validateName(name) {
        var re = /^[ A-Za-z0-9_@./#&+-]*$/;
        return re.test(name);
    };

    afterAssCreated(data) {
        this.setState({ loading: false })
        if (data.status === 200) {
            this.setState({
                assessment: {
                    "name": "",
                    "ass_desc": ""
                },
                createdStatus: 'success',
                selectedOption: {}
            });
            setTimeout(function () { browserHistory.push('/dpia/assessment'); }, 1000);
        }
        if (data.status === undefined) {
            this.setState({
                createdStatus: 'error'
            });
        }
    }

    render() {
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;
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
                                            <h3>Add Assessment</h3>
                                        </div>
                                    </div>

                                    <div className="clearfix"></div>

                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="x_panel">
                                                <div className="x_title">
                                                    <h2>Add Assessment</h2>

                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="x_content">
                                                    <br />

                                                    <div className="row">
                                                        <div className="col-md-6 col-md-offset-3">
                                                            {this.state.createdStatus === 'success' && <div className="alert alert-success alert-dismissible fade in" role="alert">
                                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                                </button>
                                                                <span>Assessment added successfully</span>
                                                            </div>}
                                                            {this.state.createdStatus === 'error' && <div className="alert alert-danger alert-dismissible fade in" role="alert">
                                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                                </button>
                                                                <span>Error in Assessment creation</span>
                                                            </div>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 col-md-offset-3">

                                                        </div>
                                                    </div>
                                                    <div id="demo-form2" data-parsley-validate="" className="form-horizontal form-label-left" >

                                                        <div className="form-group">
                                                            <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="name">Project Name<span className="required">*</span>
                                                            </label>
                                                            <div className="col-md-4 col-sm-6 col-xs-12">

                                                                <Select
                                                                    value={value}
                                                                    onChange={this.handleProjectChange}
                                                                    options={this.state.projectOption}
                                                                    searchable={true} />
                                                                <span style={{ color: 'red' }}>{this.state.AssProjectErr}</span>
                                                            </div>
                                                        </div>
                                                        {/* <div className="form-group">
                                                        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="description">Template
                                                        </label>
                                                        <div className="col-md-4 col-sm-4 col-xs-12">
                                                            <input type="text" id="template_id" required="required" className="form-control col-md-7 col-xs-12" />
                                                        </div>
                                                        <div className="col-md-2 col-sm-2 col-xs-12">
                                                            <a href="#" className="btn btn-round btn-primary pull-right" data-toggle="modal" data-target=".bs-example-modal-sm">Search</a>
                                                        </div>
                                                    </div> */}

                                                        <div className="form-group">
                                                            <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="name">Name <span className="required">*</span>
                                                            </label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <input type="text" id="name" name="name" value={this.state.assessment.name} onChange={(e) => this.handleChange(e)} required="required" className="form-control col-md-7 col-xs-12" />
                                                                <span style={{ color: 'red' }}>{this.state.AssNameErr}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="name">Description<span className="required">*</span>
                                                            </label>
                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <textarea type="text" id="description" name="ass_desc" value={this.state.assessment.ass_desc} onChange={(e) => this.handleChange(e)} required="required" className="form-control col-md-7 col-xs-12" />
                                                                <span style={{ color: 'red' }}>{this.state.AssDesErr}</span>
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="name">Save As Template:</label>

                                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                                <input style={{ marginLeft: '15px' }} checked={this.state.assessment.template} onChange={this.handleTemplateChange} type="checkbox" />
                                                            </div>
                                                        </div>

                                                        <div className="modal fade bs-example-modal-sm" tabIndex="-1" role="dialog" aria-hidden="true">
                                                            <div className="modal-dialog modal-lg">
                                                                <div className="modal-content">

                                                                    <div className="modal-header">
                                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                                                        </button>
                                                                        <h4 className="modal-title" id="myModalLabel2">Search Assessment Template</h4>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <div className="form-group">
                                                                            <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="description">Name<span className="required">*</span>
                                                                            </label>
                                                                            <div className="col-md-5 col-sm-4 col-xs-12">
                                                                                <input type="text" id="template_id" required="required" className="form-control col-md-7 col-xs-12" />
                                                                            </div>

                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="description">Description<span className="required">*</span>
                                                                            </label>
                                                                            <div className="col-md-5 col-sm-4 col-xs-12">
                                                                                <input type="text" id="template_id" required="required" className="form-control col-md-7 col-xs-12" />
                                                                            </div>

                                                                        </div>

                                                                        <div className="form-group">

                                                                            <div className="col-md-5 col-md-offset-3 col-sm-4 col-xs-12">
                                                                                <a href="#" className="btn btn-round btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm">Search</a>
                                                                            </div>

                                                                        </div>

                                                                        <div className="col-sm-12"><table id="datatable" className="table table-striped table-bordered dataTable no-footer" width="100%" cellSpacing="0" role="grid" >
                                                                            <thead>
                                                                                <tr role="row"><th className="sorting_asc" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '190px' }}>Name</th><th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Description: activate to sort column ascending" style={{ width: '675px' }}>Description</th></tr>
                                                                            </thead>
                                                                            <tbody>

                                                                                <tr role="row" className="odd">
                                                                                    <td><input type="radio" name="someName" value="A" />Test Template1</td>
                                                                                    <td>This is test template</td>
                                                                                </tr></tbody>
                                                                        </table></div>
                                                                        <button type="button" data-dismiss="modal" className="btn btn-round btn-primary">Select</button>
                                                                        <div className="clearfix"></div>
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div className="form-group">
                                                            <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                                                <center><button type="submit" onClick={this.createAssessment} className="btn btn-primary btn-round">Create</button></center><br />
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
        projectAction: bindActionCreators(projectAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAssessment);