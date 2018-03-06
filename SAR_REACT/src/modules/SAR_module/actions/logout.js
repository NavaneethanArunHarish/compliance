import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (id, callback) => {
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.RestUrl+"user/logout/"+id,
            headers: {
                'Content-Type': "application/json",
            }

        })
            .then(response => {
                var data = response;
                console.log("response while updating -- > ", data);
                callback(data);
                dispatch({
                    type: "LOGOUT_SUCCESS",
                    logoutSuccess: data
                });
            }).catch(error => {
                dispatch({ type: "LOGOUT_REJECTED", logoutFailure: error.response.data });
            });
    }


}