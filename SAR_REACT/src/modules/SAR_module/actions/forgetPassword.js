import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (email, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl+"forgot/"+email

        })
            .then(response => {
                var data = response;
                console.log("response while forget password -- > ", data);
                callback(data);
                dispatch({
                    type: "FORGET_PASSWORD_SUCCESS",
                    forgetPasswordSuccess: data
                });
            }).catch(error => {
                dispatch({ type: "FORGET_PASSWORD_REJECTED", forgetPasswordFailure: error });
            });
    }


}