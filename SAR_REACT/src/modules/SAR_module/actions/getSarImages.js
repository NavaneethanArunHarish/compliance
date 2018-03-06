import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (id, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl + "sar/response/" + id,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },

        })
            .then(response => {
                var data = response;
                callback(data);
                dispatch({
                    type: "GET_SAR_IMAGE_SUCCESS",
                    getSarByUserIdSuccess: data
                });
            }).catch(error => {
                dispatch({ type: "GET_SAR_IMAGE_ID_REJECTED", getSarByUserIdFailure: error });
            });
    }
}