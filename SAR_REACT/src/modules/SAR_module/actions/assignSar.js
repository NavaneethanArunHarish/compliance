import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (obj, callback) => {
    console.log("assigned actions-----------> ", obj.assignedTo);
    return dispatch => {
        axios({
            method: 'put',
            url: BaseUrl.RestUrl+'sar/assign/'+obj.sarId,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },
            // need to change
            data: {
                "assignedTo": obj.assignedTo
            }

        })
            .then(response => {
                var data = response;
                console.log("response while ASSIGN_SAR sar -- > ", data);
                callback(data);
                dispatch({
                    type: "ASSIGN_SAR",
                    close_sar: data
                });
            }).catch(error => {
                dispatch({ type: "ASSIGN_SAR_ERR", close_sar: error });
            });
    }


}