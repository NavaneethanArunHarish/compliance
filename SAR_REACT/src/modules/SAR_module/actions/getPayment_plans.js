import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl+'payment_plans',
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },
        })
            .then(response => {
                var data = response;
                console.log("response PAYMENT -- > ", data);
                callback(data);
                dispatch({
                    type: "GET_ALL_PAYMENT_PLANS",
                    getUserSuccess: data
                });
            }).catch(error => {
                dispatch({ type: "GET_PAYMENT_REJECTED", getUserFailure: error });
            });
    }


}