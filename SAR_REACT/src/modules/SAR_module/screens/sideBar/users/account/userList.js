import React, { Component } from 'react';
import Header from '../../../../../../components/Header';
import SideBar from '../../../../../../components/SideBar';
import Footer from '../../../../../../components/Footer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../../../../../../assests/css/custom.css'

import '../../../../../../assests/css/custom.min.css'
import { PulseLoader } from 'react-spinners';

import UserAction from '../../../../actions'


class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {

            allUserDetails: [],
            loading: false
        }
        this.getallUserResponse = this.getallUserResponse.bind(this);
        this.userEdit = this.userEdit.bind(this);
    }

    componentWillMount() {
        this.setState({ loading: true })
        this.props.UserAction.getallUser(this.getallUserResponse);
    }

    getallUserResponse(value) {
        this.setState({ loading: false })
        console.log("the  user value----------------------------------------->", value)
        this.setState({ allUserDetails: value.data.data })
    }

    userEdit(data) {
        this.props.handleEdit(data);
    }

    render() {

        console.log("the  state value----------------------------------------->", this.state.allUserDetails)
        return (
            <div className="col-xs-10">
                <div className="tab-content">
                    <div className="tab-pane active" id="list-of-users">
                        <p className="lead">Browse list of users</p>


                        <div className="no-overflow"><table className="table generaltable" id="users">
                            <thead>
                                <tr>
                                    <th className="header c0 centeralign" scope="col"><a href="user.php?sort=firstname&amp;dir=ASC">First name</a> / <a href="user.php?sort=lastname&amp;dir=ASC">Surname</a></th>
                                    <th className="header c1 centeralign" scope="col"><a href="user.php?sort=email&amp;dir=ASC">Email address</a></th>
                                    <th className="header c2" scope="col"><a href="user.php?sort=city&amp;dir=ASC">City/town</a></th>
                                    <th className="header c3" scope="col"><a href="user.php?sort=country&amp;dir=ASC">Country</a></th>
                                    <th className="header c4" scope="col"><a href="user.php?sort=lastaccess&amp;dir=DESC">Last access</a></th>
                                    <th className="header c5" scope="col">Edit</th>
                                    <th className="header c6 lastcol" scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.allUserDetails.map(function (obj, index) {
                                    return (<tr key={index} className="lastrow" >
                                        <td className="centeralign cell c0"><a>{obj.name}</a></td>
                                        <td className="centeralign cell c1">{obj.email}</td>
                                        <td className="cell c2">{obj.address.city}</td>
                                        <td className="cell c3">{obj.address.addressline2}</td>
                                        <td className="cell c4">39 secs</td>
                                        <td className="cell c5"><a onClick={() => this.userEdit(obj)}><i className="icon fa fa-cog fa-fw " aria-hidden="true" title="Edit" aria-label="Edit"></i></a></td>
                                        <td className="cell c6 lastcol"></td>
                                    </tr>)
                                }.bind(this))}


                            </tbody>
                        </table>

                            {this.state.loading === true ? <div><div>
                                <center>
                                    <PulseLoader
                                        color={'#F15A25'}
                                        loading={this.state.loading}
                                    />
                                </center>
                            </div></div> : ''}
                        </div>


                    </div>
                </div>
            </div>

        );

    }
}


function mapStateToProps(state, props) {
    //console.log("response data----->",state.login)
    return {
        getUserSuccess: state.login.userSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        UserAction: bindActionCreators(UserAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);