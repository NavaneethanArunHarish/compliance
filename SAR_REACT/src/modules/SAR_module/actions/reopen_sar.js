import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (sarid, callback) => {
    return dispatch => {
        axios({
            method: 'put',
            url: BaseUrl.RestUrl+'sar/reopen/'+sarid,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },
        })
            .then(response => {
                var data = response;
                console.log("response while reopen sar -- > ", data);
                callback(data);
                dispatch({
                    type: "REOPEN_SAR",
                    close_sar: data
                });
            }).catch(error => {
                dispatch({ type: "REOPEN_SAR_ERR", close_sar: error });
            });
    }


}