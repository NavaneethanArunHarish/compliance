import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (pwd, token, callback) => {
    var obj = {
        "password": pwd
    }
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.RestUrl+"forgot/new/"+token,
            data: obj,
            header: {
                "Allow-Control-Allow-Origin": "*"
            }
        })
            .then(response => {
                var data = response;
                console.log("response while reset password -- > ", data);
                callback(data);
                dispatch({
                    type: "RESET_PASSWORD_SUCCESS",
                    resetPassword: data
                });
            }).catch(error => {
                dispatch({ type: "RESET_PASSWORD_REJECTED", resetPassword: error.response.data });
            });
    }


}