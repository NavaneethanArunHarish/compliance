import React, { Component } from 'react';
import '../../../../../../assests/css/custom.css'
import '../../../../../../assests/css/custom.min.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

class departmentList extends Component {
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
                        <p class="lead">Browse list of Departments</p>
                        <div class="no-overflow"><table className="table generaltable" id="users">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Default Assignee Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody><tr class="lastrow">
                                <td>Marketing</td>
                                <td>sunil@ccs.com</td>
                                <td><a href="#"><i className="icon fa fa-pencil fa-fw " aria-hidden="true" title="Edit" aria-label="Edit"></i></a></td>
                            </tr>
                            </tbody>
                        </table>
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
export default departmentList;