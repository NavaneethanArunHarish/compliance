import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (id, obj, callback) => {
    return dispatch => {
        axios({
            method: 'POST',
            url: BaseUrl.RestUrl+'sar/response/'+id,
            data: obj,
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("token")
            }
        })
            .then(response => {
                var data = response;
                console.log("response while ASSIGN_SAR sar -- > ", data);
                callback(data);
                dispatch({
                    type: "ADD_RESPONSE",
                    change_priority: data
                });
            }).catch(error => {
                dispatch({ type: "ADD_RESPONSE_ERR", change_priority_err: error });
            });
    }


}