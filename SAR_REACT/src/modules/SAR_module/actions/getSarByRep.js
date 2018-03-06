import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (name, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl+"sar/rep/"+name,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },
        })
            .then(response => {
                var data = response;
                console.log("response while get sar -- > ", data);
                callback(data);
                dispatch({
                    type: "GET_SAR_BY_REPS_SUCCESS",
                    getSarByUserIdSuccess: data
                });
            }).catch(error => {
                dispatch({ type: "GET_SAR_BY_REPS_REJECTED", getSarByUserIdFailure: error });
            });
    }


}