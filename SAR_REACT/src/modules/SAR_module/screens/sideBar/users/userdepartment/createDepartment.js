import React, { Component } from 'react';
import '../../../../../../assests/css/custom.css'
import '../../../../../../assests/css/custom.min.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

class createDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="col-xs-10">
                <div className="tab-content">
                    <div className="tab-pane active" id="add-dept">
                        <p className="lead">Add Department</p>

                        <div className="form-group fitem row">
                            <div className="col-md-2">

                                <label className="col-form-label d-inline " htmlFor="id_firstname">
                                    Name
                                </label>
                            </div>
                            <div class="col-md-6  felement" data-fieldtype="text">
                                <input type="text" class="form-control " name="d-name" id="id_ldapemail" value="" />
                            </div>

                        </div>

                        <div class="form-group fitem row">
                            <div class="col-md-2">

                                <label class="col-form-label d-inline " htmlFor="id_firstname">
                                    Default Assignee Email
        </label>
                            </div>
                            <div class="col-md-6 felement" data-fieldtype="text">
                                <input type="text" class="form-control " name="a-email" id="id_ldapfname" value="" maxLength="100" />


                            </div>

                        </div>

                        <div class="form-group row  fitem femptylabel  ">
                            <div class="col-md-2">

                            </div>
                            <div class="col-md-9 form-inline felement" data-fieldtype="submit">
                                <input type="submit" class="btn btn-primary" name="submitbutton" id="id_submitbutton" value="Create Department" />
                                <div class="form-control-feedback" id="id_error_submitbutton" style={{display: 'none'}}>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )

    }
}


// function mapStateToProps(state, props) {
//     return {
//         externalUserSuccess: state.login.externalUserSuccess,
//         editUserSuccess: state.login.editUserSuccess
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         Action: bindActionCreators(Action, dispatch)
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
export default createDepartment;
