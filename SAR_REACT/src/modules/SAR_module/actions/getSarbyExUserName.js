import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (externalUser, pageCount, showCount, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl + "exusersar/page_count/" + externalUser + "/" + pageCount + "/" + showCount,
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
                    type: "GET_SAR_BY_EXUSER_SUCCESS",
                    getSarExUserSuccess: data
                });
            }).catch(error => {
                dispatch({ type: "GET_SAR_BY_EXUSER_REJECTED", getSarExUserFailure: error });
            });
    }


}