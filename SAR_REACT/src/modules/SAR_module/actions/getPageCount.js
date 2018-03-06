import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (pageCount, showCount, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl + "sar/page_count/" + pageCount + "/" + showCount,
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("token")
            }
        })
            .then(response => {
                var data = response;
                callback(data);
                dispatch({
                    type: "PAGE_COUNT_SUCCESS",
                    forgetPasswordSuccess: data
                });
            }).catch(error => {
                dispatch({ type: "PAGE_COUNT_REJECTED", forgetPasswordFailure: error });
            });
    }
}