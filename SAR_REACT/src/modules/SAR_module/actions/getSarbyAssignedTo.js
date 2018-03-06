import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (user_id, pageCount, showCount, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl + "sarbyAssign/page_count/" + user_id + "/" + pageCount + "/" + showCount,
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
                    type: "PAGE_COUNT_ByUSER_SUCCESS",
                    getsarbypagecount: data
                });
            }).catch(error => {
                dispatch({ type: "PAGE_COUNT_ByUSER_ERROR", forgetPasswordFailure: error });
            });
    }
}