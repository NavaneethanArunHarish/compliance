import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (email, pwd) => {
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.RestUrl+"user/login",
            data: {
                "email": email,
                "password": pwd,
                "client_ip": "1.0.0.9"
            },
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                var data = response;
                // callback(data);
                dispatch({
                    type: "REGISTER_SUCCESS",
                    register: data
                });
            }).catch(error => {
                dispatch({ type: "REGISTER_REJECTED", register: error });
            });
    }


}