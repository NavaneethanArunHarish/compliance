import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (obj, callback) => {
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.RestUrl+"sar/search",
            data: obj,
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
                    type: "GET_SAR_BY_SEARCH_SUCCESS",
                    getSarBySEARCHSuccess: data
                });
            }).catch(error => {
                dispatch({ type: "GET_SAR_BY_SEARCH_REJECTED", getSarBySEARCHFailure: error });
            });
    }


}