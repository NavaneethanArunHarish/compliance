import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl+'sar',
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
                    type: "GET_SAR_SUCCESS",
                    getSarSuccess: data
                });
            }).catch(error => {
                dispatch({ type: "GET_SAR_REJECTED", getSarFailure: error });
            });
    }


}