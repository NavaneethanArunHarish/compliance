import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (obj, callback) => {
    console.log("data in action --->" + obj)
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.RestUrl+"user/external_user/create",
            data: obj,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            }
        })
            .then(response => {
                var data = response;
                console.log("response while create user -- > ", data);
                callback(data);
                dispatch({
                    type: "CREATE_EX_USER_SUCCESS",
                    exUserSuccess: data
                });
            }).catch(error => {
                dispatch({ type: "CREATE_EX_USER_REJECTED", exUserError: error.response });
            });
    }


}