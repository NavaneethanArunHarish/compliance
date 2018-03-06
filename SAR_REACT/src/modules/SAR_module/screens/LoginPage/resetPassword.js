import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css'
import logo from '../../../../assests/images/Compliance-Compendium-Logo-Transparentx-1024x339.png';
import Action from '../../../SAR_module/actions';
import { PulseLoader } from 'react-spinners';


class ResetPasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pwd: '',
            reTypePwd: '',
            token: '',
            loading: false
        }
        this.confirm = this.confirm.bind(this);
        this.reTypePassword = this.reTypePassword.bind(this);
        this.password = this.password.bind(this);
        this.resetPasswordResponse = this.resetPasswordResponse.bind(this);
    }

    componentWillMount() {
        this.setState({ token: this.props.params.token })
    }

    confirm(e) {
        e.preventDefault();
        this.setState({ loading: true })
        this.props.Action.resetPassword(this.state.pwd, this.state.token, this.resetPasswordResponse)
    }

    reTypePassword(e) {
        e.preventDefault();
        this.setState({ reTypePwd: e.target.value })
    }

    password(e) {
        e.preventDefault();
        this.setState({ pwd: e.target.value })
    }

    resetPasswordResponse(data) {
        this.setState({ loading: false })
        browserHistory.push('/');
    }

    render() {
        return (
            <div>
                <div class="login_wrapper">
                    <div class="animate form login_form">
                        <div class="login_head"><a href={'/'}><img src={logo} alt="" width="240"/></a></div>
                        <section class="login_content">

                            <form>
                                <h1>Reset Password</h1>
                                <div>
                                    <input type="password" class="form-control" placeholder="Password" required="" value={this.state.pwd} onChange={this.password} />
                                </div>

                                <div>
                                    <input type="password" class="form-control" placeholder="Retype Password" required="" value={this.state.reTypePwd} onChange={this.reTypePassword} />
                                </div>
                                <div>Choose a password at least 8 characters long</div>
                                <div>
                                    <button class="btn btn-orange" onClick={this.confirm}>Confirm </button><br />
                                    {this.state.loading === true ? <div>
                                        <center>
                                            <PulseLoader
                                                color={'#F15A25'}
                                                loading={this.state.loading}
                                            />
                                        </center>
                                    </div> : ''}


                                </div>

                                <div class="clearfix"></div>


                            </form>
                        </section>

                    </div>


                </div>

            </div>

        );
    }
}

function mapStateToProps(state, props) {
    return {
        resetPasswordSuccess: state.login.resetPasswordSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        Action: bindActionCreators(Action, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordComponent);





