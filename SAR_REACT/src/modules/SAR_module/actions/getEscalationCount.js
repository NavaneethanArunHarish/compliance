import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl+'sar/escalate',
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },

        })
            .then(response => {
                var data = response;
                console.log("response while get all user -- > ", data);
                callback(data);
                dispatch({
                    type: "GET_ESCALATION_COUNT_SUCCESS",
                    getUserSuccess: data
                });
            }).catch(error => {
                dispatch({ type: "GET_ESCALATION_COUNT_ERR", getUserFailure: error });
            });
    }


}