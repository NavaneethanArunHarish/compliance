import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (id, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl+"sar/"+id,
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
                    type: "GET_SAR_BY_ID_SUCCESS",
                    getSarByIdSuccess: data
                });
            }).catch(error => {
                dispatch({ type: "GET_SAR_BY_ID_REJECTED", getSarByIdFailure: error });
            });
    }


}