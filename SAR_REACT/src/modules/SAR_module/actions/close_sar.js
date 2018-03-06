import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (sarid, callback) => {
    return dispatch => {
        axios({
            method: 'put',
            url: BaseUrl.RestUrl+'sar/close/'+sarid,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },
            // need to change
            data: {
                "departments": { "name": "IT", "defaultAssignedEmailId": "tharani10d@gmail.com" }
            }

        })
            .then(response => {
                var data = response;
                console.log("response while close sar -- > ", data);
                callback(data);
                dispatch({
                    type: "CLOSE_SAR",
                    close_sar: data
                });
            }).catch(error => {
                dispatch({ type: "CLOSE_SAR", close_sar: error });
            });
    }


}